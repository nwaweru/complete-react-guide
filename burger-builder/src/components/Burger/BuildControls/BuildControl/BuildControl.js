import React from 'react';

import styles from './BuildControl.css';

const buildControl = props => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={props.removeIngredient} disabled={props.disabled}>Remove</button>
        <button className={styles.More} onClick={props.addIngredient}>Add</button>
    </div>
);

export default buildControl;
