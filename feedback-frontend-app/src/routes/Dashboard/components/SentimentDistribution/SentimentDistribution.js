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
   * @prop {number} positive - the number of positive feedbacks
   * @prop {number} negative - the number of negative feedbacks
   * @prop {number} neutral - the number of neutral feedbacks
   */
  SentimentDistribution.propTypes = {
    positive: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
  }

  /** Dynamically work out the width of the Y-Axis based on length of longest value */
  const min_width =
    8 +
    10 *
      Math.max(
        1,
        props.negative.toString().length,
        props.positive.toString().length,
        props.neutral.toString().length
      )

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={[
          { sentiment: 'Negative', count: props.negative },
          { sentiment: 'Neutral', count: props.neutral },
          { sentiment: 'Positive', count: props.positive },
        ]}
      >
        <CartesianGrid strokearray="3 3" vertical={false} />
        <XAxis dataKey="sentiment" />
        <YAxis width={min_width} />
        <Tooltip />
        <Bar dataKey="count">
          <Cell fill="#e74858" />
          <Cell fill="#f8a932" />
          <Cell fill="#249688" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
