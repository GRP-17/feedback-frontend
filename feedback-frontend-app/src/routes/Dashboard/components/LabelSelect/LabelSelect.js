import React from 'react'
import { Select, Button, Modal, Input, Row, Col, message } from 'antd'
import ColorPicker from './ColorPicker'
import PropTypes from 'prop-types'
import { calcTextColor, getRandomColor } from '../../../../utils/helper'
import api from '../../../../utils/Api'

const ButtonGroup = Button.Group

export default function LabelSelect(props) {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [labelName, setLabelName] = React.useState('')
  const [labelColor, setLabelColor] = React.useState(getRandomColor())
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedLabelId, setSelectedLabelId] = React.useState(null)
  const [value, setValue] = React.useState([])

  const closeModal = () => {
    // setSelectedLabelId(null)
    // setLabelColor(getRandomColor())
    // setLabelName('')
    setIsModalVisible(false)
  }

  const openModal = (color = getRandomColor(), name = '', labelId = null) => {
    setSelectedLabelId(labelId)
    setLabelColor(color)
    setLabelName(name)
    setIsModalVisible(true)
  }

  const handleLabelSubmit = async () => {
    setIsLoading(true)
    try {
      let label
      const isNew = selectedLabelId === null
      if (isNew) {
        // new
        label = await api.request('labels', {
          method: 'POST',
          data: {
            dashboardId: props.dashboardId,
            color: labelColor,
            name: labelName,
          },
        })
        props.onLabelEdit(label, isNew)
      } else {
        // update
        label = await api.request('labels', {
          method: 'PUT',
          appendUrl: `/${selectedLabelId}`,
          data: {
            color: labelColor,
            name: labelName,
          },
        })
        props.onLabelEdit(label, isNew)
      }
      setIsLoading(false)
      closeModal()
    } catch (e) {
      console.error(e)
      message.error(e.toString())
      setIsLoading(false)
    }
  }

  const handleLabelDelete = async id => {
    Modal.confirm({
      title: 'Are you sure delete this label?',
      content: 'This operation cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      onOk: () => {
        return new Promise(async resolve => {
          try {
            await api.request(`labels`, {
              method: 'delete',
              appendUrl: `/${id}`,
            })
          } catch (e) {
            console.error(e)
            message.error(e.toString())
          }
          resolve()
          props.onLabelDelete(id)
        })
      },
      onCancel: () => {
        console.log('Cancel')
      },
    })
  }

  const renderAddLabelModal = () => {
    const hintText = !selectedLabelId ? 'Add' : 'Update'
    return (
      <Modal
        centered
        title={`${hintText} Label`}
        visible={isModalVisible}
        // onOk={this.handleOk}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleLabelSubmit}
            disabled={!labelName}
          >
            {hintText}
          </Button>,
        ]}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          type="flex"
          justify="space-between"
          align="middle"
        >
          <Col span={6}>
            <ColorPicker
              color={labelColor}
              onChange={val => {
                setLabelColor(val.hex)
              }}
            />
          </Col>
          <Col span={18}>
            <Input
              placeholder="Label Name"
              maxLength={30}
              onChange={e => {
                setLabelName(e.target.value)
              }}
              value={labelName}
            />
          </Col>
        </Row>
      </Modal>
    )
  }

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Labels"
        allowClear
        showArrow
        notFoundContent="No labels yet."
        dropdownRender={menu => (
          <div>
            {menu}
            {props.mode === 'filter' && (
              <Button
                block
                onMouseDown={() => {
                  openModal()
                }}
                icon="plus"
              >
                Add label
              </Button>
            )}
            {props.mode === 'assign' && (
              <ButtonGroup style={{ display: 'flex' }}>
                <Button
                  style={{ flex: 1 }}
                  block
                  onMouseDown={() => {
                    openModal()
                  }}
                  icon="plus"
                >
                  Add label
                </Button>
                <Button
                  style={{ flex: 2 }}
                  block
                  type="primary"
                  onMouseDown={() => {
                    // submit && clear selected labels
                    setValue([])
                    props.onChange(value)
                  }}
                >
                  Confirm
                </Button>
              </ButtonGroup>
            )}
          </div>
        )}
        value={props.value || value}
        onChange={val => {
          setValue(val)
          props.mode === 'filter' && props.onChange(val)
        }}
        optionLabelProp="label"
      >
        {props.labels.map(opt => {
          const showedLabel = (
            <span
              style={{
                color: calcTextColor(opt.color),
                background: opt.color,
                padding: 5,
                borderRadius: 5,
              }}
            >
              {opt.name}
            </span>
          )
          return (
            <Select.Option
              value={opt.labelId}
              key={opt.labelId}
              label={showedLabel}
            >
              <Button
                style={{ marginRight: 5 }}
                size="small"
                shape="circle"
                icon="edit"
                onClick={e => {
                  e.stopPropagation()
                  openModal(opt.color, opt.name, opt.labelId)
                }}
              />
              <Button
                type="danger"
                size="small"
                shape="circle"
                icon="delete"
                onClick={e => {
                  e.stopPropagation()
                  handleLabelDelete(opt.labelId)
                }}
              />
              <span style={{ marginLeft: 5 }}>{showedLabel}</span>
            </Select.Option>
          )
        })}
      </Select>

      {renderAddLabelModal()}
    </>
  )
}

LabelSelect.propTypes = {
  mode: PropTypes.string,
  dashboardId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onLabelEdit: PropTypes.func,
  onLabelDelete: PropTypes.func,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      labelId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.arrayOf(PropTypes.string),
}

LabelSelect.defaultProps = {
  mode: 'filter', // assign, filter
  dashboardId: null,
  onChange: val => {
    console.log(val)
  },
  onLabelEdit: label => {
    console.log(label)
  },
  onLabelDelete: labelId => {
    console.log(labelId)
  },
  labels: [],
  value: null,
}
