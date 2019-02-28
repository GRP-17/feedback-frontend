import React, { Component } from 'react'
import { Spin, message } from 'antd'
import FeedbackVolume from './components/FeedbackVolume/FeedbackVolume'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import FeedbackAvgRating from './components/FeedbackAvgRating/FeedbackAvgRating'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      feedbackList: [],
      feedbackCount: 0,
      sentimentCount: {
        NEGATIVE: 0,
        POSITIVE: 0,
        NEUTRAL: 0,
      },
      ratingCount: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      feedbackAvgRating: 0,
      feedbackCommonPhrases: [],
    }
  }

  async getData() {
    this.setState({
      isLoading: true,
    })
    try {
      const {
        feedback,
        feedback_rating_average,
        feedback_rating_count,
        feedback_sentiment_count,
        feedback_count,
        feedback_common_phrases,
      } = await api.request('dashboard')
      this.setState({
        feedbackList: feedback,
        feedbackCount: feedback_count,
        sentimentCount: feedback_sentiment_count,
        ratingCount: feedback_rating_count,
        feedbackAvgRating: feedback_rating_average,
        feedbackCommonPhrases: feedback_common_phrases.result,
      })
      console.log(this.state.feedbackCommonPhrases)
    } catch (e) {
      message.error(e.toString())
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div style={{ padding: 25 }}>
        <h1>Dashboard</h1>
        <Spin tip="Loading..." spinning={this.state.isLoading}>
          <FeedbackVolume volume={this.state.feedbackList.length} />

          <FeedbackAvgRating avgrating={this.state.feedbackAvgRating} />

          <SentimentDistribution
            positive={this.state.sentimentCount.POSITIVE}
            negative={this.state.sentimentCount.NEGATIVE}
            neutral={this.state.sentimentCount.NEUTRAL}
          />

          <RatingCountBreakdown count={this.state.ratingCount} />

          <FeedbackList dataSource={this.state.feedbackList} />
          <MostCommonPhrases datamap={this.state.feedbackCommonPhrases} />
        </Spin>
      </div>
    )
  }
}
