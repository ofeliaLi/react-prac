import axios from 'axios';
import { GET_SHOP_LIST } from './actionTypes';
import { CHANGE_SCROLLLOAD_STATE } from 'components/ScrollLoad/actionType';

export const fetchShopList = (obj) => {
    let url = './json/poiList.json';
    if (obj.sortId) {
        url = './json/poiListFilter.json';
    }
    return (dispatch) => {
        dispatch({
            type: CHANGE_SCROLLLOAD_STATE,
            state: false
        })
        axios({
            method:'get',
            url
        })
        .then((res) => {
            dispatch({
                type: GET_SHOP_LIST,
                toFirstPage: obj.toFirstPage,
                sortId: obj.sortId,
                data: res.data
            })
            dispatch({
                type: CHANGE_SCROLLLOAD_STATE,
                state: true
            })
        })
    }
}