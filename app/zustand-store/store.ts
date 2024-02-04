import create from 'zustand'

interface BankAccount {
  accountId: string
  userId: string
  accountType: string
  accountNumber: string
}

export interface CategoryProps {
  getUserAccount: (session: BankAccount) => void
  userAccounts: BankAccount
}

const useStore = create<CategoryProps>((set) => {
  return {
    userAccounts: null,

    getUserAccount: async (session) => {
      console.log(session, 'aqui porra')

      set({ userAccounts: session })
    },
  }
})

export default useStore
