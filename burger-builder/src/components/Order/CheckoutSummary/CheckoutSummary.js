import React from 'react';

import Burger from '../../Burger/Burger';
import styles from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Enjoy your Meal!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" onClick={props.cancelCheckout}>Cancel</Button>
            <Button btnType="Success" onClick={props.continueCheckout}>Continue</Button>
        </div>
    );
};

export default checkoutSummary;
