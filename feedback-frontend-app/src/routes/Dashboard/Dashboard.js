import React from "react";
import { Spin, message } from "antd";
import FeedbackVolumn from "./components/FeedbackVolume/FeedbackVolume";
import FeedbackList from "./components/FeedbackList/FeedbackList";
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
        <FeedbackVolumn volume={feedbackList.length} />

        <FeedbackList dataSource={feedbackList} />
      </Spin>
    </div>
  );
};

export default Dashboard;
