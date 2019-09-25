import React, { Component } from 'react';

import './App.css';
import UserInput from '../../components/UserInput/UserInput';
import UserOutput from '../../components/UserOutput/UserOutput';

class App extends Component {
  state = { username: 'nwaweru' };

  changeUsernameHandler = event => {
    let username = event.target.value;

    this.setState({ username });
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
