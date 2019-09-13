import React from 'react';

const userOutput = (props) => {
    let style = {
        width: '50%',
        margin: '16px auto',
        border: '1px solid black',
        boxShadow: '0 2px 3px #ccc',
        padding: '16px',
        textAlign: 'center'
    };

    return (
        <div style={style}>
            <p>I have signed up for the react course.</p>
            <p><small>Username: <b>{props.username}</b></small></p>
        </div>
    );
};

export default userOutput;