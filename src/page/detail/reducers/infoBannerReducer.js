import { FETCH_FOOD_LIST } from '../actions/actionTypes';

const stateDefault = {
    foodList:[]
};

export default (state = stateDefault, action) => {
    switch (action.type) {
        case FETCH_FOOD_LIST:
            return {...state, foodList:action.data.data};
        default: 
            return state;
    }
}