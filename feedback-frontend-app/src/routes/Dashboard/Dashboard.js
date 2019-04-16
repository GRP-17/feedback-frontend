import React, { Component } from 'react'
import { Spin, message, Row, Col, Input, Button, Card } from 'antd'
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
      searchValue: '',
    }

    // stops the context/owner/this being lost when passing the function down to a sub-component.
    this.onChangePage = this.onChangePage.bind(this)
    this.onSearch = this.onSearch.bind(this)
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
          query: this.state.searchValue,
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
      searchValue: value,
      isLoading: true,
    })

    /** try to make the request for all the data and set the state upon success */
    try {
      console.log(value)
      api
        .request('feedback_stats', {
          params: {
            dashboardId: this.props.match.params.id,
            query: value,
          },
        })
        .then(res => {
          this.setState({
            // update the current page list and number of feedback to work out number of pages there are.
            feedbackList: res.feedback_paged,
            feedbackCount: res.feedback_count,
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
            // want the page of feedback when considering the query in the searchbar
            query: this.state.searchValue,
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
              <Search
                placeholder="Search"
                onSearch={this.onSearch}
                enterButton="Search"
              />
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
