import React from 'react'
import { List, Rate } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

export default function FeedbackList(props) {
  FeedbackList.propTypes = {
    dataSource: PropTypes.array.isRequired,
  }

  const renderItem = feedback => {
    const sentiment2color = {
      POSITIVE: '#2b9588',
      NEUTRAL: '#eee',
      NEGATIVE: '#e44a5b',
    }

    return (
      <List.Item>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: sentiment2color[feedback.sentiment],
              height: 10,
              width: 10,
              borderRadius: '50%',
              marginRight: 5,
            }}
          />
          <Rate disabled defaultValue={feedback.rating} />
          <div>{moment(feedback.created).format('YYYY/MM/DD HH:mm')}</div>
        </div>
        <div
          style={{
            height: 50,
            overflow: 'scroll',
          }}
        >
          {feedback.text || (
            <span style={{ fontStyle: 'italic' }}>(No text)</span>
          )}
        </div>
      </List.Item>
    )
  }

  return (
    <List
      header="Feedback"
      itemLayout="vertical"
      dataSource={props.dataSource}
      locale={{
        emptyText: <div style={{ fontStyle: 'italic' }}>No feedback</div>,
      }}
      renderItem={feedback => renderItem(feedback)}
      pagination={{
        pageSize: 10,
      }}
    />
  )
}
