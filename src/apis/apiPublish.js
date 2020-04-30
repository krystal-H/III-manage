import axios from '../util/api.request'

export const getOpenApiListApi = (pager) => {
  return axios.request({
    url: 'manage-open/apiInfo/getOpenApiList',
    params: {
      pageIndex: pager.pageIndex,
      pageRows: pager.pageRows,
    },
    method: 'get'
  })
};

export const saveOpenApi = (curApi) => {
  return axios.request({
    url: 'manage-open/apiInfo/saveOpenApi',
    params: {
      ...curApi,
    },
    method: 'get',
  })
};

export const getOpenApiDetail = (releaseId) => {
  return axios.request({
    url: 'manage-open/apiInfo/getOpenApiDetail',
    params: {
      releaseId,
    },
    method: 'get',
  })
};

export const getDimensionDetailApi = (index) => {
  return axios.request({
    url: 'manage-open/dimension/getDimensionDetail',
    params: {
      dimensionType: index,
    },
    method: 'get',
  })
};

export const saveDimensionIndexApi = (dataDimension, dataIndex, dimensionType) => {
  return axios.request({
    url: 'manage-open/dimension/saveDimensionIndex',
    params: {
      dataDimension,
      dataIndex,
      dimensionType,
    },
    method: 'get',
  })
};

export const cancelApiReleaseApi = (releaseId) => {
  return axios.request({
    url: 'manage-open/apiInfo/cancelApiRelease',
    params: {
      releaseId,
    },
    method: 'get',
  })
};
