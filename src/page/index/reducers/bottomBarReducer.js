import { CHANGE_ACTIVE_TAB } from '../actions/actionTypes';

const stateDefault = {
    tabs:[{
        name:'首页',
        key:'home'
    },{
        name:'订单',
        key:'order'
    },{
        name:'我的',
        key:'my'
    }],
    activeKey: 'home'
};

export default (state = stateDefault, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_TAB:
            return {...state, activeKey:action.activeKey};
        default:
            return state;
    }
}