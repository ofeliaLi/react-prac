import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="location">
                    <div className="loc-name">十里堡</div>
                </div>
                <div className="search">
                    <input className="search-inp" type="search" disabled="disabled" placeholder="请输入商家或商店名称"/>
                </div>
            </div>
        );
    }
}

export default Header;