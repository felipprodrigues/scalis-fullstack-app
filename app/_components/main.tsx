/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-async-client-component */

import AccountBalanceCard from './accountBalanceCard'
import Table from '@/app/_components/table'

import { useSession } from 'next-auth/react'

import { useStore } from '../zustand-store/store'
import { useEffect } from 'react'
import { db } from '../_lib/prisma'
import { getServerSession } from 'next-auth'
import { GetStaticProps } from 'next'
import { getServerSideProps } from 'next/dist/build/templates/pages'
import { authOptions } from '../api/auth/[...nextauth]/route'

interface MainProps {
  accountId: string
  userId: string
  accountType: string
  accountNumber: string
}

export async function Main({ session }: any) {
  const userBankAccount = await db.bankAccount.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  console.log(userBankAccount, 'aqui')
  return (
    <>
      <div className="w-full max-w-[1120px] relative">
        <div className="absolute top-[-.5rem] w-full flex flex-col gap-8">
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

          <Table userBankAccount={userBankAccount} />
        </div>
      </div>
    </>
  )
}
