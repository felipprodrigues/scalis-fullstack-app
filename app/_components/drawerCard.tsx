'use client'
import { z } from 'zod'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

import useStore from '../zustand-store/store'

import { RadioGroup } from '../_components/ui/radio-group'
import { Label } from '../_components/ui/label'

const drawerInputSchema = z.object({
  origin: z.string(),
  destine: z.string(),
  value: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Value must be a number',
  }),
  depositTo: z.string(),
  withdrawalFrom: z.string(),
  transferFrom: z.string(),
  transferTo: z.string(),
})

type DrawerInputData = z.infer<typeof drawerInputSchema>

interface DrawerCardProps {
  transactionType: string | boolean
}

const DrawerCard = ({ transactionType }: DrawerCardProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DrawerInputData>({
    defaultValues: {
      origin: '',
      destine: '',
      value: '',
      depositTo: '',
      withdrawalFrom: '',
      transferFrom: '',
      transferTo: '',
    },
  })

  const { userAccounts } = useStore((store) => {
    return {
      userAccounts: store.userAccounts,
    }
  })

  const onFormSubmit: SubmitHandler<DrawerInputData> = (data) => {
    if (
      (data.transferFrom === 'fromChecking' &&
        data.transferTo === 'toChecking') ||
      (data.transferFrom === 'fromSaving' && data.transferTo === 'toSaving')
    ) {
      alert('You must select different bank accounts')
      return
    }

    if (isNaN(Number(data.value))) {
      alert('It must be a number only')
      return
    }

    console.log(data, 'aqui')
    reset()
  }

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
            {transactionType === 'Deposit' && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 font-bold">To:</span>
                <RadioGroup className="flex justify-between space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="checking"
                      id="checking"
                      {...register('depositTo', {
                        required: 'Please select one option',
                      })}
                    />
                    <Label htmlFor="checking">Checking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="saving"
                      id="saving"
                      {...register('depositTo', {
                        required: 'Please select one option',
                      })}
                    />
                    <Label htmlFor="saving">Saving</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {transactionType === 'Withdraw' && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 font-bold">From:</span>
                <RadioGroup className="flex justify-between space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="checking"
                      id="checking"
                      {...register('withdrawalFrom', {
                        required: 'Please select one option',
                      })}
                    />
                    <Label htmlFor="checking">Checking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="saving"
                      id="saving"
                      {...register('withdrawalFrom', {
                        required: 'Please select one option',
                      })}
                    />
                    <Label htmlFor="saving">Saving</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {transactionType === 'Transfer' && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500 font-bold">From:</span>
                  <RadioGroup
                    defaultValue="option-one"
                    className="flex justify-between space-y-1.5"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="fromChecking"
                        id="fromChecking"
                        {...register('transferFrom', {
                          required: 'Please select one option',
                        })}
                      />
                      <Label htmlFor="fromChecking">Checking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="fromSaving"
                        id="fromSaving"
                        {...register('transferFrom', {
                          required: 'Please select one option',
                        })}
                      />
                      <Label htmlFor="fromSaving">Saving</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500 font-bold">To:</span>
                  <RadioGroup
                    defaultValue="option-one"
                    className="flex justify-between space-y-1.5"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="toChecking"
                        id="toChecking"
                        {...register('transferTo', {
                          required: 'Please select one option',
                        })}
                      />
                      <Label htmlFor="toChecking">Checking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="toSaving"
                        id="toSaving"
                        {...register('transferTo', {
                          required: 'Please select one option',
                        })}
                      />
                      <Label htmlFor="toSaving">Saving</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="value"
                {...register('value', { required: true })}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DrawerCard
