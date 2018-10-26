import React from "react";
import { shallow } from "enzyme";
import Register from "../src/components/Register";
import toJson from "enzyme-to-json";
import Link from "react-router-dom";
import { render } from "react-dom";

jest.mock("react-dom");

let component = null;

describe("Register component", () => {
  beforeEach(() => {
    component = shallow(<Register />);
  });

  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
    expect(component.dive()).toMatchSnapshot();
  });

  it("should have a `form` element", () => {
    expect(component.dive().find("form").length).toBe(1);
  });

  it("renders a text field for email", () => {
    expect(component.dive().find("#register-email-input").length).toEqual(1);
  });

  it("renders a text field for password", () => {
    expect(component.dive().find("#register-password-input").length).toEqual(1);
  });

  it("renders a button", () => {
    expect(component.dive().find("#register-button").length).toEqual(1);
  });

  it("renders a link", () => {
    expect(component.dive().find("#login-page").length).toEqual(1);
  });
});

describe("Register component actions", () => {
  beforeEach(() => {
    component = shallow(<Register />).dive();
  });

  it("should respond to change event and change the state for email field", () => {
    const emailInput = component.find("#register-email-input");
    emailInput.first().simulate("change", {
      target: { name: "email", value: "test@test.com" }
    });

    expect(component.instance().state.email).toEqual("test@test.com");
  });

  it("should respond to change event and change the state for password field", () => {
    const passwordInput = component.find("#register-password-input");
    passwordInput.first().simulate("change", {
      target: { name: "password", value: "test" }
    });

    expect(component.instance().state.password).toEqual("test");

    //test link component
    // beforeEach(() => {
    //   window.fetch = jest.fn().mockImplementation(()=> {
    //     Promise.resolve({})
    //   })
    // })
  });
});
