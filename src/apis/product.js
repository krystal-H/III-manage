import axios from '../util/api.request'

const prefix = '/manage-open'

// 获取产品列表
export const getList = (pager) => {
  return axios.request({
    url: prefix+'/product/getList',
    params: pager,
    method: 'get'
  })
};

// 获取产品详情
export const getProduct = (productId) => {
  return axios.request({
    url: prefix+'/product/getInfo',
    params: productId,
    method: 'get'
  })
}

// 获取产品服务
export const getServer = (productId) => {
  return axios.request({
    url: prefix+'/product/getServer',
    params: productId,
    method: 'get'
  })
}
