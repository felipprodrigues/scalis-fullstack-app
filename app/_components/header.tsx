'use client'

import logoImg from '../assets/logo.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from './ui/button'
import { DrawerComponent } from './drawerComponent'
import { CreateAccountModal } from './createAccountModal'
import { api } from '../_lib/axios'
import { LogOutIcon } from 'lucide-react'

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
            <div className="relative flex flex-col">
              <Image
                src={logoImg}
                alt="logo-image"
                className="mix-blend-multiply"
              />

              <Button
                variant="outline"
                className="bg-transparent text-gray-200 absolute left-0 bottom-[-7rem]  p-2 text-xs border-none"
                onClick={() => signOut()}
              >
                <LogOutIcon size={16} />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
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
