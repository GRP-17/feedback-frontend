import React from 'react'
import { Input, Col, Row, Select } from 'antd'
import LabelSelect from '../LabelSelect/LabelSelect'
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

const singleSelectFilters = [
  {
    placeholder: 'Since',
    name: 'since',
    options: sinceOptions,
  },
  {
    placeholder: 'Sentiment',
    name: 'sentiment',
    options: sentimentsOptions,
  },
  {
    placeholder: 'Rating',
    name: 'rating',
    options: ratingOptions,
  },
]

export default function Filtering(props) {
  const [filter, setFilter] = React.useState({
    query: null,
    since: null,
    sentiment: null,
    rating: null,
    labelId: null,
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
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        type="flex"
        style={{ marginBottom: 10 }}
      >
        <Col span={12}>
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

        <Col span={12}>
          {/* Labels filter */}
          <LabelSelect
            dashboardId={props.dashboardId}
            labels={props.labels}
            onChange={val => {
              handleFilterChange('labelId', val)
            }}
            onLabelEdit={props.onLabelEdit}
            onLabelDelete={props.onLabelDelete}
          />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
        {/* Other filters */}
        {singleSelectFilters.map(fltr => (
          <Col span={24 / singleSelectFilters.length} key={fltr.name}>
            <Select
              style={{ width: '100%' }}
              defaultValue={null}
              placeholder={fltr.fltr}
              onSelect={val => {
                handleFilterChange(fltr.name, val)
              }}
            >
              {fltr.options.map(opt => (
                <Select.Option value={opt.value} key={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
        ))}
      </Row>
    </>
  )
}

/**
 * @prop dashboardId: the id of the current dashboard, used for creating labels
 * @prop labels: array of labels for filtering
 * @prop onChange: callback function when any of filterings changes
 */
Filtering.propTypes = {
  dashboardId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onLabelEdit: PropTypes.func,
  onLabelDelete: PropTypes.func,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      labelId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
}

Filtering.defaultProps = {
  dashboardId: null,
  onChange: val => {
    console.log(val)
  },
  onLabelEdit: label => {
    console.log(label)
  },
  onLabelDelete: labelId => {
    console.log(labelId)
  },
  labels: [],
}
