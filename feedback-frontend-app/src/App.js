import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Feedback from "./routes/Feedback/Feedback";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/feedback" component={Feedback} />
      </div>
    </Router>
  );
};

const Home = () => (
  <Link to="/feedback">
    <h1>Feedback</h1>
  </Link>
);

export default App;
