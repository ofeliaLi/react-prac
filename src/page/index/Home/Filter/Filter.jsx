import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFilterCondition, updateSortId, changeCurSortIem, updateMultiFilterIds } from '../../actions/filterAction';
import { fetchShopList } from '../../actions/shopAction';
import './Filter.scss';

class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSortPanel: true,
            showMultiFilPanel: true,
            multiCount: 0,
            specialList:[],
            activitiesList:'',
            tabSticky: false
        };
        this._changeTabSticky = this.changeTabSticky.bind(this);
    }
    //根据scrollTop确定Tab是否位置固定
    changeTabSticky() {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop < 200) {
            this.setState({
                tabSticky:false
            })
        }
        if (scrollTop > 200) {
            this.setState({
                tabSticky:true
            })
        }
    }
    componentDidMount() {
        this.props.fetchFilterCondition();
        window.addEventListener('scroll',this._changeTabSticky);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this._changeTabSticky)
    }
    /**
     * 提交sortId，根据过滤条件获取shop列表
     * @param {num} id 
     */
    changeTab(id) {
        this.props.updateSortId(id);
        this.props.fetchShopList({
            sortId: id,
            toFirstPage: true
        });
        this.setState({
            showSortPanel: true,
            showMultiFilPanel: true,
            tabSticky: true
        })
        document.documentElement.scrollTop = 200;
    }
    /**
     * 判断是否显示排序Panel
     */
    showSortPanel() {
        let flag = this.state.showSortPanel;
        this.setState({
            showSortPanel: !flag,
            showMultiFilPanel: true
        })
    }
    /**
     * 判断是否显示筛选Panel
     */
    showFilPanel() {
        let flag = this.state.showMultiFilPanel;
        this.setState({
            showMultiFilPanel: !flag,
            showSortPanel: true
        })
    }
    renderTabItem () {
        const sortVOList = this.props.sortVOList || [];
        return sortVOList.map((item,index)=>{
            let clsN = item.sortId === this.props.sortId ? "tab-item active" : "tab-item";
            if (item.position === 0 ) {
                return (
                    <li className={clsN} key={index} onClick={()=>{this.changeTab(item.sortId)}}>{item.name}</li>
                );
            }
        }) 
    }
    /**
     * 渲染综合排序Tab
     */
    renderSortTab() {
        let {currentSortItem, sortId} = this.props;
        let title = '';
        let sortCls = 'tab-item';
        if (!this.state.showSortPanel) { 
            sortCls += ' selected';
        }
        if (currentSortItem.sortId === sortId) {
            sortCls += ' active';   
            title = currentSortItem.name;
        } else {
            title = '综合排序';
        }
        return (
            <li className={sortCls} onClick={this.showSortPanel.bind(this)}>
                {title}
                <i className="sort"></i>
            </li>
        );
    }
    /**
     * 渲染Filter导航Tab
     */
    renderTabs() {
        let _length = this.props.multiFilterIds.length;
        let multiCls = this.state.showMultiFilPanel ? 'tab-item' : 'tab-item selected';
        if (_length) {
            multiCls += ' active';
        }
        return (
            <ul className="tab">
                {this.renderSortTab()}
                {this.renderTabItem()}
                <li className={multiCls} onClick={this.showFilPanel.bind(this)}>筛选
                    { _length ? 
                    <i className="count">{_length}</i> :
                    <i className="select"></i>
                    }
                </li>
            </ul>
        );
    }
    /**
     * 将选中的排序条件数据交给redux进行数据更新
     * 关闭排序Panel
     * @param {obj} item 
     */
    doSort(item) {
        this.changeTab(item.sortId);
        this.props.changeCurSortIem(item);
        this.setState({
            showSortPanel: true
        })
    }
    // 渲染综合排序Panel列表内容
    renderSortList(){
        let sortList  = this.props.sortVOList;
        return sortList.map((item,index) => {
            let clsN = item.sortId === this.props.sortId ? 'sort-item active' : 'sort-item';
            if (item.position === 1) {
                return(
                    <li className={clsN} key={index} onClick={()=>{this.doSort(item)}}>{item.name}</li>
                );
            }
        })
    }
    /**
     * 提交选中筛选项到redux中进行数据处理
     */
    updateMultiFilter() {
        let  {activitiesList, specialList } = this.state;
        let arr = [];
        if (activitiesList) {
            arr.push(activitiesList);
        } 
        let multiFilIds = specialList.concat(arr);
        this.props.updateMultiFilterIds(multiFilIds);
        this.setState({
            showMultiFilPanel: true
        })
    }
    /**
     * 清空所有筛选项
     */
    clearMultiFiler() {
        this.setState({
            activitiesList: '',
            specialList: [],
            multiCount: 0
        })
    }
    /**
     * 筛选逻辑判断 
     * 如果是多选项 将选中项添加到state中的specialList
     * 如果为单选项 将选中项替换state中的activitiesList
     * 更新选中的筛选条件数量
     * @param {obj} item 
     * @param {obj} multiFilItem 
     */
    doMultiFilter(item, multiFilItem) {
        let { multiCount, specialList, activitiesList } = this.state;
        if (multiFilItem.isSupportMultiChoice) {
            if (specialList.indexOf(item.filterId) === -1) {
                specialList.push(item.filterId);
                multiCount++;
            } else {
                let _index = specialList.indexOf(item.filterId);
                specialList.splice(_index,1);
                multiCount--;
            }
            this.setState({
                specialList,
                multiCount
            })
        } else {
            if (item.filterId === activitiesList) {
                activitiesList = '';
                multiCount--;
            } else {
                if (!activitiesList) {
                    multiCount ++;
                } 
                activitiesList = item.filterId;
            }
            this.setState({
                activitiesList,
                multiCount
            })
        }
    }
    //渲染筛选Panel列表下选项
    renderSelBox(multiFilItem) {
        let filterItemList = multiFilItem.filterItemList;
        let specialList = this.state.specialList;
        let activitiesList = this.state.activitiesList;
        return filterItemList.map((item,index) => {
            let cls = 'sel-box-item';
            for (let value of specialList.values()) {
                cls = value === item.filterId ? cls + ' active' : cls;
            }
            if(item.filterId === activitiesList ) {
                cls += ' active';
            } 
            return (
                <li className={cls} key={index} onClick={()=>{this.doMultiFilter(item,multiFilItem)}}>
                    {item.icon ? <img className="sel-box-icon" src={item.icon}/> : null}
                    {item.name}
                </li>
            );
        })
    }
    //渲染筛选Panel列表
    renderSelectList() {
        let multiList  = this.props.multifilterVOList;
        return multiList.map((item,index) => {
            return(
                <div className="select-item" key={index}>
                    {item.groupTitle ? <div className="sel-title">{item.groupTitle}</div> : null}
                    <ul className="sel-box clearfix">{this.renderSelBox(item)}</ul>
                </div>
            );
        })
    }
    //判断渲染 综合排序 或 筛选 下的Panel
    renderPanel() {
        let {showSortPanel, showMultiFilPanel, multiCount} = this.state;
        if (!showSortPanel) {
            return (
                <ul className="panel-content">
                    {this.renderSortList()}
                </ul>
            );
        }
        if (!showMultiFilPanel) {
            return (
                <div className="panel-content">
                    <div className="select-list">
                        {this.renderSelectList()}
                    </div>
                    <div className="select-button">
                        <span className="clear" onClick={this.clearMultiFiler.bind(this)}>清除筛选</span>
                        <span className="finish" onClick={this.updateMultiFilter.bind(this)}>完成
                            {multiCount ? <i className="count">{multiCount}</i> : null}
                        </span>
                    </div>
                </div>
            );
        }
    }
    render() {
        let cls = this.state.tabSticky ? 'filter-container sticky' : 'filter-container';
        return(
            <div className='filter'>
                <div className={cls}>
                    <div className="tab-con">
                        {this.renderTabs()}
                    </div>
                    <div className="panel">
                        {this.renderPanel()}
                    </div>
                </div>
                <div className="mask"></div>
            </div>
        );
    }
}
const mapState = (state) =>({
    sortVOList: state.filter.shopListFilter.sortVOList,
    sortId: state.filter.sortId,
    currentSortItem: state.filter.currentSortItem,
    multifilterVOList: state.filter.shopListFilter.multifilterVOList,
    multiFilterIds: state.filter.multiFilterIds
})
export default connect(mapState,{
    fetchFilterCondition,
    updateSortId,
    changeCurSortIem,
    updateMultiFilterIds,
    fetchShopList
})(Filter)