import React, { useState } from 'react'
import { List, Rate, Typography, Row, Card, Modal } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

const { Paragraph, Text } = Typography

export default function FeedbackList(props) {
  FeedbackList.propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        created: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        sentiment: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    totalVolume: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
  }

  const [currentFeedback, setCurrentFeedback] = useState({})
  const [isShowModal, setIsShowModal] = useState(false)

  const renderItem = feedback => {
    const sentiment2color = {
      POSITIVE: '#2b9588',
      NEUTRAL: '#eee',
      NEGATIVE: '#e44a5b',
    }

    const openModal = () => {
      setCurrentFeedback(feedback)
      setIsShowModal(true)
    }

    return (
      <List.Item>
        <Card
          type="inner"
          size="small"
          hoverable
          onClick={openModal}
          title={
            <Row type="flex" align="middle">
              <div
                style={{
                  backgroundColor: sentiment2color[feedback.sentiment],
                  height: 10,
                  width: 10,
                  borderRadius: '50%',
                  marginRight: 5,
                }}
              />
              <Rate disabled defaultValue={feedback.rating} />
              <Text>{moment(feedback.created).format('YYYY/MM/DD HH:mm')}</Text>
            </Row>
          }
        >
          {/*<Paragraph ellipsis={{ rows: 2, expandable: true }}>*/}
          <div style={{ height: 100, overflow: 'scroll' }}>
            {feedback.text || (
              <span style={{ fontStyle: 'italic' }}>(No text)</span>
            )}
          </div>
          {/*</Paragraph>*/}
        </Card>
      </List.Item>
    )
  }

  return (
    <>
      <List
        grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
        header="FEEDBACK"
        itemLayout="vertical"
        dataSource={props.dataSource}
        locale={{
          emptyText: <div style={{ fontStyle: 'italic' }}>No feedback</div>,
        }}
        renderItem={feedback => renderItem(feedback)}
        pagination={{
          pageSize: 20,
          total: props.totalVolume,
          onChange: props.onChangePage,
        }}
      />
      <Modal
        title="FEEDBACK DETAIL"
        visible={isShowModal}
        centered
        footer={null}
        onCancel={() => {
          setIsShowModal(false)
        }}
      >
        <Paragraph>
          {currentFeedback.text || (
            <span style={{ fontStyle: 'italic' }}>(No text)</span>
          )}
        </Paragraph>
      </Modal>
    </>
  )
}
