import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard/Dashboard";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
