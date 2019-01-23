import React from "react";
import Feedback from "../routes/Feedback/Feedback";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<Feedback />);

  return enzymeWrapper;
}

let eWrap = setup();

describe("components", () => {
  describe("Feedback", () => {
    const initalValues = {
      rating: 5,
      text: ""
    };

    beforeEach(() => {
      eWrap = setup();
    });
    it("should render self and subcomponents", () => {
      expect(eWrap.find("Spin"));
      expect(eWrap.find("Rate"));
      expect(eWrap.find("Input.TextArea"));
      expect(eWrap.find("div"));
      expect(eWrap.find("Button"));
    });

    it("should have initial values as state", () => {
      expect(eWrap.state().values.rating).toEqual(initalValues.rating);
      expect(eWrap.state().values.text).toEqual(initalValues.text);
      expect(eWrap.state().isLoading).toBe(false);
    });

    describe("Behaviour", () => {
      describe("handleChange(name, value)", () => {
        it("should change the correct state to the new value", () => {
          const inst = eWrap.instance();

          //check intial values
          expect(eWrap.state().values.rating).toEqual(initalValues.rating);
          expect(eWrap.state().values.text).toEqual(initalValues.text);

          //call handleChange to change rating
          inst.handleChange("rating", 2);

          //check new rating value
          expect(eWrap.state().values.rating).toEqual(2);

          //call handleChange to change text
          inst.handleChange("text", "Hello World");

          //check new text value
          expect(eWrap.state().values.text).toEqual("Hello World");
        });

        it("should throw an error if the conditions arent met", () => {
          const inst = eWrap.instance();

          //check out of bounds conditions throw error
          //raitng value out of bounds
          expect(() => {
            inst.handleChange("rating", 7);
          }).toThrow(TypeError);

          //an incorrect name
          expect(() => {
            inst.handleChange("stars", 4);
          }).toThrow(TypeError);

          //incorrect name with string value
          expect(() => {
            inst.handleChange("stars", "Hello World");
          }).toThrow(TypeError);

          //incorrect type for text
          expect(() => {
            inst.handleChange("text", 4);
          }).toThrow(TypeError);

          //incorrect type for rating
          expect(() => {
            inst.handleChange("rating", "Hello World");
          }).toThrow(TypeError);
        });
      });

      describe("handleSubmit()", () => {
        it("should set the isLoading in the state to true", () => {
          const inst = eWrap.instance();

          //call handleSubmit()
          inst.handleSubmit();

          //check isLoading in the state
          expect(eWrap.state().isLoading).toBe(true);
        });
      });
    });
  });
});
