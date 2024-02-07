'use client'

import logoImg from '../assets/logo.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from './ui/button'
import { DrawerComponent } from './drawerComponent'
import { CreateAccountModal } from './createAccountModal'
import { api } from '../_lib/axios'
import { LogOut } from 'lucide-react'

export function Header({ userAccountData }: any) {
  const [selectedType, setSelectedType] = useState<string | undefined>('')
  const [open, setOpen] = useState(false)

  const session = useSession()

  // ACTION - HANDLE MODAL OPEN/CLOSE
  const handleCloseModal = () => {
    if (open) {
      setOpen(() => !open)
      document.location.reload()
    }

    setOpen(true)
  }

  // ACTION - CREATE DB BANK ACCOUNT
  const createBankAccount = async () => {
    const userId = userAccountData.session.user.id

    try {
      await api.post('/createAccount', userId)
    } catch (e) {
      console.log(e)
    }
  }

  // ACTION - DRAWER COMPONENT
  const handleSelectTransferType = (value: string) => {
    setSelectedType(value)
  }

  return (
    <>
      {session.status === 'authenticated' ? (
        <header className="pt-[2.5rem] pb-[7.5rem] bg-primary w-full flex justify-center">
          <div className="w-full max-w-[1120px] flex justify-between items-center">
            <Image
              src={logoImg}
              alt="logo-image"
              className="mix-blend-multiply"
            />

            <div className="flex flex-col gap-4 relative">
              {!userAccountData.userBankAccounts.length ? (
                <CreateAccountModal
                  open={open}
                  handleCloseModal={handleCloseModal}
                  session={session}
                  createBankAccount={createBankAccount}
                />
              ) : (
                <DrawerComponent
                  selectedType={selectedType}
                  handleSelectTransferType={handleSelectTransferType}
                  userAccountData={userAccountData}
                />
              )}
              <Button
                variant="outline"
                className="bg-transparent text-gray-200 absolute right-[-7rem] bottom-[-7rem] rounded-full p-4"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            </div>
          </div>
        </header>
      ) : (
        <header className="pt-[2.5rem] pb-[7.5rem] bg-primary w-full flex justify-center">
          <div className="w-full max-w-[1120px] flex justify-between items-center">
            <Image
              src={logoImg}
              alt="logo-image"
              className="mix-blend-multiply"
            />
          </div>
        </header>
      )}
    </>
  )
}
