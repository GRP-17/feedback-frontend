import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

export default function FeedbackAvgRating(props) {
    FeedbackAvgRating.propTypes = {
        avgrating: PropTypes.number.isRequired
    };

    return (
        <Card title = "Average Rating" style = {{ width: 300 }}>
            <h2>{props.avgrating}</h2>
        </Card>
    );
}
