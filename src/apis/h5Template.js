import axios from '../util/api.request'

// 获取模板列表
export const H5TemplateRequest = (params) => {
  return axios.request({
    url:'/manage-open/panel/template/list',
    params:params,
    method:'get'
  })
}

//  模板发布
export const H5PublishRequest = (params) => {
  return axios.request({
    url:'/manage-open/panel/template/saveTemplate',
    data:params,
    method:'post'
  })
}

// 保存新创建的模板
export const SaveTemplateRequest = (params) =>{
  return axios.request({
    url:'/manage-open/panel/template/saveTemplate',
    data:params,
    method:'post'
  })
}

// 删除H5模板
export const DelTemplateRequest = (params) =>{
  return axios.request({
    url:'/manage-open/panel/template/delTemplate',
    data:params,
    method:'post'
  })
}

// 获得单个H5模板信息
export const H5TemplateInfoRequest = (params) =>{
  return axios.request({
    url:'/manage-open/panel/template/get',
    params:params,
    method:'get'
  })
}



