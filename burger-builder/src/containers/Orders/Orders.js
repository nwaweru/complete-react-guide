import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const orders = props => {
    useEffect(() => {
        props.fetchOrders(props.authToken, props.userId);
    }, []);

    let orders = props.orders.map(order => {
        return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
        />;
    });

    if (props.loading) {
        orders = <Spinner />
    }

    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        authToken: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
