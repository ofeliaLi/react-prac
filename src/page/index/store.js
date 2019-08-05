import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducers/reducer';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHashHistory();

history.push('/home');

const store = createStore(
    mainReducer(history),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

export {store, history};