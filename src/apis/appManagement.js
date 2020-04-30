import axios from '../util/api.request'

const prefix = '/manage-open'

// 获取应用管理-应用列表
export const getList = (pager) => {
  return axios.request({
    url: prefix+'/app/info/getAppList',
    params: pager,
    method: 'get'
  })
};

//获得所有产品类目菜单
export const getAllProList = (pager) => {
  return axios.request({
    url: '/manage-open/common/product/deviceCategory/allList',
    params: pager,
    method: 'get'
  })
};
// 应用管理-获取关联的产品列表
export const getRealProList = (pager) => {
  return axios.request({
    url: '/manage-open/app/info/getProductList',
    params: pager,
    method: 'post'
  })
}

// 应用管理-关联产品
export const updateRelaProduct = (data) => {
  return axios.request({
    url: '/manage-open/app/info/updateRelaProduct',
    params:{version: 1.1},
    data:data,
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  })
}

//应用管理-获取应用详情
export const getAppInfo = (data) => {
  return axios.request({
    url: '/manage-open/app/getAppInfo',
    params: data,
    method: 'get'
  })
}

//应用管理-获取已关联的产品列表
export const getOldRealProList = (data) => {
  return axios.request({
    url: '/manage-open/app/info/getRealProductList',
    params: data,
    method: 'post'
  })
}

//应用管理-版本记录
export const getColophonList = (data) => {
  return axios.request({
    url: '/manage-open/app/version/getList',
    params: data,
    method: 'post'
  })
}

//应用管理-判断是否管理员
export const judgeAdmin = () => {
  return axios.request({
    url: '/manage-open/common/user/isSuper',
    method: 'get'
  })
}
