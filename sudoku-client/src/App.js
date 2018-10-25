import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';

class App extends Component {
  state = {
    users: []
  };

  // componentDidMount() {
  //   // Call our fetch function below once the component mounts
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res.statusText }))
  //     .catch(err => console.log(err));
  // }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch("http://localhost:3001/users")
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));

  //   const body = await response;

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    //console.log(this.state.users);
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" exact component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
