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
    value: 2592000000,
    label: '1 month',
  },
  {
    value: 1209600000,
    label: '2 weeks',
  },
  {
    value: 604800000,
    label: '1 week',
  },
  {
    value: 86400000,
    label: 'Today',
  },
]

const sentimentsOptions = [
  {
    value: 'POSITIVE',
    label: 'Positive',
  },
  {
    value: 'NEUTRAL',
    label: 'Neutral',
  },
  {
    value: 'NEGATIVE',
    label: 'Negative',
  },
]

/** a class component, which is the top level of each dashboard page. */
export default class Dashboard extends Component {
  /** set the initial state */
  constructor(props) {
    super(props)
    /**
     * parameters for the state
     * @param {Boolean} isLoading - wether the dashboard is waiting to load or not
     * @param {array} feedbackList - an array of feedback items for the current page
     * @param {number} feedbackCount - the total count of feedbacks on this dashboard
     * @param {{}} sentimentCount - an obejct with volumes for each sentiment
     * @param {{}}}ratingCount - an object with the volumes for each rating
     * @param {number} feedbackAvgRating - the average rating for this dashboard
     * @param {array} feedbackCommonPhrases - an array of common phrase objects
     * @param {array} negativePerDay - an array of data for volume of negative ratings each day
     * @param {String} dashboardName - the name of the dashboard
     * @param {number} currentPage - the number of the current page that is selected
     */
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
      searchValue: null,
      filterSince: null,
      filterSentiment: null,
      page: 1,
    }

    // stops the context/owner/this being lost when passing the function down to a sub-component.
    this.onChangePage = this.onChangePage.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onChangeSince = this.onChangeSince.bind(this)
    this.onChangeSentiments = this.onChangeSentiments.bind(this)
    this.getData = this.getData.bind(this)
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
      page: 1,
      isLoading: true,
    })

    /** try to make the request for all the data and set the state upon success */
    try {
      api
        .request('feedback_stats', {
          params: {
            dashboardId: this.props.match.params.id,
            query: this.state.searchValue,
            since: this.state.filterSince,
            sentiment: this.state.filterSentiment,
          },
        })
        .then(res => {
          this.setState({
            feedbackList: res.feedback, //feedback,
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

  onSearch(value) {
    this.setState(
      {
        searchValue: value,
        isLoading: true,
      },
      () => {
        /** try to make the request for all the data and set the state upon success */
        this.getData()
      }
    )
  }

  // handles updating the feedbackList state when the user selects a different page of feedback.
  async onChangePage(page = this.state.currentPage) {
    this.setState({
      page: page,
      isLoading: true,
      currentPage: page,
    })

    /** try to make the request for all the data and set the state upon success */
    try {
      api
        .request('feedback', {
          params: {
            dashboardId: this.props.match.params.id,
            page: page,
            pageSize: 20,
            // want the page of feedback when considering the query in the searchbar
            query: this.state.searchValue,
            since: this.state.filterSince,
            sentiment: this.state.filterSentiment,
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

  onChangeSince(value) {
    var date = new Date()
    var currentTime = date.getTime()
    var sinceT = value.length === 0 ? null : currentTime - value[0]

    this.setState(
      {
        filterSince: sinceT,
      },
      () => {
        /** try to make the request for all the data and set the state upon success */
        this.getData()
      }
    )
  }

  onChangeSentiments(value) {
    this.setState(
      {
        isLoading: true,
        filterSentiment: value[0],
      },
      () => {
        /** try to make the request for all the data and set the state upon success */
        this.getData()
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
                <Col span={18}>
                  <Search
                    placeholder="Search"
                    onSearch={this.onSearch}
                    enterButton="Search"
                  />
                </Col>
                <Col span={3}>
                  <Cascader
                    placeholder="since filter"
                    options={sinceOptions}
                    onChange={this.onChangeSince}
                  />
                </Col>
                <Col span={3}>
                  <Cascader
                    placeholder="sentiment filter"
                    options={sentimentsOptions}
                    onChange={this.onChangeSentiments}
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
                <Col span={24}>
                  <FeedbackList
                    dataSource={this.state.feedbackList}
                    totalVolume={this.state.feedbackCount}
                    onChangePage={this.onChangePage}
                    loading={this.state.isLoading}
                    page={this.state.page}
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
