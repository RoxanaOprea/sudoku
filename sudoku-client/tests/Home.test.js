import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16.3";
import Home from "../src/components/Home";

Enzyme.configure({ adapter: new Adapter() });

let component = null;

describe("Home component", () => {
  beforeEach(() => {
    component = shallow(<Home />);
  });

  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
    expect(component.dive()).toMatchSnapshot();
  });
});