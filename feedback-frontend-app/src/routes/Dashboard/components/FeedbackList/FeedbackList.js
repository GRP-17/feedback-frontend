import React from "react";
import { Comment, List, Rate } from "antd";

export default props => {
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
};
