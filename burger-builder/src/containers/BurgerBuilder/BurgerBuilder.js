import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.initIngredients();
    }, []);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.authenticated) {
            setPurchasing(true);
        } else {
            props.setAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    }

    const cancelPurchaselHandler = () => {
        setPurchasing(false);
    }

    const continuePurchaselHandler = () => {
        props.purchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = { ...props.ingredients };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = props.error ? <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch ingredients!</p> : <Spinner />;
    let orderSummary = null;

    if (props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />

                <BuildControls
                    addIngredient={props.addIngredient}
                    removeIngredient={props.removeIngredient}
                    disabledInfo={disabledInfo}
                    price={props.totalPrice}
                    purchasable={updatePurchaseState(props.ingredients)}
                    purchasing={purchaseHandler}
                    authenticated={props.authenticated}
                />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            totalPrice={props.totalPrice}
            cancelPurchase={cancelPurchaselHandler}
            continuePurchase={continuePurchaselHandler}
        />;
    }

    return (
        <Aux>
            <Modal show={purchasing} closeModal={cancelPurchaselHandler}>
                {orderSummary}
            </Modal>

            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        authenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: name => dispatch(actions.addIngredient(name)),
        removeIngredient: name => dispatch(actions.removeIngredient(name)),
        initIngredients: () => dispatch(actions.initIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit()),
        setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
