import axios from '../util/api.request'

export const getMethodListApi = (param) => {
  return axios.request({
    url: 'manage-open/stats/customApi/getMethodList',
    params: {
      ...param
    },
    method: 'get'
  })
};

export const getMethodDetailApi = (apiId) => {
  return axios.request({
    url: 'manage-open/stats/customApi/getMethodDeail',
    params: {
      apiId,
    },
    method: 'get',
  })
};

export const auditOperationApi = (param) => {
  return axios.request({
    url: 'manage-open/stats/customApi/auditOperation',
    data: {
      ...param,
    },
    method: 'post',
  })
};
