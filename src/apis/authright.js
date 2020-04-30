import axios from '../util/api.request'

const manage = 'manage-open'
export const GetAppInfo = () => {
  return axios.request({
    url:`/${manage}/auth/data/getAppInfo`,
    method:'get'
  })
}
