export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const dateFormatter = (date: string) => {
  if (!date) return

  const getDate = date.split('T')[0].replace('/', '-')

  return getDate
}
