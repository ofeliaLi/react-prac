import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;