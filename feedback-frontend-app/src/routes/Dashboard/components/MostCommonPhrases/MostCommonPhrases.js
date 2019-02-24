import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

export default function MostCommonPhrases(props) {
  MostCommonPhrases.propTypes = {
    datamap: PropTypes.array.isRequired,
  }

  const columns = [
    { title: 'Phrase', dataIndex: 'phrase', key: 'phrase' },
    { title: 'VOLUME', dataIndex: 'volume', key: 'volume' },
    { title: 'AVG RATING', dataIndex: 'avgRating', key: 'avgRating' },
    { title: 'SENTIMENT', dataIndex: 'sentiment', key: 'sentiment' },
  ]
  var key1 = Object.keys(props.datamap)[0]
  const key2 = Object.keys(props.datamap)[1]
  const key3 = Object.keys(props.datamap)[2]
  const data = [
    { key: '1', phrase: key1, volume: '', avgRating: '', sentiment: '' },
    { key: '2', phrase: key2, volume: '', avgRating: '', sentiment: '' },
    { key: '3', phrase: key3, volume: '', avgRating: '', sentiment: '' },
  ]
  return (
    <Table
      className="most common phrases"
      columns={columns}
      dataSource={data}
    />
  )
}
