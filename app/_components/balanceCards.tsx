import { ArrowDownCircle, ArrowUpCircle, BadgeDollarSign } from 'lucide-react'
import { Card, CardHeader, CardContent } from './ui/card'
import { Transaction } from '@prisma/client'

interface BalanceCardProps {
  cardName: string
  handleTransactions: {
    accountNumber: string
    accountType: string
    transactions: Transaction[]
  }
}

export default function BalanceCard({
  cardName,
  handleTransactions,
}: BalanceCardProps) {
  if (!handleTransactions || !handleTransactions.transactions) {
    return <div>Loading...</div>
  }

  const cardsType = ['entries', 'exit', 'balance']
  const transactions = handleTransactions.transactions

  const sum = (transactionType: string) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.transactionType === transactionType
    )
    const totalAmount = filteredTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )
    return totalAmount
  }

  const depositAmount = sum('deposit')
  const withdrawAmount = sum('withdraw')
  const balanceAmount = depositAmount - withdrawAmount

  return (
    <>
      <div>
        <span
          className={`text-xs text-gray-700 capitalize ${
            cardName === 'Checking' && 'text-gray-700'
          } `}
        >
          {' '}
          {handleTransactions.accountType} | {handleTransactions.accountNumber}
        </span>
        <div className="grid grid-cols-3 gap-8">
          {cardsType.map((type) => (
            <>
              <Card
                className={`w-full ${
                  type === 'balance' && 'text-primary-foreground bg-primary'
                }`}
              >
                <CardHeader className="flex justify-between flex-row items-center flex-start">
                  <span className="text-sm capitalize">{type}</span>

                  {type === 'entries' && (
                    <ArrowUpCircle className="m-0 text-green-500" />
                  )}
                  {type === 'exit' && (
                    <ArrowDownCircle className="m-0 text-red-500" />
                  )}
                  {type === 'balance' && <BadgeDollarSign className="m-0" />}
                </CardHeader>
                <CardContent>
                  <strong
                    className={`${
                      type === 'balance' ? 'text-gray-200' : 'text-gray-700'
                    } block text-4xl `}
                  >
                    {type === 'entries' &&
                      (depositAmount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}

                    {type === 'exit' &&
                      (withdrawAmount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}

                    {type === 'balance' &&
                      (balanceAmount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                  </strong>
                </CardContent>
              </Card>
            </>
          ))}
        </div>
      </div>
    </>
  )
}
