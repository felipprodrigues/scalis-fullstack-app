'use client'

import { useSession } from 'next-auth/react'
import { LoginCard } from './loginCard'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'

import { ArrowUpCircle } from 'lucide-react'
import AccountBalanceCard from './accountBalanceCard'
import Table from '@/app/_components/table'

export default function ContentWrapper() {
  const session = useSession()

  return (
    <>
      <div className="w-full max-w-[1120px] relative">
        {session.status === 'authenticated' ? (
          <div className="absolute top-[-50px] w-full flex flex-col gap-8">
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

            <Table />
          </div>
        ) : (
          <div className="w-full max-w-[1120px] flex justify-center items-center">
            <LoginCard />
          </div>
        )}
      </div>
    </>
  )
}
