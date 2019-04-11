import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import BasicLayout from '../../layouts/BasicLayout/BasicLayout'
import DashboardList from './components/DashboardList/DashboardList'
import api from '../../utils/Api'

/**
 * The main landing page for the frontend, from which the
 * user can choose which dashboard they want to see the analitics for.
 */
export default props => {
  /**
   * Define React hooks, which allow you to keep and update state
   * without converting to a class component.
   * Essentially allow use of state in functional components,
   * by defining a variable and functions to update and retrieve that variable.
   *
   * [*current state of the variable*, *function to update the state*] = useState(*initial_value*)
   */
  const [dashboards, setDashboards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  /**
   * The useEffects function allows you to perform side effects in functional components
   * (do some computation... can't normally do any in function components).
   *
   * Fetchs the data for the Home page (what dashboard there are) from the API
   * and then updates the state.
   */
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
