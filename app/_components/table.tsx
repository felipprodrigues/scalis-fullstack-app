'use client'
import React, { useEffect } from 'react'
import useStore from '../zustand-store/store'
// import { priceFormatter } from '../_utils/formatters'

export default function Table({ userBankAccount }: any) {
  const { getUserAccount, userAccounts } = useStore((store) => {
    return {
      getUserAccount: store.getUserAccount,
      userAccounts: store.userAccounts,
    }
  })

  useEffect(() => {
    getUserAccount(userBankAccount)
  }, [])
  
  console.log(userAccounts, 'aqui na table')

  const tableHead = [
    'Source Acc',
    'Dest. Acc',
    'Account Type',
    'Transfer Type',
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
      <tbody>
        <tr className="border-b-[1px] border-b-slate-200">
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
            123
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            321
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Checking
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Transfer
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            5000
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            03/25/2024
          </td>
        </tr>

        <tr className="border-b-[1px] border-b-slate-200">
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
            123
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            321
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Checking
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Transfer
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            5000
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            03/25/2024
          </td>
        </tr>
        {/* Additional rows... */}
      </tbody>
    </table>
  )
}
