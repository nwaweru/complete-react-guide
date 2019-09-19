import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => {
        return (
            <li key={ingredientKey}>
                <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:
                {props.ingredients[ingredientKey]}
            </li>
        );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" onClick={props.cancelPurchase}>Cancel</Button>
            <Button btnType="Success" onClick={props.continuePurchase}>Continue</Button>
        </Aux>
    );
}

export default orderSummary;
