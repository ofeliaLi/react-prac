import { FETCH_MENU_LIST, CHANGE_ACTIVE_ITEM, ADD_ITEM_COUNT, MINUS_ITEM_COUNT, 
         CLEAR_CART, UPDATE_MODAL_DATA, CLOSE_MODAL } from '../actions/actionTypes';

const initState = {
    menuData:[],
    activeMenuItem: 0,
    showModal: false,
    modalItem:{},
    modalItemIndex: ''
};
const addItemCount = (state, action) => {
    let _state = JSON.parse(JSON.stringify(state));
    let menuList = _state.menuData.categoryList;
    let activeMenuItem = _state.activeMenuItem;
    let rightList = menuList[action.obj.outindex === undefined ?  activeMenuItem : action.obj.outindex];
    let currentRightItem = rightList.spuList[action.obj.index];
    currentRightItem.count++;
    return _state;
}
const minusItemCount = (state, action) => {
    let _state = JSON.parse(JSON.stringify(state));
    let menuList = _state.menuData.categoryList;
    let activeMenuItem = _state.activeMenuItem;
    let rightList = menuList[action.obj.outindex === undefined ?  activeMenuItem : action.obj.outindex];
    let currentRightItem = rightList.spuList[action.obj.index];
    currentRightItem.count--;
    return _state;
}
const clearCart = (state) => {
    let _state = JSON.parse(JSON.stringify(state));
    let menuList = _state.menuData.categoryList;
    for (let i = 0; i < menuList.length; i++) {
        let rightList = menuList[i].spuList;
        for (let j = 0; j < rightList.length; j++) {
            if (rightList[j].count > 0) {
                rightList[j].count = 0;
            }
        }
    }
    return {..._state};
}

export default (state=initState, action) => {
    switch (action.type){
        case FETCH_MENU_LIST:
            return {...state, menuData:action.data.data};
        case CHANGE_ACTIVE_ITEM:
            return {...state, activeMenuItem: action.activeItem};
        case  ADD_ITEM_COUNT:
            return addItemCount(state, action);
        case MINUS_ITEM_COUNT:
            return minusItemCount(state, action);
        case CLEAR_CART:
            return clearCart(state);
        case UPDATE_MODAL_DATA:
            return {...state, showModal: action.showModal, modalItem:action.item, modalItemIndex:action.index};
        case CLOSE_MODAL:
            return {...state, showModal: action.showModal};
        default: 
            return state;
    }
}
