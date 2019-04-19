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
    value: Date.now() - ONE_DAY * 365,
    label: 'Last Year',
  },
  {
    value: Date.now() - ONE_DAY * 30,
    label: 'Last Month',
  },
  {
    value: Date.now() - ONE_DAY * 7,
    label: 'Last Week',
  },
  {
    value: Date.now() - ONE_DAY,
    label: 'Today',
  },
  {
    value: Date.now() - ONE_DAY / 24,
    label: 'Last Hour',
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

const ratingOptions = [
  {
    value: null,
    label: 'All Ratings',
  },
  {
    value: 1,
    label: '⭐️',
  },
  {
    value: 2,
    label: '⭐️⭐️',
  },
  {
    value: 3,
    label: '⭐️⭐️⭐️',
  },
  {
    value: 4,
    label: '⭐️⭐️⭐️⭐️',
  },
  {
    value: 5,
    label: '⭐️⭐️⭐️⭐️⭐️',
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
    rating: null,
  })

  const handleFilterChange = (filterName, value) => {
    setFilter({ ...filter, [filterName]: value })
  }

  const isInited = React.useRef(false) // prevent first run
  React.useEffect(() => {
    if (isInited.current) {
      props.onChange(filter)
    } else {
      isInited.current = true
    }
  }, [filter])

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
      <Col span={6}>
        {/* Query filter */}
        <Search
          placeholder="Text"
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

      <Col span={6}>
        {/* Rating filter */}
        <Select
          style={{ width: '100%' }}
          defaultValue={null}
          placeholder="Rating"
          onSelect={val => {
            handleFilterChange('rating', val)
          }}
        >
          {ratingOptions.map(opt => (
            <Select.Option value={opt.value} key={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
