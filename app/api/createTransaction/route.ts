import { db } from '@/app/_lib/prisma'
import { request } from 'http'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }
  const res = await request.json()

  const { data, userAccounts, transactionType } = res

  if (
    (data.origin === 'checking' && data.destine === 'checking') ||
    (data.origin === 'saving' && data.destine === 'saving')
  ) {
    return response
      .status(400)
      .json({ error: 'You must select different bank accounts' })
  }

  if (isNaN(Number(data.value))) {
    return response.status(400).json({ error: 'It must be a number only' })
  }

  const { origin, destine } = data

  const userOriginAccount = userAccounts.find(
    (account: { accountType: any }) => account.accountType === origin
  )

  const userDestineAccount = userAccounts.find(
    (account: { accountType: any }) => account.accountType === destine
  )

  const userOriginAccountId = userOriginAccount?.accountId
  const userDestineAccountId = userDestineAccount?.accountId

  console.log(userDestineAccountId, 'conta destino')
  console.log(userDestineAccountId, 'conta origem')

  const currencyConverter = Math.trunc(Number(data.value) * 100)
  console.log(currencyConverter, 'aqui')

  if (transactionType === 'withdraw') {
    //@ WITHDRAW
    await db.transaction.create({
      data: {
        transactionAccountId: userOriginAccountId, //transaction origin
        // destinationAccountId String? // transaction destination
        amount: currencyConverter,
        transactionType,
      },
    })
  }

  if (transactionType === 'deposit') {
    //@ DEPOSIT
    await db.transaction.create({
      data: {
        // transactionAccountId: , //transaction origin
        destinationAccountId: userDestineAccountId, // transaction destination
        amount: currencyConverter,
        transactionType,
      },
    })
  }

  if (transactionType === 'transfer') {
    await db.transaction.create({
      data: {
        transactionAccountId: userOriginAccountId, //transaction origin
        destinationAccountId: userDestineAccountId, // transaction destination
        amount: currencyConverter,
        transactionType,
      },
    })
  }

  return NextResponse.json({ data: request })
}
