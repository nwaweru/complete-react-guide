import React, { Component } from 'react';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

import './App.css';

class App extends Component {
  state = {
    username: 'nwaweru'
  };

  changeUsernameHandler = (event) => {
    let username = event.target.value;

    this.setState({username});
  };

  render() {
    return (
      <div className="App">
        <h1>Assignment 1</h1>
        
        <UserInput username={this.state.username} changeUsername={this.changeUsernameHandler} />
        <UserOutput username={this.state.username} />

        <UserOutput username="ndiranguwaweru" />
      </div>
    );
  }
}

export default App;
