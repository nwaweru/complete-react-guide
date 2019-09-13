import React from 'react';

import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
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