import { message } from 'antd'
import * as constants from './constants'
import { REQUEST_SUCCESS } from '../../../../config/config';
import {
    getList,
    getAuditProduct,
    updateStatus
  } from '../../../../apis/productAudit';
import { fromJS } from 'immutable';
import { setProductDetail } from '../../../businessdata/Product/store/actionCreators';

// 获取产品审核列表
export const getAuditList = (pager) => {
    let [pageIndex, pageRows, types] = [1, 10, '2,10'];
    return (dispatch) => {
        dispatch(triggerLoading(true));
       return getList({pageIndex, pageRows, types, ...pager}).then(res => {
            dispatch(triggerLoading(false));
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setAuditList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}

// 设置产品审核列表
export const setAuditList = (result) => {
    return {
        type: constants.SET_PRODUCT_AUDIT_LIST,
        list: fromJS(result.list),
        pager: fromJS(result.pager)
    }
}

// 获取审核产品信息
export const getAuditInfo = (params) => {
    return (dispatch) => {
        getAuditProduct(params).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if(code === REQUEST_SUCCESS){
                // dispatch(setProductDetail(result))
                dispatch(setAuditDetail(result.flowCheck))
            }
        }).catch(err => {console.log(err); return new Promise()})
    }
}

// 设置审核结果
export const setAuditDetail = (auditDetail) => {
    return {
        type: constants.SET_PRODUCT_AUDIT_DETAIL,
        auditDetail
    }
}


// 审核状态更新
export const updateAuditStatus = ({id, statu, remark}) => {
    return (dispatch) => {
        updateStatus({id, statu, remark}).then(res => {
            const code = res.data.code;
            if(code === REQUEST_SUCCESS){
                dispatch(setAuditDetail({id, statu, remark}))
                dispatch(getAuditList())
                message.success("提交审核成功")
            }else{
                message.error("提交审核失败")
            }
        }).catch(err => {console.log(err)})
    }
}

// 设置审核状态
export const setAuditStatus = () => {
    return {
        type: constants.SET_PRODUCT_AUDIT_STATUS,

    }
}

// 清除产品信息
export const clearProductInfo = () =>({
    type: constants.CLEAR_PRODUCT_INFO
})

export const triggerLoading = (loading) => ({
    type: constants.TRIGGER_LOADING,
    loading
})