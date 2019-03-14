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
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        data={[
          { rating: 'Five', count: props.count[5] },
          { rating: 'Four', count: props.count[4] },
          { rating: 'Three', count: props.count[3] },
          { rating: 'Two', count: props.count[2] },
          { rating: 'One', count: props.count[1] },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count">
          <Cell fill="#249688" />
          <Cell fill="#03cfb7" />
          <Cell fill="#f8a932" />
          <Cell fill="#ff8a70" />
          <Cell fill="#e74858" />
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
