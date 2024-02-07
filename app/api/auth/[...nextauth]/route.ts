import { db } from '@/app/_lib/prisma'
// import { generateRandomBankAccount } from '@/app/_utils/formatters'
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
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = token.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      if (user) {
        session.user.id = user.id
        token
        user
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   return await NextAuth(req, res, handler(req, res))
// }
