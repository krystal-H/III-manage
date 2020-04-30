import * as constants from './constants'
import { REQUEST_SUCCESS } from '../../../../config/config';
  import {
    getList, //获取应用管理-应用列表
    getAllProList, //获得所有产品类目菜单
    getRealProList, //获取应用管理-获取关联的产品列表
    updateRelaProduct, //应用管理-关联产品
    getAppInfo, //应用管理-获取应用详情
    getOldRealProList, //应用管理-获取已关联的产品列表
    getColophonList, //应用管理-版本记录
    judgeAdmin, // 判断是否管理员
  } from '../../../../apis/appManagement';
import { fromJS } from 'immutable';

// 获取产品列表
export const getProductList = (pager) => {
    let [pageIndex, pageRows] = [1, 10]
    return (dispatch) => {
        return getList({pageIndex, pageRows, ...pager}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setProductList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}
// 设置产品列表
export const setProductList = (result) => {
    let list = [];
    for(let i=0; i<result.list.length; i++){
        let {appId, appName, appType, developerName, updateTime} = result.list[i];
        list.push({appId, appName, appType, developerName, updateTime});
    }
    return {
        type: constants.SET_PRODUCT_LIST,
        list: fromJS(list),
        pager: fromJS(result.pager)
    }
}
// 获取关联的产品列表
export const getRealProductList = (pager) => {
    let [pageIndex, pageRows] = [1, 10]
    return (dispatch) => {
        return getRealProList({pageIndex, pageRows, ...pager}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setRealProductList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}
// 设置关联的产品列表
export const setRealProductList = (result) => {
    return {
        type: constants.SET_REAL_PRODUCT_LIST, 
        realProductList: fromJS(result.list),
        realProductPage: fromJS(result.pager)
    }
}
//获得所有产品类目菜单
export const getAllProductList = () => {
    return (dispatch) => {
        return getAllProList().then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                // const {timerServiceList} = result;
                dispatch(setAllProductList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}
//设置所有产品类目菜单
export const setAllProductList = (result) => {
    let arr = [];
    for(let i=0; i<result.length; i++){
        let {categoryId, categoryName, subCategoryList} = result[i];
        let subList=[];
        for(let j=0; j<subCategoryList.length; j++){
            let {subCategoryId, subCategoryName, deviceTypeList} = subCategoryList[j];
            let deviceList=[];
            for(let k=0; k<deviceTypeList.length; k++){
                let {deviceTypeId, deviceTypeName, defaultDeviceSubtype} = deviceTypeList[k];
                let deviceSubtypeId = defaultDeviceSubtype.deviceSubtypeId;
                deviceList.push({value:deviceTypeId+':'+deviceSubtypeId, label:deviceTypeName});
            }
            subList.push({value:subCategoryId, label:subCategoryName, children:deviceList})
        }
        arr.push({value:categoryId, label:categoryName,children:subList});
    }
    return {
        type: constants.SET_ALL_PRO_LIST,
        allProList: fromJS(arr)
    }
}
//应用管理-关联产品
export const updateRelaPro = (data) => {
    return (dispatch) => {
        return updateRelaProduct(data).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                // dispatch(getProductList());
                message.success("修改成功！")
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}
//应用管理-获取应用详情
export const GetAppInfo = (data) => {
    return (dispatch) => {
        return getAppInfo(data).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(SetAppInfo(result));
                return Promise.resolve(result)
            }
            return Promise.resolve(0);
        }).catch(err => console.log(err),dispatch(SetAppInfo({}))
        )
    }
}
//设置 应用管理-获取应用详情
export const SetAppInfo = (result) => {
    return {
        type: constants.SET_APP_INFO,
        appInfo: fromJS(result)
    }
}
//应用管理-获取已关联的产品列表
export const getOldRealProductList = (pager) => {
    let [pageIndex, pageRows] = [1, 10]
    return (dispatch) => {
        return getOldRealProList({pageIndex, pageRows, ...pager}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setAppLinkList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err),dispatch(setAppLinkList({list:[],pager:{totalRows: 0, pageIndex: 0}})))
    }
}
//设置查看关联产品 
export const setAppLinkList = (result) => {
    return {
        type: constants.SET_APPLINK_LIST,
        appLinkList: fromJS(result.list),
        appLinkPager: fromJS(result.pager)
    }
}
//应用管理-获取已关联的产品列表 (不分页)
export const getProductIdList = (pager) => {
    return (dispatch) => {
        return getOldRealProList({...pager}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setProductIdList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}
//设置已关联的产品列表 （不分页） 
export const setProductIdList = (result) => {
    return {
        type: constants.SET_PRODUCT_ID_LIST,
        productIdList: fromJS(result)
    }
}
 //应用管理-版本记录
export const GetColophonList = (pager) => {
    let [pageIndex, pageRows] = [1, 10]
    return (dispatch) => {
        return getColophonList({pageIndex, pageRows, ...pager}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(SetColophonList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err),dispatch(SetColophonList({list:[],pager:{totalRows: 0, pageIndex: 0}})))
    }
}
//设置应用管理-版本记录
export const SetColophonList = (result) => {
    return {
        type: constants.SET_COLOPHON_LIST,
        colophonList: fromJS(result.list),
        colophonPager: fromJS(result.pager)
    }
}

// 判断是否管理员
export const JudgeAdmin = () => {
    return (dispatch) => {
        return judgeAdmin().then(res => {
            const data = res.data.data;
            const code = res.data.code;
            if(code === REQUEST_SUCCESS){
                return Promise.resolve(data);
            }
            return Promise.resolve(1);
        })
    }
}