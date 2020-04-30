import {
  fromJS
} from 'immutable';
import * as constants from './constants';
import {
  REQUEST_SUCCESS
} from '../../../../config/config';
import * as apis from '../../../../apis/macAllocation';

// 获取产品列表
export const getMacList = (pager) => {
  let [pageIndex, pageRows] = [1, 10];
  return (dispatch) => {
    dispatch(setLoadingStatus(true));
    return apis.getList({
      pageIndex,
      pageRows,
      ...pager
    }).then(res => {
      dispatch(setLoadingStatus(false));
      let result = res.data.data;
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(setMacList(result));
        return Promise.resolve(result);
      }
    }).catch(err => console.log(err));
  };
};

// 设置产品列表
export const setMacList = (result) => {
  return {
    type: constants.SET_MAC_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
  };
};

// 设置loading状态
export const setLoadingStatus = (loading) => ({
  type: constants.SET_LOADING_STATUS,
  loading
})

// 获取模组型号列表
export const getModuleList = () => {
  return (dispatch) => {
    apis.getModuleList().then(res => {
      let result = res.data.data;
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(setModuleList(result));
        return Promise.resolve(result);
      }
    }).catch(err => console.log(err));
  };
};

// 设置模组型号列表
export const setModuleList = (result) => {
  return {
    type: constants.SET_MODULE_LIST,
    list: fromJS(result || [])
  };
};

// 获取产品列表
export const getMacDetailList = (pager) => {
  let [pageIndex, pageRows] = [1, 10];
  return (dispatch) => {
    return apis.getMacDetailList({
      pageIndex,
      pageRows,
      ...pager
    }).then(res => {
      let result = res.data.data;
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(setMacDetailList(result));
        return Promise.resolve(result);
      }
    }).catch(err => console.log(err));
  };
};

// 设置产品列表
export const setMacDetailList = (result) => {
  return {
    type: constants.SET_MAC_DETAIL_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
  };
};

// 分配mac
export const macAllocation = (params) => {
  return (dispatch) => {
    return apis.macAllocation(params).then(res => {
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        // dispatch(getMacList());
        return Promise.resolve(1);
      }
      return Promise.resolve(0);
    });
  };
};

// 新增Mac
export const addMac = (params) => {
  return (dispatch) => {
    return apis.addMac(params).then(res => {
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        // dispatch(getMacList());
        return Promise.resolve(1);
      }
      return Promise.resolve(0);
    });
  };
};
