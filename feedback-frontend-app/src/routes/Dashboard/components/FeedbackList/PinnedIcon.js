import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

export default function PinnedIcon(props) {
  return (
    <Icon
      type="pushpin"
      theme={props.pinned ? 'filled' : 'twoTone'}
      twoToneColor="#b01313"
      style={{
        cursor: props.clickable ? 'pointer' : 'inherit',
        color: '#b01313',
      }}
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        if (props.clickable) {
          props.onPinnedChange(!props.pinned)
        }
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
  clickable: PropTypes.bool,
  onPinnedChange: PropTypes.func,
}

PinnedIcon.defaultProps = {
  pinned: false,
  clickable: false,
  onPinnedChange: val => {
    console.log('click pin', val)
  },
}
