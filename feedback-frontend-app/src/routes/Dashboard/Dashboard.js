import React, { Component } from 'react'
import { Spin, message, Row, Col, Menu } from 'antd'
import FeedbackVolume from './components/FeedbackVolume/FeedbackVolume'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import FeedbackAvgRating from './components/FeedbackAvgRating/FeedbackAvgRating'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'
import RatingPerDay from './components/RatingPerDay/RatingPerDay'

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
      negativePerDay: [],
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
        feedback_rating_negative,
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
        negativePerDay: feedback_rating_negative.result,
      })
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
      <div style={{ padding: 25, background: 'white' }}>
        <div style={{ padding: 15 }}>
          <h1>Dashboard</h1>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ background: '#efeded' }}
        >
          <Menu.Item key="1">App Health</Menu.Item>
          <Menu.Item key="2">insights</Menu.Item>
          <Menu.Item key="3">Topics</Menu.Item>
        </Menu>
        <Spin tip="Loading..." spinning={this.state.isLoading}>
          <Row style={{ padding: 30 }}>
            <Col span="1">
              <FeedbackVolume volume={this.state.feedbackList.length} />
            </Col>
            <Col span="9">
              <RatingPerDay data={this.state.negativePerDay} />
            </Col>
            <Col span="1">
              <FeedbackAvgRating avgrating={this.state.feedbackAvgRating} />
            </Col>
            <Col span="5">
              <SentimentDistribution
                positive={this.state.sentimentCount.POSITIVE}
                negative={this.state.sentimentCount.NEGATIVE}
                neutral={this.state.sentimentCount.NEUTRAL}
              />
            </Col>
            <Col span="8">
              <RatingCountBreakdown count={this.state.ratingCount} />
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <MostCommonPhrases datamap={this.state.feedbackCommonPhrases} />
            </Col>
            <Col span="18">
              <FeedbackList dataSource={this.state.feedbackList} />
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}
