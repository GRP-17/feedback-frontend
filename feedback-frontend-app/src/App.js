import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./routes/Index/Index";
import Feedback from "./routes/Feedback/Feedback";
import Dashboard from "./routes/Dashboard/Dashboard";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Index} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
