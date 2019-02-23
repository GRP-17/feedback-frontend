import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'

export default function MostCommonPhrases(props){
   MostCommonPhrases.propTypes = {

   }

   const columns =[
       { title: 'Phrase', dataIndex: 'phrase', key: 'phrase', },
       { title: 'VOLUME', dataIndex: 'volume', key: 'volume', },
       { title: 'AVG RATING', dataIndex: 'avgRating', key: 'avgRating', },
       { title: 'SENTIMENT', dataIndex: 'sentiment', key: 'sentiment', },
   ];
    const data =[
        { key: '1', phrase: '', volume: '', avgRating: '', sentiment: '' },
        { key: '2', phrase: '', volume: '', avgRating: '', sentiment: '' },
        { key: '3', phrase: '', volume: '', avgRating: '', sentiment: '' },
    ];

   return(
       <Table
            className = "most common phrases"
            columns = {columns}
            dataSource = {data}
       />
   )
}