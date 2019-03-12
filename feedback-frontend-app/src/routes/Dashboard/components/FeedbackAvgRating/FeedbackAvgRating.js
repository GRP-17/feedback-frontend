import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

export default function FeedbackAvgRating(props) {
  FeedbackAvgRating.propTypes = {
    avgrating: PropTypes.number.isRequired,
  }

  return (
    <Card size="small" title="AvgRating" style={{ width: 100, height: 100 }}>
      <h4>{props.avgrating}</h4>
    </Card>
  )
}
