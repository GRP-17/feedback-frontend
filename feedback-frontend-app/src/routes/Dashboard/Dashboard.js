import React, { Component } from 'react'
import { Spin, message, Row, Col, Input, Button } from 'antd'
import BasicLayout from './../../layouts/BasicLayout/BasicLayout'
import FeedbackVolume from './components/FeedbackVolume/FeedbackVolume'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import FeedbackAvgRating from './components/FeedbackAvgRating/FeedbackAvgRating'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'
import RatingPerDay from './components/RatingPerDay/RatingPerDay'

const { Search } = Input

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
      dashboardName: 'Dashboard',
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    this.setState({
      isLoading: true,
    })

    try {
      api
        .request('feedback_stats', {
          params: { dashboardId: this.props.match.params.id },
        })
        .then(res => {
          this.setState({
            feedbackList: res.feedback_paged, //feedback,
            feedbackCount: res.feedback_count,
            sentimentCount: res.feedback_sentiment_count,
            ratingCount: res.feedback_rating_count,
            feedbackAvgRating: res.feedback_rating_average,
            feedbackCommonPhrases: res.feedback_common_phrases.result,
            negativePerDay: res.feedback_rating_negative.result,
            dashboardName: res.dashboard_name,
          })
        })
    } catch (e) {
      message.error(e.toString())
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    return (
      <BasicLayout
        header={
          <Row type="flex" align="middle">
            <Button
              ghost
              shape="circle"
              icon="left"
              onClick={this.props.history.goBack}
            />
            <span style={{ marginLeft: 10 }}>{this.state.dashboardName}</span>
          </Row>
        }
      >
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
              <MostCommonPhrases datamap={this.state.feedbackCommonPhrases} />
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
      </BasicLayout>
    )
  }
}
