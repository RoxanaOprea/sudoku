import React from "react";
import { mount, shallow } from "enzyme";
import Register from "../src/components/Register";
import toJson from "enzyme-to-json";
import { EEXIST } from "constants";
// import Link from "react-router-dom";
// import { render } from "react-dom";

//const sinon = require('sinon');

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
  });

  it("when the form is submitted the ev is cancelled", () => {
    let prevent = false;
    component.find("form").simulate("submit", {
      preventDefault: () => {
        prevent = true;
      }
    });
    expect(prevent).toBe(true);
  });
});

describe("handleSubmit", () => {
  let renderedComponent;
  let user;
  let mockEvent;

  beforeEach(() => {
    user = { email: "test@test.com", password: "test" };
    renderedComponent = shallow(<Register />).dive();
    mockEvent = { preventDefault: jest.fn() };

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: 200, 
      json: () => Promise.resolve(user)
    }))
  });
  
  it("calls fetch with the correct data when adding a new user", () => {
    renderedComponent.setState({ email: user.email, password: user.password })
    const expected = {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    const arrayNewUsers = renderedComponent.instance().state.newUsers;
    arrayNewUsers.push(user);
    
    renderedComponent.setState({ newUsers: arrayNewUsers });
    renderedComponent.instance().handleSubmit(mockEvent);

    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3001/register", expected);
  });

  it("throws an error if fetch fails", () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("Fetch failed")));
    const expected = "Fetch failed";

    expect(
      renderedComponent.instance().handleSubmit(mockEvent)
    ).rejects.toThrow(expected);
  });
});
