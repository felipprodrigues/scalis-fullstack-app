import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'

import { LoginCard } from '../_components/loginCard'

import { Main } from '../_components/main'
import { db } from '../_lib/prisma'

async function getSession() {
  const session = await getServerSession(authOptions)

  return session
}

export default async function Home() {
  const session = await getSession()

  console.log(session, 'aqui a session')

  return (
    <>
      <main className="flex justify-center items-center w-full h-full">
        {session ? (
          <div className="w-full max-w-[1120px] relative">
            <div className="absolute top-[-50px] w-full flex flex-col gap-8">
              <Main session={session} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[1120px] mt-8 flex justify-center items-center">
            <LoginCard session={session} />
          </div>
        )}
      </main>
    </>
  )
}
