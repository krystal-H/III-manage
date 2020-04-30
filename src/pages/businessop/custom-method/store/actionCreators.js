import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import { getMethodListApi, getMethodDetailApi } from '../../../../apis/customMethod';

const changeMethodList = (result) => ({
  type: constants.CHANGE_METHOD_LIST,
  methodList: fromJS(result.list),
  pager: fromJS(result.pager),
});

const changeCurApi = (result) => ({
  type: constants.CHANGE_CUR_API,
  curApi: fromJS(result),
});

const setMethodListLoading = (loading) => ({
  type: constants.SET_METHOD_LIST_LOADING,
  loading,
});

export const getMethodList = (param) => {
  return (dispatch) => {
    dispatch(setMethodListLoading(true));
    getMethodListApi(param).then((res) => {
      const result = res.data.data;
      const code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(changeMethodList(result));
        dispatch(setMethodListLoading(false));
      }
    });
  }
};

export const getMethodDetail = (apiId) => {
  return (dispatch) => {
    getMethodDetailApi(apiId).then((res) => {
      const result = res.data.data;
      const code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(changeCurApi(result));
      }
    });
  }
};
