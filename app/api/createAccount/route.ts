import { db } from '@/app/_lib/prisma'
import { generateRandomBankAccount } from '@/app/_utils/formatters'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(request: NextApiRequest) {
  // if (request.method !== 'POST') {
  //   return response.status(405).end()
  // }
  const res = await request.json()

  // console.log(res, 'aqui o res da nova requisição')
  const userId = res
  console.log(userId, 'id do usuário para criação de conta')

  const userBankAccounts = await db.bankAccount.findMany({
    where: {
      userId,
    },
  })

  if (!userBankAccounts.length) {
    try {
      await db.bankAccount.create({
        data: {
          userId,
          accountType: 'saving',
          accountNumber: generateRandomBankAccount(),
        },
      })

      await db.bankAccount.create({
        data: {
          userId,
          accountType: 'checking',
          accountNumber: generateRandomBankAccount(),
        },
      })
    } catch (error) {
      console.log(error, 'error redirecting user')
    }
  }

  return NextResponse.json({ data: request })
}
