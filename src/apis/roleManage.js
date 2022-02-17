import axios from '../util/api.request'

// const prefix = '/manage-open'
const prefix = '/manage'

// 获取角色列表
export const getList = (pager) => {
  return axios.request({
    url: prefix + '/auth/role/getList',
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


//获取app
export const getAppAuth = (params) => {
  return axios.request({
    url: prefix + '/auth/data/role/getAppInfo',
    params,
    method: 'get'
  })
}
//获取app权限
export const getAppAuthOwn = (params) => {
  return axios.request({
    url: prefix + '/auth/role/getRoleById',
    params,
    method: 'get'
  })
}
//提交app
export const subAppAuth = (data) => {
  return axios.request({
    url: prefix + '/auth/role/updateRole',
    method: 'post',
    needFormData: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  })
}
