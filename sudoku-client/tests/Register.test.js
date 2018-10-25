import React from "react";
import { shallow } from "enzyme";
import Register from "../src/components/Register";
import toJSON from 'enzyme-to-json';

describe("Register component", () => {
  it("renders correctly", () => {
    const register = shallow(<Register />);
    expect(register).toMatchSnapshot();
  });

  it("should have a `form` element", () => {
    expect(shallow(<Register />).dive().find("form").length).toBe(1);
  });

  it("renders a text field for email", () => {
    expect(shallow(<Register />).dive().find("#register-email-input").length).toEqual(1);
  });

  it("renders a text field for password", () => {
    expect(
      shallow(<Register />).dive().find("#register-password-input").length).toEqual(1);
  });
});

//test for email
describe("Email text field", () => {
  it("should respond to change event", () => {
    console.log("here")
    const wrapper = shallow(<Register />);
    console.log(toJSON(wrapper.find("#register-email-input")));
   
    wrapper
      .find("#register-email-input")
      .simulate("change", {
        target: { name: "email", value: "test@test.com" }
      });
    expect(wrapper.state("email")).toEqual("test@test.com");
  });
});

