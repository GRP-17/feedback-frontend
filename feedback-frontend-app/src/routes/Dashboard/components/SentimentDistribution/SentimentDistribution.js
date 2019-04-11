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

export default function SentimentDistribution(props) {
  /**
   * @prop positive - the number of positive feedbacks
   * @prop negative - the number of negative feedbacks
   * @prop neutral - the number of neutral feedbacks
   */
  SentimentDistribution.propTypes = {
    positive: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
  }

  return (
    <ResponsiveContainer width="100%">
      <BarChart
        data={[
          { sentiment: 'Positive', count: props.positive },
          { sentiment: 'Neutral', count: props.neutral },
          { sentiment: 'Negative', count: props.negative },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="sentiment" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count">
          <Cell fill="#249688" />
          <Cell fill="#f8a932" />
          <Cell fill="#e74858" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
