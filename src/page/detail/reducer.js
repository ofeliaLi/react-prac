import { combineReducers } from 'redux';
import banner from './reducers/infoBannerReducer';
import tab from './reducers/tabReducer';
import menu from './reducers/MenuReducer';

export default combineReducers({
    banner,
    tab,
    menu
})