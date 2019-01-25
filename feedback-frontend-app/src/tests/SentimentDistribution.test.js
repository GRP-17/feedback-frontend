import Enzyme, { shallow } from "enzyme";
import SentimentDistribution from "../routes/Dashboard/components/SentimentDistribution/SentimentDistribution";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Cell,
  Tooltip
} from "recharts";
import Item from "antd/lib/list/Item";

Enzyme.configure({ adapter: new Adapter() });

function setup(props) {
  const enzymeWrapper = shallow(<SentimentDistribution {...props} />, {
    disableLifecycleMethods: true
  });
  return enzymeWrapper;
}

const props = {
  positive: 1,
  negative: 2,
  neutral: 3
};

var eWrap = setup(props);

describe("FeedbackList", () => {
  beforeEach(() => {
    eWrap = setup(props);
  });

  describe("Default", () => {
    it("should render self and sub components", () => {
      expect(eWrap.find(BarChart).length).toBe(1);
      expect(eWrap.find(CartesianGrid).length).toBe(1);
      expect(eWrap.find(XAxis).length).toBe(1);
      expect(eWrap.find(YAxis).length).toBe(1);
      expect(eWrap.find(Tooltip).length).toBe(1);
      expect(eWrap.find(Bar).length).toBe(1);
      expect(eWrap.find(Cell).length).toBe(3);
    });

    it("should pass in the correct props to the subcomponents", () => {
      //BarChart
      const data = [
        {
          sentiment: "Positive",
          count: props.positive
        },
        {
          sentiment: "Neutral",
          count: props.neutral
        },
        {
          sentiment: "Negative",
          count: props.negative
        }
      ];

      expect(eWrap.find(BarChart).props().data).toEqual(data);
    });
  });
});
