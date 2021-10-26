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

// 厂商列表
export const getModuleBrandRequest = (params) => {
  return axios.request({
    url: prefix + '/module/type/getAllModuleBrandList',
    method: 'get'
  })
}

// 配网库
export const getNetRequest = () => {
  return axios.request({
    url: prefix + '/module/type/getList',
    method: 'post',
    data: [],
    headers: {
      'Content-Type': "application/json;charset=UTF-8"
    },
  })
}

// 支持协议
export const getModuleProtocolRequest = () => {
  return axios.request({
    url: prefix + '/module/type/getMenu',
    method: 'get'
  })
}

// 获得绑定场景菜单
export const bindSceneListRequest = (moduleId) => {
  return axios.request({
    url: prefix + '/module/type/bindSceneType/list',
    params: {
      moduleId
    },
    method: 'get'
  })
}

// 模组专用公共菜单
export const getModuleTypeMenuRequest = () => {
  return axios.request({
      url: prefix + '/module/type/getMenu',
      method: 'get'
  })
}