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

interface CreateAccountModalProps {
  open: boolean
  handleCloseModal: () => void
  createBankAccount: () => void
  session: {
    id: string
    sessionToken: string
    userId: string
    expires: string // Date may need conversion
  }
}

export function CreateAccountModal({
  session,
  createBankAccount,
  open,
  handleCloseModal,
}: CreateAccountModalProps) {
  const { name: userName } = session?.data.user

  console.log(session, 'aqui a session')
  return (
    <div>
      <Dialog open={open} onOpenChange={handleCloseModal}>
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
