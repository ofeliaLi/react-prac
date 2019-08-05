import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BottomBar.scss';
import {changeActiveTab} from '../actions/tabAction';
import { NavLink } from 'react-router-dom';

class BottomBar extends Component{
    renderTabs() {
        let tabs= this.props.tabs;
        return tabs.map((tab,index) => {
            const clsN = `tab-item ${tab.key}`;
            return (
                <NavLink className={clsN} activeClassName='active' key={index} to={'/'+ tab.key} onClick={() => this.props.changeActiveTab(tab.key)}>
                    <div className="tab-icon"></div>
                    <div className="tab-name">{tab.name}</div>
                </NavLink>
            )
        });
    }
    render() {
        return (
            <div className="bottom-bar">
                {this.renderTabs()}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    tabs: state.bottomBar.tabs,
    activeKey: state.bottomBar.activeKey
})
export default connect(mapStateToProps, {
    changeActiveTab
})(BottomBar);