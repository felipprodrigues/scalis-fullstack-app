/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-async-client-component */

import BalanceCard from './balanceCards'
import Table from '@/app/_components/table'
import { db } from '../_lib/prisma'
import { getServerSession } from 'next-auth'

interface MainProps {
  accountId: string
  userId: string
  accountType: string
  accountNumber: string
}

async function getUserBankAccounts() {
  const session = await getServerSession()

  const userBankAccounts = await db.bankAccount.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      sourceTransaction: true,
      destinationTransaction: true,
    },
  })

  return userBankAccounts
}

export async function Main() {
  const userBankAccounts = await getUserBankAccounts()

  return (
    <>
      <div className="w-full max-w-[1120px] relative">
        <div className="absolute top-[-.5rem] w-full flex flex-col gap-8">
          <BalanceCard cardName="Saving" />
          <BalanceCard cardName="Checking" />

          <Table userBankAccounts={userBankAccounts} />
        </div>
      </div>
    </>
  )
}
