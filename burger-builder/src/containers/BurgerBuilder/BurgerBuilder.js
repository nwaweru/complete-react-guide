import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data,
                loading: false
            });
        }).catch(error => {
            this.setState({ 
                error: true, 
                loading: false 
            });
        });
    }

    addIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: INGREDIENT_PRICES[type] + this.state.totalPrice,
        });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldCount - 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
        });

        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaselHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaselHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ndirangu Waweru',
                address: {
                    street: 'Somewhere',
                    zipCode: '00100',
                    country: 'Kenya'
                },
                email: 'ndiranguwaweru@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order).then(response => {
            this.setState({
                purchasing: false,
                loading: false
            });
        }).catch(error => {
            this.setState({
                purchasing: false,
                loading: false
            });
        });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch ingredients!</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                cancelPurchase={this.cancelPurchaselHandler}
                continuePurchase={this.continuePurchaselHandler}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaselHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);
