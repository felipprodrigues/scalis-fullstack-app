/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Transaction } from '@prisma/client'
import { renderTransactions } from './tableBody'
import { UserAccountData } from '../(home)/page'

// export interface BankAccountProps {
//   accountId: string
//   userId: string
//   accountType: string
//   accountNumber: string
//   sourceTransaction: Transaction[]
//   destinationTransaction: Transaction[]
// }

// interface AccountObject {
//   accountNumber: string
//   accountType: string
//   transactions: Transaction
// }
// interface TableProps {
//   userAccountData: UserAccountData
//   setHandleTransactions: (obj: AccountObject[]) => void
//   isSelected: string
// }

export default function Table({
  userAccountData,
  setHandleTransactions,
  isSelected,
}: any) {
  const [transactions, setTransactions] = useState([])

  console.log(userAccountData.userBankAccounts, 'aqui')

  const fetchAccounts = () => {
    const updatedAccounts = userAccountData.userBankAccounts
      .filter((account) => account.accountType === isSelected)
      .map((account) => {
        const {
          destinationTransaction,
          sourceTransaction,
          accountNumber,
          accountType,
        } = account

        const mergedTransactions: Transaction[] = [
          ...destinationTransaction,
          ...sourceTransaction,
        ]

        const accountObject = {
          accountNumber,
          accountType,
          transactions: mergedTransactions,
        }

        setHandleTransactions(accountObject)

        return accountObject
      })

    setTransactions(updatedAccounts)
  }

  useEffect(() => {
    fetchAccounts()
  }, [userAccountData, isSelected])

  useEffect(() => {}, [transactions])

  const tableHead = [
    'Transaction id',
    'Origin Acc',
    'Dest. Acc',
    'Transaction',
    'Value',
    'Date',
  ]

  return (
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
      {renderTransactions(transactions, isSelected)}
    </table>
  )
}
