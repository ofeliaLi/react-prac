import axios from 'axios';
import { FETCH_FOOD_LIST } from './actionTypes';

export const fetchFoodList = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url:'./json/food.json'
        })
        .then((res) => {
            dispatch({
                type: FETCH_FOOD_LIST,
                data: res.data
            })
        })
    }
}