import { Input } from './ui/input'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

interface DrawerCardProps {
  transactionType: string | boolean
  placeholder: string
}

export default function DrawerCard({
  transactionType,
  placeholder,
}: DrawerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs text-gray-400">
          {transactionType} selected
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {transactionType === 'Transfer' ? (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Input id="destination" placeholder={placeholder} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="bankAccount" placeholder="destination account" />
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-1.5">
                <Input id="bankAccount" placeholder={placeholder} />
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Input id="currency" placeholder="value here" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
