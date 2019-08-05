import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Order.scss';

class Order extends Component {
    render() {
        return (
            <div className="order">
                <div className="text">去登陆</div>
            </div>
        );
    }
}

export default connect()(Order);