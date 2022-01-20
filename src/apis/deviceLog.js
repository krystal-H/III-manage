import axios from '../util/api.request'

// 获取日志列表
export const getDeviceLogRequest = (data) => {
  return axios.request({
      url: '/manage-open/device/log/getDeviceLogByPage',
      data,
      method: 'post',
      headers: {}
  })
};