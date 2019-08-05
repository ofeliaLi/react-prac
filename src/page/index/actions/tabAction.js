import { CHANGE_ACTIVE_TAB } from './actionTypes';

export const changeActiveTab = (tabKey) => ({
    type: CHANGE_ACTIVE_TAB,
    activeKey: tabKey
})