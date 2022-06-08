import axios from '../util/api.request'

// 获取列表
export const getListRequest = (pager) => {
  return axios.request({
      url: '/manage-open/manage/commodity/getModuleListByPage',
      data: pager,
      method: 'post',
      headers: {}
  })
};

// 模糊搜索模组列表
export const searchModuleRequest = (data) => {
  return axios.request({
    url: '/manage-open/module/getModulelistByHetModuleTypeName',
    data,
    method: 'post',
    headers: {}
  })
}

// 获取模组分类的父级id
export const getParentIdRequest = (data) => {
  return axios.request({
    url: '/manage-open/manage/classify/getCommodityClassifyByGrade',
    data,
    method: 'post',
    headers: {}
  })
}

// 查询模组列表
export const getModuleListRequest = (data) => {
  return axios.request({
    url: '/manage-open/manage/classify/getClassifyList',
    data,
    method: 'post',
    headers: {}
  })
}

// 新增保存模组
export const saveModuleInfoRequest = (data) => {
  return axios.request({
    url: '/manage-open/manage/commodity/publicCommodity',
    data,
    method: 'post',
    headers: {}
  })
}


