import differenceInDays from 'date-fns/differenceInDays'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isEqual from 'date-fns/isEqual'
import sub from 'date-fns/sub'

export const getLastMonthTransactions = (transactions, lastTransactionDate) => {
  const daysInMonth = getDaysInMonth(lastTransactionDate)
  const dateToCompare = sub(lastTransactionDate, { days: daysInMonth })
  return transactions.filter((transaction) => {
    const currentDate = new Date(transaction.date)
    return (
      (isAfter(currentDate, dateToCompare) || isEqual(currentDate, dateToCompare)) &&
      (isBefore(currentDate, lastTransactionDate) || isEqual(currentDate, lastTransactionDate))
    )
  })
}

export const getLastFiveDaysTransactions = (transactions, lastTransactionDate) => {
  return transactions.filter((transaction) => {
    const difference = differenceInDays(lastTransactionDate, new Date(transaction.date))
    return difference <= 5 && difference >= 0
  })
}

export const getLastDayTransactions = (transactions) => transactions.at(-1)

export const createChartProps = (transactions, timePeriod) => {
  const lastTransactionDate = new Date(transactions.at(-1).date)

  const defaultProps = {
    data: transactions,
    xAxisKey: 'formattedMonth',
    dataKey: 'totalBalance',
    interval: 30,
  }

  switch (timePeriod) {
    case '1D':
      return {
        data: getLastDayTransactions(transactions, lastTransactionDate).balanceByTime,
        xAxisKey: 'time',
        dataKey: 'balance',
        interval: 'preserveEnd',
      }
    case '5D':
      return {
        ...defaultProps,
        data: getLastFiveDaysTransactions(transactions, lastTransactionDate),
        xAxisKey: 'formattedDate',
        interval: 'preserveEnd',
      }
    case '1M':
      return {
        ...defaultProps,
        data: getLastMonthTransactions(transactions, lastTransactionDate),
        xAxisKey: 'formattedDate',
        interval: 1,
      }
    case '6M':
      return defaultProps
    default:
      return defaultProps
  }
}
