import React from 'react'

import { Typography, Layout } from 'antd'

import PropTypes from 'prop-types'

const { Title } = Typography
const { Header, Content } = Layout

/**
 * Defines a layout that will be used to set component styles
 * for the multiple pages, from this one location.
 */
export default function BasicLayout(props) {
  /**
   * @prop header - the content to put in the header (name etc...)
   * @prop children - the main page body/content
   */
  BasicLayout.propTypes = {
    header: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
  }

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
