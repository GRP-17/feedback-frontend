import Enzyme, { shallow } from "enzyme";
import FeedbackList from "../routes/Dashboard/components/FeedbackList/FeedbackList";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { List } from "antd";

Enzyme.configure({ adapter: new Adapter() });

function setup(dataSource) {
  const enzymeWrapper = shallow(<FeedbackList dataSource={dataSource} />, {
    disableLifecycleMethods: true
  });
  return enzymeWrapper;
}

const defaultDataSource = [
  {
    rating: 5,
    text: "Hello World",
    sentiment: "Positive"
  },
  {
    rating: 1,
    text: "No",
    sentiment: "Negative"
  },
  {
    rating: 3,
    text: "Neutral",
    sentiment: "Neutral"
  }
];

var eWrap = setup(defaultDataSource);

describe("FeedbackList", () => {
  beforeEach(() => {
    eWrap = setup(defaultDataSource);
  });

  describe("Default", () => {
    it("Should render self and subcomponents", () => {
      //check each component is present in the render
      expect(eWrap.find(List).length).toBe(1);
    });

    it("should pass correct props to the List", () => {
      //dataSource
      expect(eWrap.find(List).props().dataSource).toEqual(defaultDataSource);
    });
  });
});
