
import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import * as apis from './apis';
import {notification} from 'antd';
import {CryptoTool} from '../../../../util/utils';


// 获取子账号列表
export const getList = (pager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch) => {
        return apis.getList({pageIndex, pageRows, ...pager}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setAccountList(result));
                return Promise.resolve(result);
            }
        }).catch(err => console.log(err));
    };
};

// 设置子账号列表
export const setAccountList = (result) => ({
    type: constants.SET_SUB_ACCOUNT_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
});

// 获取子帐号信息
export const getAccount = (accountId) => {
    return (dispatch) => {
        return apis.getAccount({accountId}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setAccount(result));
                return Promise.resolve(result);
            }
        }).catch(err => console.log(err));
    };
};

// 设置子帐号信息
export const setAccount = (result) => ({
    type: constants.SET_SUB_ACCOUNT_DETAIL,
    account: fromJS(result)
});

// 修改子账号信息
export const modifyAccout = (detail) => ({
    type: constants.MODIFY_SUB_ACCOUNT_DETAIL,
    detail
});

// 获取角色列表
export const getRoleList = () => {
    return (dispatch) => {
        return apis.getRoleList().then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRoleList(result));
                return Promise.resolve(result);
            }
        }).catch(err => console.log(err));
    };
};

// 设置角色列表
export const setRoleList = (list) => ({
    type: constants.SET_ROLE_LIST,
    list: fromJS(list)
});

// 保存子账号信息
export const saveSubAccount = (params) => {
    return (dispatch) => {
        const {userName, password, roleId, nickName, remark} = params;
        return apis.saveSubAccount({
            userName, roleId, nickName, remark,
            password: CryptoTool.encryption(password)
        }).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "新增子账号成功",
                    duration: 3
                });
                dispatch(getList());
            }
        }).catch(err => console.log(err));
    };
};

// 重置密码
export const resetPwd = (params) => {
    return (dispatch) => {
        const {password, subId} = params;
        return apis.resetPwd({
            password: CryptoTool.encryption(password),
            subId
        }).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "修改密码成功",
                    duration: 3
                });
            }
        }).catch(err => console.log(err));
    };
};

// 删除子账号
export const delSubAccount = (subId) => {
    return (dispatch) => {
        return apis.delSubAccount({subId}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(getList());
                notification.success({
                    message: "删除子账号成功",
                    duration: 3
                });
            }
        }).catch(err => console.log(err));
    };
};

function flatten(list = [], pre = "", checkedkeys) {
    // console.log("eeeee", list);
    list && list.forEach((item) => {
        if (item.isSelected) {
            checkedkeys.push(pre + item.resourceId);
        }
       
        flatten(item.resourcesVoList, pre + item.resourceId + '-', checkedkeys);
    });
};

// 获取角色权限
export const getRoleAuth = (roleId) => {
    return (dispatch) => {
        return apis.getRoleAuth({ roleId }).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                const target = [];
                result.forEach(item => {
                    let checkedkeys = [];
                    flatten([item], "", checkedkeys);
                    target.push(checkedkeys);
                });
                console.log("flat---", target);
                dispatch(setRoleAuth(result, target));
            }
        }).catch(err => console.log(err));
    };
};

// 设置角色权限
export const setRoleAuth = (result, checkedkeys) => ({
    type: constants.SET_SUB_ACCOUNT_ROLE_AUTH,
    authList: fromJS(result),
    target: fromJS(checkedkeys)
});

// 修改子账号信息
export const modifySubAccount = (params) => {
    return (dispatch) => {
        return apis.modifySubAccount(params).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(getList());
                notification.success({
                    message: "修改子账号信息成功",
                    duration: 3
                });
            }
        }).catch(err => console.log(err));
    };
};

// 打开编辑窗口
export const openModal = (accountItem) => ({
    type: constants.OPEN_SUB_ACCOUNT_MODAL,
    accountItem
});

// 关闭编辑窗口
export const closeModal = () => ({
    type: constants.CLOSE_SUB_ACCOUNT_MODAL
});

// 打开查看窗口
export const openView = (account) => ({
    type: constants.OPEN_SUB_ACCOUNT_VIEW,
    account
});

// 关闭查看窗口
export const closeView = () => ({
    type: constants.CLOSE_SUB_ACCOUNT_VIEW
});