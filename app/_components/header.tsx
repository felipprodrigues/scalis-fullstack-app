'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import logoImg from '../assets/logo.png'
import { Button } from './ui/button'

export function Header() {
  const session = useSession()

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

            {/* add modal or drawer */}
            <Button variant="secondary">New Transaction</Button>
          </div>
        </header>
      ) : null}
    </>
  )
}
