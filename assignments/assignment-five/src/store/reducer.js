import uuid from 'uuid';
import faker from 'faker';
import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: uuid.v4(),
                name: faker.name.findName(),
                age: Math.floor(Math.random() * 40)
            };

            return {
                ...state,
                persons: state.persons.concat(newPerson)
            };

        case actionTypes.DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.id)
            };

        default:
            return state;
    }
};

export default reducer;
