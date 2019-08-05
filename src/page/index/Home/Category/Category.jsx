import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getCatList } from '../../actions/categoryAction';
import './Category.scss';

class Category extends Component {
    /**
     * 获取店面分类data
     */
    componentDidMount() {
        this.props.getCatList();
    }
    /**
     * 渲染店面分类item
     */ 
    renderCatList() {
        let { kingkongList } = this.props;
        return kingkongList.slice(0,10).map((item,index) => {
            return (
                <div className="cate-item" key={index}>
                    <div className="cate-icon">
                        <img src={item.icon} />
                    </div>
                    <div className="cate-name">{item.name}</div>
                </div>
            );
        })
    }
    render() {
        return (
            <div className="category clearfix">
                {this.renderCatList()}
            </div>
        );
    }
}
const mapState = (state) => ({
    kingkongList: state.category.kingkongList
})
export default connect(mapState, {
    getCatList
})(Category);