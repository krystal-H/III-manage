import axios from '../util/api.request'
// 获取产品列表
export const ProductCategoryListRequest = (params) => {
    return axios.request({
      url:'/manage/auth/data/getType',
      method:'get'
    })
  }