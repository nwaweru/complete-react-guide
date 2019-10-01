import * as actionTypes from './actionTypes';

export const authStart = () => {
    const type = actionTypes.AUTH_START;
    return { type };
}

export const authSuccess = (token, userId) => {
    const type = actionTypes.AUTH_SUCCESS;
    return { type, token, userId };
}

export const authFail = error => {
    const type = actionTypes.AUTH_FAIL;
    return { type, error };
}

export const logout = () => {
    const type = actionTypes.AUTH_INITIATE_LOGOUT;
    return { type };
};

export const logoutSucceed = () => {
    const type = actionTypes.AUTH_LOGOUT;
    return { type };
}

export const checkAuthTimeout = expirationTime => {
    const type = actionTypes.AUTH_CHECK_TIMEOUT;
    return { type, expirationTime };
}

export const authenticate = (email, password, method) => {
    const type = actionTypes.AUTH_USER;
    return { type, email, password, method };
}

export const setAuthRedirectPath = path => {
    const type = actionTypes.SET_AUTH_REDIRECT_PATH;
    return { type, path };
}

export const authCheckState = () => {
    const type = actionTypes.AUTH_CHECK_STATE;
    return { type };
};
