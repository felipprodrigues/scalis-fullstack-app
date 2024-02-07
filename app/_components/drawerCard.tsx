'use client'
import { z } from 'zod'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

import { RadioGroup } from '../_components/ui/radio-group'
import { Label } from '../_components/ui/label'

import { api } from '../_lib/axios'

import { useToast } from './ui/use-toast'
import { useEffect, useRef } from 'react'

const drawerInputSchema = z.object({
  origin: z.string(),
  destine: z.string(),
  value: z.string(),
})

type DrawerInputData = z.infer<typeof drawerInputSchema>

interface DrawerCardProps {
  transactionType: string
  userAccountData: any
}

const DrawerCard = ({ transactionType, userAccountData }: DrawerCardProps) => {
  const prevTransactionType = useRef(transactionType)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DrawerInputData>({
    defaultValues: {
      origin: '',
      destine: '',
      value: '',
    },
  })

  const onFormSubmit: SubmitHandler<DrawerInputData> = async (data) => {
    const dataCollection = {
      data,
      userAccounts: userAccountData.userBankAccounts,
      transactionType,
    }

    await api.post('/createTransaction', dataCollection)

    reset()

    setTimeout(() => {
      document.location.reload()
    }, 3000)
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
            {transactionType === 'deposit' && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 font-bold">To:</span>
                <RadioGroup className="flex justify-between space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="checking"
                      id="checking"
                      {...register('destine', {
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
                      {...register('destine', {
                        required: 'Please select one option',
                      })}
                    />
                    <Label htmlFor="saving">Saving</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {transactionType === 'withdraw' && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 font-bold">From:</span>
                <RadioGroup className="flex justify-between space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="checking"
                      id="checking"
                      {...register('origin', {
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
                      {...register('origin', {
                        required: 'Please select one option',
                      })}
                    />
                    <Label htmlFor="saving">Saving</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {transactionType === 'transfer' && (
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
                        value="checking"
                        id="fromChecking"
                        {...register('origin', {
                          required: 'Please select one option',
                        })}
                      />
                      <Label htmlFor="fromChecking">Checking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="saving"
                        id="fromSaving"
                        {...register('origin', {
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
                        value="checking"
                        id="toChecking"
                        {...register('destine', {
                          required: 'Please select one option',
                        })}
                      />
                      <Label htmlFor="toChecking">Checking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="saving"
                        id="toSaving"
                        {...register('destine', {
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

          <Button
            type="submit"
            className="mt-4"
            disabled={isSubmitting}
            onClick={() => {
              toast({
                title: `Success! Your ${transactionType} has been processed.`,
              })
            }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DrawerCard
