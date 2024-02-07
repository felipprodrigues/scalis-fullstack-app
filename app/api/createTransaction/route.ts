import { db } from '@/app/_lib/prisma'

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
    (account: { accountType: string }) => account.accountType === origin
  )

  const userDestineAccount = userAccounts.find(
    (account: { accountType: string }) => account.accountType === destine
  )

  const currencyConverter = Math.trunc(Number(data.value) * 100)

  if (transactionType === 'deposit') {
    try {
      await db.transaction.create({
        data: {
          destinationAccountId: userDestineAccount.accountId, //transaction destination
          amount: currencyConverter,
          transactionType,
        },
      })

      console.log(
        `sucess! deposit created at ${userDestineAccount.userId} - ${userDestineAccount.accountType}`
      )
    } catch (e) {
      console.log(e, 'erro')
    }
  }

  if (transactionType === 'withdraw') {
    //@ WITHDRAW
    try {
      await db.transaction.create({
        data: {
          transactionAccountId: userOriginAccount.accountId, // transaction origin
          amount: currencyConverter,
          transactionType,
        },
      })

      console.log(
        `sucess! withdraw created at ${userOriginAccount.userId} - ${userOriginAccount.accountType}`
      )
    } catch (error) {
      console.log(`error registering withdraw`, error)
    }
  }

  if (transactionType === 'transfer') {
    // @TRANSFER
    try {
      await db.transaction.create({
        data: {
          destinationAccountId: userDestineAccount.accountId, //transaction destination
          transactionAccountId: userOriginAccount.accountId, // transaction origin
          amount: currencyConverter,
          transactionType,
        },
      })

      console.log(
        `sucess! transfer created at ${userOriginAccount.userId} - account ${userDestineAccount.accountType} and ${userOriginAccount.accountType}`
      )
    } catch (error) {
      console.log(`error registering withdraw`, error)
    }
  }

  return NextResponse.json({ data: request })
}
