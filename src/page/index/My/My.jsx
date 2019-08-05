import React, { Component } from 'react';
import { connect } from 'react-redux';
import './My.scss';

class My extends Component {
    render() {
        return (
            <div className="my">
                <div className="text">我的</div>
            </div>
        );
    }
}

export default connect()(My);