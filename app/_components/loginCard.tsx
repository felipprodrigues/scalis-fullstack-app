'use client'

import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'

export function LoginCard() {
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
          <p className="text-xs hover:underline cursor-pointer mt-3 text-right text-gray-500">
            Forgot password?
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex  flex-col gap-4">
        <div className="w-full">
          <Button className="w-full">Sign in</Button>
        </div>

        <Button variant="outline" onClick={() => signIn()}>Login with Google</Button>
      </CardFooter>
    </Card>
  )
}
