import Enzyme, { shallow } from "enzyme";
import Dashboard from "../routes/Dashboard/Dashboard";
import FeedbackVolume from "../routes/Dashboard/components/FeedbackVolume/FeedbackVolume";
import SentimentDistribution from "../routes/Dashboard/components/SentimentDistribution/SentimentDistribution";
import FeedbackList from "../routes/Dashboard/components/FeedbackList/FeedbackList";
import { Spin } from "antd";

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Api from "../utils/Api";
Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<Dashboard />, {
    disableLifecycleMethods: true
  });
  return enzymeWrapper;
}

var eWrap = setup();

jest.mock("../utils/Api");

describe("Dashboard", () => {
  beforeEach(() => {
    eWrap = setup();
    jest.clearAllMocks();
  });
  describe("Default", () => {
    const defaultState = {
      isLoading: false,
      feedbackList: [],
      sentimentCount: {
        NEGATIVE: 0,
        POSITIVE: 0,
        NEUTRAL: 0
      }
    };

    it("should initialise default state", () => {
      //should initialise all the correct state variables
      expect(eWrap.state()).toEqual(defaultState);
    });

    it("should render self and subcomponents with defualt state values", () => {
      //render the right elements
      expect(eWrap.find("h1").length).toBe(1);
      expect(eWrap.find(Spin).length).toBe(1);
      expect(eWrap.find(FeedbackVolume).length).toBe(1);
      expect(eWrap.find(SentimentDistribution).length).toBe(1);
      expect(eWrap.find(FeedbackList).length).toBe(1);

      //check the props passed to the elements

      //Spin
      expect(eWrap.find(Spin).props().spinning).toEqual(defaultState.isLoading);

      //FeedbackVolume
      expect(eWrap.find(FeedbackVolume).props().volume).toEqual(
        defaultState.feedbackList.length
      );

      //SentimentDistribution
      expect(eWrap.find(SentimentDistribution).props().positive).toEqual(
        defaultState.sentimentCount.POSITIVE
      );
      expect(eWrap.find(SentimentDistribution).props().negative).toEqual(
        defaultState.sentimentCount.NEGATIVE
      );
      expect(eWrap.find(SentimentDistribution).props().neutral).toEqual(
        defaultState.sentimentCount.NEUTRAL
      );

      //FeedbackList
      expect(eWrap.find(FeedbackList).props().dataSource).toEqual(
        defaultState.feedbackList
      );
    });
  });
  describe("Behaviour", () => {
    describe("getData()", () => {
      it("should set the isLoading to true at the start", () => {
        //call get Data()
        eWrap.instance().getData();

        //check the state of isLoading
        expect(eWrap.state().isLoading).toEqual(true);
      });

      it("should set the isLoading to false at the end", async () => {
        //call get Data()
        await eWrap.instance().getData();

        //check the state of isLoading
        expect(eWrap.state().isLoading).toEqual(false);
      });

      it("should call the Api 'request' method with correct parameters", async () => {
        //call getData() and wait for it to finish
        await eWrap.instance().getData();

        //check it was called twice
        expect(Api.request.mock.calls.length).toEqual(2);

        //check the first call was to feedback
        expect(Api.request.mock.calls[0][0]).toEqual("feedback");

        //check the second was to feedback_sentiment_count
        expect(Api.request.mock.calls[1][0]).toEqual(
          "feedback_sentiment_count"
        );
      });

      it("should pass the correct props when the state changes", () => {
        //set the new state
        eWrap.setState({
          isLoading: true
        });

        //check the element recieved the new state
        expect(eWrap.find(Spin).props().spinning).toEqual(true);

        //set the new state
        eWrap.setState({
          isLoading: false,
          feedbackList: [1, 2, 3]
        });

        //check the element recieved the new state
        expect(eWrap.find(FeedbackVolume).props().volume).toBe(3);

        //set the new state
        eWrap.setState({
          isLoading: false,
          feedbackList: [],
          sentimentCount: {
            POSITIVE: 1,
            NEGATIVE: 2,
            NEUTRAL: 3
          }
        });

        //check the element recieved the new state
        expect(eWrap.find(SentimentDistribution).props().positive).toBe(1);
        expect(eWrap.find(SentimentDistribution).props().negative).toBe(2);
        expect(eWrap.find(SentimentDistribution).props().neutral).toBe(3);

        //set the new state
        eWrap.setState({
          isLoading: false,
          feedbackList: [1, 2, 3]
        });

        //check the element recieved the new state
        expect(eWrap.find(FeedbackList).props().dataSource).toEqual([1, 2, 3]);
      });
    });
  });
});
