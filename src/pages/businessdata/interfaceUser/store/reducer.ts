import { fromJS } from 'immutable';
import { constants } from '.';
import { IAction } from './types';

const defaultState = fromJS({
    userList: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    loading: false,
    visible: false,
    userDetail: {},
    authList: [],
    target: [],
    roleList: [],
    developerInfo: {}
});

export default (state = defaultState, action: IAction) => {
    switch (action.type) {
        case constants.SET_INTERFACE_USER_LIST:
            return state.merge({
                userList: action.list,
                pager: action.pager
            });
        case constants.OPEN_INTERFACE_USER_MODAL:
            return state.merge({
                visible: true,
                userDetail: action.userDetail
            });
        case constants.CLOSE_INTERFACE_USER_MODAL:
            return state.merge({
                visible: false,
                userDetail: {}
            });
        case constants.TRIGGER_INTERFACE_USER_MODAL:
            return state.merge({
                visible: action.status
            });
        case constants.SET_USER_DETAIL:
            return state.merge({
                userDetail: action.userDetail
            });
        case constants.SET_ROLE_AUTH:
            return state.merge({
                authList: action.authList
            });
        case constants.SET_TARGET_LIST:
            return state.merge({
                target: action.target
            });
        case constants.SET_ROLE_LIST:
            return state.merge({
                roleList: action.roleList
            });
        case constants.SET_DEVELOPER_INFO:
            return state.merge({
                developerInfo: action.developerInfo
            });
        case constants.SET_LOADING_STATUS:
            return state.merge({
                loading: action.loading
            });
        default:
            return state;
    }
};