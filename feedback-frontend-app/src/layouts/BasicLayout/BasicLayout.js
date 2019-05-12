import React from 'react'
import { Typography, Layout } from 'antd'
import PropTypes from 'prop-types'
import Header from './../Header/Header'
import Sider from './../Sider/Sider'

const { Title } = Typography
const { Content } = Layout

/**
 * Defines a layout that will be used to set component styles
 * for the multiple pages, from this one location.
 */
export default function BasicLayout(props) {
  const [marginLeft, setMarginLeft] = React.useState(200)

  return (
    <Layout>
      {props.sider && (
        <Sider
          onCollapse={isCollapsed => {
            setMarginLeft(isCollapsed ? 80 : 200)
          }}
        >
          {props.sider}
        </Sider>
      )}

      <Layout
        style={{
          marginLeft: props.sider ? marginLeft : 0,
          transition: 'margin-left 0.1s ease-in-out',
        }}
      >
        <Header left={props.headerLeft} right={props.headerRight} />
        <Content style={{ padding: 25 }}>
          {props.emptyBody ? (
            props.children
          ) : (
            <div style={{ background: '#fff', padding: 25, minHeight: 280 }}>
              {props.children}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

/**
 * @prop headerLeft - the content to put in the left-side header
 * @prop headerRight - the content to put in the right-side header
 * @prop children - the main page body/content
 * @prop sider - the content to put in the sider
 * @prop emptyBody - whether or not the body should be empty
 */
BasicLayout.propTypes = {
  headerLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  headerRight: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sider: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  emptyBody: PropTypes.bool,
}

BasicLayout.defaultProps = {
  emptyBody: false,
}
