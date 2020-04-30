import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import * as apis from './apis';
import { IPagerParam, IPager, IRole, IAuthItem, IRoleParam, SearchTypes, IAuthList } from './types';
import { Dispatch } from 'redux';
import { notification } from 'antd';
import { deepCopy } from '../../../../util/utils';

// 获取子账号列表
export const getList = (pager: IPagerParam) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatus(true));
        return apis.getList({ pageIndex, pageRows, ...pager }).then((res: any) => {
            dispatch(setLoadingStatus(false));
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRoleList(result));
            }
        }).catch(err => console.log(err));
    };
};

// 设置角色列表
export const setRoleList = (result: { list: IRole[], pager: IPager }) => ({
    type: constants.SET_INTERFACE_ROLE_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
});

// 设置角色详情
export const setRoleDetail = (result: any) => ({
    type: constants.SET_ROLE_DETAIL,
    roleDetail: fromJS(result)
});

// 遍历整棵树，查找勾选项
function flatten(list: IAuthItem[] = [], pre = "", checkedkeys: string[]) {
    list && list.forEach((item: IAuthItem) => {
        // 过滤父节点，所有父节点状态由子节点控制
        if (item.checked && (!item.subBoxs || !item.subBoxs.length)) {
            checkedkeys.push(pre + item.boxId);
        }

        flatten(item.subBoxs, pre + item.boxId + '-', checkedkeys);
    });
};

// 遍历整棵树，获取所有子节点
function flattenChild(list: IAuthItem[] = [], pre = "", checkedkeys: string[]){
    list && list.forEach((item: IAuthItem) => {
        if (!item.subBoxs || !item.subBoxs.length) {
            checkedkeys.push(pre + item.boxId);
        }

        flattenChild(item.subBoxs, pre + item.boxId + '-', checkedkeys);
    });
}

// 获取角色权限
export const getRoleAuth = (roleId: number) => {
    return (dispatch: Dispatch) => {
        return apis.getRoleAuth({ roleId: roleId || undefined }).then((res: any) => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                // 获取权限树勾选值
                const target: string[][] = [];
                result.map((item: any) => {
                    let checkedkeys: string[] = [];
                    flatten(item.checkBoxGroupList, '', checkedkeys);
                    target.push(checkedkeys);
                });

                dispatch(initRoleAuth(result, target));
            }
        }).catch(err => console.log(err));
    };
};

// 保存所有权限数据
export const setRoleAuthAll = (authList: IAuthItem[]) => ({
    type: constants.SAVE_ALL_AUTH,
    authList: fromJS(authList),
});

// 设置角色权限
export const setRoleAuth = (result: IAuthItem[]) => ({
    type: constants.SET_INTERFACE_ROLE_AUTH,
    authList: fromJS(result),
});

// 设置已勾选的键值
export const setRoleAuthTarget = (target: string[][]) => {
    return {
        type: constants.SET_TARGET_LIST,
        target
    };
};

// 改变加载状态
export const setLoadingStatus = (loading: boolean) => ({
    type: constants.SET_LOADING_STATUS,
    loading
});

// 获取角色信息
export const getRoleDetail = (roleId: number) => {
    return (dispatch: Dispatch) => {
        return apis.getRoleDetail({ roleId }).then((res: any) => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRoleDetail(result));
            }
        });
    };
};

// 修改角色信息
export const modifyRoleDetail = (params: { roleName?: string, remark?: string }) => ({
    type: constants.MODIFY_ROLE_DETAIL,
    params
});

// 保存角色信息
export const saveRole = (params: IRoleParam) => {
    return (dispatch: Dispatch) => {
        return apis.saveRoleAuth(params).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        });
    };
};

// 删除角色
export const delRole = (roleId: number) => {
    return (dispatch: Dispatch) => {
        return apis.delRole({ roleId }).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    duration: 3,
                    message: "删除角色成功"
                });
                dispatch<any>(getList({ pageIndex: 1 }));
            }
        });
    };
};

