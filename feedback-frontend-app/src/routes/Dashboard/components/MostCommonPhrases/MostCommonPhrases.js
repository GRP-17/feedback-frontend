import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

export default function MostCommonPhrases(props) {
  // define the columns of the Table
  const columns = [
    { title: 'PHRASE', dataIndex: 'phrase' },
    { title: 'VOLUME', dataIndex: 'volume' },
  ]

  // map the values from the collection to the correct format for displaying
  const data = props.datamap.map(el => ({
    key: el.term,
    volume: el.frequency,
    phrase: el.term,
  }))

  return (
    <Table
      style={{ height: 200 }}
      size="small"
      columns={columns}
      dataSource={data}
      rowKey="phrase"
      pagination={false}
      scroll={{ y: 150 }}
    />
  )
}

/**
 * @prop {array} datamap - an array containing all the terms and their frequencies
 *
 *  term - the term
 *  frequency - the number of appearances for that term
 */
MostCommonPhrases.propTypes = {
  datamap: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string.isRequired,
      frequency: PropTypes.number.isRequired,
    })
  ).isRequired,
}
