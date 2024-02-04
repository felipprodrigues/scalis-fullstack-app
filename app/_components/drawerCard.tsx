'use client'
import { z } from 'zod'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

import useStore from '../zustand-store/store'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '../_components/ui/select'

const drawerInputSchema = z.object({
  origin: z.string(),
  destine: z.string(),
  value: z.string(),
  accountType: z.string(),
})

type DrawerInputData = z.infer<typeof drawerInputSchema>

interface DrawerCardProps {
  transactionType: string | boolean
}

export default function DrawerCard({ transactionType }: DrawerCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DrawerInputData>()

  const { userAccounts } = useStore((store) => {
    return {
      userAccounts: store.userAccounts,
    }
  })

  // console.log(userAccounts, 'drawer component')

  const onFormSubmit: SubmitHandler<DrawerInputData> = (data) => {
    // console.log(transactionType, 'tipo')
    console.log(data, 'aqui o data')

    reset()
  }

  // console.log(session.data?.user.id, 'aqio')
  // findMany tabela bankAccounts

  // filtrar pelo userID
  // pegar os ID's das contas

  // adicionar select
  // selecionar
  //
  // iterar options

  // label - accountNumber
  // value -

  // console.log(transactionType, 'aqui')
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs text-gray-400">
          {transactionType} selected
        </CardTitle>
      </CardHeader>

      <CardContent className="">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
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
                <Select {...register('accountType')}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userAccounts &&
                        userAccounts.map((account: any) => (
                          <SelectItem
                            value={account.accountNumber}
                            key={account.accountType}
                          >
                            {account.accountType} | {account.accountNumber}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
