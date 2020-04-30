import { Dispatch } from 'redux';
import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import * as apis from './apis';
import { IQueryPager, IUser, IPager, IUserDetail, IAuthItem, IAddUser, IRole, IDeveloperInfo } from './types';
import { notification } from 'antd';
import { CryptoTool } from '../../../../util/utils';

// 获取接口访问用户列表
export const getList = (pager: IQueryPager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatus(true));
        return apis.getList({ pageIndex, pageRows, ...pager }).then((res: any) => {
            dispatch(setLoadingStatus(false));
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setUserList(result));
            }
        }).catch(err => console.log(err));
    };
};

// 设置用户列表
export const setUserList = (result: { list: IUser[], pager: IPager }) => ({
    type: constants.SET_INTERFACE_USER_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
});

// 设置loading状态
export const setLoadingStatus = (loading: boolean) => ({
    type: constants.SET_LOADING_STATUS,
    loading
});

// 打开弹窗
export const openModal = (userDetail: IUser) => {
    return (dispatch: Dispatch) => {
        if (userDetail.userId) {
            dispatch<any>(getUserDetail(userDetail.userId));
        }

        dispatch({
            type: constants.OPEN_INTERFACE_USER_MODAL,
            userDetail
        });
    };
};

// 打开弹窗
export const triggerModal = (status: boolean) => ({
    type: constants.TRIGGER_INTERFACE_USER_MODAL,
    status
});

// 关闭弹窗
export const closeModal = () => ({
    type: constants.CLOSE_INTERFACE_USER_MODAL
});

// 获取用户详情
export const getUserDetail = (userId: number) => {
    return (dispatch: Dispatch) => {
        return apis.getUserDetail({ userId }).then((res: any) => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setUserDetail(result));
            }
        });
    };
};

// 设置用户详情
export const setUserDetail = (result: IUserDetail | {}) => ({
    type: constants.SET_USER_DETAIL,
    userDetail: fromJS(result)
});

// 遍历整棵树，查找勾选项
function flatten(list: IAuthItem[] = [], pre = "", checkedkeys: string[]) {
    list && list.forEach((item: IAuthItem) => {
        if (item.checked) {
            checkedkeys.push(pre + item.boxId);
        }
        // 过滤父节点，所有父节点状态由子节点控制
        for (let i = 0; i < checkedkeys.length; i++) {
            if (checkedkeys[i] === pre.slice(0, -1)) {
                checkedkeys.splice(i, 1);
            }
        }

        flatten(item.subBoxs, pre + item.boxId + '-', checkedkeys);
    });
};

// 获取用户角色权限
export const getRoleAuth = (userId: number) => {
    return (dispatch: Dispatch) => {
        return apis.getRoleAuth({ userId }).then((res: any) => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRoleAuth(result));
                const target: string[][] = [];
                result.map((item: any) => {
                    let checkedkeys: string[] = [];
                    flatten(item.checkBoxGroupList, '', checkedkeys);
                    target.push(checkedkeys);
                });
                dispatch(setRoleAuthTarget(target));
            }
        });
    };
};

// 设置角色权限
export const setRoleAuth = (result: IAuthItem[]) => ({
    type: constants.SET_ROLE_AUTH,
    authList: fromJS(result),
});

// 设置已勾选的键值
export const setRoleAuthTarget = (target: string[][]) => {
    return {
        type: constants.SET_TARGET_LIST,
        target
    };
};

// 获取角色列表
export const getRoleList = () => {
    return (dispatch: Dispatch) => {
        return apis.getRoleList().then((res: any) => {
            let data = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRoleList(data));
            }
        });
    };
};

// 设置角色列表
export const setRoleList = (roleList: IRole) => ({
    type: constants.SET_ROLE_LIST,
    roleList
});

// 添加用户
export const addUser = (user: IAddUser) => {
    return (dispatch: Dispatch) => {
        return apis.addUser(user).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(triggerModal(false));
                notification.success({
                    duration: 3,
                    message: "新增成功"
                });
                dispatch<any>(getList({ pageIndex: 1 }));
            }
        });
    };
};

// 保存用户
export const saveUser = (user: IAddUser) => {
    return (dispatch: Dispatch) => {
        if (user.password) {
            user.password = CryptoTool.encryption(user.password);
        }

        return apis.saveUser(user).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(triggerModal(false));
                notification.success({
                    duration: 3,
                    message: "保存成功"
                });
                dispatch<any>(getList({ pageIndex: 1 }));
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        });
    };
};

// 获取开发者信息
export const getDeveloperInfo = () => {
    return (dispatch: Dispatch) => {
        return apis.getDeveloperInfo().then((res: any) => {
            let data = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setDeveloperInfo(data));
            }
        });
    };
};

// 设置开发者信息
export const setDeveloperInfo = (developerInfo: IDeveloperInfo) => ({
    type: constants.SET_DEVELOPER_INFO,
    developerInfo
});

// 删除用户
export const delUser = (userId: number) => {
    return (dispatch: Dispatch) => {
        return apis.delUser({ userId }).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    duration: 3,
                    message: "删除成功"
                });
                dispatch<any>(getList({ pageIndex: 1 }));
            }
        });
    };
};