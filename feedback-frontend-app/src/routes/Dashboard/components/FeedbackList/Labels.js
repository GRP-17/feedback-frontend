import React from 'react'
import { Tag } from 'antd'
import PropTypes from 'prop-types'
import { calcTextColor } from '../../../../utils/helper'

export default function Labels(props) {
  return (
    <div>
      {props.labels.map(label => (
        <Tag color={label.color} key={label.labelId}>
          <span style={{ color: calcTextColor(label.color) }}>
            {label.name}
          </span>
        </Tag>
      ))}
    </div>
  )
}

Labels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      labelId: PropTypes.string.isRequired,
      dashboardId: PropTypes.string.isRequired,
    })
  ),
  deletable: PropTypes.bool,
}

Labels.defaultProps = {
  labels: [],
  deletable: false,
}
