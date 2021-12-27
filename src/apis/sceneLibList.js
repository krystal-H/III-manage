import axios from '../util/api.request'

// 获取条件类型列表
export const conditionTypeListRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/option/getPage',
    params,
    method: 'get'
  })
}

// 条件类型新增
export const addOrUpdateConditionRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/option/addOrUpdate',
    data: params,
    method: 'post',
    needFormData: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
}

// 条件类型删除
export const deleteConditionTypeRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/option/delete',
    params,
    method: 'get'
  })
}

// 条件类型详情
export const getConditonTypeDetailRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/option/getOneOption',
    params,
    method: 'get'
  })
}

// 获取条件字典列表
export const conditionDicListRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/getPageList',
    params,
    method: 'get'
  })
}

// 场景产品列表
export const sceneProductListRequest = (params) => {
  return axios.request({

  })
}

// AI能力列表
export const AIAbilityListRequest = (params) => {
  return axios.request({
    
  })
}
