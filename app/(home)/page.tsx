import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'

import { LoginCard } from '../_components/loginCard'

import { Main } from '../_components/main'

import { Header } from '../_components/header'
import { db } from '../_lib/prisma'

async function getUserAuthorization() {
  const session = await getServerSession(authOptions)

  console.log(session, 'authOptions')

  return session
}

async function getUserBankAccounts() {
  const session = await getServerSession(authOptions)

  console.log(session, 'nah ome')

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  })

  console.log(user, 'aqui o user')

  //! clsa7asry000ifys6esq4u2g7 - usuário encontrado

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
  const userAuthorized = await getUserAuthorization()
  const accountSession = await getUserBankAccounts()

  const authorizedUserId = userAuthorized?.user.id

  const fetchIdFromBankAccount = accountSession.map((account) => account.userId)
  console.log(fetchIdFromBankAccount, 'session da conta bancária do usuário ')


  console.log(authorizedUserId, 'user autorizado ')

  return (
    <>
      <Header
        accountSession={accountSession}
        authorizedUserId={authorizedUserId}
      />
      <main className="flex justify-center items-center w-full h-full">
        {userAuthorized ? (
          <div className="w-full max-w-[1120px] relative">
            <div className="absolute top-[-50px] w-full flex flex-col gap-8">
              <Main authorizedUserId={authorizedUserId} />
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
