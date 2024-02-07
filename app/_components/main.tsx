/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-async-client-component */
'use client'

import { useState } from 'react'
import BalanceCard from './balanceCards'
import Table from '@/app/_components/table'
import { Button } from './ui/button'
import { Transaction } from '@prisma/client'
import { UserAccountData } from '../(home)/page'

export function Main({
  userAccountData,
}: {
  userAccountData: UserAccountData
}) {
  const [handleTransactions, setHandleTransactions] = useState<{
    accountNumber: string
    accountType: string
    transactions: Transaction[]
  }>({
    accountNumber: '',
    accountType: '',
    transactions: [],
  })
  const [isSelected, setIsSelected] = useState('saving')

  return (
    <>
      <div className="w-full max-w-[1120px] relative">
        <div className="flex gap-3 justify-center w-full">
          <Button
            variant="outline"
            className={
              isSelected === 'saving'
                ? 'bg-white text-gray-700 border-b-primary border-b-4'
                : 'opacity-50 text-white bg-slate-500'
            }
            onClick={() => setIsSelected('saving')}
          >
            Savings
          </Button>
          <Button
            variant="outline"
            className={
              isSelected === 'checking'
                ? 'bg-white text-gray-700 border-b-primary border-b-4'
                : 'opacity-50 text-white bg-slate-500'
            }
            onClick={() => setIsSelected('checking')}
          >
            Checking
          </Button>
        </div>

        <div className=" w-full flex flex-col gap-8">
          <BalanceCard
            cardName={isSelected}
            handleTransactions={handleTransactions}
          />

          <Table
            userAccountData={userAccountData}
            setHandleTransactions={setHandleTransactions}
            isSelected={isSelected}
          />
        </div>
      </div>
    </>
  )
}
