import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Chart from './components/Chart'
import { reduceTransactions } from './services/reduceTransactions'
import { createChartProps } from './services/createChartProps'
import './App.css'

const apiUrl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

const filters = ['1D', '5D', '1M', '6M']

function App() {
  const [transactions, setTransactions] = useState(null)
  const [balance, setBalance] = useState(null)
  const [chartProps, setChartProps] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('6M')

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(`${apiUrl}/balances`, {
        headers: {
          Authorization: apiKey,
        },
      })
      return response.data
    }
    const fetchTransactions = async () => {
      const response = await axios.get(`${apiUrl}/transactions`, {
        headers: {
          Authorization: apiKey,
        },
      })
      return response.data.transactions.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    }

    fetchBalance().then((balance) => {
      fetchTransactions().then((transactions) => {
        const reducedTransactions = reduceTransactions(transactions, balance.amount)
        setTransactions(reducedTransactions)
        setChartProps(createChartProps(reducedTransactions))
        setBalance(balance)
      })
    })
  }, [])

  const applyFilter = (filter) => {
    setChartProps(createChartProps(transactions, filter))
    setSelectedFilter(filter)
  }

  return (
    <div className='container'>
      {balance && (
        <h1 className='balance'>
          {balance.amount} <span className='currency'>{balance.currency}</span>
        </h1>
      )}
      <ul>
        {filters.map((filter) => (
          <li key={filter}>
            <button
              onClick={() => applyFilter(filter)}
              className={`${selectedFilter === filter ? 'selected' : ''}`}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
      {transactions && chartProps && <Chart {...chartProps} />}
    </div>
  )
}

export default App
