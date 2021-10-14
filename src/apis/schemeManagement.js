import axios from '../util/api.request'

// 查询方案列表
export const schemeManageListRequest = (params) => {
  return axios.request({
      url: '/scheme/search',
      params: params,
      method: 'get'
  })
}