import React, { Component } from "react";
import { Spin, message } from "antd";
import FeedbackVolumn from "./components/FeedbackVolume/FeedbackVolume";
import FeedbackList from "./components/FeedbackList/FeedbackList";
import SentimentDistribution from "./components/SentimentDistribution/SentimentDistribution";
import api from "../../utils/Api";
rce;
export default class Dashboard extends Component {
  constructor() {
    super(props);
    this.state = {
      isLoading: false,
      feedbackList: [],
      sentimentCount: {
        NEGATIVE: 0,
        POSITIVE: 0,
        NETURAL: 0
      }
    };
  }

  async getData() {
    this.setState({
      ...this.state,
      isLoading: true
    });
    try {
      const [feedbackData, sentimentCount] = await Promise.all([
        api.request("feedback"),
        api.request("feedback_sentiment_count")
      ]);
      this.setState({
        ...this.state,
        feedbackList: feedbackData,
        sentimentCount: sentimentCount
      });
    } catch (e) {
      message.error(e.toString());
    } finally {
      this.setState({
        ...this.state,
        isLoading: false
      });
    }
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Spin tip="Loading..." spinning={this.state.isLoading}>
          <FeedbackVolumn volume={this.state.feedbackList.length} />

          <SentimentDistribution
            positive={this.state.sentimentCount.POSITIVE}
            negative={this.state.sentimentCount.NEGATIVE}
            neutral={this.state.sentimentCount.NEUTRAL}
          />

          <FeedbackList dataSource={this.state.feedbackList} />
        </Spin>
      </div>
    );
  }
}
