import axios from '../util/api.request'
const prefix = '/manage-open'
// 查询方案列表
export const schemeManageListRequest = (params) => {
  return axios.request({
    method: 'post',
    url: prefix + '/scheme/search',
    data: params,
    headers: {
      "Content-Type": "application/json",
    },

  })
}

// 获取品类
export const getThirdCategoryRequest = (params) => {
  return axios.request({
    url: prefix + '/deviceCategory/deviceType/all',
    params,
    method: 'get'
  })
}
