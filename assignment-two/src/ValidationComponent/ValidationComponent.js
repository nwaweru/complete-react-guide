import React from 'react';

const validationComponent = (props) => {
    const minLength = 5;

    let validationStatement = 'Enter some text';

    if (props.inputLength > 0 && props.inputLength < minLength) {
        validationStatement = 'Text too short.';
    } else if (props.inputLength >= minLength) {
        validationStatement = 'Text long enough.';
    }

    return <p>{validationStatement}</p>;
};

export default validationComponent;