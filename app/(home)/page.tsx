import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'
import { LoginCard } from './_components/loginCard'
import PageBody from './_components/pageBody'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex justify-center items-center w-full h-full">
      {session ? (
        <PageBody />
      ) : (
        <div className="w-full max-w-[1120px] mt-8 flex justify-center items-center">
          <LoginCard />
        </div>
      )}
    </div>
  )
}
