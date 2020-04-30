
import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import * as apis from './apis';
import {notification} from 'antd';
import { DateTool, CryptoTool } from "../../../../util/utils";

// 获取用户列表
export const getList = (pager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch) => {
        dispatch(setLoadingStatus(true));
        return apis.getList({pageIndex, pageRows, ...pager}).then(res => {
            dispatch(setLoadingStatus(false));
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setAccountList(result));
                return Promise.resolve(result);
            }
        }).catch(err => console.log(err));
    };
};

// 设置用户列表
export const setAccountList = (result) => ({
    type: constants.SET_ACCOUNT_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
});

// 设置loading状态
export const setLoadingStatus = (loading) => ({
    type: constants.SET_LOADING_STATUS,
    loading
});

// 获取用户详情
export const getAccountDetail = (id) => {
    return (dispatch) => {
        return apis.getAccountDetail({id}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                const {createTime, province, city} = result;
                let timeStr = DateTool.utc2beijing(createTime, "yyyy-MM-dd hh:mm:ss");
                dispatch(setAccountDetail({...result, createTime: timeStr}));
                if(!!city){
                    dispatch(getCityByProvinceId(province));
                }
            }
        }).catch(err => console.log(err));
    };
};

// 设置用户详情
export const setAccountDetail = (result) => ({
    type: constants.SET_ACCOUNT_DETAIL,
    detail: fromJS(result)
});

// 重置密码
export const resetPwd = (params) => {
    return (dispatch) => {
        const {password, id} = params;
        return apis.resetPwd({
            password: CryptoTool.encryption(password),
            id
        }).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "修改密码成功",
                    duration: 3
                });
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        }).catch(err => console.log(err));
    };
};

// 获取子账号列表
export const getSubAccountList = (pager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch) => {
        return apis.getSubAccountList({pageIndex, pageRows, ...pager}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setSubAccountList(result));
            }
        }).catch(err => console.log(err));
    };
};

// 设置子账号列表
export const setSubAccountList = (result) => ({
    type: constants.SET_SUB_ACCOUNT_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager),
});

// 获取产品列表
export const getProductList = (pager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch) => {
        return apis.getProductList({pageIndex, pageRows, ...pager}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setProductList(result));
            }
        }).catch(err => console.log(err));
    };
};

// 设置产品列表
export const setProductList = (result) => ({
    type: constants.SET_PRODUCT_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager),
});

// 更新用户资料
export const updateAccount = (params) => {
    return async (dispatch) => {
        return apis.updateAccount(params).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                // dispatch(setAccountDetail(result));
                notification.success({
                    message: "保存成功",
                    duration: 3
                });
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        }).catch(err => console.log(err));
    };
};

// 修改用户资料
export const modifyAccount = (params) => ({
    type: constants.MODIFY_ACCOUNT_DETAIL,
    params
});

// 获取省份列表
export const getProvince = () => {
    return async (dispatch) => {
        return apis.getProvince().then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setProvince(result.map(item => ({
                    label: item.provinceName, 
                    value: item.provinceId,
                    isLeaf: false,
                    key: item.provinceId,
                }))));
            }
        }).catch(err => console.log(err));
    };
};

// 设置省份列表
export const setProvince = (result) => ({
    type: constants.SET_PROVINCE_LIST,
    list: fromJS(result),
});

// 获取城市列表
export const getCityByProvinceId = (provinceId) => {
    return (dispatch, getState) => {
        const province = getState().getIn(["accountManage", "province"]).toJS();
        if(province.length){
            const provinceItem = province.find(item => item.value === provinceId);
            if(provinceItem && provinceItem.children && provinceItem.children.length){
                return ;
            }
        }
        return apis.getCityByProvinceId({provinceId}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setCityList(provinceId, result.map(item => ({
                    label: item.cityName, 
                    value: item.cityId,
                    key: item.provinceId,
                }))));
            }
        }).catch(err => console.log(err));
    };
};

// 设置城市列表
export const setCityList = (provinceId, result) => ({
    type: constants.SET_CITY_LIST,
    provinceId, 
    list: result
});
