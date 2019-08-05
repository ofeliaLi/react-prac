import { GET_CAT_LIST } from '../actions/actionTypes';

const stateDefault = {
    kingkongList:[]
};

export default (state = stateDefault, action) => {
    switch (action.type) {
        case GET_CAT_LIST:
            return {...state, kingkongList:action.obj.data.kingkongList};
        default: 
            return state;
    }
}