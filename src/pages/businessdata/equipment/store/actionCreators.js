import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import {
    getEquipmentList,
    getEquipmentInfo,
    getEquipmentLabelList,
    equipmentLabelAdd,
    equipmentLabelDelete,
    equipmentLabelUpdate,
    equipmentDelete,
    setPort,
    getSiteModel,
    getSite,
    setSite
  } from '../../../../apis/equipment';
import { fromJS } from 'immutable';


// 获取设备列表
export const getEquipmentListFunc = (pager) => {
    return (dispatch) => {
        return getEquipmentList(pager).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setEquipmentList(result));
                return Promise.resolve();
            }
        }).catch(err => console.log(err));
    };
};

// 设置设备列表
export const setEquipmentList = (result) => {
    return {
        type: constants.SET_EQUIPMENT_LIST,
        list: fromJS(result.list),
        pager: fromJS(result.pager)
    };
};

// 获取设备详情
export const getEquipmentInfoFunc = (id) => {
    return (dispatch) => {
        return getEquipmentInfo(id).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setEquipmentInfo(result));
                return Promise.resolve(res);
            }
        }).catch(err => console.log(err));
    };
};

// 设置设备详情
export const setEquipmentInfo = (result) => {
    return {
        type: constants.DEVICE_INFO,
        deviceInfoData:fromJS(result),
    };
};

/**
 * 获取设备标签列表
 * params:{deviceId, pageIndex, pageIndex}
 */ 
export const getEquipmentLabelListFunc = (params) => {
    return (dispatch) => {
        return getEquipmentLabelList(params).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                let labelList = [],
                    labelPager = { totalRows: 0, pageIndex: 0 };
                if(result&&result.list){
                    labelList = result.list;
                }
                if(result&&result.pager){
                    labelPager = result.pager;
                }
                dispatch(setEquipmentLabelList(labelList));
                dispatch(setEquipmentLabelPager(labelPager));
                return Promise.resolve();
            }
        }).catch(err => console.log(err));
    };
};

// 获取默认设备标签
export const getEquipmentDefaultLabel = (params) => {
    return (dispatch) => {
        return getEquipmentLabelList(params).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setEquipmentDefaultLabel(result));
            }
        })
    }
}

// 设置默认设备标签
export const setEquipmentDefaultLabel = (list) => {
    return {
        type: constants.DEFAULT_LABEL_GET_LIST,
        list
    }
}

// 设置设备标签列表
export const setEquipmentLabelList = (result) => {
    return {
        type: constants.LABEL_GET_LIST,
        labelList: fromJS(result),
    };
};
// 设置设备标签列表分页
export const setEquipmentLabelPager = (result) => {
    return {
        type: constants.LABEL_GET_PAGER,
        labelPager: fromJS(result)
    };
};

/**
 * 新增设备标签
 * params:{deviceId, labelKey, labelValue}
 */ 
export const equipmentLabelAddFunc = (params) => {
    return (dispatch) => {
        return equipmentLabelAdd(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        }).catch(err => console.log(err));
    };
};

/**
 * 删除设备标签
 * params:{labelId}
 */ 
export const equipmentLabelDeleteFunc = (params) => {
    return (dispatch) => {
        return equipmentLabelDelete(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve();
            }
        }).catch(err => console.log(err));
    };
};

/**
 * 编辑保存设备标签
 * params:{labelId}
 */ 
export const equipmentLabelUpdateFunc = (params) => {
    return (dispatch) => {
        return equipmentLabelUpdate(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve();
            }
        }).catch(err => console.log(err));
    };
};

/**
 * 删除设备
 * params:{设备id}
 */ 
export const equipmentDeleteFunc = (params) => {
    return (dispatch) => {
        return equipmentDelete(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(res.data);
            }
        }).catch(err => console.log(err));
    };
};

/**
 * 删除设备
 * params:{}
 */ 
export const setPortFunc = (params) => {
    return (dispatch) => {
        return setPort(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(res.data);
            }
        }).catch(err => console.log(err));
    };
};

/**
 * 位置模型列表
 */ 
export const getSiteModelFunc = (params) => {
    return (dispatch) => {
        return getSiteModel(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(res.data);
            }
        }).catch(err => console.log(err));
    };
};
/**
 * 位置模型选中详情 
 */ 
export const getSiteFunc = (params) => {
    return (dispatch) => {
        return getSite(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(res.data);
            }
        }).catch(err => console.log(err));
    };
};
/**
 * 位置模型选中详情 
 */ 
export const setSiteFunc = (params) => {
    return (dispatch) => {
        return setSite(params).then(res => {
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(res.data);
            }
        }).catch(err => console.log(err));
    };
};