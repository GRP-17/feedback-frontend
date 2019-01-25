import React from "react";
import { Spin, message } from "antd";
import FeedbackVolumn from "./components/FeedbackVolume/FeedbackVolume";
import FeedbackList from "./components/FeedbackList/FeedbackList";
import SentimentDistribution from "./components/SentimentDistribution/SentimentDistribution";
import api from "../../utils/Api";

export default () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [feedbackList, setFeedbackList] = React.useState([]);
  const [sentimentCount, setSentimentCount] = React.useState({
    NEGATIVE: 0,
    POSITIVE: 0,
    NEUTRAL: 0
  });

  React.useEffect(async () => {
    setIsLoading(true);
    try {
      const [feedbackData, sentimentCount] = await Promise.all([
        api.request("feedback"),
        api.request("feedback_sentiment_count")
      ]);
      setFeedbackList(feedbackData._embedded.feedbackList);
      setSentimentCount(sentimentCount);
    } catch (e) {
      message.error(e.toString());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Spin tip="Loading..." spinning={isLoading}>
        <FeedbackVolumn volume={feedbackList.length} />

        <SentimentDistribution
          positive={sentimentCount.POSITIVE}
          negative={sentimentCount.NEGATIVE}
          neutral={sentimentCount.NEUTRAL}
        />

        <FeedbackList dataSource={feedbackList} />
      </Spin>
    </div>
  );
};
