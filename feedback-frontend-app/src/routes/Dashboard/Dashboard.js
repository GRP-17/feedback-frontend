import React from "react";
import { Card, Spin, Comment, List, message, Rate } from "antd";
import api from "../../utils/Api";

const Dashboard = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [feedbackList, setFeedbackList] = React.useState([]);

  React.useEffect(async () => {
    setIsLoading(true);
    try {
      const data = await api.request("feedback");
      setFeedbackList(data._embedded.feedbackList);
    } catch (e) {
      message.error(e.toString());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Spin tip="Loading..." spinning={isLoading} delay={500}>
        <Card title="VOLUME" style={{ width: 300 }}>
          <h2>{feedbackList.length}</h2>
        </Card>
        <List
          className="comment-list"
          header="Feedback"
          itemLayout="horizontal"
          dataSource={feedbackList}
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
      </Spin>
    </div>
  );
};

export default Dashboard;
