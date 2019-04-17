import React from 'react'
import { Card, Typography } from 'antd'
import PropTypes from 'prop-types'

const { Title } = Typography

export default function FeedbackAvgRating(props) {
  /**
   * @prop {number} avgrating - the average rating to display
   */
  FeedbackAvgRating.propTypes = {
    avgrating: PropTypes.number.isRequired,
  }

  return (
    <Card size="small" title="AVG RATING">
      <Title level={4}>{props.avgrating}</Title>
    </Card>
  )
}
