import React from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from './logo.png'

export default function Header(props) {
  return (
    <Layout.Header
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          height: 50,
          margin: '7 0',
          overflow: 'hidden',
        }}
      >
        {props.left}
      </div>

      {props.children || (
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{
              boxSizing: 'border-box',
              width: 160,
              height: 31,
              margin: '16 24 16 0',
            }}
          />
        </Link>
      )}

      <div
        style={{
          height: 50,
          margin: '7 0',
          overflow: 'hidden',
        }}
      >
        {props.right}
      </div>
    </Layout.Header>
  )
}

Headers.propTypes = {
  left: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}
