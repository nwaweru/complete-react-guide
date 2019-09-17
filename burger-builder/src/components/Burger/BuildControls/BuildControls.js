import React from 'react';

import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>

        {controls.map((control) => {
            return <BuildControl 
                key={control.label} 
                label={control.label}
                addIngredient={() => props.addIngredient(control.type)}
                removeIngredient={() => props.removeIngredient(control.type)}
                disabled={props.disabledInfo[control.type]}
            />
        })}

        <button 
            className={styles.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchasing}
        >Order Now</button>
    </div>
);

export default buildControls;
