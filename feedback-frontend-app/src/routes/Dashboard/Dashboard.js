import React, { Component } from 'react'
import {
  Spin,
  message,
  Row,
  Col,
  Switch,
  Popover,
  Icon,
  InputNumber,
} from 'antd'
import BasicLayout from './../../layouts/BasicLayout/BasicLayout'
import FeedbackList from './components/FeedbackList/FeedbackList'
import SentimentDistribution from './components/SentimentDistribution/SentimentDistribution'
import RatingCountBreakdown from './components/RatingCountBreakdown/RatingCountBreakdown'
import api from '../../utils/Api'
import MostCommonPhrases from './components/MostCommonPhrases/MostCommonPhrases'
import RatingPerDay from './components/RatingPerDay/RatingPerDay'
import Filtering from './components/Filtering/Filtering'
import DashboardMenu from './components/DashboardMenu/DashboardMenu'
import Container from './components/Container/Container'
import VolumeStats from './components/VolumeStats/VolumeStats'
import { getSettings, setSettings } from './../../utils/helper'

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
     * @param {array} dashboardLabels - the labels of the dashboard
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
      dashboardLabels: [],
      dashboardData: [],
      isAutoRefreshing: false,
      autoRefreshingTiming: 5,
    }
  }

  /** a react life cycle method which is called when the component is
   * mounted to the web page and is used here to request the data that
   * is to be displayed from the API */
  componentDidMount() {
    this.handleDashboardChange(this.props.match.params.id)
    this.initSettings()
  }

  /** a react life cycle method which is called when the component will be unmounted,
   * used to clear some timers
   */
  componentWillUnmount() {
    this.autoRefreshingTimer && clearInterval(this.autoRefreshingTimer)
  }

  /** initialize some settings */
  initSettings = () => {
    /** auto refreshing */
    const isAutoRefreshing = getSettings('settings-auto-refreshing', false)
    const autoRefreshingTiming = getSettings(
      'settings-auto-refreshing-timing',
      this.state.autoRefreshingTiming
    )
    this.setState({ isAutoRefreshing, autoRefreshingTiming })
    if (isAutoRefreshing) {
      this.autoRefreshingTimer = setInterval(
        this.autoRefresh,
        this.state.autoRefreshingTiming * 1000
      )
    }
  }

  /** handler for auto-refreshing change */
  handleAutoRefreshingChange = checked => {
    this.setState({ isAutoRefreshing: checked })
    setSettings('settings-auto-refreshing', checked)
    if (checked) {
      message.success('Auto Refreshing On')
      this.autoRefreshingTimer = setInterval(
        this.autoRefresh,
        this.state.autoRefreshingTiming * 1000
      )
    } else {
      message.info('Auto Refreshing Off')
      this.autoRefreshingTimer && clearInterval(this.autoRefreshingTimer)
    }
  }

  /** handler for auto-refreshing timing change */
  handleAutoRefreshingTimingChange = second => {
    this.setState({ autoRefreshingTiming: second })
    setSettings('settings-auto-refreshing-timing', second)
    message.success('Auto Refresh Every ' + second + 's')
    if (this.state.isAutoRefreshing) {
      this.autoRefreshingTimer && clearInterval(this.autoRefreshingTimer)
      this.autoRefreshingTimer = setInterval(
        this.autoRefresh,
        this.state.autoRefreshingTiming * 1000
      )
    }
  }

  /** auto-refresh the dashboard */
  autoRefresh = () => {
    this.handleDashboardChange(this.props.match.params.id)
  }

  /** handler when dashboard changes  */
  handleDashboardChange = async dashboardId => {
    this.getDashboardData()
    const { feedback } = await this.getStatsData(dashboardId)
    this.glowNewFeedback(dashboardId, feedback)
  }

  /** glow new feedback received */
  glowNewFeedback = async (dashboardId, feedback) => {
    if (Object.values(this.state.filter).some(v => v !== null)) {
      return
    }
    const key = `dashboard-${dashboardId}`
    const oldFeedback = JSON.parse(localStorage.getItem(key))
    if (oldFeedback == null) {
      localStorage.setItem(key, JSON.stringify(feedback))
    } else {
      const oldFeedbackIds = oldFeedback.map(f => f.id)
      localStorage.setItem(key, JSON.stringify(feedback))
      const newFeedback = feedback.map(f => {
        if (!oldFeedbackIds.includes(f.id)) {
          f.glow = true
        }
        return f
      })
      this.setState({ feedbackList: newFeedback })
    }
  }

  /** a function which gets dashboard data from local states or the API */
  getDashboardData = async () => {
    let dashboardData = this.props.location.state
    if (dashboardData === undefined) {
      // need to be fetch
      dashboardData = await api
        .request('dashboards')
        .then(res => res._embedded.dashboardList)
    }
    this.setState({ dashboardData })
  }

  /** a function which requests stats data from the API */
  getStatsData = async dashboardId => {
    /** tell the user that page is loading the data by triggering the Spin component */
    this.setState({
      page: 1,
      isStatsLoading: true,
    })

    /** try to make the request for all the data and set the state upon success */
    let res
    try {
      res = await api.request('feedback_stats', {
        params: {
          dashboardId: dashboardId,
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
        dashboardLabels: res.dashboard_labels,
      })
    } catch (e) {
      console.error(e)
      message.error(e.toString())
    } finally {
      this.setState({
        isStatsLoading: false,
      })
    }
    return res
  }

  getFeedbackList = async (page = this.state.page) => {
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
    this.setState(
      {
        page,
      },
      () => {
        this.getFeedbackList(page)
      }
    )
  }

  // handles updating the dashboard stats when the user changes a filter
  handleFilterChange = filter => {
    this.setState(
      {
        filter,
      },
      () => {
        this.getStatsData(this.props.match.params.id)
      }
    )
  }

  /** handles a feedback changed in the feedback list */
  handleFeedbackChange = feedback => {
    // find this feedback by id and update it
    this.setState(prevState => ({
      feedbackList: prevState.feedbackList.map(f =>
        f.id === feedback.id ? feedback : f
      ),
    }))
  }

  /** handles a label edited or created */
  handleLabelEdit = (label, isNew = false) => {
    if (isNew) {
      // create
      this.setState(prevState => ({
        dashboardLabels: [...prevState.dashboardLabels, label],
      }))
    } else {
      // update
      this.setState(prevState => ({
        dashboardLabels: prevState.dashboardLabels.map(l =>
          l.labelId === label.labelId ? label : l
        ),
        // change all labels in feedback list
        feedbackList: prevState.feedbackList.map(f => {
          for (let i = 0; i < f.labels.length; i++) {
            if (f.labels[i].labelId === label.labelId) {
              f.labels[i] = label
            }
            break
          }
          return f
        }),
      }))
    }
  }

  /** handles a label deleted */
  handleLabelDelete = id => {
    this.setState(prevState => ({
      dashboardLabels: prevState.dashboardLabels.filter(l => l.labelId !== id),
    }))
  }

  render() {
    return (
      <BasicLayout
        // headerLeft={
        //   <Row type="flex" align="middle">
        //     <Button
        //       ghost
        //       shape="circle"
        //       icon="left"
        //       onClick={this.props.history.goBack}
        //     />
        //     <span style={{ marginLeft: 10 }}>{this.state.dashboardName}</span>
        //   </Row>
        // }
        headerLeft={
          <span style={{ fontWeight: 'bold', color: '#ccc', fontSize: 30 }}>
            {this.state.dashboardName}
          </span>
        }
        headerRight={
          <>
            <VolumeStats
              volume={this.state.feedbackCount}
              avgRating={this.state.feedbackAvgRating}
            />
            <Popover
              arrowPointAtCenter
              placement={'leftBottom'}
              content={
                <div>
                  <div>
                    <Switch
                      checked={this.state.isAutoRefreshing}
                      onChange={this.handleAutoRefreshingChange}
                    />{' '}
                    Auto Refreshing{' '}
                    <Icon
                      type="sync"
                      spin={this.state.isStatsLoading}
                      onClick={() => {
                        this.autoRefresh()
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <InputNumber
                      min={1}
                      value={this.state.autoRefreshingTiming}
                      onChange={this.handleAutoRefreshingTimingChange}
                    />{' '}
                    seconds
                  </div>
                </div>
              }
              title="Settings"
            >
              <Icon type="setting" style={{ color: '#eee', marginLeft: 15 }} />
            </Popover>
          </>
        }
        sider={
          <DashboardMenu
            dataSource={this.state.dashboardData}
            selectedId={this.props.match.params.id}
            onChange={this.handleDashboardChange}
            {...this.props}
          />
        }
        emptyBody
      >
        <Spin tip="Loading..." spinning={this.state.isStatsLoading} delay={300}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
            <Col span={6}>
              <Container title="Common Phrases">
                <MostCommonPhrases datamap={this.state.feedbackCommonPhrases} />
              </Container>
            </Col>
            <Col span={5}>
              <Container title="Sentiment Distribution">
                <SentimentDistribution
                  positive={this.state.sentimentCount.POSITIVE}
                  negative={this.state.sentimentCount.NEGATIVE}
                  neutral={this.state.sentimentCount.NEUTRAL}
                />
              </Container>
            </Col>
            <Col span={5}>
              <Container title="Rating Distribution">
                <RatingCountBreakdown count={this.state.ratingCount} />
              </Container>
            </Col>
            <Col span={8}>
              <Container title="Negative Feedback Distribution">
                <RatingPerDay data={this.state.negativePerDay} />
              </Container>
            </Col>
          </Row>
          <br />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
            <Col span={24}>
              <Container title="Filters">
                <Filtering
                  dashboardId={this.props.match.params.id}
                  labels={this.state.dashboardLabels}
                  onChange={this.handleFilterChange}
                  onLabelEdit={this.handleLabelEdit}
                  onLabelDelete={this.handleLabelDelete}
                />
              </Container>
              <br />
              <Container>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
                  <Col span={24}>
                    <FeedbackList
                      dashboardId={this.props.match.params.id}
                      labels={this.state.dashboardLabels}
                      dataSource={this.state.feedbackList}
                      loading={this.state.isFeedbackLoading}
                      total={this.state.feedbackCount}
                      page={this.state.page}
                      pageSize={this.state.pageSize}
                      onPageChange={this.handlePageChange}
                      onFeedbackChange={this.handleFeedbackChange}
                      onLabelEdit={this.handleLabelEdit}
                      onLabelDelete={this.handleLabelDelete}
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Spin>
      </BasicLayout>
    )
  }
}
