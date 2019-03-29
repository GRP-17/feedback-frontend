import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import BasicLayout from '../../layouts/BasicLayout/BasicLayout'
import DashboardList from './components/DashboardList/DashboardList'
import api from '../../utils/Api'

export default props => {
  const [dashboards, setDashboards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDashboards = async () => {
      setIsLoading(true)
      const dashboards = await api
        .request('dashboards')
        .then(res => res._embedded.dashboardList)
      setDashboards(dashboards)
      setIsLoading(false)
    }
    fetchDashboards()
  }, [])

  return (
    <BasicLayout header="Feedback Analysis">
      <Spin tip="Loading..." spinning={isLoading}>
        <DashboardList dataSource={dashboards} />
      </Spin>
    </BasicLayout>
  )
}