// 遍历整棵树，获取targetTree所有勾选的子节点的名称
function createTargetNames(list: IAuthItem[] = [], pre = "", checkedkeys: string[], names: string[]){
    list && list.forEach((item: IAuthItem) => {
        if (!item.subBoxs || !item.subBoxs.length) {
            let id = pre + item.boxId;
            if(checkedkeys.includes(id)){
                names.push(item.boxName || '');
            }
        }
        createTargetNames(item.subBoxs, pre + item.boxId + '-', checkedkeys, names);
    });
}

// 遍历整棵树，获取authTree中在targetTree中勾选的节点
function findAuthCheck(list: IAuthItem[] = [], pre = "", names: string[], checkedkeys: string[]){
    list && list.forEach((item: IAuthItem) => {
        if (names.includes(item.boxName || '*')) {
            checkedkeys.push(pre+item.boxId);
        }
        findAuthCheck(item.subBoxs, pre + item.boxId + '-',  names, checkedkeys);
    });
}


// 特殊查询
export const searchAuth = (params: { type: number, typeName: string }) => {
    return (dispatch: Dispatch, getState: any) => {
        if(params.typeName === ""){
           return Promise.resolve(0);
        }
        return apis.searchAuth(params).then((res: any) => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                const state = getState().getIn(["interfaceRole"]).toJS();
                const authTree: any = deepCopy(state.authTree);
                const authCheck: any = deepCopy(state.authCheck);
                const targetTree: any = deepCopy(state.targetTree);
                const targetCheck: any =  deepCopy(state.targetCheck);
                let index: number;

                const { type } = params;
                if(type === SearchTypes.Label){
                    // 标签
                    index = authTree.findIndex((item: IAuthList) => item.menuCode === "dataDimension");
                    authTree[index].checkBoxGroupList.find((item: IAuthItem) => item.groupCode === "deviceLabel").subBoxs = result;
                }else {
                    // 数据对象 type === SearchTypes.Product | SearchTypes.App | SearchTypes.AppWeChat
                    index = authTree.findIndex((item: IAuthList) => item.menuCode === "dataObject");
                    const obj = {
                        [SearchTypes.Product]: "product",
                        [SearchTypes.App]: "appInfo",
                        [SearchTypes.AppWeChat]: "miniProgramAppInfo"
                    };
                    authTree[index].checkBoxGroupList.map((item: IAuthItem) => {
                        if(item.groupCode === obj[type]){
                            item.subBoxs = result;
                        }else{
                            item.subBoxs = [];
                        }
                    });
                }

                // 判断是否在targetTree中, 首先查找已勾选节点的名称数组，再与左侧匹配
                authCheck[index] = [];
                let names: string[] = [];
                let list: string[] = [];
                // 生成targetTree已勾选名称数组
                createTargetNames(targetTree[index].checkBoxGroupList, '', targetCheck[index], names);
                // 根据生成的targetTree中已勾选的名称数组查找左侧对应节点
                findAuthCheck(authTree[index].checkBoxGroupList, '', names, list);
                authCheck[index] = list;
                
                dispatch(setAuthTree(authTree, authCheck));
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        })
    }
}

// 初始化权限树
export const initRoleAuth = (authList: IAuthItem[], target: string[][]) => ({
    type: constants.INIT_AUTH_TREE,
    authList: fromJS(authList),
    target: fromJS(target)
});

// 修改左侧权限树
export const setAuthTree = (authList: IAuthItem[], target: string[][]) => ({
    type: constants.SET_AUTH_TREE,
    authList: fromJS(authList),
    target: fromJS(target)
});

// 设置左侧权限树勾选
export const setAuthTreeCheck = (target: string[][]) => ({
    type: constants.SET_AUTH_TREE_CHECK,
    target: fromJS(target)
});

