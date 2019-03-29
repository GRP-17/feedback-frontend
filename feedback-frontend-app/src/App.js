import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './routes/Home/Home'
import Dashboard from './routes/Dashboard/Dashboard'
import './App.css'

export default () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard/:id" component={Dashboard} />
      </div>
    </Router>
  )
}
