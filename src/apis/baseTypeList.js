import axios from '../util/api.request'
// 基本类型菜单
export const GetBaseTypeListRequest = (params) => {
    return axios.request({
      url:'/manage-open/common/product/baseType/getList',
      params:params,
      method:'get'
    })
  }