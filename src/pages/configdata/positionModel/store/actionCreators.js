import { fromJS } from 'immutable';
import * as constants from './constants'
import { getList, getModelDetail, saveModelDetail, deleteModel, 
    getModelList, saveSummaryData, delSummaryData, addElements, getLabelList } from '../../../../apis/positionModel'
import { REQUEST_SUCCESS } from '../../../../config/config';

// 获取产品列表
export const getLocationList = (pager) => {
    let [pageIndex, pageRows] = [1, 10]
    return (dispatch) => {
        return getList({pageIndex, pageRows, ...pager}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setLocationList(result));
                return Promise.resolve(result)
            }
        }).catch(err => console.log(err))
    }
}

// 设置产品列表
export const setLocationList = (result) => {
    return {
        type: constants.SET_LOCATION_LIST,
        list: fromJS(result.list),
        pager: fromJS(result.pager)
    }
}

// 删除位置数据模型数据
export const deleteLocation = (modelId) => {
    return (dispatch) => {
        return deleteModel({modelId}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(getLocationList())
                return Promise.resolve(code)
            }
        }).catch(err => console.log(err))
    }
}

// 获取位置数据模型基本信息
export const getLocationDetail = (modelId) => {
    return (dispatch) => {
        return getModelDetail({modelId}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setLocationDetail(result));
                return Promise.resolve(result);
            }
        }).catch(err => console.log(err))
    }
}

// 设置位置模型基本信息
export const setLocationDetail = (result) => {
    return {
        type: constants.SET_LOCATION_DETAIL,
        modelDetail: fromJS(result)
    }
}

// 保存位置数据模型基本信息
export const saveLocationDetail = (params) => {
    return (dispatch) => {
        return saveModelDetail(params).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setLocationDetail(params));
                return Promise.resolve(code)
            } 
        })
    }
}

// 获取模型数据 
export const getLocationDetailList = (modelId) => {
    return (dispatch) => {
        getModelList({modelId}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setLocationDetailList(result));
            }
        }).catch(err => console.log(err))
    }
}

// 设置位置数据模型数据
export const setLocationDetailList = (result) => {
    return {
        type: constants.SET_LOCATION_DETAIL_LIST,
        model: fromJS(result)
    }
}

// 重置位置数据模型数据
export const resetModelList = () =>{
    return {
        type: constants.RESET_LOCATION_DETIAL
    }
}

// 保存位置列
export const saveSummary = (params) => {
    return (dispatch, getState) => {
        return saveSummaryData(params).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(getLocationDetailList(params.modelId))
                return Promise.resolve(code)
            }
        })
    }
}

// 删除位置列
export const delSummary = (summaryId) => {
    return (dispatch, getState) => {
        // const modelDetail = getState().getIn(["positionModel", "modelDetail"]).toJS();
       return delSummaryData({summaryId}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                // dispatch(getLocationDetailList(modelDetail.modelId))
                return Promise.resolve(1);
            }
            return Promise.resolve(0)
        })
    }
}

// 添加数据
export const addElement = (params) => {
    return (dispatch, getState) => {
        // const modelDetail = getState().getIn(["positionModel", "modelDetail"]).toJS();
        return addElements({...params, parentIds: JSON.stringify(params.parentIds)}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                // dispatch(getLocationDetailList(modelDetail.modelId))
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        })
    }
}

// 获取位置标签列表
export const getModLabelList = (modelId) => {
    return (dispatch) => {
        getLabelList({modelId}).then(res => {
            let list = res.data.data;
            dispatch(
                {
                    type: 'MODLABELLIST',
                    model: fromJS(list)
                }
            );
        }).catch(err => console.log(err))
    }
}