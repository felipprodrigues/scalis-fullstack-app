import { Adapter } from 'next-auth/adapters'
import { db } from '../prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  console.log(req, res, 'aqui os dadoss')
  const users = await db.user.findMany()

  return {
    // async createUser(user) {
    // },
  }
}
