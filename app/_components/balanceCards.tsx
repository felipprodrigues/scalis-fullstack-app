'use client'
import React from 'react'
import AccountBalanceCard from './accountBalanceCard'
import { signOut } from 'next-auth/react'

export default function BalanceCards() {
  return (
    <>
      <div>
        <span className="text-xs text-gray-100">Saving | 1457-8</span>
        <div className="grid grid-cols-3 gap-8">
          <AccountBalanceCard
            balanceType="Entries"
            balance="80.000,00"
            style="bg-primary-foreground"
          />
          <AccountBalanceCard
            balanceType="Exit"
            balance="32.000,00"
            style="bg-primary-foreground"
          />
          <AccountBalanceCard
            balance="48.000,00"
            style="text-primary-foreground bg-primary"
            isLast
          />
        </div>
      </div>
      <button onClick={() => signOut()}>logout</button>
      <div>
        <span className="text-xs text-gray-500">Checking | 3595-8</span>
        <div className="grid grid-cols-3 gap-8">
          <AccountBalanceCard
            balanceType="Entries"
            balance="31.000,00"
            style="bg-primary-foreground"
          />
          <AccountBalanceCard
            balanceType="Exit"
            balance="16.000,00"
            style="bg-primary-foreground"
          />
          <AccountBalanceCard
            balance="15.000,00"
            style="text-primary-foreground bg-primary"
            isLast
          />
        </div>
      </div>
    </>
  )
}
