'use client'

import logoImg from '../assets/logo.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from './ui/button'
import { DrawerComponent } from './drawerComponent'
import { CreateAccountModal } from './createAccountModal'

export function Header({ accountSession }: any) {
  const [selectedType, setSelectedType] = useState<string | undefined>('')

  const session = useSession()

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

            <CreateAccountModal session={session} />
            <Button
              variant="outline"
              className="bg-transparent text-gray-200"
              onClick={() => signOut()}
            >
              Logout
            </Button>
            <DrawerComponent
              selectedType={selectedType}
              handleSelectTransferType={handleSelectTransferType}
              accountSession={accountSession}
            />
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
