import { FETCH_FILTER_CONDITIONS, UPDATE_SORT_ID, CHANGE_CUR_SORT_ITEM, 
         UPDATE_MULTI_FILTER_IDS} from '../actions/actionTypes';

const stateDefault = {
    shopListFilter: {},
    sortId: '',
    currentSortItem: {},
    multiFilterIds: []
};

const fetchFilterCondition = (state, action) => {
    let _state = JSON.parse(JSON.stringify(state));
    let shopListFilter = _state.shopListFilter;
    shopListFilter.sortVOList = action.obj.sortVOList;
    shopListFilter.multifilterVOList = action.obj.multifilterVOList;
    shopListFilter.filterPrices = action.obj.filterPrices;
    shopListFilter.categories = action.obj.categories;
    return {..._state};
}

export default (state = stateDefault, action) => {
    switch (action.type) {
        case FETCH_FILTER_CONDITIONS:
            return fetchFilterCondition(state, action);
        case UPDATE_SORT_ID:
            return {...state, sortId: action.sortId};
        case CHANGE_CUR_SORT_ITEM:
            return {...state, currentSortItem: action.item};
        case UPDATE_MULTI_FILTER_IDS:
            return {...state, multiFilterIds: action.multiFilIds};
        default:
            return state;
    }    
}