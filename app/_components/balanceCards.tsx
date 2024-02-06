'use client'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { ArrowUpCircle } from 'lucide-react'

export default function BalanceCard({ cardName }: any) {
  const cardsType = ['entries', 'exit', 'balance']

  return (
    <>
      <div>
        <span
          className={`text-xs text-gray-100 ${
            cardName === 'Checking' && 'text-gray-700'
          } `}
        >
          {' '}
          {cardName} | 1457-8
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

                  <ArrowUpCircle className="m-0" />
                </CardHeader>
                <CardContent>
                  <strong
                    className={`${
                      type === 'balance' ? 'text-gray-200' : 'text-gray-700'
                    } block text-4xl `}
                  >
                    $ 8000
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
