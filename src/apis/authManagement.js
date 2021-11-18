import axios from '../util/api.request'
const prefix = '/manage-open'

// 获取默认菜单
export const getDefaultMenuRequest = (params) => {
  return axios.request({
    url: prefix + '/resourceManage/getDefaultMenu',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// 新增接口路径/修改菜单
export const addUrlRequest = (params) => {
  return axios.request({
    url: prefix + '/resourceManage/addUrl',
    methods: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json"
    }
  })
}