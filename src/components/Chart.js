import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ payload, active, dataKey }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#202124',
          color: '#f1f2f3',
          border: '1px solid white',
          padding: '0 10px',
        }}
      >
        <p className='desc'>
          {payload[0].payload[dataKey]}
          {' EUR '}
          {payload[0].payload.formattedDate || payload[0].payload.time}
        </p>
      </div>
    )
  }
}

const Chart = ({ data, xAxisKey, dataKey, interval }) => {
  return (
    <ResponsiveContainer width='100%' height='50%'>
      <LineChart data={data} data-testid='line-chart'>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xAxisKey} tick={{ fill: '#aeb3b7' }} interval={interval} />
        <YAxis tick={{ fill: '#aeb3b7' }} />
        <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
        <Line
          type='monotone'
          dataKey={dataKey}
          stroke='#82ca9d'
          strokeWidth={2}
          dot={false}
          name='Balance'
          activeDot={{ stroke: '#82ca9d', strokeWidth: 10, r: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
