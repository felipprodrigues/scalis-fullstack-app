// tableBody.tsx
import React from 'react'

export const renderTransactions = (accounts: any[]) => {
  console.log(accounts.map((account) => typeof account.accountNumber))

  return (
    <tbody>
      {accounts.map((account: any) =>
        account.transactions.map((transaction: any) => (
          <tr
            className="border-b-[1px] border-b-slate-200"
            key={transaction.transactionId}
          >
            <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
              {account.accountNUmber}
            </td>
            <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
              {account.accountNUmber}
            </td>

            <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
              {transaction.transactionType}
            </td>
            <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
              {transaction.amount}
            </td>
            <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
              {transaction.timestamp.toLocaleString()}
            </td>
          </tr>
        ))
      )}
    </tbody>
  )
}
