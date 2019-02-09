import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Cell,
  Tooltip
} from "recharts";
import PropTypes from "prop-types";

export default function RatingCountBreakdown(props) {
    RatingCountBreakdown.propTypes = {
        count: PropTypes.shape({
            one: PropTypes.number,
            two: PropTypes.number,
            three: PropTypes.number,
            four: PropTypes.number,
            five: PropTypes.number,
        })
    }

    return (
        <BarChart
            width={500}
            height={150}
            data={[
            { rating: "Five", count: props.count.five },
            { rating: "Four", count: props.count.four },
            { rating: "Three", count: props.count.three },
            { rating: "Two", count: props.count.two },
            { rating: "One", count: props.count.one },
            ]}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
                <Cell fill="#249688" />
                <Cell fill="#03cfb7" />
                <Cell fill="#f8a932" />
                <Cell fill="#ff8a70" />
                <Cell fill="#e74858" />
            </Bar>
        </BarChart>
    );
}