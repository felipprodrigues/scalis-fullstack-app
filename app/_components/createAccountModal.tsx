import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from './ui/dialog'
import React from 'react'
import { api } from '../_lib/axios'

export function CreateAccountModal({ session }: any) {
  const { name: userName } = session.data.user

  const createBankAccount = async () => {
    const userId = session?.data?.user.id
    // console.log(userId, 'aqui')

    try {
      await api.post('/createAccount', userId)

      // await fetch('/api/createAccount', {
      //   method: 'POST',
      //   headers: { 'Content-type': 'application/json' },
      //   body: JSON.stringify({ userId }),
      // })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-transparent text-gray-200"
            onClick={createBankAccount}
          >
            Create Bank Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome</DialogTitle>
            <DialogDescription>
              Dear {userName},
              <br />
              <br />
              <span>
                Congratulations! We are thrilled to inform you that you have
                been granted two new bank accounts with us – one for saving and
                the other for checking. This exciting development provides you
                with greater flexibility and convenience in managing your
                finances. Your saving account is designed to help you grow your
                wealth over time, while the checking account ensures easy and
                quick access to your funds for everyday transactions.
              </span>
              <br />
              <br />
              <span className="text-right w-full">
                John S. Doe <br />
                Scalis Bank Group
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
