import { GET_SHOP_LIST } from '../actions/actionTypes';

const stateDefault = {
    shopList:[],
    page: 0,
    isEnd: false,
    sortId: ''
};
const fetchShopList = (state, action) => {
    let _page = action.toFirstPage ? 0 : state.page;
    let _sortId = action.sortId || state.sortId;
    let _isEnd = false;
    let _shopList = [];
    if (_page === 0) {
        _shopList = action.data.data.shopList;
    } else {
        _shopList = state.shopList.concat(action.data.data.shopList);
    }
    _page ++;
    if (_page > 3) {
        _isEnd = true;
    }
    return {...state, shopList:_shopList,page: _page, isEnd: _isEnd,sortId:_sortId};
}

export default (state = stateDefault, action) => {
    switch (action.type) {
        case GET_SHOP_LIST:
            return fetchShopList(state, action);
        default: 
            return state;
    }
}