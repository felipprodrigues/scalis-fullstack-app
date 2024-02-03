export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const dateFormatter = (date: string) => {
  if (!date) return

  const getDate = date.split('T')[0].replace('/', '-')

  return getDate
}

export const generateRandomBankAccount = () => {
  const max = 9

  let result = []

  for (let i = 1; i <= 12; i++) {
    const random = Math.floor(Math.random() * max)

    result[i] = random
  }

  return result.join('').toString()
}
