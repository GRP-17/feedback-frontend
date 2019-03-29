import React from 'react'
import { Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
      {props.dataSource.map(d => (
        <Col span={8} key={d.id}>
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
