import React from 'react'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { ArrowUpCircle } from 'lucide-react'

interface AccountBalanceCardProps {
  balanceType: string
  balance: string
  style?: string
}

export default function AccountBalanceCard({
  balanceType,
  balance,
  style,
}: AccountBalanceCardProps) {
  return (
    <Card className={`${style} w-full`}>
      <CardHeader className="flex justify-between flex-row items-center flex-start">
        <span>{balanceType}</span>

        <ArrowUpCircle className="m-0" />
      </CardHeader>
      <CardContent>
        <strong className="block text-4xl">$ {balance}</strong>
      </CardContent>
    </Card>
  )
}