// 设置右侧权限树勾选-将节点添加到左侧设置勾选状态
export const setTargetTreeCheck = (target: string[][]) => ({
    type: constants.SET_TARGET_TREE_CHECK,
    target: fromJS(target)
});

// 修改右侧权限树
export const setTargetTree = (authList: IAuthItem[], target: string[][]) => ({
    type: constants.SET_TARGET_TREE,
    authList: fromJS(authList),
    target: fromJS(target)
});

// 过滤多余节点
function filterExtra(list: IAuthItem[], pre:string = '', target: string[]){
    return list.filter((item: IAuthItem) => {
        if(item.subBoxs && item.subBoxs.length){
            item.subBoxs = filterExtra(item.subBoxs, pre+item.boxId+'-', target);
        }

        let flag = target.includes(pre+item.boxId);

        return flag;
    })
}

function concatTree(leftTree: IAuthItem[], rightTree: IAuthItem[], diffArr: string[]){
    diffArr.map((item: string) => {
        let boxIdList = item.split('-');
        let id: any = boxIdList.shift();
        let treeLeft: any = leftTree.find((i: IAuthItem) => i.boxId === +id);
        let treeRight: any = rightTree.find((i: IAuthItem) => i.boxId === +id);
        
        while(boxIdList.length){
            // debugger;
            let boxId: any = boxIdList.shift();
            boxId = +boxId;
            let tempRight = treeRight.subBoxs ? treeRight.subBoxs.find((i: IAuthItem) => i.boxId === boxId) : null;
            let tempLeft = treeLeft.subBoxs.find((i: IAuthItem) => i.boxId === boxId);
            if(tempLeft && !tempRight){
                treeRight.subBoxs = [...treeRight.subBoxs, tempLeft];
                tempRight = treeRight.subBoxs.find((i: IAuthItem) => i.boxId === boxId);
                break;
            }

            treeLeft = tempLeft;
            treeRight = tempRight;
        }
    })
}

// 合并节点并过滤不需要的节点
export const mergeToTargetTree = (index: number, diffArr: string[], flag: boolean) => {
    return (dispatch: Dispatch, getState: any) => {
        // 遍历添加所有节点的父节点
        const result: string[] = [];
        diffArr.map((inner: string) => {
            let temp = inner.split('-');
            let str = "";
            temp.forEach(i => {
                str += i;
                result.push(str);
                str += '-';
            });
        });
        
        const authTree: any = deepCopy(getState().getIn(["interfaceRole", "authTree"]).toJS());
        const targetTree: any = deepCopy(getState().getIn(["interfaceRole", "targetTree"]).toJS());
        const targetCheck: any =  deepCopy(getState().getIn(["interfaceRole", "targetCheck"]).toJS());
        
        // 目标节点
        let targetList = targetTree[index].checkBoxGroupList;
        // 左侧节点
        let authList = authTree[index].checkBoxGroupList;
        // 过滤多余节点
        authList = filterExtra(authList, '', result);
        // 更新右侧targetTree
        if(flag){
            // 添加节点到右侧树
            concatTree(authList, targetList, diffArr);
            // 生成targetCheck
            targetCheck[index] = targetCheck[index].concat(diffArr);
        }else{
            // 删除节点时，根据diffArr中的节点找到名称，然后获取其对应右侧节点的id
            // to do
            let names: string[] = [];
            let list: string[] = [];
            // 根据diffArr生成左侧中节点的名称数组
            createTargetNames(authTree[index].checkBoxGroupList, '', diffArr, names);
            // 将生成的名称数组到右侧寻找相应的节点，
            findAuthCheck(targetTree[index].checkBoxGroupList, '', names, list);

            targetCheck[index] = targetCheck[index].filter((item: string) => !list.includes(item));
        }
        
        dispatch(setTargetTree(targetTree, targetCheck));
    }
}

export const clearRoleData = () => ({
    type: constants.CLEAR_AUTH_DATA
})