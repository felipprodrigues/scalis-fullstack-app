import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'
import ContentWrapper from './_components/contentWrapper'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const users = await db.user.findMany({})
  const session = await getServerSession(authOptions)
  const sessionId = session?.user.id

  const createBankAccount = await db.user.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      bankAccount: true,
    },
  })

  console.log(createBankAccount, 'aqui o console')

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <ContentWrapper users={users} />
      </div>
    </>
  )
}
