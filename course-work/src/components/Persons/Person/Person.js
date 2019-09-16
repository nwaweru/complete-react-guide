import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import styles from './Person.css';
import PropTypes from 'prop-types';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
    }

    render(){
        console.log('[Persons.js] rendering...');

        return (
            <Aux>
                {(this.props.isAuth) ? <p>Authenticated</p> : <p>Please log in</p>}
                <p>I am <b onClick={this.props.deletePerson}>{this.props.name}</b> and I am <b>{this.props.age}</b> years old.</p>
                <p>
                    <input 
                        type="text" 
                        // ref={(inputEl) => { this.inputElement = inputEl }}
                        ref={this.inputElementRef}
                        value={this.props.name} 
                        onChange={this.props.changeName} 
                    />
                </p>
                <p><small><i>{this.props.children}</i></small></p>
            </Aux>
        );
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    changeName: PropTypes.func,
    deletePerson: PropTypes.func
};

export default withClass(Person, styles.Person);