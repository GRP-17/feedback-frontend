import Enzyme, { shallow } from "enzyme";
import Dashboard from "../routes/Dashboard/Dashboard";
import React from "react";
import Adapter from "enzyme-adpater-react-16";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<Dashboard />);
  return enzymeWrapper;
}

var eWrap = setup();

describe("Dashboard", () => {});
