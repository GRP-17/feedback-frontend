import React, { Component } from 'react'
import { List, message, Rate, Typography, Row, Card, Modal, Col } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import Title from 'antd/lib/typography/Title'
import PinnedIcon from './PinnedIcon/PinnedIcon'
import api from '../../../../utils/Api'

const { Paragraph, Text } = Typography

export default class FeedbackList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentFeedback: {},
      isShowModal: false,
      updatingData: false,
    }
    this.onPinnedChanged = this.onPinnedChanged.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({
        currentFeedback: this.props.dataSource[0],
      })
    }
  }

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
    dashboardId: PropTypes.string.isRequired,
  }

  // toggle pinned of the current feedback
  onPinnedChanged() {
    var upFeedback = this.state.currentFeedback
    upFeedback.pinned = !this.state.currentFeedback.pinned
    this.setState({
      currentFeedback: upFeedback,
      updatingData: true,
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
    } finally {
      this.setState({
        updatingData: false,
      })
    }
  }

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
                <Rate disabled defaultValue={feedback.rating} />
                <Text>
                  {' '}
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
          confirmLoading={this.state.updatingData}
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
