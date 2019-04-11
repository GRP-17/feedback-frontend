import React from 'react'
import { Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * A simple functional component to display the data for each dashboard,
 * as its own card, which it recieves though the *dataSource* prop.
 */
export default function DashboardList(props) {
  DashboardList.propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }

  return (
    /** uses antd (a user interface library which has a variety of predefined components for UI's) */
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
      {/** .map is used to create a column and card for each entry/dashboard */}
      {props.dataSource.map(d => (
        <Col span={8} key={d.id}>
          {/** gives the link that will take you to the correct dashboard when the card is clicked */}
          <Link to={`/dashboard/${d.id}`}>
            <Card hoverable style={{ background: '#eee' }}>
              {d.name}
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
