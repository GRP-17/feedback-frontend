import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

export default function PinnedIcon(props) {
  /**
   *
   * @param {Boolean} pinned Boolean used to choose the theme
   */
  const setTheme = pinned => {
    return pinned ? 'filled' : 'twoTone'
  }

  /**
   *
   * set the style of the current pinning icon
   */
  const setStyle = () => {
    if (props.clickable) {
      return {
        fontSize: 20,
        color: '#eb2f96',
        cursor: 'pointer',
      }
    } else {
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
      style={setStyle()}
      onClick={() => {
        props.clickable && props.onPinnedChange()
      }}
    />
  )
}

/**
 * @prop {Boolean} pinned - a boolean that says if the Icon should be displayed as pinned or not
 * @prop {String} size - what size should the Icon be
 * @prop {func} onPinnedChange - a function that handles what happens when the Icon is clicked (if clickable)
 * @prop {Boolean} clickable - says whether the Icon takes action on click or not.
 */
PinnedIcon.propTypes = {
  pinned: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'medium']).isRequired,
  clickable: PropTypes.bool,
  onPinnedChange: PropTypes.func,
}

PinnedIcon.defaultProps = {
  pinned: false,
  size: 'small',
  clickable: false,
  onPinnedChange: () => {
    console.log('click pin')
  },
}
