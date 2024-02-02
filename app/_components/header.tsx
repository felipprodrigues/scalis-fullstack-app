'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import logoImg from '../assets/logo.png'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'

import DrawerCard from './drawerCard'
import { useState } from 'react'

export function Header() {
  const [selectedType, setSelectedType] = useState<string | undefined>('')

  const session = useSession()

  const handleSelectTransferType = (value: string) => {
    console.log(value, 'aqui')
    // setSelectedType(() => ())
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

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm p-4">
                  <DrawerHeader className="flex gap-6 flex-col">
                    <DrawerTitle className="text-center">
                      Select a banking transaction type
                    </DrawerTitle>
                    <DrawerDescription className="gap-4 flex justify-center">
                      <Button
                        variant={
                          selectedType === 'deposit' ? 'default' : 'outline'
                        }
                        onClick={() => handleSelectTransferType('deposit')}
                      >
                        Deposit
                      </Button>
                      <Button
                        variant={
                          selectedType === 'withdrawal' ? 'default' : 'outline'
                        }
                        onClick={() => handleSelectTransferType('withdrawal')}
                      >
                        Withdrawal
                      </Button>
                      <Button
                        variant={
                          selectedType === 'transfer' ? 'default' : 'outline'
                        }
                        onClick={() => handleSelectTransferType('transfer')}
                      >
                        Transfer
                      </Button>
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="max-w-[355px] w-full p-4">
                    <DrawerCard
                      transactionType={
                        selectedType === 'transfer'
                          ? 'Transfer'
                          : selectedType === 'deposit'
                          ? 'Deposit'
                          : selectedType === 'withdrawal'
                          ? 'Withdrawal'
                          : ''
                      }
                      placeholder={
                        selectedType === 'transfer'
                          ? 'origin account'
                          : selectedType === 'deposit'
                          ? 'destination account'
                          : selectedType === 'withdrawal'
                          ? 'origin account'
                          : ''
                      }
                    />
                  </div>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
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
