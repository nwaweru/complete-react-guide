import * as actionTypes from './actionTypes';

export const addIngredient = name => {
    const type = actionTypes.ADD_INGREDIENT;
    return { type, name };
};

export const removeIngredient = name => {
    const type = actionTypes.REMOVE_INGREDIENT;
    return { type, name };
};

export const setIngredients = ingredients => {
    const type = actionTypes.SET_INGREDIENTS;
    return { type, ingredients };
}

export const fetchIngredientsFailed = () => {
    const type = actionTypes.FETCH_INGREDIENTS_FAILED;
    return { type };
}

export const initIngredients = () => {
    const type = actionTypes.INIT_INGREDIENTS;
    return { type };
};