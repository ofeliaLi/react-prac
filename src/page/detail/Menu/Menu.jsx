import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Menu.scss';
import { fetchMenuList, changActiveItem, addItemCount, 
         minusItemCount, changeModal, closeModal } from '../actions/MenuAction';
import Cart from './Cart/Cart';
import MenuItem from './MenuItem/MenuItem';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeLeftItem: "act17",
            activeCateBox: 0
        };
    }
    componentDidMount() {
        this.props.fetchMenuList();
    }
    /**
     * 点击切换左边列表的active项
     * @param {num} activeItem 
     * @param {str} leftItem 
     */
    changeLeftItem(activeItem, leftItem) {
        this.props.changActiveItem(activeItem);
        this.setState({
            activeLeftItem: leftItem
        })
    }
    //渲染左边列表
    renderLeftBar() {
        let menuList = this.props.menuData.categoryList || [];
        return menuList.map((item,index) => {
            let clsN = item.tag === this.state.activeLeftItem ? "left-item active" : "left-item";
            return(
                <div className={clsN} key={index} onClick={()=>{this.changeLeftItem(index,item.tag)}}>
                    <div className="item-inner">
                        <span className="item-text">
                            {item.iconUrl ? <img src={item.iconUrl}/> : null}
                            {item.categoryName} 
                        </span>
                        <div className="item-count"></div>
                    </div>
                </div>
            )
        });
    }
    /**
     * 渲染右侧MenuItem 
     * 为item添加count属性 便于选中数量逻辑计算
     * @param {obj} rightMenuData 
     */
    renderRightItem(rightMenuData) {
        let listData = rightMenuData.spuList;
        return listData.map((item,index) => {
            if (!item.count) {
               item.count = 0;
            }
            return (
                <MenuItem key={index} _item={item} _index={index}/>
            )
        });  
    }
    //渲染右边Menu
    renderRightBar() {
        let { menuData, activeMenuItem } = this.props;
        let menuList = menuData.categoryList || [];
        let rightMenuData = menuList[activeMenuItem] ;
        if (rightMenuData) {
            return (
                <div className="right-bar-inner">
                    <div className="title">{rightMenuData.categoryName}</div>
                    <div className="item-container">
                        {this.renderRightItem(rightMenuData)}
                    </div>
                </div>
            );
        }
    }
    /**
     * 添加购物车
     * 关闭modal
     * @param {num} modalItemIndex 
     */
    addCart(modalItemIndex) {
        this.props.closeModal();
        this.props.addItemCount({
            index: modalItemIndex
        });
        this.setState({
            activeCateBox: 0
        })  
    }
    renderCateBox() {
        let skuList = this.props.modalItem.skuList;
        return skuList.map((item,index) => {
            let cls = index === this.state.activeCateBox ? "cate-box active" : "cate-box";
            return (
                <div key={index} className={cls} onClick={()=>{this.setState({activeCateBox:index})}}>
                    {item.spec}
                </div>
            )
        });
    }
    // 渲染模态框
    renderModal() {
        let modalItem = this.props.modalItem;
        let modalItemIndex = this.props.modalItemIndex;
        return(
            <div className="modal-wrap">
                <div className="panel">
                    <div className="panel-header">
                        <div className="text">{modalItem.spuName}</div>
                    </div>
                    <div className="panel-info">
                        <div className="panel-item">
                            <div className="title">规格</div>
                            <div className="cate">
                                {this.renderCateBox()}
                            </div>
                        </div>
                    </div>
                    <div className="panel-price">
                        <div className="price">￥{modalItem.currentPrice}</div>
                        <div className="submit" onClick={()=>{this.addCart(modalItemIndex)}}>加入购物车</div>
                    </div>
                    <div className="button" onClick={this.props.closeModal}></div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="menu">
                <div className="left-bar">
                    {this.renderLeftBar()}
                </div>
                <div className="right-bar">
                    {this.renderRightBar()}
                </div>
                <Cart />
                {this.props.showModal ? this.renderModal() : null}
            </div>
        );
    }
}
const mapState = (state) => ({
    menuData: state.menu.menuData,
    activeMenuItem: state.menu.activeMenuItem,
    showModal: state.menu.showModal,
    modalItem: state.menu.modalItem,
    modalItemIndex: state.menu.modalItemIndex
})

export default connect(mapState, {
    fetchMenuList,
    changActiveItem,
    addItemCount,
    minusItemCount,
    changeModal,
    closeModal
})(Menu);