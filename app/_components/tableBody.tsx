import { ArrowDownCircle, ArrowRightLeft, ArrowUpCircle } from 'lucide-react'
import BankAccountProps from './table'
import React from 'react'

export const TransactionRow = ({
  account,
  transaction,
  getColorClass,
  isSelected,
}: any) => (
  <tr
    className="border-b-[1px] border-b-slate-200"
    key={transaction.transactionId}
  >
    {/* SOURCE ACC COLUMN*/}
    <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
      {transaction.transactionType === 'withdraw'
        ? account.accountNumber
        : '---'}
      {transaction.transactionType === 'transaction' && 'conta origem'}
    </td>

    {/* DESTINE ACC COLUMN*/}
    <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
      {transaction.transactionType === 'deposit'
        ? account.accountNumber
        : '---'}

      {transaction.transactionType === 'transaction' && 'conta destino'}
    </td>

    {/* TRANSACTION COLUMN */}
    {isSelected && (
      <td
        className={`${getColorClass(
          transaction.transactionType
        )} bold px-5 flex gap-2 items-center font-bold py-8 bg-primary-foreground text-xs text-gray-500 capitalize`}
      >
        {transaction.transactionType === 'deposit' && (
          <>
            {transaction.transactionType}{' '}
            <ArrowUpCircle className="text-green-500" size={14} />
          </>
        )}
        {transaction.transactionType === 'withdraw' && (
          <>
            {transaction.transactionType}{' '}
            <ArrowDownCircle className="text-red-500" size={14} />
          </>
        )}
        {transaction.transactionType === 'transfer' && (
          <>
            {transaction.transactionType}{' '}
            <ArrowRightLeft className="text-blue-500" size={14} />
          </>
        )}
      </td>
    )}

    {/* VALUE COLUMN */}
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

export const renderTransactions = (
  accounts: (typeof BankAccountProps)[],
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

  console.log(
    accounts.map((account) => account),
    'aqui as table'
  )

  return (
    <tbody>
      {accounts.map((account: any) =>
        account.transactions.map((transaction: any) => (
          <TransactionRow
            key={transaction.transactionId}
            account={account}
            transaction={transaction}
            getColorClass={getColorClass}
            isSelected={isSelected}
          />
        ))
      )}
    </tbody>
  )
}
