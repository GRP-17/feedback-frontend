import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

export default function PinnedIcon(props) {
  /**
   * @prop {Boolean} pinned - a boolean that says if the Icon should be displayed as pinned or not
   * @prop {String} size - what size should the Icon be
   * @prop {func} onPinnedChanged - a function that handles what happens when the Icon is clicked (if clickable)
   * @prop {Boolean} clickable - says whether the Icon takes action on click or not.
   */
  PinnedIcon.propTypes = {
    pinned: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['small', 'medium']).isRequired,
    onPinnedChanged: PropTypes.func.isRequired,
    clickable: PropTypes.bool.isRequired,
  }

  /**
   *
   * @param {Boolean} pinned Boolean used to choose the theme
   */
  const setTheme = pinned => {
    switch (pinned) {
      case true:
        return 'filled'
      default:
        return 'twoTone'
    }
  }

  /**
   *
   * @param {String} size String variable used to choose the size to display the Icon
   */
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

  return (
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
}
