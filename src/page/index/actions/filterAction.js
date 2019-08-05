import axios from 'axios';
import { FETCH_FILTER_CONDITIONS, UPDATE_SORT_ID,
         CHANGE_CUR_SORT_ITEM, UPDATE_MULTI_FILTER_IDS} from '../actions/actionTypes';

export const fetchFilterCondition = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: './json/filterconditions.json'
        })
        .then((res) => {
            dispatch({
                type: FETCH_FILTER_CONDITIONS,
                obj: res.data.data
            })
        })
    }
}

export const updateSortId = (sortId) => ({
    type: UPDATE_SORT_ID,
    sortId
})

export const changeCurSortIem = (item) => ({
    type: CHANGE_CUR_SORT_ITEM,
    item
})

export const updateMultiFilterIds = (multiFilIds) => ({
    type: UPDATE_MULTI_FILTER_IDS,
    multiFilIds
})