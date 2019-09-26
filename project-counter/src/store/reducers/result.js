import uuid from 'uuid';

import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    results: []
};

const storeResult = (state, action) => {
    return updateObject(state, {
        results: state.results.concat({
            id: uuid.v4(),
            value: action.result
        })
    });
};

const deleteResult = (state, action) => {
    const newArray = state.results.filter(el => el.id !== action.id);

    return updateObject(state, { results: newArray });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT: return storeResult(state, action)
        case actionTypes.DELETE_RESULT: return deleteResult(state, action);
        default: return state;
    }
};

export default reducer;
