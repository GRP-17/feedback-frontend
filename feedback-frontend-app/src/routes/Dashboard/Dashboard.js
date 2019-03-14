import React, { Component } from 'react'
import { Spin, message, Row, Col, Input, Typography, Layout } from 'antd'
import FeedbackVolume from './components/FeedbackVolume/FeedbackVolume'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import FeedbackAvgRating from './components/FeedbackAvgRating/FeedbackAvgRating'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'
import RatingPerDay from './components/RatingPerDay/RatingPerDay'

const { Search } = Input
const { Title } = Typography

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
      <Layout>
        <Layout.Header>
          <Title level={1} style={{ color: '#fff' }}>
            Dashboard
          </Title>
        </Layout.Header>
        <Layout.Content style={{ padding: 25 }}>
          <div style={{ background: '#fff', padding: 25, minHeight: 280 }}>
            <Spin tip="Loading..." spinning={this.state.isLoading}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
                <Col span={4}>
                  <FeedbackVolume volume={this.state.feedbackList.length} />
                  <FeedbackAvgRating avgrating={this.state.feedbackAvgRating} />
                </Col>
                <Col span={8}>
                  <RatingPerDay data={this.state.negativePerDay} />
                </Col>
                <Col span={5}>
                  <SentimentDistribution
                    positive={this.state.sentimentCount.POSITIVE}
                    negative={this.state.sentimentCount.NEGATIVE}
                    neutral={this.state.sentimentCount.NEUTRAL}
                  />
                </Col>
                <Col span={7} style={{ padding: '0 15px' }}>
                  <RatingCountBreakdown count={this.state.ratingCount} />
                </Col>
              </Row>

              <br />

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
                <Col span={6}>
                  <MostCommonPhrases
                    datamap={this.state.feedbackCommonPhrases}
                  />
                </Col>
                <Col span={18}>
                  <Search
                    placeholder="Search"
                    onSearch={value => console.log(value)}
                    enterButton="Search"
                  />
                  <FeedbackList dataSource={this.state.feedbackList} />
                </Col>
              </Row>
            </Spin>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}
