import React, { Component } from 'react'
import { Spin, message, Row, Col, Button, Card } from 'antd'
import BasicLayout from './../../layouts/BasicLayout/BasicLayout'
import FeedbackVolume from './components/FeedbackVolume/FeedbackVolume'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import FeedbackAvgRating from './components/FeedbackAvgRating/FeedbackAvgRating'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'
import RatingPerDay from './components/RatingPerDay/RatingPerDay'
import Filtering from './components/Filtering/Filtering'

/** a class component, which is the top level of each dashboard page. */
export default class Dashboard extends Component {
  /** set the initial state */
  constructor(props) {
    super(props)
    /**
     * parameters for the state
     * @param {Boolean} isStatsLoading - wether the dashboard is waiting to load or not
     * @param {Boolean} isFeedbackLoading - wether the feedback list is waiting to load or not
     * @param {array} feedbackList - an array of feedback items for the current page
     * @param {number} feedbackCount - the total count of feedbacks on this dashboard
     * @param {{}} sentimentCount - an object with volumes for each sentiment
     * @param {{}}}ratingCount - an object with the volumes for each rating
     * @param {number} feedbackAvgRating - the average rating for this dashboard
     * @param {array} feedbackCommonPhrases - an array of common phrase objects
     * @param {array} negativePerDay - an array of data for volume of negative ratings each day
     * @param {String} dashboardName - the name of the dashboard
     * @param {object} filter - the filter of feedback list
     * @param {number} page - the number of the current page that is selected, start from one
     * @param {number} pageSize - the number of feedback items per page, default: 10
     */
    this.state = {
      isStatsLoading: false,
      isFeedbackLoading: false,
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
      filter: {},
      page: 1,
      pageSize: 20,
    }
  }

  /** a react life cycle method which is called when the component is
   * mounted to the web page and is used here to request the data that
   * is to be displayed from the API */
  componentDidMount() {
    this.getStatsData()
  }

  /** a function which requests data from the API */
  getStatsData = async () => {
    /** tell the user that page is loading the data by triggering the Spin component */
    this.setState({
      page: 1,
      isStatsLoading: true,
    })

    /** try to make the request for all the data and set the state upon success */
    try {
      const res = await api.request('feedback_stats', {
        params: {
          dashboardId: this.props.match.params.id,
          ...this.state.filter,
        },
      })

      this.setState({
        feedbackList: res.feedback,
        feedbackCount: res.feedback_count,
        sentimentCount: res.feedback_sentiment_count,
        ratingCount: res.feedback_rating_count,
        feedbackAvgRating: res.feedback_rating_average,
        feedbackCommonPhrases: res.feedback_common_phrases.result,
        negativePerDay: res.feedback_rating_negative.result,
        dashboardName: res.dashboard_name,
      })
    } catch (e) {
      console.error(e)
      message.error(e.toString())
    } finally {
      this.setState({
        isStatsLoading: false,
      })
    }
  }

  getFeedbackList = async (page = 1) => {
    this.setState({
      isFeedbackLoading: true,
    })

    try {
      const res = await api.request('feedback', {
        params: {
          dashboardId: this.props.match.params.id,
          page,
          pageSize: this.state.pageSize,
          ...this.state.filter,
        },
      })
      if (res._embedded && res._embedded.feedbackList) {
        // has feedback
        this.setState({
          feedbackList: res._embedded.feedbackList,
        })
      } else {
        this.setState({
          feedbackList: [],
        })
      }
    } catch (e) {
      console.error(e)
      message.error(e.toString())
    } finally {
      this.setState({
        isFeedbackLoading: false,
      })
    }
  }

  // handles updating the feedbackList state when the user selects a different page of feedback.
  handlePageChange = page => {
    // update the whole dashboard stats
    this.getFeedbackList(page)
  }

  handleFilterChange = filter => {
    this.setState(
      {
        filter,
      },
      () => {
        this.getStatsData()
      }
    )
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
        <Spin tip="Loading..." spinning={this.state.isStatsLoading}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
            <Col span={6}>
              <Card title="Sentiment Distribution" bordered={false}>
                <SentimentDistribution
                  positive={this.state.sentimentCount.POSITIVE}
                  negative={this.state.sentimentCount.NEGATIVE}
                  neutral={this.state.sentimentCount.NEUTRAL}
                />
              </Card>
            </Col>
            <Col span={10}>
              <Card title="Negative Feedback Distribution" bordered={false}>
                <RatingPerDay data={this.state.negativePerDay} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Rating Distribution" bordered={false}>
                <RatingCountBreakdown count={this.state.ratingCount} />
              </Card>
            </Col>
          </Row>

          <br />

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
            <Col span={6}>
              <FeedbackVolume volume={this.state.feedbackCount} />
              <br />
              <FeedbackAvgRating avgrating={this.state.feedbackAvgRating} />
              <br />
              <MostCommonPhrases datamap={this.state.feedbackCommonPhrases} />
            </Col>
            <Col span={18}>
              <Filtering onChange={this.handleFilterChange} />
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
                <Col span={24}>
                  <FeedbackList
                    dataSource={this.state.feedbackList}
                    loading={this.state.isFeedbackLoading}
                    total={this.state.feedbackCount}
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Spin>
      </BasicLayout>
    )
  }
}
