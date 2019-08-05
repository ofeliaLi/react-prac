import { combineReducers } from 'redux'
import bottomBar from './bottomBarReducer'
import category from './categoryReducer'
import filter from './filterReducer'
import shop from './shopReducer'
import scroll from 'components/ScrollLoad/ScrollLoadReducer'
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
    bottomBar,
    category,
    filter,
    shop,
    scroll,
    router: connectRouter(history)
})