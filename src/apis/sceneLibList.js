import axios from '../util/api.request'

// 条件类型-----------------------------------------------

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

// 条件字典-----------------------------------------------

// 获取条件字典列表
export const conditionDicListRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/getPageList',
    params,
    method: 'get'
  })
}

// 条件字典中的条件类型列表-弹窗
export const getCheckTypeRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/option/getList',
    params,
    method: 'get'
  })
}

// 条件字典-参数单位
export const getUnitRequest = (params) => {
  return axios.request({
    url: '/expert/deviceType/unit/list',
    params,
    method: 'get'
  })
}

// 条件字典-新增
export const saveConditionDicRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/addOrUpdate',
    data: params,
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    }
  })
}

// 条件字典-详情
export const getConditionDicDetailRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/getOneCondition',
    params,
    method: 'get'
  })
}

// 条件字典-删除
export const deleteConditionDicRequest = (params) => {
  return axios.request({
    url: '/expert/scene/condition/delete',
    params,
    method: 'get'
  })
}

// 场景产品列表-----------------------------------------------

// 场景产品列表
export const sceneProductListRequest = (params) => {
  return axios.request({
    url: '/expert/combine/deviceType/list/v2.0',
    params,
    method: 'get'
  })
}

// 场景产品列表-详情
export const getSceneProductDetailRequest = (params) => {
  return axios.request({
    url: '/expert/deviceType/getDetail',
    params,
    method: 'get'
  })
}

// 场景产品列表-扩展功能-状态查询
export const getStatusQueryRequest = (params) => {
  return axios.request({
    url: '/expert/deviceType/statusQuery/list',
    params,
    method: 'get'
  })
}

// 场景产品列表-扩展功能-功能控制
export const getExtendFuncsRequest = (params) => {
  return axios.request({
    url: '/expert/deviceType/deviceFunction/list',
    params,
    method: 'get'
  })
}

// 场景产品列表-扩展功能-状态删除
export const deleteExtendFuncsRequest = (params) => {
  return axios.request({
    url: '/expert/deviceType/deviceFunction/delete',
    params,
    method: 'get'
  })
}


// 场景产品列表-扩展功能-功能删除
export const deleteStatusQueryRequest = (params) => {
  return axios.request({
    url: '/expert/deviceType/statusQuery/delete',
    params,
    method: 'get'
  })
}


// AI能力列表-----------------------------------------------
// AI能力列表
export const AIAbilityListRequest = (params) => {
  return axios.request({

  })
}
