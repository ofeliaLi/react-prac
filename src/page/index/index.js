import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main/Main';
import { Provider } from 'react-redux';
import {store, history} from './store';
import { ConnectedRouter } from 'connected-react-router';

ReactDom.render(
    < Provider store={store} >
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </ Provider>, document.getElementById('root')
)