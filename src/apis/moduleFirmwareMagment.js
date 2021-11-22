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
      'Content-Type': "application/json"
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

// 保存模组&固件
export const saveModuleRequest = (params) => {
  return axios.request({
    url: prefix + '/module/create',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// 更新模组&固件
export const updateModuleRequest = (params) => {
  return axios.request({
    url: prefix + '/module/update',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// 发布/下线模组
export const ModuleReleaseRequest = (moduleId, releaseStatus) => {
  return axios.request({
    url: prefix + '/module/type/release',
    params: {
      moduleId,
      releaseStatus
    },
    method: 'get'
  })
}

// 删除单个模组
export const ModuleDeleteRequest = (moduleId) => {
  return axios.request({
    url: `${prefix}/module/delete/${moduleId}`,
    method: 'get'
  })
}

// 获取模组详情
export const getModuleDetailRequest = (moduleId) => {
  return axios.request({
    url: `${prefix}/module/detail/${moduleId}`
  })
}

// 发布后更新模组固件
export const publishedUpdateModuleRequest = (params) => {
  return axios.request({
    url: `${prefix}/module/update/firmware`,
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

