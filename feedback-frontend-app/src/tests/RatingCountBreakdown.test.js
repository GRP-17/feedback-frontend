import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { BarChart } from "recharts";
import RatingCountBreakdown from "../routes/Dashboard/components/RatingCountBreakdown/RatingCountBreakdown";
Enzyme.configure({ adapter: new Adapter() });

function setup(dataSource) {
  const enzymeWrapper = shallow(<RatingCountBreakdown count={dataSource} />, {
    disableLifecycleMethods: true
  });
  return enzymeWrapper;
}

// given
const defaultCount = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

// expected
const defaultDataSource = [
  { rating: "Five", count: defaultCount[5] },
  { rating: "Four", count: defaultCount[4] },
  { rating: "Three", count: defaultCount[3] },
  { rating: "Two", count: defaultCount[2] },
  { rating: "One", count: defaultCount[1] }
];

var eWrap = setup(defaultCount);

describe("FeedbackList", () => {
  beforeEach(() => {
    eWrap = setup(defaultCount);
  });

  describe("Default", () => {
    it("Should render self and subcomponents", () => {
      //check each component is present in the render
      expect(eWrap.find(BarChart).length).toBe(1);
    });

    it("should pass correct props to the List", () => {
      //dataSource
      expect(eWrap.find(BarChart).props().data).toEqual(defaultDataSource);
    });
  });
});
