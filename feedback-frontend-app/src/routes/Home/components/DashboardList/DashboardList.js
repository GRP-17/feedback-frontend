import React from 'react'
import { Row, Col, Card, Modal, Input, message, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../../../utils/Api'

/**
 * A simple functional component to display the data for each dashboard,
 * as its own card, which it recieves though the *dataSource* prop.
 */
export default function DashboardList(props) {
  const [isShowModal, setIsShowModal] = React.useState(false)
  const [isConfrimLoading, setIsConfrimLoading] = React.useState(false)
  const [newDashboardName, setNewDashboardName] = React.useState('')
  const [selectedDashboardId, setSelectedDashboardId] = React.useState('')

  const handleDashboardCreate = async () => {
    try {
      setIsConfrimLoading(true)

      if (selectedDashboardId) {
        // update
        await api.request('dashboards', {
          method: 'put',
          appendUrl: `/${selectedDashboardId}`,
          data: {
            name: newDashboardName,
          },
        })
      } else {
        // create
        await api.request('dashboards', {
          method: 'post',
          data: {
            name: newDashboardName,
          },
        })
      }

      setIsConfrimLoading(false)
      setIsShowModal(false)
      setSelectedDashboardId('')

      props.onDataChange()
    } catch (e) {
      message.error(e.toString())
      setIsConfrimLoading(false)
    }
  }

  const renderCol = (children, key) => {
    return (
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={8}
        xl={8}
        xxl={6}
        key={key}
        style={{ margin: '10px 0', height: 120 }}
      >
        {children}
      </Col>
    )
  }

  const handleDashboardDelete = id => {
    Modal.confirm({
      title: 'Are you sure delete this dashboard?',
      content:
        'All the data in this dashbaord will be deleted. This operation cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      onOk: () => {
        return new Promise(async resolve => {
          try {
            await api.request(`dashboards`, {
              method: 'delete',
              appendUrl: `/${id}`,
            })
          } catch (e) {
            console.error(e)
            message.error(e.toString())
          }
          resolve()
          props.onDataChange()
        })
      },
      onCancel: () => {
        console.log('Cancel')
      },
    })
  }

  const renderModel = () => {
    /** The modal for adding a new dashboard */
    const hintText = !selectedDashboardId ? 'Add' : 'Update'
    return (
      <Modal
        title={`${hintText} Dashboard`}
        visible={isShowModal}
        onCancel={() => {
          setIsShowModal(false)
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsShowModal(false)
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isConfrimLoading}
            onClick={handleDashboardCreate}
            disabled={!newDashboardName}
          >
            {hintText}
          </Button>,
        ]}
      >
        <div>
          <Input
            placeholder="Dashboard name..."
            maxLength={100}
            onChange={e => {
              setNewDashboardName(e.target.value)
            }}
            value={newDashboardName}
          />
        </div>
      </Modal>
    )
  }

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex">
      {props.dataSource.map(d =>
        renderCol(
          <Link
            to={{
              pathname: `/dashboard/${d.id}`,
              state: props.dataSource,
            }}
          >
            <Card
              hoverable
              style={{ background: '#eee' }}
              actions={[
                <Icon
                  type="edit"
                  onClick={e => {
                    e.preventDefault()
                    setNewDashboardName(d.name)
                    setSelectedDashboardId(d.id)
                    setIsShowModal(true)
                  }}
                />,
                <Icon
                  type="delete"
                  onClick={e => {
                    e.preventDefault()
                    handleDashboardDelete(d.id)
                  }}
                />,
                <Icon type="eye" />,
              ]}
            >
              {d.name}
            </Card>
          </Link>,
          d.id
        )
      )}

      {/** Button to add a new dashboard */}
      {renderCol(
        <Card
          hoverable
          style={{
            background: '#fff',
            border: 'dashed 2px #eee',
            height: 120,
          }}
          onClick={() => {
            setNewDashboardName('')
            setSelectedDashboardId('')
            setIsShowModal(true)
          }}
        >
          <Row type="flex" align="middle" justify="center">
            <Icon
              type="plus-circle"
              theme="filled"
              style={{ fontSize: 50, color: '#1890ff' }}
            />
          </Row>
        </Card>
      )}

      {renderModel()}
    </Row>
  )
}

DashboardList.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  onDataChange: PropTypes.func,
}

DashboardList.defaultProps = {
  dataSource: [],

  /** because the backend doesn't return new created dashboard info,
   * this comes to a temp solution:
   * just notify the parent component to refresh the data source
   */
  onDataChange: () => {},
}
