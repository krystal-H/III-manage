import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import * as apis from './apis';
import { IPager, IRole, IRoleParam, IRoleAuthItem, IPagerParam } from './types';
import { Dispatch } from 'redux';
import { notification } from 'antd';

// 获取角色列表
export const getList = (pager?: IPager) => {
    let [pageIndex, pageRows] = [1, 10];
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(setLoadingStatus(true));
        return apis.getList({ pageIndex, pageRows, ...pager }).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRoleList(result));
            }
            dispatch(setLoadingStatus(false));
        }).catch(err => console.log(err));
    };
};

// 设置角色列表
export const setRoleList = (result: {list: IRole[], pager: IPagerParam}) => ({
    type: constants.SET_ROLE_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
});


function flatten(list:IRoleAuthItem[] = [], pre = "", checkedkeys: string[]) {
    list && list.forEach((item: IRoleAuthItem) => {
        if (item.isSelected) {
            checkedkeys.push(pre + item.resourceId);
        }
       
        flatten(item.resourcesVoList, pre + item.resourceId + '-', checkedkeys);
    });
};

// 获取角色权限
export const getRoleAuth = (roleId?: number) => {
    return (dispatch: Dispatch, getState: Function) => {
        if(!!!roleId){
            // 若请求id为空，返回已请求的默认数据，不再请求数据
            const defaultAuth = getState().getIn(["roleManage", "defaultAuth"]).toJS();
            if(!!defaultAuth.length){
                const target: string[][] = new Array(defaultAuth.length).fill([]);
                dispatch(setRoleAuthAll(defaultAuth));
                dispatch(setRoleAuthTarget(target));
                return ;
            }
        }
        return apis.getRoleAuth({ roleId }).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                if(typeof roleId === "undefined"){
                    const target: string[][] = new Array(result.length).fill([]);
                    dispatch(setRoleAuthAll(result));
                    dispatch(setRoleAuthTarget(target));
                }else{
                    const target: string[][] = [];
                    result.map((item:any) => {
                        let checkedkeys: string[] = [];
                        flatten([item], "", checkedkeys);
                        target.push(checkedkeys);
                    });
                    dispatch(setRoleAuthTarget(target));
                }
                dispatch(setRoleAuth(result));
            }
        }).catch(err => console.log(err));
    };
};

// 设置角色权限
export const setRoleAuth = (result: any[]) => ({
    type: constants.SET_ROLE_AUTH,
    authList: fromJS(result)
});

// 设置完整角色权限
export const setRoleAuthAll = (result: any[]) => ({
    type: constants.SET_ROLE_AUTH_ALL,
    authList: fromJS(result)
});

// 保存角色信息
export const saveRole = (params: IRoleParam) => {
    return (dispatch: Dispatch) => {
        return apis.saveRole({...params}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch<any>(getList());
                notification.success({
                    message: params.roleId ? "修改角色信息成功" : "创建角色成功",
                    duration: 3
                });
            }
        }).catch(err => console.log(err));
    };
};

// 删除角色
export const delRole = (roleId: number) => {
    return (dispatch: Dispatch) => {
        return apis.delRole({roleId}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch<any>(getList());
                notification.success({
                    message: "删除角色成功",
                    duration: 3
                });
            }
        }).catch(err => console.log(err));
    };
};

// 改变加载状态
export const setLoadingStatus = (loading: boolean) => ({
    type: constants.SET_LOADING_STATUS,
    loading
});

// 设置权限
export const setRoleAuthTarget = (target: any[]) => {
    // console.log("setRoleTarget", target);
    return {
        type: constants.SET_ROLE_AUTH_TARGET,
        target
    };
};

// 打开编辑窗口
export const openModal = (roleItem?: IRole) => ({
    type: constants.OPEN_ROLE_MODAL,
    roleItem
});

// 关闭编辑窗口
export const closeModal = () => ({
    type: constants.CLOSE_ROLE_MODAL
});

// 修改窗口参数
export const modifyRole = (params: any) => ({
    type: constants.MODIFY_ROLE_DETAIL,
    params
});