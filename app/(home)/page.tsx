import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { db } from '../_lib/prisma'
import { LoginCard } from '../_components/loginCard'
import { Main } from '../_components/main'
import { Header } from '../_components/header'
import { Session } from '@prisma/client'

interface Transaction {
  transactionId: string
  transactionAccountId: string | null
  destinationAccountId: string | null
  amount: number
  transactionType: string
  timestamp: Date
}

export interface UserAccountData {
  userBankAccounts: {
    sourceTransaction: Transaction[]
    destinationTransaction: Transaction[]
  }[]
  session: Session | null
}

async function getUserAuthorization() {
  const session = await getServerSession(authOptions)

  return session
}

async function getUserBankAccounts(): Promise<UserAccountData> {
  const session = await getUserAuthorization()

  const userBankAccounts = await db.bankAccount.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      sourceTransaction: true,
      destinationTransaction: true,
    },
  })

  return { userBankAccounts, session }
}

export default async function Home() {
  const userAuthorized = await getUserAuthorization()
  const userAccountData = await getUserBankAccounts()

  return (
    <>
      <Header userAccountData={userAccountData} />
      <main className="flex justify-center items-center w-full h-full">
        {userAuthorized ? (
          <div className="w-full max-w-[1120px] relative">
            <div className="absolute top-[-1.25rem] w-full flex flex-col gap-8">
              <Main userAccountData={userAccountData} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[1120px] mt-8 flex justify-center items-center">
            <LoginCard />
          </div>
        )}
      </main>
    </>
  )
}
