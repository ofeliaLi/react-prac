import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavHeader.scss';

class NavHeader extends Component {
    goIndex() {
        window.history.back();
    }
    render() {
        return (
            <div className="nav-header">
                <div className="content">
                    <div className="icon" onClick={this.goIndex}></div>
                </div>
            </div>
        );
    }
}

export default connect()(NavHeader);