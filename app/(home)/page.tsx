import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'

import { LoginCard } from '../_components/loginCard'

import { Main } from '../_components/main'

import { Header } from '../_components/header'
import { db } from '../_lib/prisma'

async function getSession() {
  const session = await getServerSession(authOptions)

  return session
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

export default async function Home() {
  const userSession = await getSession()
  const accountSession = await getUserBankAccounts()

  console.log(accountSession, 'session da home ')

  return (
    <>
      <Header accountSession={accountSession} />
      <main className="flex justify-center items-center w-full h-full">
        {userSession ? (
          <div className="w-full max-w-[1120px] relative">
            <div className="absolute top-[-50px] w-full flex flex-col gap-8">
              <Main />
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
