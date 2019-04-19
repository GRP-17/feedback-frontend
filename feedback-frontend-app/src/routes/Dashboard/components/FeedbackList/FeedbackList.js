import React, { Component } from 'react'
import { List, message, Rate, Typography, Row, Card, Modal, Col } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import Title from 'antd/lib/typography/Title'
import PinnedIcon from './PinnedIcon/PinnedIcon'
import api from '../../../../utils/Api'

const { Paragraph, Text } = Typography

export default class FeedbackList extends Component {
  /**
   * @prop {array} dataSource[] - an array of feedback objects.
   * @prop {number} totalVolume - the total number of feedback items in the database for this dashboard
   * @prop {func} onChangePage - a function which handles the updating of dataSource when a new page is selected
   * @prop {boolean} loading - display loading dat on the list or not
   * @prop {number} page - the current page number (state is kept by the Dashboard component)
   */
  static propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        created: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        sentiment: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    totalVolume: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    /**
     * the parameters for the state
     * @param {{}} currentFeedback - the current feedback object loaded into the Modal popup
     * @param {Boolean} isShowModal - whether to show the Modal popup or not
     */
    this.state = {
      currentFeedback: {},
      isShowModal: false,
    }
    this.onPinnedChanged = this.onPinnedChanged.bind(this)
  }

  /**
   *   Lifecycle method that is called when the props are updated
   *   and used here to set the current feedback when the props with data are passed
   */

  componentDidUpdate(prevProps) {
    if (
      this.props.dataSource !== prevProps.dataSource &&
      this.props.dataSource.length !== 0
    ) {
      this.setState({
        currentFeedback: this.props.dataSource[0],
      })
    }
  }

  /**
   * toggle pinned of the current feedback
   * and 'put' the updated value back into the database
   */

  onPinnedChanged() {
    var upFeedback = this.state.currentFeedback
    upFeedback.pinned = !this.state.currentFeedback.pinned
    this.setState({
      currentFeedback: upFeedback,
    })

    try {
      api.request('feedback', {
        params: {
          pinned: this.state.currentFeedback.pinned,
        },
        method: 'put',
        appendUrl: '/' + this.state.currentFeedback.id,
      })
    } catch (e) {
      message.error(e.toString())
    }
  }

  /**
   * used to specify how each list item should render/look
   * @param {{}} feedback each indurvidual feedback item in the list
   */
  renderItem(feedback) {
    const sentiment2color = {
      POSITIVE: '#2b9588',
      NEUTRAL: '#eee',
      NEGATIVE: '#e44a5b',
    }

    const openModal = () => {
      this.setState({
        currentFeedback: feedback,
        isShowModal: true,
      })
    }

    return (
      <List.Item>
        <Card
          type="inner"
          size="small"
          hoverable
          onClick={openModal}
          title={
            <>
              <Row type="flex" align="middle" justify="end">
                <div
                  style={{
                    backgroundColor: sentiment2color[feedback.sentiment],
                    height: 10,
                    width: 10,
                    borderRadius: '50%',
                    marginRight: 5,
                  }}
                />
                <PinnedIcon
                  pinned={feedback.pinned}
                  size="small"
                  onPinnedChanged={this.onPinnedChanged}
                  clickable={false}
                />
              </Row>
              <Row type="flex" align="middle">
                <Rate disabled value={feedback.rating} />
                <Text>
                  {moment(feedback.created).format('YYYY/MM/DD HH:mm')}{' '}
                </Text>
              </Row>
            </>
          }
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            {feedback.text || (
              <span style={{ fontStyle: 'italic' }}>(No text)</span>
            )}
          </div>
        </Card>
      </List.Item>
    )
  }

  render() {
    return (
      <>
        <List
          grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
          header="FEEDBACK"
          itemLayout="vertical"
          dataSource={this.props.dataSource}
          locale={{
            emptyText: <div style={{ fontStyle: 'italic' }}>No feedback</div>,
          }}
          renderItem={feedback => this.renderItem(feedback)}
          pagination={{
            current: this.props.page,
            pageSize: 20,
            total: this.props.totalVolume,
            onChange: this.props.onChangePage,
            position: 'top',
          }}
        />

        <Modal
          title={
            <Row type="flex">
              <Col span={20}>
                <Title level={4}>FEEDBACK DETAILS</Title>
              </Col>
              <Col span={4}>
                <PinnedIcon
                  pinned={this.state.currentFeedback.pinned}
                  onPinnedChanged={this.onPinnedChanged}
                  clickable={true}
                  size="medium"
                  style={{ cursor: 'pointer' }}
                />
              </Col>
            </Row>
          }
          visible={this.state.isShowModal}
          centered
          footer={null}
          onCancel={() => {
            this.setState({
              isShowModal: false,
            })
            this.props.onChangePage()
          }}
        >
          <Paragraph>
            {this.state.currentFeedback.text || (
              <span style={{ fontStyle: 'italic' }}>(No text)</span>
            )}
          </Paragraph>
        </Modal>
      </>
    )
  }
}
