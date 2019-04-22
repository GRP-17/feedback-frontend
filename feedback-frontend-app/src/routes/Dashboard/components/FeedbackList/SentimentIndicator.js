import React from 'react'
import PropTypes from 'prop-types'

export default function SentimentIndicator(props) {
  const sentiment2color = {
    POSITIVE: '#2b9588',
    NEUTRAL: '#eee',
    NEGATIVE: '#e44a5b',
  }

  return (
    <div
      style={{
        backgroundColor: sentiment2color[props.sentiment],
        height: 10,
        width: 10,
        borderRadius: '50%',
        marginRight: 5,
        display: 'inline-block',
      }}
    />
  )
}

SentimentIndicator.protoType = {
  sentiment: PropTypes.string.isRequired,
}

SentimentIndicator.defaultProps = {
  sentiment: 'NEUTRAL',
}
