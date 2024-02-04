'use client'

import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import Link from 'next/link'
import { useStore } from 'zustand'
import LoginButton from './loginButton'
import { useRouter } from 'next/navigation'

export function LoginCard({ session }: any) {
  const router = useRouter()

  if (session) {
    router.push('/dashboard')
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-3">
              <Input
                id="email"
                placeholder="email@email.com"
                className="border-t-0 border-l-0  border-r-0"
              />
              <Input
                id="password"
                placeholder="*****"
                className="border-t-0  border-l-0 border-r-0"
              />
            </div>
          </div>
        </form>
        <div>
          <Link href="/">
            <p className="text-xs hover:underline cursor-pointer mt-3 text-right text-gray-500">
              Forgot password?
            </p>
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex  flex-col gap-4">
        <div className="w-full">
          <Button className="w-full" onClick={() => signIn()}>
            Sign in
          </Button>
        </div>

        <LoginButton />
      </CardFooter>
    </Card>
  )
}
