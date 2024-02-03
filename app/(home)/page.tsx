import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'

import { authOptions } from '../api/auth/[...nextauth]/route'
import { LoginCard } from './_components/loginCard'
import PageBody from './_components/pageBody'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    const sessionId = session?.user.id

    const userClient = await db.user.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        bankAccount: {
          include: {
            destinationTransaction: true,
            sourceTransaction: true,
          },
        },
      },
    })

    console.log(session, 'aqui')

    return (
      <div className="flex justify-center items-center w-full h-full">
        {session ? (
          <PageBody userClient={userClient} />
        ) : (
          <div className="w-full max-w-[1120px] mt-8 flex justify-center items-center">
            <LoginCard />
          </div>
        )}
      </div>
    )
  }
}
