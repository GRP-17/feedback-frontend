import React from "react";
import App from "../App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<App />);

  return enzymeWrapper;
}

describe("components", () => {
  describe("App", () => {
    it("should render self and subcomponents", () => {
      const enzymeWrapper = setup();

      expect(enzymeWrapper.find("Router"));

      expect(enzymeWrapper.find('Route [path="/"]'));
      expect(enzymeWrapper.find('Route [path="/feedback"]'));
      expect(enzymeWrapper.find('Route [path="/dashboard"]'));
    });
  });
});
