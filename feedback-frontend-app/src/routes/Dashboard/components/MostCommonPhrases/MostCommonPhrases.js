import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

export default function MostCommonPhrases(props) {
  MostCommonPhrases.propTypes = {
    datamap: PropTypes.arrayOf(
      PropTypes.shape({
        volume: PropTypes.number,
        phrase: PropTypes.string,
      })
    ),
  }

  const columns = [
    { title: 'Phrase', dataIndex: 'phrase', key: 'phrase' },
    { title: 'VOLUME', dataIndex: 'volume', key: 'volume' },
  ]

  const data = [
    {
      key: '1',
      phrase: props.datamap[0]['phrase'],
      volume: props.datamap[0]['volume'],
    },
    {
      key: '2',
      phrase: props.datamap[1]['phrase'],
      volume: props.datamap[1]['volume'],
    },
    {
      key: '3',
      phrase: props.datamap[2]['phrase'],
      volume: props.datamap[2]['volume'],
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
