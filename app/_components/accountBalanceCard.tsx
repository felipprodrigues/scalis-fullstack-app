'use client'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { ArrowUpCircle } from 'lucide-react'

interface AccountBalanceCardProps {
  balanceType?: string
  balance: string
  style?: string
  isLast?: boolean
}

export default function AccountBalanceCard({
  balanceType,
  balance,
  style,
  isLast,
}: AccountBalanceCardProps) {
  return (
    <>
      <div>
        <Card className={`${style} w-full`}>
          <CardHeader className="flex justify-between flex-row items-center flex-start">
            <span className="text-sm">
              {balanceType ? balanceType : 'Balance'}
            </span>

            <ArrowUpCircle className="m-0" />
          </CardHeader>
          <CardContent>
            <strong
              className={`${
                isLast ? 'text-gray-200' : 'text-gray-700'
              } block text-4xl `}
            >
              $ {balance}
            </strong>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
