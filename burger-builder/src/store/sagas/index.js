import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import { logoutSaga, checkAuthTimeoutSaga, authenticateSaga, authCheckStateSaga } from './auth';

export function* watchAuth() {
    yield all([
        yield takeEvery(actionTypes.AUTH_USER, authenticateSaga),
        yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    ]);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
