import React from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

export default function Sider(props) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={isCollapsed => {
        setCollapsed(isCollapsed)
        props.onCollapse(isCollapsed)
      }}
      breakpoint="md"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 1,
      }}
    >
      {props.children}
    </Layout.Sider>
  )
}

Sider.defaultProps = {
  onCollapse: () => {},
}

Sider.propTypes = {
  onCollapse: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}
