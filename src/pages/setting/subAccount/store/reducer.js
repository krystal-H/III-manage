import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    list: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    roleList: [],
    authList: [],
    target: [],
    visible: false,
    accountItem: {},
    viewVisible: false,
    viewAccountItem: {},
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_SUB_ACCOUNT_LIST:
            return state.merge({
                list: action.list,
                pager: action.pager
            });
        case constants.SET_SUB_ACCOUNT_DETAIL:
            return state.merge({
                account: action.account
            });
        case constants.SET_ROLE_LIST:
            return state.merge({
                roleList: action.list
            });
        case constants.MODIFY_SUB_ACCOUNT_DETAIL:
            return state.merge({
                account: fromJS({...state.getIn(["account"]).toJS(), ...action.detail})
            });
        case constants.SET_SUB_ACCOUNT_ROLE_AUTH:
            return state.merge({
                authList: action.authList,
                target: action.target
            });    

        case constants.OPEN_SUB_ACCOUNT_MODAL:
            return state.merge({
                visible: true,
                accountItem: action.accountItem
            });
        case constants.CLOSE_SUB_ACCOUNT_MODAL:
            return state.merge({
                visible: false,
                accountItem: {},
                authList: [],
                target: []
            });
        case constants.OPEN_SUB_ACCOUNT_VIEW:
            return state.merge({
                viewVisible: true,
                viewAccountItem: action.account
            });
        case constants.CLOSE_SUB_ACCOUNT_VIEW:
            return state.merge({
                viewVisible: false,
                viewAccountItem: {},
                authList: [],
                target: []
            });

        default:
            return state;
    }
};