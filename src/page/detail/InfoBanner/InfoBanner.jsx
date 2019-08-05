import React, { Component } from 'react';
import { connect } from 'react-redux';
import './InfoBanner.scss';
import { fetchFoodList } from '../actions/infoBannerAction';

class InfoBanner extends Component {
    //获取shop详情信息
    componentDidMount() {
        this.props.fetchFoodList();
    }
    renderDiscount() {
        let shopList = this.props.foodList.shopInfo || [];
        let activityList = shopList.activityList || [];
        return activityList.map((item,index) => {
            let istyle = {
                backgroundImage: `url(${item.iconUrl})`
              };
            return (
                <div className="discount-item" key={index}>
                    <i className="discount-icon" style={istyle}></i>
                    <span className="discount-text">{item.actDesc}</span>
                </div>
            )
        });
    }
    render() {
        let shopInfo = this.props.foodList.shopInfo || [];
        return (
            <div className="info-banner">
                <div className="container">
                    <div className="shop-pic">
                        <img src={shopInfo.shopPic} />
                    </div>
                    <div className="shop-info">
                        <div className="basic">
                            <div className="basic-item">
                                <span>{shopInfo.deliveryTime}分钟</span>
                                <span>{shopInfo.distance}</span>    
                            </div>
                            <div className="anno">
                                公告：{shopInfo.bulletin}
                            </div>
                        </div>
                        <div className="discount">
                            {this.renderDiscount()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapState = (state) => ({
    foodList: state.banner.foodList
})
export default connect(mapState, {
    fetchFoodList
})(InfoBanner);