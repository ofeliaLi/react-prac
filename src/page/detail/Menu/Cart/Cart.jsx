import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.scss';
import { addItemCount, minusItemCount, clearCart } from  '../../actions/MenuAction';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCartList: false
        };
    }
    /**
     * 获取购车车商品数据
     * 根据商品数量计算购物车总价 总数量
     */ 
    getPriceData () {
        let MenuList = this.props.menuData.categoryList || [];
        let productNum = 0;
        let totalPrice = 0;
        let originPrice = 0;
        let cartList = [];
        for ( let i = 0; i < MenuList.length; i++) {
            let spuList = MenuList[i].spuList;
            for ( let j = 0; j < spuList.length; j++) {
                let count = spuList[j].count;
                if (count > 0) {
                    productNum += count;
                    totalPrice += count * spuList[j].currentPrice;
                    originPrice += count * spuList[j].originPrice;
                    spuList[j]._index = j;
                    spuList[j]._outindex = i;
                    cartList.push(spuList[j]);
                }
            }
        }
        return {productNum, totalPrice, originPrice, cartList};  
    }
    //显示购物车商品列表
    showCartList() {
        let flag = this.state.showCartList;
        this.setState({
            showCartList: !flag
        })
    }
    /**
     * 增加购物车商品数量
     */
    addItemCount(item) {
        this.props.addItemCount({
            index: item._index,
            outindex: item._outindex
        });
    }
    /**
     * 减少购物车商品数量
     */
    minusItemCount(item, cartData) {
        this.props.minusItemCount({
            index: item._index,
            outindex: item._outindex
        });
        if (cartData.productNum <= 1) {
            this.setState({
                showCartList: false
            })
        }
    }
    /**
     * 清空购物车
     */
    clearCart() {
        this.props.clearCart();
        this.setState({
            showCartList: false
        })
    }
    /**
     * 渲染购物车列表
     * @param {object} cartData 购物车数据
     */
    renderCartListItem(cartData) {
        let cartList = cartData.cartList;
        return cartList.map((item,index)=>{
            return (
                <div className="cart-item-content" key={index}>
                    <div className="item-title">{item.spuName}</div>
                    <div className="item-price">￥{item.count*item.currentPrice}</div>
                    <div className="count-content">
                        <div className="minus" onClick={()=>{this.minusItemCount(item,cartData)}}></div>
                        <div className="countNum">{item.count}</div>
                        <div className="plus" onClick={()=>{this.addItemCount(item)}}></div>
                    </div>
                </div>
            )
        });
    }
    render() {
        let shopInfo = this.props.menuData.shopInfo || {};
        let cartData = this.getPriceData();
        return (
            <div className="cart">
                {this.state.showCartList ?
                <div>
                    <div className="cart-list-content">
                        <div className="list-top">
                            <span className="title">购物车</span>
                            <span className="clear-cart" onClick={this.clearCart.bind(this)}>清空购物车</span>
                        </div>
                        {this.renderCartListItem(cartData)}
                    </div>
                    <div className="mask"></div>
                </div> : null
                }
                {cartData.totalPrice > 0 ?
                <div className="cart-container">
                    <div className="button-active" onClick={this.showCartList.bind(this)}>
                        <div className="count-icon">{cartData.productNum}</div>
                    </div>
                    <div className="cart-price">
                        <div className="price">
                            <span className="dis-price"><span className="cash">￥</span>{cartData.totalPrice}</span>
                            <span className="ori-price">￥{cartData.originPrice}</span>
                        </div>
                        <span className="text">另需配送费￥{shopInfo.deliveryFee}</span>
                    </div>
                    <div className="submit">去结算</div>
                </div> :
                <div className="cart-container">
                    <div className="button"></div>
                    <div className="cart-price">
                        另需配送费￥{shopInfo.deliveryFee}
                    </div>
                    <div className="minfee">￥{shopInfo.minFee}起送</div>
                </div> 
                }
            </div>
        );
    }
}
const mapState = (state) => ({
    menuData: state.menu.menuData
})
export default connect(mapState, {
    addItemCount,
    minusItemCount,
    clearCart
})(Cart);