import axios from '../util/api.request'

const prefix = '/manage-open'
// 查询方案列表
export const ModuleListRequest = (params) => {
  return axios.request({
    url: prefix + '/module/search',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  })
}