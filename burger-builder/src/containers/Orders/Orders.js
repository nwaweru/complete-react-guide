import React, { Component } from 'react';

import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.authToken, this.props.userId);
    };

    render() {
        let orders = this.props.orders.map(order => {
            return <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
            />;
        });

        if (this.props.loading) {
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
