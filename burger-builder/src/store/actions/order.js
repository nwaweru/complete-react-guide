import * as actionTypes from '../actions/actionTypes';

export const purchaseBurgerStart = () => {
    const type = actionTypes.PURCHASE_BURGER_START;
    return { type };
};

export const purchaseBurgerSuccess = (orderId, orderData) => {
    const type = actionTypes.PURCHASE_BURGER_SUCCESS;
    return { type, orderId, orderData };
};

export const purchaseBurgerFail = error => {
    const type = actionTypes.PURCHASE_BURGER_FAIL;
    return { type, error };
};

export const purchaseInit = () => {
    const type = actionTypes.PURCHASE_INIT;
    return { type };
};

export const fetchOrdersSuccess = orders => {
    const type = actionTypes.FETCH_ORDERS_SUCCESS;
    return { type, orders };
};

export const fetchOrdersFail = error => {
    const type = actionTypes.FETCH_ORDERS_FAIL;
    return { type, error };
};

export const fetchOrdersStart = () => {
    const type = actionTypes.FETCH_ORDERS_START;
    return { type };
};

export const purchaseBurger = (orderData, token) => {
    const type = actionTypes.PURCHASE_BURGER;
    return { type, token, orderData };
};

export const fetchOrders = (token, userId) => {
    const type = actionTypes.FETCH_ORDERS;
    return { type, token, userId };
};
