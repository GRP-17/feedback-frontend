import React, { Component } from 'react'
import {
  List,
  message,
  Rate,
  Typography,
  Row,
  Card,
  Modal,
  Col,
  Popover,
  Tag,
  Icon,
} from 'antd'
import PropTypes from 'prop-types'
import PinnedIcon from './PinnedIcon'
import Labels from './Labels'
import SentimentIndicator from './SentimentIndicator'
import LabelSelect from '../LabelSelect/LabelSelect'
import { formatDate } from '../../../../utils/helper'
import api from '../../../../utils/Api'

const { Paragraph, Text } = Typography

export default class FeedbackList extends Component {
  /**
   * @prop {string} dashboardId - the dashboard id for this feedback list.
   * @prop {array} labels - the labels in this dashboard.
   * @prop {array} dataSource[] - an array of feedback objects.
   * @prop {number} total - the total number of feedback items in the database for this dashboard
   * @prop {func} onPageChange - a function which handles the updating of dataSource when a new page is selected
   * @prop {boolean} loading - display loading data on the list or not
   * @prop {number} page - the current page number (state is kept by the Dashboard component)
   */
  static propTypes = {
    dashboardId: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
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
    onFeedbackChange: PropTypes.func,
    onLabelEdit: PropTypes.func,
    onLabelDelete: PropTypes.func,
  }

  static defaultProps = {
    dashboardId: '',
    labels: [],
    dataSource: [],
    total: 0,
    onPageChange: page => {
      console.log(page)
    },
    onFeedbackChange: feedback => {
      console.log(feedback)
    },
    onLabelEdit: label => {
      console.log(label)
    },
    onLabelDelete: labelId => {
      console.log(labelId)
    },
    loading: false,
    page: 1,
    pageSize: 20,
  }

  constructor(props) {
    super(props)

    /**
     * the parameters for the state
     * @param {{}} currentFeedback - the current feedback object loaded into the Modal popup
     * @param {Boolean} isShowModal - whether to show the Modal popup or not
     * @param {Boolean} isShowPopover - whether to show the popover for label select
     */
    this.state = {
      currentFeedback: {},
      isShowModal: false,
      isShowPopover: false,
    }
  }

  /**
   * toggle pinned of the current feedback
   * and 'put' the updated value back into the database
   */
  handlePinnedChange = isPinned => {
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
          const res = await api.request('feedback', {
            data: {
              pinned: this.state.currentFeedback.pinned,
            },
            method: 'put',
            appendUrl: '/' + this.state.currentFeedback.id,
          })
          message.destroy()
          message.success(isPinned ? 'Pinned' : 'Unpinned')
          this.setState({ currentFeedback: res })
          this.props.onFeedbackChange(res)
        } catch (e) {
          message.destroy()
          message.error(e.toString())
        }
      }
    )
  }

  handleLabelDelete = async labelId => {
    try {
      const res = await api.request('feedback', {
        appendUrl: `/${this.state.currentFeedback.id}`,
        method: 'put',
        data: {
          labels: this.state.currentFeedback.labels.filter(
            label => label.labelId !== labelId
          ),
        },
      })
      message.loading('loading', 0)
      message.destroy()
      message.success('Deleted')
      this.setState({ currentFeedback: res })
      this.props.onFeedbackChange(res)
    } catch (e) {
      message.destroy()
      message.error(e.toString())
    }
  }

  handleLabelAssign = async labelIds => {
    // calculate needed labels (not duplicated)
    const newLabels = labelIds.map(id => ({ labelId: id }))
    const allLables = this.state.currentFeedback.labels.concat(newLabels)
    const accpetedLabels = []
    for (let label of allLables) {
      if (accpetedLabels.every(l => l.labelId !== label.labelId)) {
        accpetedLabels.push(label)
      }
    }

    try {
      const res = await api.request('feedback', {
        appendUrl: `/${this.state.currentFeedback.id}`,
        method: 'put',
        data: {
          labels: accpetedLabels,
        },
      })
      message.loading('loading', 0)
      message.destroy()
      message.success('Added')
      this.setState({ currentFeedback: res })
      this.props.onFeedbackChange(res)
    } catch (e) {
      message.destroy()
      console.error(e)
      message.error(e.toString())
    }
  }

  renderFeedbackTitle = feedback => {
    return (
      <Row type="flex" align="middle" justify="space-between">
        <Col>
          <Rate disabled value={feedback.rating} />
          <Text>{formatDate(feedback.created)}</Text>
        </Col>
        <Col>
          <SentimentIndicator sentiment={feedback.sentiment} />
          <PinnedIcon
            pinned={feedback.pinned}
            clickable={false}
            onPinnedChange={this.handlePinnedChange}
          />
        </Col>
      </Row>
    )
  }

  /**
   * used to specify how each list item should render/look
   * @param {{}} feedback each indurvidual feedback item in the list
   */
  renderFeedbackItem = feedback => {
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
          title={this.renderFeedbackTitle(feedback)}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            <Labels labels={feedback.labels} />
            <div>
              {feedback.text || (
                <span style={{ fontStyle: 'italic' }}>(No text)</span>
              )}
            </div>
          </div>
        </Card>
      </List.Item>
    )
  }

  renderLabelSelectPopOver = () => {
    const currentLabels = this.state.currentFeedback.labels || []
    const remainingLables = this.props.labels.filter(
      label => !currentLabels.map(l => l.labelId).includes(label.labelId)
    )

    return (
      remainingLables.length > 0 && (
        <Popover
          content={
            <div style={{ width: 300 }}>
              <LabelSelect
                mode="assign"
                dashboardId={this.props.dashboardId}
                labels={remainingLables}
                onChange={val => {
                  this.handleLabelAssign(val)
                }}
                onLabelEdit={this.props.onLabelEdit}
                onLabelDelete={this.props.onLabelDelete}
              />
            </div>
          }
          trigger="click"
          onVisibleChange={visible => {
            this.setState({ isShowPopover: visible })
          }}
          visible={this.state.isShowPopover}
        >
          <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Label
          </Tag>
        </Popover>
      )
    )
  }
  renderModal = () => {
    const feedback = this.state.currentFeedback
    return (
      <Modal
        title={
          <div style={{ marginRight: 50 }}>
            {this.renderFeedbackTitle(feedback)}
          </div>
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
        <div style={{ marginBottom: 10 }}>
          <Labels
            labels={feedback.labels}
            editable
            onLabelDelete={this.handleLabelDelete}
          />
          {this.renderLabelSelectPopOver()}
        </div>

        <Paragraph>
          {feedback.text || (
            <span style={{ fontStyle: 'italic' }}>(No text)</span>
          )}
        </Paragraph>
      </Modal>
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
          renderItem={feedback => this.renderFeedbackItem(feedback)}
          pagination={{
            current: this.props.page,
            pageSize: this.props.pageSize,
            total: this.props.total,
            onChange: this.props.onPageChange,
            position: 'top',
          }}
          loading={this.props.loading}
        />

        {this.renderModal()}
      </>
    )
  }
}
