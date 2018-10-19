import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.statusText }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(users => this.setState({users}));

    const body = await response;

    if (response.status !== 200) throw Error(body.message);
   
    return body;
  };

  render() {
    console.log(this.state.users);
    return (
      <div className="App">
        <Login users={this.state.users}/>
        {/* data */}
        <p className="App-intro">{this.state.users}</p>
      </div>
    );
  }
}

export default App;
