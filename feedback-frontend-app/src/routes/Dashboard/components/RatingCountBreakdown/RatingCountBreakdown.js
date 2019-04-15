import React from 'react'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import PropTypes from 'prop-types'

export default function RatingCountBreakdown(props) {


  /** Dynamically work out the width of the Y-Axis based on length of longest value */
  const value_lengths = Object.keys(props.count).map(e => {
    return props.count[e].toString().length
  })
  const min_width = 8 + 10 * Math.max(1, ...value_lengths)

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={[
          { rating: 'One', count: props.count[1] },
          { rating: 'Two', count: props.count[2] },
          { rating: 'Three', count: props.count[3] },
          { rating: 'Four', count: props.count[4] },
          { rating: 'Five', count: props.count[5] },
        ]}
      >
        <CartesianGrid strokearray="3 3" vertical={false} />
        <XAxis dataKey="rating"/>
        <YAxis width={min_width}/>
        <Tooltip />
        <Bar dataKey="count">
          <Cell fill="#e74858" />
          <Cell fill="#ff8a70" />
          <Cell fill="#f8a932" />
          <Cell fill="#03cfb7" />
          <Cell fill="#249688"/>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

RatingCountBreakdown.propTypes = {
  count: PropTypes.shape({
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
  }),
}
