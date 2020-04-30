import axios from '../util/api.request'

// const prefix = '/manage-open'
const prefix = '/manage'

// 获取项目列表
export const getList = (pager) => {
    return axios.request({
      url: prefix+'/auth/account/list',
      params: pager,
      method: 'get'
    })
};

// 获取项目
export const getAccount = (params) => {
  return axios.request({
    url: prefix + '/',
    params,
    method: 'get'
  })
}

