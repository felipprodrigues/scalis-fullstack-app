/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import useStore from '../zustand-store/store'
import { Button } from './ui/button'
import { Account, Transaction } from '@prisma/client'
import { renderTransactions } from './tableBody'

export type BankAccountProps = {
  accountId: string
  userId: string
  accountType: string
  accountNumber: string
  sourceTransaction: Transaction[]
  destinationTransaction: Transaction[]
  authorizedUserId: string
}

export default function Table({ userBankAccounts, authorizedUserId }: any) {
  const [isSelected, setIsSelected] = useState('saving')
  const [accounts, setAccounts] = useState<BankAccountProps[]>([])

  const { setUserAccounts } = useStore((store) => {
    return {
      setUserAccounts: store.setUserAccounts,
    }
  })

  // console.log(userBankAccounts, 'aqui as contas do usuário')
  // console.log(authorizedUserId, 'authorized Id')

  // const fetchAccounts = () => {
  //   const updatedAccounts = userBankAccounts
  //     .filter((account: BankAccountProps) => account.accountType === isSelected)
  //     .map((account: BankAccountProps) => {
  //       const {
  //         destinationTransaction,
  //         sourceTransaction,
  //         accountNumber,
  //         accountType,
  //       } = account

  //       const mergedTransactions = [
  //         ...destinationTransaction,
  //         ...sourceTransaction,
  //       ]

  //       return {
  //         accountNumber,
  //         accountType,
  //         transactions: mergedTransactions,
  //       }
  //     })

  //   setAccounts(updatedAccounts)
  // }

  // useEffect(() => {
  //   fetchAccounts()
  // }, [userBankAccounts, isSelected])

  // useEffect(() => {
  //   setUserAccounts(userBankAccounts)
  // }, [])

  // useEffect(() => {}, [accounts])

  console.log(accounts, 'na table')

  const tableHead = ['Source Acc', 'Dest. Acc', 'Transaction', 'Value', 'Date']

  return (
    <div className="flex flex-col gap-2 mt-10">
      <div className="flex gap-3 justify-center w-full">
        <Button
          variant={isSelected === 'saving' ? 'default' : 'outline'}
          onClick={() => setIsSelected('saving')}
        >
          Savings
        </Button>
        <Button
          variant={isSelected === 'checking' ? 'default' : 'outline'}
          onClick={() => setIsSelected('checking')}
        >
          Checking
        </Button>
      </div>

      <table className="w-full border-collapse border-spacing-x-0 mt-6 mb-20">
        <thead className="border-b-[1px] border-b-slate-200">
          <tr>
            {tableHead.map((label) => {
              return (
                <th
                  className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start"
                  key={label}
                >
                  {label}
                </th>
              )
            })}
          </tr>
        </thead>
        {/* {renderTransactions(accounts, isSelected)} */}
      </table>
    </div>
  )
}
