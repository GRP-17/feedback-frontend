import React from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip } from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

function RatingPerDay(props) {
  const data = props.data.map(el => ({
    date: moment(el.date).format('YYYY/MM/DD'),
    volume: el.volume,
  }))

  return (
    <LineChart width={500} height={150} data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="volume" />
    </LineChart>
  )
}

RatingPerDay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RatingPerDay
