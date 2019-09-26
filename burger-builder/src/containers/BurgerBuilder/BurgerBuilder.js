import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaselHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaselHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch ingredients!</p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />

                    <BuildControls
                        addIngredient={this.props.addIngredient}
                        removeIngredient={this.props.removeIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                cancelPurchase={this.cancelPurchaselHandler}
                continuePurchase={this.continuePurchaselHandler}
            />;
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: name => dispatch(actions.addIngredient(name)),
        removeIngredient: name => dispatch(actions.removeIngredient(name)),
        initIngredients: () => dispatch(actions.initIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
