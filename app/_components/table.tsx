/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import useStore from '../zustand-store/store'
import { Button } from './ui/button'
import { Account, BankAccount } from '@prisma/client'
import { renderTransactions } from './tableBody'

export default function Table({ userBankAccounts }: any) {
  const [isSelected, setIsSelected] = useState('saving')
  const [checkingAccount, setCheckingAccount] = useState<Account[]>([])
  const [savingAccount, setSavingAccount] = useState<Account[]>([])

  const { setUserAccounts, userAccounts } = useStore((store) => {
    return {
      setUserAccounts: store.setUserAccounts,
      userAccounts: store.userAccounts,
    }
  })

  console.log(userBankAccounts, 'aqui')

  const fetchAccounts = () => {
    setCheckingAccount([])
    setSavingAccount([])

    userBankAccounts.forEach((account) => {
      const { destinationTransaction, sourceTransaction, accountNumber } =
        account

      const mergedTransactions = [
        ...destinationTransaction,
        ...sourceTransaction,
      ]

      if (account.accountType === 'checking') {
        setCheckingAccount((prevAccounts: any) => [
          ...prevAccounts,

          { accountNumber, transactions: mergedTransactions },
        ])
      } else if (account.accountType === 'saving') {
        setSavingAccount((prevAccounts: any) => [
          ...prevAccounts,

          { accountNumber, transactions: mergedTransactions },
        ])
      }
    })
  }

  useEffect(() => {
    fetchAccounts()
  }, [userBankAccounts, isSelected])

  console.log(savingAccount, 'aqui a saving')
  console.log(checkingAccount, 'aqui a checking')

  useEffect(() => {
    setUserAccounts(userBankAccounts)
  }, [])

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

        {renderTransactions(savingAccount)}
      </table>
    </div>
  )
}
