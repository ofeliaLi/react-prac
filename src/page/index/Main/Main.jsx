import React, { Component } from 'react';
import BottomBar from '../BottomBar/BottomBar';
import { withRouter, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './Loading.js';

const Home = Loadable({
    loader: () => import(/* webpackChunkName:"home" */'../Home/Home'),
    loading: Loading,
    delay: 300
});
const Order = Loadable({
    loader: () => import(/* webpackChunkName:"order" */'../Order/Order'),
    loading: Loading,
    delay: 300
});
const My = Loadable({
    loader: () => import(/* webpackChunkName:"my" */'../My/My'),
    loading: Loading,
    delay: 300
});

class Main extends Component {
    render () {
        return (
            <div className="main">
                <Route path="/home" component={Home} />
                <Route path="/order" component={Order} />
                <Route path="/my" component={My} />
                <BottomBar />
            </div>
        );
    }
}

export default withRouter(Main);