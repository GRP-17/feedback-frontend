import React from 'react'
import { Tag } from 'antd'
import PropTypes from 'prop-types'
import { calcTextColor } from '../../../../utils/helper'

export default function Labels(props) {
  return props.labels.map(label => (
    <Tag
      color={label.color}
      key={label.labelId}
      closable={props.editable}
      onClose={() => {
        props.onLabelDelete(label.labelId)
      }}
    >
      <span style={{ color: calcTextColor(label.color) }}>{label.name}</span>
    </Tag>
  ))
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
  editable: PropTypes.bool,
  onLabelDelete: PropTypes.func,
}

Labels.defaultProps = {
  labels: [],
  editable: false,
  onLabelDelete: () => {},
}
