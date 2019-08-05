import React, { Component } from 'react';
import './Loading.scss';

class Loading extends Component {
    render () {
        let loadText = '正在加载...';
        if (this.props.isEnd) {
            loadText = '已完成';
        }
        return (
            <div className="loading">
                <div className="loading-icon"></div>
                <span>{loadText}</span>
            </div>
        );
    }
}

export default Loading;