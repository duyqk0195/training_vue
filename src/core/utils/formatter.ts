export const formatCurrency = (value: number, currency: string = 'VND') => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value)
}
