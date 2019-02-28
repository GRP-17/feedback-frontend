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
    {
      key: '4',
      phrase: props.datamap[3]['phrase'],
      volume: props.datamap[3]['volume'],
    },
    {
      key: '5',
      phrase: props.datamap[4]['phrase'],
      volume: props.datamap[4]['volume'],
    },
    {
      key: '6',
      phrase: props.datamap[5]['phrase'],
      volume: props.datamap[5]['volume'],
    },
    {
      key: '7',
      phrase: props.datamap[6]['phrase'],
      volume: props.datamap[6]['volume'],
    },
    {
      key: '8',
      phrase: props.datamap[7]['phrase'],
      volume: props.datamap[7]['volume'],
    },
    {
      key: '9',
      phrase: props.datamap[8]['phrase'],
      volume: props.datamap[8]['volume'],
    },
    {
      key: '10',
      phrase: props.datamap[9]['phrase'],
      volume: props.datamap[9]['volume'],
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
