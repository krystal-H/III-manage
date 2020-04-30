import axios from '../util/api.request'
// 获取数据位置模型列表
export const LocationDataModelRequest = (params) => {
  return axios.request({
    url: '/manage/position/data/model/getList',
    params: params,
    method: 'get'
  })
}

// 删除数据位置模型
export const DeleteModelRequest = (params) => {
  return axios.request({
    url: '/manage/position/data/model/delete',
    params: params,
    method: 'get'
  })
}
