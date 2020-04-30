import axios from '../util/api.request'

export const getListApi = (param) => {
  return axios.Get(
    '/manage-open/operate/log/getList',
    param,
  )
};
