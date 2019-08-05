import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tab.scss';
import { changeDetailTab } from '../actions/TabAction';

class Tab extends Component {
    renderTabs() {
        let { tabs, activeTab } = this.props;
        return tabs.map((item,index) => {
            let cls = item.key === activeTab ? 'tab-item active' : 'tab-item';
            return (
                <div className={cls} key={index} onClick={()=>{this.props.changeDetailTab(item.key)}}>
                    {item.name}
                    <span className="tab-icon"></span>
                </div>
            ) 
        });
    }
    render() {
        return (
           <div className="tab">
               {this.renderTabs()}
           </div>
        );
    }
}
const mapState = (state) => ({
    tabs: state.tab.tabs,
    activeTab: state.tab.activeTab
})

export default connect(mapState, {
    changeDetailTab
})(Tab);