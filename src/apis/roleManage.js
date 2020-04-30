import axios from '../util/api.request'

// const prefix = '/manage-open'
const prefix = '/manage'

// 获取角色列表
export const getList = (pager) => {
    return axios.request({
      url: prefix+'/auth/role/getList',
      params: pager,
      method: 'get'
    })
};

// 获取角色权限
export const getRoleAuth = (params) => {
  return axios.request({
    url: prefix + '/role/getResourceList',
    params,
    method: 'get'
  })
}




