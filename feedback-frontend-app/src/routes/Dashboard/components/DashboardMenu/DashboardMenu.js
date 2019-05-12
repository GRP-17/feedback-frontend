import React from 'react'
import { Menu, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'

export default function DashboardList(props) {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[props.selectedId]}
      onClick={item => {
        if (item.key !== 'home' && item.key !== props.selectedId) {
          props.onChange(item.key)
        }
      }}
    >
      <Menu.Item
        key="home"
        // style={{ height: 52 }}
      >
        <Link to="/">
          <Icon type="home" />
          <span>Home</span>
        </Link>
      </Menu.Item>

      {props.dataSource.map(d => (
        <Menu.Item key={d.id}>
          <Link
            to={{
              pathname: `/dashboard/${d.id}`,
              state: props.location.state,
            }}
          >
            <Avatar
              className="anticon"
              size="small"
              style={{
                background: '#000',
                marginRight: 5,
                zIndex: 10,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {d.name[0]}
            </Avatar>

            <span className="nav-text">{d.name}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

DashboardList.defaultProps = {
  dataSource: [],
  selectedId: '',
  onChange: () => {},
}
