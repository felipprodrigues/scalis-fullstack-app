'use client'

import logoImg from '../assets/logo.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { DrawerComponent } from './drawerComponent'
import { CreateAccountModal } from './createAccountModal'
import { api } from '../_lib/axios'

export function Header({ accountSession }: any) {
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
    const userId = session?.data?.user.id

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
            <Button
              variant="outline"
              className="bg-transparent text-gray-200"
              onClick={() => signOut()}
            >
              Logout
            </Button>

            {!accountSession.length ? (
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
                accountSession={accountSession}
              />
            )}
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
