/* eslint-disable @next/next/no-async-client-component */
'use client'

import { LoginCard } from './loginCard'

import AccountBalanceCard from './accountBalanceCard'
import Table from '@/app/_components/table'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { db } from '@/app/_lib/prisma'

interface PageContentProps {
  userClient: any
}

export default function PageBody({ userClient }: PageContentProps) {
  console.log(userClient, 'aqui')

  return (
    <>
      <div className="w-full max-w-[1120px] relative">
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
      </div>
    </>
  )
}
