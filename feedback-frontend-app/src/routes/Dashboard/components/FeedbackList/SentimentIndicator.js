import React from 'react'
import PropTypes from 'prop-types'

export default function SentimentIndicator(props) {
  const sentiment2color = {
    POSITIVE: '#2b9588',
    NEUTRAL: '#f8a932',
    NEGATIVE: '#e44a5b',
  }

  return (
    <span>
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
      {props.withText && props.sentiment}
    </span>
  )
}

SentimentIndicator.protoType = {
  sentiment: PropTypes.string.isRequired,
  withText: PropTypes.bool,
}

SentimentIndicator.defaultProps = {
  sentiment: 'NEUTRAL',
  withText: false,
}
