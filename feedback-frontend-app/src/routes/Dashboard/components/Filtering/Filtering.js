import React from 'react'
import { Input, Col, Row, Select } from 'antd'
import PropTypes from 'prop-types'

const { Search } = Input

const ONE_DAY = 1000 * 60 * 60 * 24

const sinceOptions = [
  {
    value: null,
    label: 'All Time',
  },
  {
    value: ONE_DAY * 30,
    label: '1 Month',
  },
  {
    value: ONE_DAY * 14,
    label: '2 Weeks',
  },
  {
    value: ONE_DAY * 7,
    label: '1 Week',
  },
  {
    value: ONE_DAY,
    label: 'Today',
  },
]

const sentimentsOptions = [
  {
    value: null,
    label: 'All Sentiments',
  },
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
   * @prop onChange: callback function when any of filterings changes
   */
  Filtering.propTypes = {
    onChange: PropTypes.func,
  }

  const [filter, setFilter] = React.useState({
    query: null,
    since: null,
    sentiment: null,
  })

  const handleFilterChange = (filterName, value) => {
    setFilter({ ...filter, [filterName]: value })
  }

  React.useEffect(() => {
    if (Object.values(filter).some(v => v !== null)) {
      // only triggle onChange when any of filters is not null
      props.onChange(filter)
    }
  }, [filter])

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
      <Col span={12}>
        {/* Query filter */}
        <Search
          placeholder="Search"
          onSearch={val => {
            handleFilterChange('query', val)
          }}
          enterButton="Search"
          allowClear
        />
      </Col>

      <Col span={6}>
        {/* Since filter */}
        <Select
          style={{ width: '100%' }}
          defaultValue={null}
          placeholder="Since"
          onSelect={val => {
            handleFilterChange('since', val)
          }}
        >
          {sinceOptions.map(opt => (
            <Select.Option value={opt.value} key={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Col>

      <Col span={6}>
        {/* Sentiment filter */}
        <Select
          style={{ width: '100%' }}
          defaultValue={null}
          placeholder="Sentiment"
          onSelect={val => {
            handleFilterChange('sentiment', val)
          }}
        >
          {sentimentsOptions.map(opt => (
            <Select.Option value={opt.value} key={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
