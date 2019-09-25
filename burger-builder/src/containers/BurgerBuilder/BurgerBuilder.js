import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.setState({ loading: false });

        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data,
        //         loading: false
        //     });
        // }).catch(error => {
        //     this.setState({ 
        //         error: true, 
        //         loading: false 
        //     });
        // });
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
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch ingredients!</p> : <Spinner />;
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: name => dispatch({ type: actionTypes.ADD_INGREDIENT, name }),
        removeIngredient: name => dispatch({ type: actionTypes.REMOVE_INGREDIENT, name })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
