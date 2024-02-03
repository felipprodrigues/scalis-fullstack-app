import { db } from '@/app/_lib/prisma'
import { generateRandomBankAccount } from '@/app/_utils/formatters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
    async signIn({ user }) {
      console.log(user.id, 'id 123123')

      const userBankAccounts = await db.bankAccount.findMany({
        where: {
          userId: user.id,
        },
      })

      if (!userBankAccounts.length) {
        try {
          await db.bankAccount.create({
            data: {
              userId: user.id,
              accountType: 'saving',
              accountNumber: generateRandomBankAccount(),
            },
          })

          await db.bankAccount.create({
            data: {
              userId: user.id,
              accountType: 'checking',
              accountNumber: generateRandomBankAccount(),
            },
          })

          console.log('Congratz! Now we have your soul!')
        } catch (error) {
          console.log(error, 'aqui o erro')
        }
      }

      console.log(userBankAccounts, 'sign in ')
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   return await NextAuth(req, res, handler(req, res))
// }
