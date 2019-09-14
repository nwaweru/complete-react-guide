import React, { Component } from 'react';
import Person from './Person/Person';
import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    persons: [
      { id: uuid.v4(), name: 'Ndirangu', age: 28 },
      { id: uuid.v4(), name: 'Waweru', age: 35 },
      { id: uuid.v4(), name: 'Sharon', age: 16 }
    ],
    otherProp: 'Some other value',
    showPersons: false
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;

    this.setState({
      showPersons: !doesShow
    });
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              key={person.id} 
              name={person.name} 
              age={person.age} 
              changeName={(event) => this.changeNameHandler(event, person.id)}
              deletePerson={() => this.deletePersonHandler(index)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>This is React</h1>
        <p className={classes.join(' ')}>This is working!</p>

        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>

        {persons}
      </div>
    );
  }
}

export default App;
