import React from 'react';

import classes from './BuildControl.css';

const buildControl = props => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removeIngredient} disabled={props.disabled}>Remove</button>
        <button className={classes.More} onClick={props.addIngredient}>Add</button>
    </div>
);

export default buildControl;
