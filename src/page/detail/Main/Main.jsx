import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavHeader from '../NavHeader/NavHeader';
import InfoBanner from '../InfoBanner/InfoBanner';
import Tab from '../Tab/Tab';
import Menu from '../Menu/Menu';

class Main extends Component {
    render () {
        return (
            <div className="detail">
                <NavHeader />
                <InfoBanner />
                <Tab />
                <Menu />
            </div>
        );
    }
}

export default connect()(Main);