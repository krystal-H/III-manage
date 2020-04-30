import axios from '../util/api.request'
const manage = 'manage-open'
export const protocolTemplateListRequest = (params) => {
  return axios.request({
    url:`/${manage}/protocol/template/getList`,
    params:params,
    method:'get'
  })
}


export const getProtocolTemplateRequest = (templateNumber) => {
  return axios.request({
    url:`/${manage}/protocol/template/getByTemplateNumber`,
    params:{
      templateNumber:templateNumber
    },
    method:'get'
  })
}


export const protocolTemplateUpdateRequest = (params) => {
  return axios.request({
    url:`/${manage}/protocol/template/update`,
    data:params,
    method:'post'
  })
}

export const protocolTemplateInsertRequest = (params) => {
  return axios.request({
    url:`/${manage}/protocol/template/insert`,
    data:params,
    method:'post'
  })
}

