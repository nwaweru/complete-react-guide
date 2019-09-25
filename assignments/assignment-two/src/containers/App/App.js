import React, { Component } from 'react';

import './App.css';
import Char from '../../components/Char/Char';
import Validation from '../../components/Validation/Validation';

class App extends Component {
  state = { inputText: '' };

  countTextHandler = event => {
    this.setState({ inputText: event.target.value });
  }

  deleteCharHandler = index => {
    const inputText = this.state.inputText.split('').splice(index, 1).join('');    
    this.setState({ inputText });
  }

  render() {
    let chars = null;

    chars = (
      <div>
        {this.state.inputText.split('').map((char, index) => {
          return <Char key={index} char={char} onClick={() => this.deleteCharHandler(index)} />
        })}
      </div>
    );

    return (
      <div className="App">
        <h1>Assignment Two</h1>
        <p><input type="text" value={this.state.inputText} onChange={this.countTextHandler} /></p>
        <p>Length: {this.state.inputText.length}</p>
        <Validation inputLength={this.state.inputText.length} />
        {chars}
      </div>
    );
  }
}

export default App;
