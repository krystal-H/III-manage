import axios from '../util/api.request'

const prefix = '/manage-open'

// 获取位置数据模型列表
export const getList = (params) => {
  return axios.request({
    url:  prefix+'/position/data/model/getList',
    params: params,
    method: 'get'
  })
}

// 删除位置数据模型
export const deleteModel = (params) => {
  return axios.request({
    url:  prefix+'/position/data/model/delete',
    params,
    method: 'get'
  })
}


// 获取位置数据模型基本信息
export const getModelDetail = (params) => {
    return axios.request({
      url:  prefix+'/position/data/model/get',
      params,
      method: 'get'
    })
}

// 保存位置数据模型基本信息
export const saveModelDetail = (params) => {
    return axios.Post(
      prefix+'/position/data/model/createAndUpdate',
      params
    )
}

// 获取位置数据模型列表
export const getModelList = (params) => {
  return axios.request({
    url:  prefix+'/position/summary/getSummaryAndElementGroup',
    params,
    method: 'get'
  })
}

// 保存位置数据列
export const saveSummaryData = (params) => {
  return axios.Post(
    prefix+'/position/summary/createAndUpdate',
    params,
  )
}

// 删除位置数据列
export const delSummaryData = (params) => {
  return axios.Get(
    prefix+'/position/summary/delete',
    params
  )
}

// 添加单层数据
export const addElements = (params) => {
  return axios.Post(
    prefix+'/position/element/createAndUpdate',
    params
  )
}

// 获取位置模型标签列表
export const getLabelList = (params) => {
  return axios.Get(
    prefix+'/position/label/rela/getList',
    params
  )
}
