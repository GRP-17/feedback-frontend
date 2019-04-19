import React from 'react'
import { Input, Col, Row, Cascader } from 'antd'
import PropTypes from 'prop-types'

const { Search } = Input
const sinceOptions = [
  {
    value: 2592000000,
    label: '1 month',
  },
  {
    value: 1209600000,
    label: '2 weeks',
  },
  {
    value: 604800000,
    label: '1 week',
  },
  {
    value: 86400000,
    label: 'Today',
  },
]

const sentimentsOptions = [
  {
    value: 'POSITIVE',
    label: 'Positive',
  },
  {
    value: 'NEUTRAL',
    label: 'Neutral',
  },
  {
    value: 'NEGATIVE',
    label: 'Negative',
  },
]

export default function Filtering(props) {
  /**
   * @prop volume - the volume of feedbacks in total
   */
  Filtering.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onChangeSince: PropTypes.func.isRequired,
    onChangeSentiments: PropTypes.func.isRequired,
  }

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
      <Col span={18}>
        <Search
          placeholder="Search"
          onSearch={props.onSearch}
          enterButton="Search"
        />
      </Col>
      <Col span={3}>
        <Cascader
          placeholder="since filter"
          options={sinceOptions}
          onChange={props.onChangeSince}
        />
      </Col>
      <Col span={3}>
        <Cascader
          placeholder="sentiment filter"
          options={sentimentsOptions}
          onChange={props.onChangeSentiments}
        />
      </Col>
    </Row>
  )
}
