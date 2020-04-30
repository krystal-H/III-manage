import { fromJS } from 'immutable';
import * as constants from './constants';
import { REQUEST_SUCCESS } from '../../../../config/config';
import {
  getOpenApiListApi,
  saveOpenApi,
  getOpenApiDetail,
  getDimensionDetailApi,
  saveDimensionIndexApi,
} from '../../../../apis/apiPublish';

const changeApiList = (result) => ({
  type: constants.CHANGE_API_LIST,
  apiList: fromJS(result.list),
  pager: fromJS(result.pager),
});

const getCurApi = (result) => ({
  type: constants.GET_CUR_API,
  curApi: fromJS(result.data),
});

const setLoading = (loading) => ({
  type: constants.SET_LOADING,
  loading,
});

const setDimension = (result) => ({
  type: constants.SET_DIMENSION,
  dataDimension: result.dataDimension.length > 0 ? fromJS(result.dataDimension) : fromJS([{
    dimensionName: '',
    dimensionDesc: '',
  }]),
  dataIndex: result.dataIndex.length > 0 ? fromJS(result.dataIndex) : fromJS([{
    indexName: '',
    indexDesc: '',
  }]),
});

export const toggleApiDialog = () => ({
  type: constants.TOGGLE_API_DIALOG,
});

export const toggleDimensionDialog = (index) => ({
  type: constants.TOGGLE_DIMENSION_DIALOG,
  dimensionType: index,
});

export const addDimensionItem = (type) => ({
  type: constants.ADD_DIMENSION_ITEM,
  category: type,
});

export const delDimensionItem = (type, index) => ({
  type: constants.DEL_DIMENSION_ITEM,
  index,
  category: type,
});

export const changeDimensionData = (type, index, value) => ({
  type: constants.CHANGE_DIMENSION_DATA,
  index,
  value,
  category: type,
});

export const getOpenApiList = (pager) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getOpenApiListApi(pager).then((res) => {
      const result = res.data.data;
      const code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(changeApiList(result));
        dispatch(setLoading(false));
      }
    });
  }
};

export const editApi = (releaseId) => {
  return (dispatch) => {
    // 编辑
    if (releaseId) {
      getOpenApiDetail(releaseId).then((res) => {
        const code = res.data.code;
        if (code === REQUEST_SUCCESS) {
          dispatch(getCurApi(res.data));
          dispatch(toggleApiDialog());
        }
      });
    } else { // 新建
      dispatch(getCurApi({
        data: {
          dataType: 1,
          apiName: '',
          apiUrl: '',
          apiDesc: '',
          releaseVersion: '',
          requestType: 'GET',
          releaseId: undefined,
        }
      }));
      dispatch(toggleApiDialog());
    }
  }
};

export const saveOpen = (curApi) => {
  return (dispatch) => {
    saveOpenApi(curApi).then((res) => {
      const code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(toggleApiDialog());
        dispatch(getOpenApiList());
      }
    });
  }
};

export const getDimensionDetail = (index) => {
  return (dispatch) => {
    getDimensionDetailApi(index).then((res) => {
      const code = res.data.code;
      const result = res.data.data;
      if (code === REQUEST_SUCCESS) {
        dispatch(toggleDimensionDialog(index));
        dispatch(setDimension(result));
      }
    });
  }
};

export const saveDimensionIndex = (dataDimension, dataIndex, dimensionType) => {
  return (dispatch) => {
    saveDimensionIndexApi(dataDimension, dataIndex, dimensionType).then((res) => {
      const code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(toggleDimensionDialog(dimensionType));
      }
    });
  }
};
