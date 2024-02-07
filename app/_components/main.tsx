/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-async-client-component */

import BalanceCard from './balanceCards'
import Table from '@/app/_components/table'

interface MainProps {
  userAccountData: any
  authorizedUserId: any
}

export async function Main({ userAccountData, authorizedUserId }: MainProps) {
  return (
    <>
      <div className="w-full max-w-[1120px] relative">
        <div className="absolute top-[-.5rem] w-full flex flex-col gap-8">
          <BalanceCard cardName="Saving" />
          <BalanceCard cardName="Checking" />

          <Table
            userAccountData={userAccountData}
            authorizedUserId={authorizedUserId}
          />
        </div>
      </div>
    </>
  )
}
