import format from 'date-fns/format'

export const reduceTransactions = (transactions, balance) => {
  let currentBalance = balance
  return transactions.reduce((acc, transaction) => {
    const date = transaction.date.substring(0, 10)
    const time = transaction.date.substring(11, 19)
    const formattedDate = format(new Date(date), 'LLL d')
    const formattedMonth = format(new Date(date), 'MMM yyyy')
    let transactionBalance = currentBalance - transaction.amount
    currentBalance = transactionBalance

    if (acc[0] && acc[0].date === date) {
      let currDay = acc[0]
      acc[0] = {
        ...currDay,
        totalBalance: transactionBalance,
        balanceByTime: [
          { time, balance: transactionBalance, amount: transaction.amount },
          ...currDay.balanceByTime,
        ],
      }
    } else {
      acc.unshift({
        date,
        formattedDate,
        formattedMonth,
        totalBalance: transactionBalance,
        balanceByTime: [{ time, balance: transactionBalance, amount: transaction.amount }],
      })
    }

    return acc
  }, [])
}
