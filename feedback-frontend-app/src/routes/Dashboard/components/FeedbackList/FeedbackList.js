import React, { Component } from 'react'
import { List, message, Rate, Typography, Row, Card, Modal, Col } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import Title from 'antd/lib/typography/Title'
import PinnedIcon from './PinnedIcon'
import Labels from './Labels'
import api from '../../../../utils/Api'

const { Paragraph, Text } = Typography

export default class FeedbackList extends Component {
  /**
   * @prop {array} dataSource[] - an array of feedback objects.
   * @prop {number} total - the total number of feedback items in the database for this dashboard
   * @prop {func} onPageChange - a function which handles the updating of dataSource when a new page is selected
   * @prop {boolean} loading - display loading data on the list or not
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
    total: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
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
  }

  /**
   * toggle pinned of the current feedback
   * and 'put' the updated value back into the database
   */
  handlePinnedChange = () => {
    this.setState(
      prevState => ({
        currentFeedback: {
          ...prevState.currentFeedback,
          pinned: !prevState.currentFeedback.pinned,
        },
      }),
      async () => {
        message.loading('Loading...', 0)
        try {
          await api.request('feedback', {
            data: {
              pinned: this.state.currentFeedback.pinned,
            },
            method: 'put',
            appendUrl: '/' + this.state.currentFeedback.id,
          })
          message.destroy()
          message.success('Success!')
        } catch (e) {
          message.destroy()
          message.error(e.toString())
        }
      }
    )
  }

  /**
   * used to specify how each list item should render/look
   * @param {{}} feedback each indurvidual feedback item in the list
   */
  renderItem = feedback => {
    const sentiment2color = {
      POSITIVE: '#2b9588',
      NEUTRAL: '#eee',
      NEGATIVE: '#e44a5b',
    }

    return (
      <List.Item>
        <Card
          type="inner"
          size="small"
          hoverable
          onClick={() => {
            this.setState({
              currentFeedback: feedback,
              isShowModal: true,
            })
          }}
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
                  clickable={false}
                  onPinnedChange={this.handlePinnedChange}
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
          <Labels labels={feedback.labels} />
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
            pageSize: this.props.pageSize,
            total: this.props.total,
            onChange: this.props.onPageChange,
            position: 'top',
          }}
          loading={this.props.loading}
        />

        <Modal
          title={
            <Row type="flex">
              <Col span={20}>
                <Title level={4}>FEEDBACK DETAILS</Title>
              </Col>
              <Col span={4}>
                <PinnedIcon
                  pinned={this.state.currentFeedback.pinned || false}
                  onPinnedChange={this.handlePinnedChange}
                  clickable={true}
                  size="medium"
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
