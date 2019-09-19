import React from 'react';

import './Char.css';

const char = props => {
    return (
        <div className="Char" onClick={props.onClick}>
            {props.char}
        </div>
    );
}

export default char;
