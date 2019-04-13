import React from 'react'
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

export default function RatingPerDay(props) {
  /**
   * @prop data - an array of each day in the last month and the frequency of negative ratings
   *  date - the date
   *  volume - the number of negative ratings that day
   */
  RatingPerDay.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.number.isRequired, // timestamp
        volume: PropTypes.number.isRequired,
      })
    ).isRequired,
  }

  const data = props.data.map(el => ({
    date: moment(el.date).format('YYYY/MM/DD'),
    volume: el.volume,
  }))

  return (
    <ResponsiveContainer width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="volume" />
      </LineChart>
    </ResponsiveContainer>
  )
}
