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

/** a class component, which is the top level of each dashboard page. */
export default class Dashboard extends Component {
  /** set the initial state */
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

  /** a react life cycle method which is called when the component is
   * mounted to the web page and is used here to request the data that
   * is to be displayed from the API */
  componentDidMount() {
    this.getData()
  }

  /** a function which requests data from the API */
  async getData() {
    /** tell the user that page is loading the data by triggering the Spin component */
    this.setState({
      isLoading: true,
    })

    /** try to make the request for all the data and set the state upon success */
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
  /**
   * BasicLayout *header*             - the style and layout of the whole component (whole page).
   *                                    The *header* is set to be a button linking back to the Home page
   *                                    and the name of this dashboard.
   * Spin                             - tells the user when the page is loading data.
   * FeedbackVomue *volume*           - the total volume of feedback for this dashboard.
   * FeedbackAvgRating *avgrating*    - the average rating over all feedbacks.
   * RatingPerDay *data*              - a graph showing the amount of negative ratings each day.
   * SentimentDistribution *positive* - a bar chart showing the different volumes of feedback recieved for each sentiment.
   *             *negative* *neutral*
   * RatingCountBreakdown *count*     - a bar chart showing the different volumes of feedback recieved for each rating.
   * MostCommonPhrases *datamap*      - a list of the most common/interesting phrases that appear in the feedbacks and there volumes.
   * Search                           - a search button for filtering the feedbacks shown
   * FeedbackList *dataSource*        - Shows some feedback items for this dashboard.
   */
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
