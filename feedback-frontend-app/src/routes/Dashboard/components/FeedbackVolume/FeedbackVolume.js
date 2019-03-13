import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

export default function FeedbackVolume(props) {
  FeedbackVolume.propTypes = {
    volume: PropTypes.number.isRequired,
  }

  return (
    <Card size="small" title="VOLUME" style={{ width: 100, height: 80 }}>
      <h4>{props.volume}</h4>
    </Card>
  )
}
