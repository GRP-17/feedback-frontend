import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

export default function FeedbackVolume(props) {
  FeedbackVolume.propTypes = {
    volume: PropTypes.number.isRequired
  };

  return (
    <Card title="VOLUME" style={{ width: 300 }}>
      <h2>{props.volume}</h2>
    </Card>
  );
}
