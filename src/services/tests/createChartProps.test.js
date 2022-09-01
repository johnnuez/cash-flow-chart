import {
  createChartProps,
  getLastDayTransactions,
  getLastFiveDaysTransactions,
  getLastMonthTransactions,
} from '../createChartProps'

const transactions = [
  {
    date: '2022-05-28',
    formattedDate: 'Jun 28',
    formattedMonth: 'Jun 2022',
    totalBalance: 9991,
    balanceByTime: [
      {
        time: '06:00:03',
        balance: 9991,
        amount: -511,
      },
      {
        time: '06:02:10',
        balance: 9480,
        amount: 989,
      },
      {
        time: '09:05:51',
        balance: 10469,
        amount: 372,
      },
      {
        time: '10:16:42',
        balance: 10841,
        amount: -933,
      },
      {
        time: '11:45:38',
        balance: 9908,
        amount: -53,
      },
      {
        time: '12:03:32',
        balance: 9855,
        amount: -312,
      },
    ],
  },
  {
    date: '2022-06-29',
    formattedDate: 'Jun 29',
    formattedMonth: 'Jun 2022',
    totalBalance: 9543,
    balanceByTime: [
      {
        time: '02:16:18',
        balance: 9543,
        amount: 3,
      },
      {
        time: '04:56:32',
        balance: 9546,
        amount: 287,
      },
      {
        time: '07:34:21',
        balance: 9833,
        amount: -70,
      },
      {
        time: '11:12:12',
        balance: 9763,
        amount: -205,
      },
      {
        time: '14:37:32',
        balance: 9558,
        amount: -870,
      },
      {
        time: '17:12:12',
        balance: 8688,
        amount: 137,
      },
      {
        time: '22:05:36',
        balance: 8825,
        amount: 284,
      },
    ],
  },
  {
    date: '2022-06-30',
    formattedDate: 'Jun 30',
    formattedMonth: 'Jun 2022',
    totalBalance: 9109,
    balanceByTime: [
      {
        time: '08:12:17',
        balance: 9109,
        amount: -32,
      },
      {
        time: '19:11:29',
        balance: 9077,
        amount: 923,
      },
    ],
  },
]

//given sorted array by date in descending order
test('get last day transaction', () => {
  expect(getLastDayTransactions(transactions)).toBe(transactions[transactions.length - 1])
})

//given sorted array by date in descending order and a date to compare
test('get last 5 days transactions, date 30/06', () => {
  expect(getLastFiveDaysTransactions(transactions, new Date('2022-06-30'))).toStrictEqual([
    transactions[1],
    transactions[2],
  ])
})

test('get last 5 days transactions date 29/06', () => {
  expect(getLastFiveDaysTransactions(transactions, new Date('2022-06-29'))).toStrictEqual([
    transactions[1],
  ])
})

//given sorted array by date in descending order and a date to compare
test('get last month transactions date 30/06', () => {
  expect(getLastMonthTransactions(transactions, new Date('2022-06-30'))).toStrictEqual([
    transactions[1],
    transactions[2],
  ])
})

test('get last month transactions date 30/05', () => {
  expect(getLastMonthTransactions(transactions, new Date('2022-05-29'))).toStrictEqual([
    transactions[0],
  ])
})

test('create chart props 1D', () => {
  expect(createChartProps(transactions, '1D')).toStrictEqual({
    data: transactions[transactions.length - 1].balanceByTime,
    xAxisKey: 'time',
    dataKey: 'balance',
    interval: 'preserveEnd',
  })
})

test('create chart props 5D', () => {
  expect(createChartProps(transactions, '5D')).toStrictEqual({
    data: [transactions[1], transactions[2]],
    xAxisKey: 'formattedDate',
    dataKey: 'totalBalance',
    interval: 'preserveEnd',
  })
})

test('create chart props 6M', () => {
  expect(createChartProps(transactions, '6M')).toStrictEqual({
    data: transactions,
    xAxisKey: 'formattedMonth',
    dataKey: 'totalBalance',
    interval: 30,
  })
})
