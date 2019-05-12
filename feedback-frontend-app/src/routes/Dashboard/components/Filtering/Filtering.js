import React from 'react'
import { Input, Col, Row, Select, Button } from 'antd'
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
    value: Date.now() - ONE_DAY / 24,
    label: 'Last Hour',
  },
  {
    value: Date.now() - ONE_DAY,
    label: 'Today',
  },
  {
    value: Date.now() - ONE_DAY * 7,
    label: 'Last Week',
  },
  {
    value: Date.now() - ONE_DAY * 30,
    label: 'Last Month',
  },
  {
    value: Date.now() - ONE_DAY * 365,
    label: 'Last Year',
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
    value: 5,
    label: '⭐️⭐️⭐️⭐️⭐️',
  },
  {
    value: 4,
    label: '⭐️⭐️⭐️⭐️',
  },
  {
    value: 3,
    label: '⭐️⭐️⭐️',
  },
  {
    value: 2,
    label: '⭐️⭐️',
  },
  {
    value: 1,
    label: '⭐️',
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

const initialFilter = {
  query: null,
  since: null,
  sentiment: null,
  rating: null,
  labelId: null,
}

export default function Filtering(props) {
  const [filter, setFilter] = React.useState(initialFilter)

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
  }, [filter.since, filter.sentiment, filter.rating, filter.labelId])

  React.useEffect(() => {
    if (isInited.current && filter.query === null) {
      props.onChange(filter)
    } else {
      isInited.current = true
    }
  }, [filter.query])

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        type="flex"
        style={{ marginBottom: 10 }}
      >
        {/* Other filters */}
        {singleSelectFilters.map(fltr => (
          <Col span={24 / singleSelectFilters.length} key={fltr.name}>
            <Select
              style={{ width: '100%' }}
              defaultValue={null}
              placeholder={fltr.fltr}
              value={filter[fltr.name]}
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

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
        <Col span={11}>
          {/* Query filter */}
          <Search
            placeholder="Text"
            onSearch={val => {
              props.onChange(filter)
            }}
            onChange={e => {
              setFilter({ ...filter, query: e.target.value })
            }}
            value={filter.query}
            enterButton="Search"
            allowClear
          />
        </Col>

        <Col span={11}>
          {/* Labels filter */}
          <LabelSelect
            dashboardId={props.dashboardId}
            labels={props.labels}
            onChange={val => {
              handleFilterChange('labelId', val)
            }}
            value={filter.labelId || []}
            onLabelEdit={props.onLabelEdit}
            onLabelDelete={props.onLabelDelete}
          />
        </Col>

        <Col span={2}>
          <Button
            type="link"
            block
            onClick={() => {
              setFilter(initialFilter)
            }}
          >
            Clear
          </Button>
        </Col>
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
