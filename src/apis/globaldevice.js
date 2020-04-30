import axios from '../util/api.request'

export const GetAppInfo = () => {
  return axios.request({
    url:`/manage/auth/data/getAppInfo`,
    method:'get'
  })
}

export const GetType = () => {
  return axios.request({
    url:`/manage/auth/data/getType`,
    method:'get'
  })
}