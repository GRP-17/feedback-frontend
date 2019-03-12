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
    { title: 'PHRASE', dataIndex: 'phrase' },
    { title: 'VOLUME', dataIndex: 'volume' },
  ]

  const data = props.datamap.map(el => ({
    key: el.phrase,
    volume: el.volume,
    phrase: el.phrase,
  }))

  return (
    <Table
      style={{ width: 280 }}
      className="most common phrases"
      columns={columns}
      dataSource={data}
      scroll={{ x: 280, y: 200 }}
    />
  )
}
