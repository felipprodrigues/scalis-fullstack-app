'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import { Button } from './ui/button'

export function Header() {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' ? (
        <header className="pt-[2.5rem] pb-[7.5rem] bg-secondary w-full flex justify-center">
          <div className="w-full max-w-[1120px] flex justify-between items-center">
            <Image src={logoImg} alt="logo-image" />

            {/* add modal or drawer */}
            <Button>New Transaction</Button>
          </div>
        </header>
      ) : null}
    </>
  )
}
