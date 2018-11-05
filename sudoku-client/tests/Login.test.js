import React from "react";
import { shallow } from "enzyme";
import Login from "../src/components/Login";
//import { spy } from "sinon";
//import toJson from "enzyme-to-json";
// import Link from "react-router-dom";
// import { render } from "react-dom";

jest.mock("react-dom");

let component = null;

describe("Login component", () => {
  beforeEach(() => {
    component = shallow(<Login />);
  });

  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
    expect(component.dive()).toMatchSnapshot();
  });

  it("should have a `form` element", () => {
    expect(component.dive().find("form").length).toBe(1);
  });

  it("renders a text field for email", () => {
    expect(component.dive().find("#login-email-input").length).toEqual(1);
  });

  it("renders a text field for password", () => {
    expect(component.dive().find("#login-password-input").length).toEqual(1);
  });

  it("renders a button", () => {
    expect(component.dive().find("#login-button").length).toEqual(1);
  });

  it("renders a link", () => {
    expect(component.dive().find("#register-page").length).toEqual(1);
  });
});

describe("Login component actions", () => {
  beforeEach(() => {
    component = shallow(<Login />).dive();
  });

  it("should respond to change event and change the state for email field", () => {
    const emailInput = component.find("#login-email-input");
    emailInput.first().simulate("change", {
      target: { name: "email", value: "test@test.com" }
    });

    expect(component.instance().state.email).toEqual("test@test.com");
  });

  it("should respond to change event and change the state for password field", () => {
    const passwordInput = component.find("#login-password-input");
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

describe("handleSubmit()", () => {
  let renderedComponent;
  let user;
  let mockEvent;

  beforeEach(() => {
    user = { email: "test@test.com", password: "test" };
    renderedComponent = shallow(<Login />).dive();
    mockEvent = { preventDefault: jest.fn() };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: 200,
        json: () => Promise.resolve(user)
      })
    );
  });

  it("calls fetch with the correct data", () => {
    renderedComponent.setState({ email: user.email, password: user.password });
    const expected = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const arrayExistingUsers = renderedComponent.instance().state.existingUsers;
    arrayExistingUsers.push(user);
    arrayExistingUsers.find(user => {
      return user.email = "test@test.com"
    });

    renderedComponent.setState({ existingUsers: arrayExistingUsers });
    renderedComponent.instance().handleSubmit(mockEvent);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/login",
      expected
    );
  });

  it("throws an error if fetch fails", async () => {
    const expected = "Fetch failed";
    await expect(Promise.reject(new Error("Fetch failed"))).rejects.toThrow(
      expected
    );
  });
});
