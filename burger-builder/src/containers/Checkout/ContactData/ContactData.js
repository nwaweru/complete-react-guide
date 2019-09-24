import React, { Component } from 'react';

import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            country: ''
        },
        loading: false
    };

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Ndirangu Waweru',
                email: 'ndiranguwaweru@gmail.com',
                address: {
                    street: 'Somewhere',
                    postalCode: '00100',
                    country: 'Kenya'
                }
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false });

            this.props.history.push('/');
        }).catch(error => {
            this.setState({ loading: false });
        });
    };

    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="email" name="email" placeholder="Your Email" />
                <input className={styles.Input} type="text" name="street" placeholder="Your Street" />
                <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" onClick={this.placeOrderHandler} >Place Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
