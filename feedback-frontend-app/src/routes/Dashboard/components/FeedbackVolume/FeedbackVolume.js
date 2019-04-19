import React from 'react'
import { Card, Typography } from 'antd'
import PropTypes from 'prop-types'

const { Title } = Typography

export default function FeedbackVolume(props) {
  /**
   * @prop volume - the volume of feedbacks in total
   */
  FeedbackVolume.propTypes = {
    volume: PropTypes.number.isRequired,
  }

  return (
    <Card size="small" title="VOLUME">
      <Title level={4}>{props.volume}</Title>
    </Card>
  )
}
