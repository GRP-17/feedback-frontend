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

  /** convert the date to a better format */
  const data = props.data.map(el => ({
    date: moment(el.date).format('YYYY/MM/DD'),
    volume: el.volume,
  }))

  /** Dynamically work out the width of the Y-Axis based on length of longest value */
  const value_lengths = props.data.map(e => {
    console.log(e.volume.toString().length)
    return e.volume.toString().length
  })
  const min_width = 8 + 10 * Math.max(1, ...value_lengths)


  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokearray="3" vertical={false} />
        <XAxis dataKey="date"/>
        <YAxis width={min_width}/>
        <Tooltip />
        <Line type="monotone" dataKey="volume"/>
      </LineChart>
    </ResponsiveContainer>
  )
}
