import React from 'react'
import CountUp from 'react-countup'
import PropTypes from 'prop-types'

export default function VolumeStats(props) {
  const [prevPrevProps, setPrevPrevProps] = React.useState({
    volume: 0,
    avgRating: 0,
  })
  const [prevProps, setPrevProps] = React.useState(prevPrevProps)

  React.useEffect(() => {
    setPrevPrevProps(prevProps)
    setPrevProps(props)
  }, [props.volume, props.avgRating])

  return (
    <span style={{ color: '#ccc' }}>
      <span style={{ marginRight: 15 }}>
        Volume:{' '}
        <CountUp
          style={{ fontSize: 20 }}
          start={prevPrevProps.volume}
          end={props.volume}
          duration={2}
        />
      </span>
      <span>
        Avg Rating:{' '}
        <CountUp
          style={{ fontSize: 20 }}
          start={prevPrevProps.avgRating}
          end={props.avgRating}
          decimals={2}
          duration={2}
        />
      </span>
    </span>
  )
}

VolumeStats.propTypes = {
  volume: PropTypes.number,
  avgRating: PropTypes.number,
}
