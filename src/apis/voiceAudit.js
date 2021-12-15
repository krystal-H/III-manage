import axios from '../util/api.request'

const prefix = '/manage-open'

// 语音方案审核列表
export const getVoiceListRequest = (params) => {
  return axios.request({
    url: prefix + '/product/getVoiceList',
    params,
    method: 'get'
  })
}

// 获取语音能力审批列表
export const getVoiceApproveRequest = (params) => {
  return axios.request({
    url: prefix + '/product/getVoiceApprove',
    method: 'post',
    data: params,
    headers: {}
  })
}

// 审批语言能力
export const approveVoiceRequest = (params) => {
  return axios.request({
    url: prefix + '/product/approveVoice',
    method: 'post',
    data: params,
    headers: {}
  })
}