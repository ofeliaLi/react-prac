import React, { Component } from 'react';
import { connect } from 'react-redux'
import './MenuItem.scss';
import { addItemCount, minusItemCount, changeModal} from '../../actions/MenuAction';

class MenuItem extends Component {
    constructor(props){
        super(props);
    }
    /**
     * 增加商品选中数量
     * @param {num} rightItemIndex 
     */
    addItemCount(rightItemIndex) {
        this.props.dispatch(addItemCount({
            index: rightItemIndex
         }));
    }
    /**
     * 减少商品选中数量
     * @param {num} rightItemIndex 
     */
    minusItemCount(rightItemIndex) {
        this.props.dispatch(minusItemCount({
            index: rightItemIndex
        }));
    }
    /**
     * 显示modal 将选中商品的数据传入redux
     * @param {obj} item 
     * @param {num} index 
     */
    showModal(item, index) {
        this.props.dispatch(changeModal({
            showModal: true,
            modalItem: item,
            modalItemIndex: index
        }));
    }
    render() {
        let item = this.props._item;
        let index = this.props._index;
        return (
            <div className="right-item">
                <div className="item-pic">
                    <img src={item.littleImageUrl}/>
                </div>
                <div className="item-info">
                    <p className="info-title">{item.spuName}</p>
                    <div className="desc">{item.spuDesc}</div>
                    <div className="info-price">
                        <div className="current">
                            <span>￥</span>{item.currentPrice}
                        </div>
                        {item.activityTag ? <span className="origin">￥{item.originPrice}</span> 
                                          : <span className="normal">起</span>}
                    </div>
                    {item.skuList.length > 1 && item.count == 0 ?
                    <div className="select" onClick={()=>{this.showModal(item,index)}}>选规格</div> :
                    <div className="count-content">
                        {item.count > 0 ? <div className="minus" onClick={()=>{this.minusItemCount(index)}}></div> : null}
                        {item.count > 0 ? <div className="count-num">{item.count}</div> : null}
                        <div className="plus" onClick={()=>{this.addItemCount(index)}}></div>
                    </div>}
                    {item.activityTag ? 
                    <div className="dis-info">
                        <div className="dis-text"><span>{item.spuPromotionInfo}</span></div> 
                    </div> : null}
                </div>
            </div>
        );
    }
}

export default connect()(MenuItem);