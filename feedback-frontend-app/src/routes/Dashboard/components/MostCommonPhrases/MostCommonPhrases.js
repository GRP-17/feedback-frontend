import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

export default function MostCommonPhrases(props) {
  /**
   * @prop datamap - an array containing all the terms and their frequencies
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

  const columns = [
    { title: 'PHRASE', dataIndex: 'phrase' },
    { title: 'VOLUME', dataIndex: 'volume' },
  ]

  const data = props.datamap.map(el => ({
    key: el.term,
    volume: el.frequency,
    phrase: el.term,
  }))

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      rowKey="phrase"
      pagination={false}
    />
  )
}
