import { ArrowDownCircle, ArrowRightLeft, ArrowUpCircle } from 'lucide-react'
import {BankAccountProps} from './table'
import React from 'react'

interface Transaction {
  transactionId: string
  transactionAccountId: string
  destinationAccountId: string
  amount: number
  transactionType: 'deposit' | 'withdraw' | 'transfer'
  timestamp: Date
}

interface TransactionRowProps {
  transaction: Transaction
  getColorClass: (
    transactionType: 'deposit' | 'withdraw' | 'transfer'
  ) => string
  isSelected: string
}

export const TransactionRow = ({
  transaction,
  getColorClass,
  isSelected,
}: TransactionRowProps) => {
  return (
    <tr
      className="border-b-[1px] border-b-slate-200"
      key={transaction.transactionId}
    >
      {/* ID COLUMN*/}
      <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
        <p>{transaction.transactionId}</p>
      </td>

      {/* SOURCE ACC COLUMN*/}
      <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
        {transaction.transactionAccountId
          ? transaction.transactionAccountId
          : '---'}
      </td>

      {/* DESTINE ACC COLUMN*/}
      <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
        {transaction.destinationAccountId
          ? transaction.destinationAccountId
          : '---'}
      </td>

      {/* TRANSACTION COLUMN */}
      {isSelected && (
        <td
          className={`${getColorClass(
            transaction.transactionType
          )} px-5 py-8 bg-primary-foreground text-xs capitalize font-bold relative`}
        >
          {transaction.transactionType === 'deposit' && (
            <>
              {transaction.transactionType}{' '}
              <ArrowUpCircle
                className="text-green-500 absolute top-[42%] left-[65%] translate-[-50%, -50%]"
                size={16}
              />
            </>
          )}
          {transaction.transactionType === 'withdraw' && (
            <>
              {transaction.transactionType}{' '}
              <ArrowDownCircle
                className="text-red-500 absolute top-[42%] left-[65%] translate-[-50%, -50%]"
                size={16}
              />
            </>
          )}
          {transaction.transactionType === 'transfer' && (
            <>
              {transaction.transactionType}{' '}
              <ArrowRightLeft
                className="text-blue-500 absolute top-[42%] left-[65%] translate-[-50%, -50%]"
                size={16}
              />
            </>
          )}
        </td>
      )}

      {/* AMOUNT COLUMN */}
      <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
        {(transaction.amount / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </td>

      {/* DATE COLUMN */}
      <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
        {transaction.timestamp.toLocaleString('en-US', {
          timeZone: 'UTC',
        })}
      </td>
    </tr>
  )
}

export const renderTransactions = (
  transactions: BankAccountProps,
  isSelected: string
) => {
  const getColorClass = (
    transactionType: 'deposit' | 'withdraw' | 'transfer'
  ) => {
    const parseColors = {
      deposit: 'text-green-500',
      withdraw: 'text-red-500',
      transfer: 'text-blue-500',
    }
    return parseColors[transactionType] || ''
  }

  return (
    <tbody>
      {transactions.map((account: any) =>
        account.transactions.map((transaction: any) => (
          <TransactionRow
            key={transaction.transactionId}
            transaction={transaction}
            getColorClass={getColorClass}
            isSelected={isSelected}
          />
        ))
      )}
    </tbody>
  )
}
