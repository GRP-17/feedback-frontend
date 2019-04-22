import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

export default function PinnedIcon(props) {
  return (
    <Icon
      type="pushpin"
      theme={props.pinned ? 'filled' : 'twoTone'}
      twoToneColor="#eb2f96"
      style={{ cursor: 'pointer', color: '#eb2f96' }}
      onClick={e => {
        e.preventDefault()
        props.onPinnedChange(!props.pinned)
      }}
    />
  )
}

/**
 * @prop {Boolean} pinned - a boolean that says if the Icon should be displayed as pinned or not
 * @prop {Boolean} clickable - says whether the Icon takes action on click or not.
 */
PinnedIcon.propTypes = {
  pinned: PropTypes.bool.isRequired,
  onPinnedChange: PropTypes.func,
}

PinnedIcon.defaultProps = {
  pinned: false,
  onPinnedChange: val => {
    console.log('click pin', val)
  },
}
