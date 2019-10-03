import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

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

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const authenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    const addIngredient = name => dispatch(actions.addIngredient(name));
    const removeIngredient = name => dispatch(actions.removeIngredient(name));
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const purchaseInit = () => dispatch(actions.purchaseInit());
    const setAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (authenticated) {
            setPurchasing(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    }

    const cancelPurchaselHandler = () => {
        setPurchasing(false);
    }

    const continuePurchaselHandler = () => {
        purchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = error ? <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch ingredients!</p> : <Spinner />;
    let orderSummary = null;

    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />

                <BuildControls
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                    disabledInfo={disabledInfo}
                    price={totalPrice}
                    purchasable={updatePurchaseState(ingredients)}
                    purchasing={purchaseHandler}
                    authenticated={authenticated}
                />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={ingredients}
            totalPrice={totalPrice}
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

export default withErrorHandler(burgerBuilder, axios);
