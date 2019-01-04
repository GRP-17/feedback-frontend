import React from "react";
import { Link } from "react-router-dom";

const Index = () => (
  <>
    <Link to="/dashboard">
      <h1>Dashboard</h1>
    </Link>
    <Link to="/feedback">
      <h1>Feedback</h1>
    </Link>
  </>
);

export default Index;
