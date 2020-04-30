import axios from '../util/api.request'

export const prefix = '/manage-open'

// 获取位置数据模型列表
export const getList = (params) => {
  return axios.request({
    url: prefix + '/mac/allocation/getPage',
    params: params,
    method: 'get'
  })
}

// 获取模组型号列表
export const getModuleList = () => {
  return axios.request({
    url: prefix + '/module/type/getList',
    method: 'post',
    data: [],
    headers:{
      'Content-Type':"application/json;charset=UTF-8"
    },
  })
}

// 获取mac详情列表
export const getMacDetailList = (params) => {
    return axios.request({
        url: prefix + '/mac/allocation/getExportList',
        params: params,
        method: 'get'
    })
}

// 分配mac
export const macAllocation = (params) => {
  return axios.Post(
    prefix + '/mac/allocation/macAllocate',
    params
  )
}

// 新增mac
export const addMac = (params) => {
  return axios.Post(
    prefix + '/mac/allocation/add',
    params
  )
}