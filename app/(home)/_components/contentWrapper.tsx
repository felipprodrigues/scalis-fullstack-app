'use client'

import { useSession } from 'next-auth/react'
import { LoginCard } from './loginCard'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'

import { ArrowUpCircle } from 'lucide-react'
import AccountBalanceCard from './accountBalanceCard'

export default function ContentWrapper() {
  const session = useSession()

  return (
    <>
      <div className="w-full max-w-[1120px] relative">
        {session.status === 'authenticated' ? (
          <div className="absolute top-[-50px] w-full flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-8">
              <AccountBalanceCard
                balanceType="Saving"
                balance="80.000,00"
                style="bg-primary-foreground"
              />
              <AccountBalanceCard
                balanceType="Saving"
                balance="32.000,00"
                style="bg-primary-foreground"
              />
              <AccountBalanceCard
                balanceType="Saving"
                balance="48.000,00"
                style="text-primary-foreground bg-primary"
              />
            </div>

            <div className="grid grid-cols-3 gap-8">
              <AccountBalanceCard
                balanceType="Checking"
                balance="31.000,00"
                style="bg-primary-foreground"
              />
              <AccountBalanceCard
                balanceType="Checking"
                balance="16.000,00"
                style="bg-primary-foreground"
              />
              <AccountBalanceCard
                balanceType="Checking"
                balance="15.000,00"
                style="text-primary-foreground bg-primary"
              />
            </div>
          </div>
        ) : (
          <LoginCard />
        )}
      </div>
    </>
  )
}
