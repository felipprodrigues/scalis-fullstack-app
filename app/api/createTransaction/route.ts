import { db } from '@/app/_lib/prisma'
import { request } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { resolve } from 'path/win32'

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }
  const res = await request.json()

  const { data, userAccounts, transactionType } = res
  console.log(data)
  console.log(userAccounts)
  console.log(transactionType)

  if (
    (data.origin === 'fromChecking' && data.destine === 'toChecking') ||
    (data.origin === 'fromSaving' && data.destine === 'toSaving')
  ) {
    return response
      .status(400)
      .json({ error: 'You must select different bank accounts' })
  }

  if (isNaN(Number(data.value))) {
    return response.status(400).json({ error: 'It must be a number only' })
  }

  const { origin, destine } = data

  // console.log(userAccounts, 'aqui as contas')

  const userOriginAccount = userAccounts.find(
    (account: { accountType: any }) => account.accountType === origin
  )

  const userDestineAccount = userAccounts.find(
    (account: { accountType: any }) => account.accountType === destine
  )

  const userOriginAccountId = userOriginAccount?.accountId
  const userDestineAccountId = userDestineAccount?.accountId
  // console.log(userOriginAccountId)
  console.log(userDestineAccountId)

  const currencyConverter = Math.trunc(Number(data.value) * 100)
  console.log(currencyConverter, 'aqui')

  if (transactionType === 'withdraw') {
    //@ WITHDRAW
    await db.transaction.create({
      data: {
        transactionAccountId: userOriginAccountId,
        // destinationAccountId String? // destino da transação
        amount: currencyConverter,
        transactionType,
      },
    })
  }

  if (transactionType === 'deposit')
    //@ DEPOSIT
    // console.log(userDestineAccount, 'depoisto do useraccount')

    await db.transaction.create({
      data: {
        // transactionAccountId: ,
        destinationAccountId: userDestineAccountId, // destino da transação
        amount: currencyConverter,
        transactionType,
      },
    })

    if (transactionType === 'deposit') {
      
    }
      return NextResponse.json({ data: request })
}
