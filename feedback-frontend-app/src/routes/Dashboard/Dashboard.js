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
        //TODO: change the defaults back to zeros
        one: 200,
        two: 50,
        three: 200,
        four: 300,
        five: 400
      }
    };
  }

  async getData() {
    this.setState({
      isLoading: true
    });
    try {
      const [feedbackData, sentimentCount] = await Promise.all([
        api.request("feedback"),
        api.request("feedback_sentiment_count")
        //TODO: fetch rating counts
      ]);
      this.setState({
        feedbackList: feedbackData._embedded.feedbackList,
        sentimentCount: sentimentCount
        //TODO: assign rating counts
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
