import axios from '../util/api.request'

// 服务审核分页列表
export const GetServiceAuditRequest = (params) => {
    return axios.request({
      url: '/manage-open/audit/getList',
      params: params,
      method: 'get'
    })
  }

  // 服务审核分页列表
export const GetServiceAuditInfoRequest = (params) => {
  return axios.request({
    url: '/manage-open/audit/app/get',
    params: params,
    method: 'get'
  })
}

  // 更新审核状态
  export const ServiceAuditUpdate = (params) => {
    return axios.request({
      url: '/manage-open/audit/update',
      params: params,
      method: 'get'
    })
  }