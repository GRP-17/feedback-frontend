import React, { Component } from 'react'
import { Spin, message, Row, Col, Input, Button, Card, Cascader } from 'antd'
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
const sinceOptions = [
  {
    value: '1 month',
    label: '1 month',
  },
  {
    value: '2 weeks',
    label: '2 weeks',
  },
  {
    value: '1 week',
    label: '1 week',
  },
  {
    value: 'Today',
    label: 'Today',
  },
]

const sentimentsOptions = [
  {
    value: 'POSITIVE',
    label: 'positive',
  },
  {
    value: 'NEUTRAL',
    label: 'neutral',
  },
  {
    value: 'NEGATIVE',
    label: 'negative',
  },
]

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

    // stops the context/owner/this being lost when passing the function down to a sub-component.
    this.onChangePage = this.onChangePage.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onChangeSince = this.onChangeSince.bind(this)
    this.onChangeSentiments = this.onChangeSentiments.bind(this)
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
  async onSearch(value) {
    this.setState({
      isLoading: true,
    })
    console.log(value)
    /** try to make the request for all the data and set the state upon success */
    try {
      api
        .request('feedback_stats', {
          params: {
            dashboardId: this.props.match.params.id,
            query: value,
          },
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

  // handles updating the feedbackList state when the user selects a different page of feedback.
  async onChangePage(page) {
    this.setState({
      isLoading: true,
    })

    /** try to make the request for all the data and set the state upon success */
    try {
      api
        .request('feedback_paged', {
          params: {
            dashboardId: this.props.match.params.id,
            page: page,
            pageSize: 20,
          },
        })
        .then(res => {
          this.setState({
            feedbackList: res._embedded.feedbackList, //feedback,
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

  async onChangeSince(value) {
    this.setState({
      isLoading: true,
    })

    var date = new Date()
    var currentTime = date.getTime()
    var selectedTime = 0
    var sinceT = 0
    switch (value[0]) {
      case '1 month':
        selectedTime = 1000 * 60 * 60 * 24 * 30
        sinceT = currentTime - selectedTime
        break
      case '2 weeks':
        selectedTime = 1000 * 60 * 60 * 24 * 14
        sinceT = currentTime - selectedTime
        break
      case '1 week':
        selectedTime = 1000 * 60 * 60 * 24 * 7
        sinceT = currentTime - selectedTime
        break
      case 'Today':
        selectedTime = 1000 * 60 * 60 * 24
        sinceT = currentTime - selectedTime
        break
      default:
    }

    /** try to make the request for all the data and set the state upon success */
    try {
      api
        .request('feedback_stats', {
          params: {
            dashboardId: this.props.match.params.id,
            since: sinceT,
          },
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

  async onChangeSentiments(value) {
    this.setState({
      isLoading: true,
    })
    /** try to make the request for all the data and set the state upon success */
    try {
      api
        .request('feedback_stats', {
          params: {
            dashboardId: this.props.match.params.id,
            sentiment: value[0],
          },
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
              <Col span={12}>
                <Search
                  placeholder="Search"
                  onSearch={this.onSearch}
                  enterButton="Search"
                />
              </Col>
              <Col span={6}>
                <Cascader
                  options={sinceOptions}
                  onChange={this.onChangeSince}
                />
              </Col>
              <Col span={6}>
                <Cascader
                  options={sentimentsOptions}
                  onChange={this.onChangeSentiments}
                />
              </Col>
              <FeedbackList
                dataSource={this.state.feedbackList}
                totalVolume={this.state.feedbackCount}
                onChangePage={this.onChangePage}
              />
            </Col>
          </Row>
        </Spin>
      </BasicLayout>
    )
  }
}
