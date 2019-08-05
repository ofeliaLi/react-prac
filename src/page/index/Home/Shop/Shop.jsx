import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Shop.scss';
import { fetchShopList } from '../../actions/shopAction';
import ScrollLoad from 'components/ScrollLoad/ScrollLoad';
import StartScore from 'components/StarScore/StarScore';

class Shop extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchShopList({});
    }
    //滚动加载
    onload() {
        if (this.props.page <= 3) {
            this.props.fetchShopList({
                sortId: this.props.sortId
            });
        }
    }
    //跳转详情页
    goDetail(poiId) {
        window.location.href = `./detail.html?id=${poiId}`;
    }
    //渲染折扣部分
    renderDiscount(item){
        let discountLlist = item.discounts2.slice(0,2);
        return discountLlist.map((item,index)=>{
            return(
                <div className="dis-item" key={index}>
                    <img src={item.iconUrl} className="dis-icon"/>
                    <span className="dis-text">{item.info}</span>
                </div>
            )
        });
    }
    //渲染shop列表
    renderShopList() {
        let { shopList } = this.props
        return shopList.map((item,index)=>{
            return(
                <li className="shop-item" key={index} onClick={()=>{this.goDetail(item.mtWmPoiId)}}>
                    <a className="shop-item-con">
                        <div className="content-left">
                            {item.poiTypeIcon ? <img src={item.poiTypeIcon} className="type-icon"/> : null}
                            <div className="shop-icon">
                                <img src={item.picUrl}/>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="shop-title">{item.shopName}</div>
                            <div className="info">
                                <div className="sale">
                                    <StartScore score={item.wmPoiScore/10}/>
                                    <span className="score">{item.wmPoiScore/10}</span>
                                    <span className="count">{item.monthSalesTip}</span>
                                </div>
                                <div className="time">
                                    <span>{item.deliveryTimeTip}</span>
                                    <span className="spaceicon">{item.distance}</span>
                                </div>
                            </div>
                            <div className="shipping">
                                <span>{item.minPriceTip}</span>
                                <span className="fee spaceicon">{item.shippingFeeTip}</span>
                                <span className="average spaceicon">{item.averagePriceTip}</span>
                            </div>
                            <div className="discount">
                                {this.renderDiscount(item)}
                            </div>
                        </div>
                    </a>
                </li>
            )
        });
    }
    render() {
        return (
            <ScrollLoad loadCallback={this.onload.bind(this)}  isEnd={this.props.isEnd}>
                <div className="shop">
                    <ul className="container">
                        {this.renderShopList()}
                    </ul>
                </div>
            </ScrollLoad>
        );
    }
}
const mapStateToProps = (state) => ({
   shopList: state.shop.shopList,
   page: state.shop.page,
   isEnd: state.shop.isEnd,
   sortId: state.shop.sortId
})
export default connect(mapStateToProps, {
    fetchShopList
})(Shop);