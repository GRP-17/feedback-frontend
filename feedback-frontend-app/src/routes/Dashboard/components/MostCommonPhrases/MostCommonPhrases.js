import React from 'react'
import { Table } from 'antd'
import { Bar, Cell } from 'recharts'
import PropTypes from 'prop-types'

export default function MostCommonPhrases(props) {
  MostCommonPhrases.propTypes = {
    datamap: PropTypes.arrayOf(
      PropTypes.shape({
        volume: PropTypes.number,
        phrase: PropTypes.string,
        average_rating: PropTypes.number,
        sentiments: PropTypes.shape({
          positive: PropTypes.number,
          negative: PropTypes.number,
          neutral: PropTypes.number,
        }),
      })
    ),
  }

  const columns = [
    { title: 'Phrase', dataIndex: 'phrase', key: 'phrase' },
    { title: 'VOLUME', dataIndex: 'volume', key: 'volume' },
    { title: 'AVG RATING', dataIndex: 'avgRating', key: 'avgRating' },
    { title: 'SENTIMENT', dataIndex: 'sentiment', key: 'sentiment' },
  ]

  const data = [
    {
      key: '1',
      phrase: props.datamap[0]['phrase'],
      volume: props.datamap[0]['volume'],
      avgRating: props.datamap[0]['average_rating'],
      sentiment: '',
    },
    {
      key: '2',
      phrase: props.datamap[1]['phrase'],
      volume: props.datamap[1]['volume'],
      avgRating: props.datamap[1]['average_rating'],
      sentiment: '',
    },
    {
      key: '3',
      phrase: props.datamap[2]['phrase'],
      volume: props.datamap[2]['volume'],
      avgRating: props.datamap[2]['average_rating'],
      sentiment: '',
    },
  ]
  return (
    <Table
      className="most common phrases"
      columns={columns}
      dataSource={data}
    />
  )
}
