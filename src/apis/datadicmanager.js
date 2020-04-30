
import axios from '../util/api.request'
const manage = 'manage-open'
// 数据字典
export const dataDictionaryListRequest = (params) => {
  return axios.request({
    url:`/${manage}/param/dictionary/list`,
    params:params,
    method:'get'
  })
}

// 数据字典获取
export const dataDictionaryItemRequest = (paramId) => {
  return axios.request({
    url:`/${manage}/param/dictionary/get`,
    params:{
      paramId
    },
    method:'get'
  })
}

// 数据字典获取添加
export const dataDictionaryItemAddRequest = (params) => {
  return axios.request({
    url:`/${manage}/param/dictionary/add`,
    data:params,
    method:'post'
  })
}

// 数据字典获取更新
export const dataDictionaryItemUpdateRequest = (params) => {
  return axios.request({
    url:`/${manage}/param/dictionary/update`,
    data:params,
    method:'post'
  })
}

// 数据字典获取删除
export const dataDictionaryItemDeleteRequest = (paramId) => {
  return axios.request({
    url:`/${manage}/param/dictionary/delete`,
    params:{
      paramId
    },
    method:'get'
  })
}

