import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    };
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const authenticate = (email, password, method) => {
    return dispatch => {
        dispatch(authStart());

        const key = 'AIzaSyAa0B1URQSlr-0tYFgkUJauzEGcw_Zdl8o';
        const authData = { email, password, returnSecureToken: true };

        let url = '';

        if (method === 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        } else if (method === 'signin') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        }

        axios.post(url, authData).then(res => {
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);

            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');

                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};
