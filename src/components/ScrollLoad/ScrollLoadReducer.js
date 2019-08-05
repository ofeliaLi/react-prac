import { CHANGE_SCROLLLOAD_STATE } from './actionType.js';

const initState = {
    readyToLoad: true
};
const changeScrollLoadState = (state, action) => {
    return {...state, readyToLoad: action.state};
}
const scrollLoadReducer = (state=initState, action) => {
    switch (action.type) {
        case CHANGE_SCROLLLOAD_STATE: 
            return changeScrollLoadState(state, action);
        default: 
            return state;
    }
}

export default scrollLoadReducer;