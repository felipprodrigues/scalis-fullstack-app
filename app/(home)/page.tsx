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
  const session = await getUserAuthorization()

  console.log(session?.user.id, 'aqui o usuário')

  const userBankAccounts = await db.bankAccount.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      sourceTransaction: true,
      destinationTransaction: true,
    },
  })

  console.log(userBankAccounts, 'initial page - contas do usuário logado')

  return { userBankAccounts, session }
}

export default async function Home() {
  const userAuthorized = await getUserAuthorization()
  const userAccountData = await getUserBankAccounts()

  return (
    <>
      <Header
        userAccountData={userAccountData}
        authorizedUserId={userAuthorized}
      />
      <main className="flex justify-center items-center w-full h-full">
        {userAuthorized ? (
          <div className="w-full max-w-[1120px] relative">
            <div className="absolute top-[-50px] w-full flex flex-col gap-8">
              <Main
                userAccountData={userAccountData}
                authorizedUserId={userAuthorized}
              />
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
