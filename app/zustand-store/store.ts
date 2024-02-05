import create from 'zustand'

interface BankAccount {
  accountId: string
  userId: string
  accountType: string
  accountNumber: string
}

export interface CategoryProps {
  setUserAccounts: (bankAccounts: BankAccount[]) => void
  userAccounts: BankAccount[]
}

const useStore = create<CategoryProps>((set) => {
  return {
    userAccounts: [],

    setUserAccounts: async (bankAccounts) => {
      console.log(bankAccounts, 'session from zustand here')

      set({ userAccounts: bankAccounts })
    },
  }
})

export default useStore
