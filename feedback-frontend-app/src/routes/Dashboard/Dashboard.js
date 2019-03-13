import React, { Component } from 'react'
import { Spin, message, Row, Col, Input } from 'antd'
import FeedbackVolume from './components/FeedbackVolume/FeedbackVolume'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import FeedbackAvgRating from './components/FeedbackAvgRating/FeedbackAvgRating'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'
import RatingPerDay from './components/RatingPerDay/RatingPerDay'

const Search = Input.Search

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
      //console.log(feedback_common_phrases);
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
      <div style={{ background: 'white', padding: 15 }}>
        <div>
          <h1>Dashboard</h1>
        </div>
        <Spin tip="Loading..." spinning={this.state.isLoading}>
          <div>
            <Row style={{ padding: '20px 0' }}>
              <div>
                <Col span={2}>
                  <FeedbackVolume volume={this.state.feedbackList.length} />
                </Col>
              </div>
              <div>
                <Col span={8}>
                  <RatingPerDay data={this.state.negativePerDay} />
                </Col>
              </div>
              <div>
                <Col span={2}>
                  <FeedbackAvgRating avgrating={this.state.feedbackAvgRating} />
                </Col>
              </div>
              <div>
                <Col span={5}>
                  <SentimentDistribution
                    positive={this.state.sentimentCount.POSITIVE}
                    negative={this.state.sentimentCount.NEGATIVE}
                    neutral={this.state.sentimentCount.NEUTRAL}
                  />
                </Col>
              </div>
              <div>
                <Col span={7} style={{ padding: '0 15px' }}>
                  <RatingCountBreakdown count={this.state.ratingCount} />
                </Col>
              </div>
            </Row>
          </div>
          <div>
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              enterButton="Search"
              style={{ width: 300, padding: '20px 0' }}
            />
          </div>
          <div>
            <Row>
              <Col span={6}>
                <MostCommonPhrases datamap={this.state.feedbackCommonPhrases} />
              </Col>
              <Col span={18}>
                <FeedbackList dataSource={this.state.feedbackList} />
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
    )
  }
}
