import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

export default function PinnedIcon(props) {
  PinnedIcon.propTypes = {
    pinned: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['small', 'medium']).isRequired,
    onPinnedChanged: PropTypes.func.isRequired,
    clickable: PropTypes.bool.isRequired,
  }

  const setTheme = pinned => {
    switch (pinned) {
      case true:
        return 'filled'
      default:
        return 'twoTone'
    }
  }

  const setStyle = size => {
    switch (size) {
      case 'medium':
        return {
          fontSize: '20px',
          color: '#eb2f96',
        }
      default:
        return {
          color: '#eb2f96',
        }
    }
  }

  const icon = (
    <Icon
      type="pushpin"
      theme={setTheme(props.pinned)}
      twoToneColor="#eb2f96"
      style={setStyle(props.size)}
      onClick={() => {
        if (props.clickable) {
          props.onPinnedChanged()
        }
      }}
    />
  )

  return icon
}
