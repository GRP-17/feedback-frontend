import React from "react";
import { Card } from "antd";

export default props => {
  return (
    <Card title="VOLUME" style={{ width: 300 }}>
      <h2>{props.volume}</h2>
    </Card>
  );
};
