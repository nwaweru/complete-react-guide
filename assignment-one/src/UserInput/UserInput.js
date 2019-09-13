import React from 'react';

import './UserInput.css';

const userInput = (props) => {
    return (        
        <div>
            <input type="text" className="UserInput" value={props.username} onChange={props.changeUsername} />
        </div>
    );
};

export default userInput;