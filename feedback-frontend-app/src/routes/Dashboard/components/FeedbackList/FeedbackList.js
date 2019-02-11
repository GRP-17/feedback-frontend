import React from "react";
import { List, Rate } from "antd";
import PropTypes from "prop-types";

export default function FeedbackList(props) {
  FeedbackList.propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  const renderItem = feedback => {
    const sentiment2color = {
      'POSITIVE': '#2b9588',
      'NEUTRAL': '#eee',
      'NEGATIVE': '#e44a5b',
    }

    return <List.Item>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          backgroundColor: sentiment2color[feedback.sentiment],
          height: 10,
          width: 10,
          borderRadius: '50%',
          marginRight: 5,
        }} />
        <Rate disabled defaultValue={feedback.rating} />
      </div>
      <div style={{
        height: 100,
        overflow: 'scroll',
      }}>{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}{feedback.text}</div>
    </List.Item>
  }

  return (
    <List
      header="Feedback"
      itemLayout="vertical"
      dataSource={props.dataSource}
      locale={{ emptyText: 'No feedback' }}
      renderItem={feedback => renderItem(feedback)}
    />
  );
}
