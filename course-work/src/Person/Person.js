import React from 'react';

import styles from './Person.css';

const person = (props) => {
    const rnd = Math.random();

    if (rnd > 0.7) {
        throw new Error('Something went wrong!');
    }
    
    return (
        <div className={styles.Person}>
            <p>
                I am <b onClick={props.deletePerson}>{props.name}</b> and I am <b>{props.age}</b> years old.
                <br />
                <input type="text" value={props.name} onChange={props.changeName} />
                <br />
                <small><i>{props.children}</i></small>
            </p>
        </div>
    );
}

export default person;