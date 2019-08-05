import React, { Component } from 'react';
import Header from './Header/Header';
import Category from './Category/Category';
import Title from './Title/Title';
import Filter from './Filter/Filter';
import Shop from './Shop/Shop';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header />
                <Category />
                <Title />
                <Filter />
                <Shop />
            </div>
        );
    }
}

export default Home;