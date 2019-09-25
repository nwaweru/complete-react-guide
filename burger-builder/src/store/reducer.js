import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const ingredientPrices = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + ingredientPrices[action.name]
            };
    
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - ingredientPrices[action.name]
            };

        default:
            return state;
    }
};

export default reducer;
