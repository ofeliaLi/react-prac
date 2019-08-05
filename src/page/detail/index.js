import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main/Main';
import { Provider } from 'react-redux';
import store from './store';

ReactDom.render(
    < Provider store = {store} >
        <Main />
    </ Provider>, document.getElementById('root')
)