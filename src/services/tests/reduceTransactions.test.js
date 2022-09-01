import { reduceTransactions } from '../reduceTransactions'

const balance = 10000

const transactions = [
  {
    amount: 923,
    currency: 'EUR',
    date: '2022-06-30T19:11:29.911Z',
    status: 'CANCELLED',
  },
  {
    amount: -32,
    currency: 'EUR',
    date: '2022-06-30T08:12:17.084Z',
    status: 'PROCESSED',
  },
  {
    amount: 284,
    currency: 'EUR',
    date: '2022-06-29T22:05:36.126Z',
    status: 'CANCELLED',
  },
  {
    amount: 137,
    currency: 'EUR',
    date: '2022-06-29T17:12:12.153Z',
    status: 'BOOKED',
  },
  {
    amount: -870,
    currency: 'EUR',
    date: '2022-06-29T14:37:32.699Z',
    status: 'CANCELLED',
  },
]

//given an array of transactions as received from the api, previously sorted by date
//in descending order and a balance amount,
//reduces into an array of objects more comfortable to render the chart

test('reduce transactions', () => {
  expect(reduceTransactions(transactions, balance)).toStrictEqual([
    {
      date: '2022-06-29',
      formattedDate: 'Jun 29',
      formattedMonth: 'Jun 2022',
      totalBalance: 9558,
      balanceByTime: [
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
  ])
})
