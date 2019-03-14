import React from 'react'
import { Card, Typography } from 'antd'
import PropTypes from 'prop-types'

const { Title } = Typography

export default function FeedbackVolume(props) {
  FeedbackVolume.propTypes = {
    volume: PropTypes.number.isRequired,
  }

  return (
    <Card size="small" title="VOLUME">
      <Title level={4}>{props.volume}</Title>
    </Card>
  )
}
