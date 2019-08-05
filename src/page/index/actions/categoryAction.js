import axios from 'axios';
import  { GET_CAT_LIST } from './actionTypes';

export const getCatList = () => {
    return (dispatch) => {
        axios({
            method:'get',
            url:'./json/kingkong.json'
        })
        .then((res) => {
            dispatch({
                type: GET_CAT_LIST,
                obj: res.data
            })
        })
    }
}