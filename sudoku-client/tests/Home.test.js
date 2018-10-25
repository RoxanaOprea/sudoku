import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16.3";
import Home from "../src/components/Home";

Enzyme.configure({ adapter: new Adapter() });

describe("Home component", () => {
  test("renders", () => {
    const home = shallow(<Home />);

    expect(home.exists()).toBe(true);
  });
});