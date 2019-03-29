import React from 'react'

import { Typography, Layout } from 'antd'

const { Title } = Typography
const { Header, Content } = Layout

export default props => {
  return (
    <Layout>
      <Header>
        <Title level={1} style={{ color: '#fff' }}>
          {props.header}
        </Title>
      </Header>
      <Content style={{ padding: 25 }}>
        <div style={{ background: '#fff', padding: 25, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
    </Layout>
  )
}
