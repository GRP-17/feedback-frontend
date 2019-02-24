import React from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts'
import PropTypes from 'prop-types'

function RatingPerDay(props) {
  return (
    <LineChart width={500} height={150} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Line type="monotone" dataKey="negative_count" />
    </LineChart>
  )
}

RatingPerDay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RatingPerDay
