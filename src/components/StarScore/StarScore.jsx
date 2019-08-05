import React, { Component } from 'react';
import './StarScore.scss';

/**
 * 渲染评分星星数
 */
class StarScore extends Component {
    renderScore() {
        let score = this.props.score || '';
        score = score.toString();
        score = score.split(".");
        let fullstar = parseInt(score[0]);   //满星
        let midstar = parseInt(score[1]) >= 5 ? 1 : 0; //半星
        let nullstar = 5 - fullstar - midstar; //0星
        let scoreArr = [];
        for (let i = 0; i < fullstar; i++) {
            scoreArr.push(<div key={i+"full"} className="item-score fullstar"></div>);
        }
        if (midstar) {
            scoreArr.push(<div key="mid" className="item-score midstar"></div>);
        }
        if (nullstar) {
            for(let i = 0; i < nullstar; i++){
                scoreArr.push(<div key={i+"null"} className="item-score nullstar"></div>);
            }
        }
        return scoreArr;
    }
    render() {
        return (
            <div className="star-score-wrap">
                {this.renderScore()}
            </div>
        );
    }
}

export default StarScore;