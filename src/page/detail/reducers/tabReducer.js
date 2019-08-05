import { CHANGE_DETAIL_TAB } from '../actions/actionTypes';

const initState = {
    tabs:[
        {
            name:'点菜',
            key: "menu"
        },
        {
            name:'评价',
            key: "comment"
        },
        {
            name:'商家',
            key: "shop"
        }
    ],
    activeTab: 'menu'
};

export default (state=initState, action) => {
    switch (action.type) {
        case CHANGE_DETAIL_TAB:
            return {...state, activeTab: action.tabKey};
        default: 
            return state;
    }
}
