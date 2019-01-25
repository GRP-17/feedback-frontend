import React from "react";
import { Comment, List, Rate } from "antd";
import PropTypes from "prop-types";

export default function FeedbackList(props) {
  FeedbackList.propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  return (
    <List
      header="Feedback"
      itemLayout="horizontal"
      dataSource={props.dataSource}
      renderItem={feedback => (
        <Comment
          content={feedback.text}
          datetime={
            <>
              {feedback.sentiment}
              <Rate disabled defaultValue={feedback.rating} />
            </>
          }
        />
      )}
    />
  );
}
