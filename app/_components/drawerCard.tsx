import { z } from 'zod'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { db } from '../_lib/prisma'
import { useSession } from 'next-auth/react'

const drawerInputSchema = z.object({
  origin: z.string(),
  destine: z.string(),
  value: z.string(),
})

type DrawerInputData = z.infer<typeof drawerInputSchema>

interface DrawerCardProps {
  transactionType: string | boolean
}

export default function DrawerCard({ transactionType }: DrawerCardProps) {
  const [bankAccounts, setBankAccounts] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DrawerInputData>()

  const onSubmit: SubmitHandler<DrawerInputData> = (data) => {
    console.log(transactionType, 'tipo')
    console.log(data, 'aqui o data')

    reset()
  }

  const session = useSession()

  console.log(session.data?.user.id, 'aqio')
  // findMany tabela bankAccounts
  const fetchBankAccounts = async () => {
    const dbUserBankAccount = await db.bankAccount.findMany({
      where: {
        userId: session.data?.user.id,
      },
    })

    setBankAccounts(dbUserBankAccount as any)
  }

  useEffect(() => {
    fetchBankAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(bankAccounts, 'aqui as contas')
  }, [bankAccounts])

  // filtrar pelo userID
  // pegar os ID's das contas

  // adicionar select
  // selecionar
  //
  // iterar options

  // label - accountNumber
  // value -

  console.log(transactionType, 'aqui')
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs text-gray-400">
          {transactionType} selected
        </CardTitle>
      </CardHeader>

      <CardContent className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  justify-between h-full"
        >
          <div className="grid w-full items-center gap-4 p-0">
            {transactionType === 'Transfer' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="origin account"
                    {...register('origin', { required: true })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="destination account"
                    {...register('destine', { required: true })}
                  />
                </div>
              </>
            )}

            {transactionType === 'Deposit' && (
              <div className="flex flex-col space-y-1.5">
                <Input
                  placeholder="destination account"
                  {...register('destine', { required: true })}
                />
                <select name="select">
                  {/* {bankAccounts.map((bankAccount: any) => ({
                    <option value=""></option>
                    // <option value={bankAccount.id}>
                    //   {bankAccount.accountNumber}
                    // </option>
                  }))} */}
                </select>
              </div>
            )}

            {transactionType === 'Withdraw' && (
              <div className="flex flex-col space-y-1.5">
                <Input
                  placeholder="origin account"
                  {...register('origin', { required: true })}
                />
              </div>
            )}

            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="value"
                {...register('value', { required: true })}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
