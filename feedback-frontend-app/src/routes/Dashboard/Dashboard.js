import React, { Component } from "react";
import { Spin, message } from "antd";
import FeedbackVolume from "./components/FeedbackVolume/FeedbackVolume";
import FeedbackList from "./components/FeedbackList/FeedbackList";
import SentimentDistribution from "./components/SentimentDistribution/SentimentDistribution";
import RatingCountBreakdown from "./components/RatingCountBreakdown/RatingCountBreakdown";
import api from "../../utils/Api";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      feedbackList: [],
      sentimentCount: {
        NEGATIVE: 0,
        POSITIVE: 0,
        NEUTRAL: 0
      },
      ratingCount: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    };
  }

  async getData() {
    this.setState({
      isLoading: true
    });
    try {
      const [feedbackData, sentimentCount, ratingCount] = await Promise.all([
        api.request("feedback"),
        api.request("feedback_sentiment_count"),
        api.request("feedback_rating_count")
      ]);
      this.setState({
        feedbackList: feedbackData._embedded.feedbackList,
        sentimentCount: sentimentCount,
        ratingCount: ratingCount
      });
    } catch (e) {
      message.error(e.toString());
    } finally {
      this.setState({
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
          <FeedbackVolume volume={this.state.feedbackList.length} />

          <SentimentDistribution
            positive={this.state.sentimentCount.POSITIVE}
            negative={this.state.sentimentCount.NEGATIVE}
            neutral={this.state.sentimentCount.NEUTRAL}
          />

          <RatingCountBreakdown count={this.state.ratingCount} />

          <FeedbackList dataSource={this.state.feedbackList} />
        </Spin>
      </div>
    );
  }
}
