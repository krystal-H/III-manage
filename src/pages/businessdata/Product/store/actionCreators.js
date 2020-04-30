import * as constants from './constants'
import { REQUEST_SUCCESS } from '../../../../config/config';
import {
    getList,
    getProduct,
    getServer
  } from '../../../../apis/product';
import { fromJS } from 'immutable';


// 获取产品列表
export const getProductList = (pager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch) => {
        dispatch(triggerLoading(true));
        return getList({pageIndex, pageRows, ...pager}).then(res => {
            dispatch(triggerLoading(false));
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
    return {
        type: constants.SET_PRODUCT_LIST,
        list: fromJS(result.list),
        pager: fromJS(result.pager)
    }
}

// 获取产品详情
export const getProductDetail = (productId) => {
    return (dispatch) => {
        getProduct({productId}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setProductDetail(result));
            }
        }).catch(err => console.log(err))
    }
}

// 设置产品数据
export const setProductDetail = (result) => {
    // 位协议数据格式化
    if(result.protocolList){
        result.protocolList.map(item => {
            item.list = item.list.reduce((x,y) => {
                if(y.bitDefList){
                    return x.concat(y.bitDefList)
                }
                return  x.concat(y)
            }, []) || []
        })
    }

    return {
        type: constants.SET_PRODUCT,
        productDetail: fromJS(result)
    }
}

// 获取产品服务
export const getProductService = (productId) => {
    return (dispatch) => {
        getServer({productId}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                const {timerServiceList} = result;
                let arr = [];
                if(timerServiceList.length > 0){
                    timerServiceList.map(item => {
                        const { productId, serviceId, serviceName, timerServiceDetails, status } = item;
                        if(Array.isArray(timerServiceDetails)){
                            timerServiceDetails.map((inner, index) => {
                                arr.push({len: index === 0 ? timerServiceDetails.length : 0, productId, serviceId, serviceName, ...inner, status })
                            })
                        }
                    })
                }
                dispatch(setProductService({...result, timerServiceList: arr}));
            }
        }).catch(err => console.log(err))
    }
}

// 设置产品服务
export const setProductService = (result) => {
    return  {
        type: constants.SER_PRODUCT_SERVICE,
        productService: fromJS(result)
    }
}

// 清除产品信息
export const clearProductInfo = () => {
    return {
        type: constants.CLEAR_PRODUCT_INFO
    }
}

export const triggerLoading = (loading) => {
    return {
        type: constants.TRIGGER_LOADING,
        loading
    }
}