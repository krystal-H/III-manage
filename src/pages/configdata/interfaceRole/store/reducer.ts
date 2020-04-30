import {fromJS} from 'immutable';
import { constants } from '.';
import { IAction } from './types';

const defaultState = fromJS({
    roleList: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    loading: false,
    defaultAuth: [],
    authList: [],
    roleDetail: {},
    // 左侧控制框
    authTree: [],
    authCheck: [],
    // 右侧已选框
    targetTree: [],
    targetCheck: [],
});

export default (state = defaultState, action: IAction) => {
    switch(action.type){
        case constants.SET_INTERFACE_ROLE_LIST:
            return state.merge({
                roleList: action.list,
                pager: action.pager
            });
        case constants.SET_ROLE_DETAIL:
            return state.merge({
                roleDetail: action.roleDetail
            });
        case constants.SET_INTERFACE_ROLE_AUTH:
            return state.merge({
                authList: action.authList
            });
        case constants.SET_TARGET_LIST:
            return state.merge({
                targetList: action.target
            });
        case constants.SAVE_ALL_AUTH: 
            return state.merge({
                defaultAuth: action.authList
            });
        case constants.MODIFY_ROLE_DETAIL:
            return state.merge({
                roleDetail: {...state.getIn(["roleDetail"]).toJS(), ...action.params}
            });    
        // case constants.SET_TARGET_TREE:
        //     return state.merge({
        //         targetTree: action.authList
        //     });

        // 初始化左右两边树
        case constants.INIT_AUTH_TREE:
            return state.merge({
                authTree: action.authList,
                authCheck: action.target,
                targetTree: action.authList,
                targetCheck: action.target
            });
        // 修改左侧权限树
        case constants.SET_AUTH_TREE:
            return state.merge({
                authTree: action.authList,
                authCheck: action.target,
            });    
        // 设置左侧权限树勾选
        case constants.SET_AUTH_TREE_CHECK:
            return state.merge({
                authCheck: action.target
            });
        // 设置右侧权限树勾选
        case constants.SET_TARGET_TREE_CHECK:
            return state.merge({
                targetCheck: action.target
            });
        // 设置右侧权限树
        case constants.SET_TARGET_TREE:
            return state.merge({
                targetTree: action.authList,
                targetCheck: action.target,
            });
        case constants.CLEAR_AUTH_DATA:
            return state.merge({
                authTree: fromJS([]),
                authCheck: fromJS([]),
                // 右侧已选框
                targetTree: fromJS([]),
                targetCheck: fromJS([]),
            })

        default: 
            return state;
    }
};