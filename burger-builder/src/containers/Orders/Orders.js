import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];

            for (let key in res.data) {
                fetchedOrders.push({
                    id: key,
                    ...res.data[key]
                });
            }

            this.setState({
                orders: fetchedOrders,
                loading: false
            });
        }).catch(err => {
            this.setState({ loading: false });
            console.log(err);
        });
    };

    render() {
        let orders = this.state.orders.map((order) => {
            return <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
            />;
        });

        if (this.state.loading) {
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
