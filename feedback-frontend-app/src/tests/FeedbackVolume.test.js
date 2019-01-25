import Enzyme, { shallow } from "enzyme";
import FeedbackVolume from "../routes/Dashboard/components/FeedbackVolume/FeedbackVolume";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { Card } from "antd";

Enzyme.configure({ adapter: new Adapter() });

function setup(volume) {
  const enzymeWrapper = shallow(<FeedbackVolume volume={volume} />, {
    disableLifecycleMethods: true
  });
  return enzymeWrapper;
}

const defaultVolume = 0;

var eWrap = setup();

describe("FeedbackVolume", () => {
  beforeEach(() => {
    eWrap = setup(defaultVolume);
  });

  describe("Default", () => {
    it("Should render self and subcomponents", () => {
      //check each component is present in the render
      expect(eWrap.find(Card).length).toBe(1);
      expect(eWrap.find("h2").length).toBe(1);
    });

    it("should pass correct props to the List", () => {
      //volume
      expect(eWrap.find("h2").text()).toEqual("" + defaultVolume);

      //reconstruct the component with a test prop
      eWrap = shallow(<FeedbackVolume volume={4} />);

      //should have test prop value
      expect(eWrap.find("h2").text()).toEqual("4");
    });
  });
});
