import React from "react";
import Enzyme, { shallow } from "enzyme";
import App from "../src/App";
import Adapter from "enzyme-adapter-react-16.3";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Home from "../src/components/Home";

Enzyme.configure({ adapter: new Adapter() });

describe("Search component", () => {
  test("renders", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});

describe("Login component", () => {
  test("renders", () => {
    const login = shallow(<Login />);

    expect(login.exists()).toBe(true);
  });
});

describe("Register component", () => {
  test("renders", () => {
    const register = shallow(<Register />);

    expect(register.exists()).toBe(true);
  });
});

describe("Home component", () => {
  test("renders", () => {
    const home = shallow(<Home />);

    expect(home.exists()).toBe(true);
  });
});
