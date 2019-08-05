import axios from 'axios';
import { FETCH_MENU_LIST, CHANGE_ACTIVE_ITEM, ADD_ITEM_COUNT, MINUS_ITEM_COUNT, CLEAR_CART,
         UPDATE_MODAL_DATA, CLOSE_MODAL } from './actionTypes';

export const fetchMenuList = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url:'./json/food.json'
        })
        .then((res) => {
            dispatch({
                type: FETCH_MENU_LIST,
                data: res.data
            })
        })
    }
}

export const changActiveItem = (activeItem) => ({
    type: CHANGE_ACTIVE_ITEM,
    activeItem
})

export const addItemCount = (obj) => ({
    type: ADD_ITEM_COUNT,
    obj
})

export const minusItemCount = (obj) => ({
    type: MINUS_ITEM_COUNT,
    obj
})

export const clearCart = () => ({
    type: CLEAR_CART
})

export const changeModal = (obj) => ({
    type: UPDATE_MODAL_DATA,
    showModal: obj.showModal,
    item: obj.modalItem,
    index: obj.modalItemIndex
})

export const closeModal = () => ({
    type: CLOSE_MODAL,
    showModal: false
})