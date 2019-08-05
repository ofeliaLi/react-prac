import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';

/**
 * <ScrollLoad loadCallback={function} isEnd={boolean} />
 * @description 滚动加载组件
 */
class ScrollLoad extends Component {
    constructor(props) {
        super(props);
        this._scrollLoad = this.scrollLoad.bind(this);
    }
    scrollLoad(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        let preLoadDistance = 30;
        if ((scrollTop + clientHeight) >= (scrollHeight-preLoadDistance)) {
            if (!this.props.isEnd) { //isEnd是false才能继续滚动加载
                //只有上一次异步事件滚动加载完成，才能触发下一次
                if (!this.props.readyToLoad) { 
                    return;
                }
                this.props.loadCallback && this.props.loadCallback(); //如果存在loadCallback就去调用
            }
        }
    }
    componentDidMount () {
        window.addEventListener('scroll', this._scrollLoad);
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this._scrollLoad);
    }
    render() {
        return (
            <div className="scrollview">
                {this.props.children} 
                <Loading isEnd={this.props.isEnd}/>
            </div>
        );
    }
}
const mapState = (state) => ({
    readyToLoad: state.scroll.readyToLoad
})
export default connect(mapState)(ScrollLoad);