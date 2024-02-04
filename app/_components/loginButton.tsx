'use client'

import { signIn } from 'next-auth/react'
import { Button } from './ui/button'

export default function LoginButton() {
  const handleLoginClick = async () => {
    await signIn()
  }

  return (
    <Button variant="outline" onClick={handleLoginClick}>
      Login with Google
    </Button>
  )
}
