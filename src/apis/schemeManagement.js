import axios from '../util/api.request'
const prefix = '/manage-open'
// 查询方案列表
export const schemeManageListRequest = (params) => {
  return axios.request({
    url: prefix + '/scheme/search',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 获取品类
export const getThirdCategoryRequest = (params) => {
  return axios.request({
    url: prefix + '/deviceCategory/deviceType/all',
    params,
    method: 'get'
  })
}

// 根据品类查物模型
export const getObjectModalRequest = (id) => {
  return axios.request({
    url: prefix + '/physicalModel/list/deviceTypeId/' + id,
    method: 'get'
  })
}

// 根据物模型id查功能列表
export const getFuncListRequest = (params) => {
  return axios.request({
    url: prefix + '/physicalModel/func/list',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 根据通信方式查找模组
export const getModuleByModuleTypeRequest = (params) => {
  return axios.request({
    url: prefix + '/module/listModuleByModuleType',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 保存方案
export const saveSchemeRequest = (params) => {
  return axios.request({
    url: prefix + '/scheme/create',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 获取方案详情
export const getSchemeDetailRequest = (params) => {
  return axios.request({
    url: prefix + '/scheme/detail',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 更新保存方案
export const updateSchemeRequest = (params) => {
  return axios.request({
    url: prefix + '/scheme/update',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 发布方案
export const publishSchemeRequest = (params) => {
  return axios.request({
    url: prefix + '/scheme/publish',
    method: 'post',
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  })
}

