import { db } from '../_lib/prisma'
import ContentWrapper from './_components/contentWrapper'

export default async function Home() {
  const user = await db.user.findMany({})

  console.log(user, 'aqui')

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <ContentWrapper />
      </div>
    </>
  )
}
