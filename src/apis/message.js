import axios from '../util/api.request'

const prefix = '/manage-open'

// 获取产品列表
export const getList = (pager) => {
  return axios.request({
    url: prefix+'/audit/getListForMonth',
    params: pager,
    method: 'get'
  })
};

// 更新已读状态
export const updateToRead = (params) => {
  return axios.request({
    url: prefix+'/audit/updateToRead',
    params,
    method: 'get'
  })
}

// 获取未读消息总数
export const getMessageCount = () => {
  return axios.request({
    url: prefix+'/audit/getUnreadTotalForMonth',
    method: 'get'
  })
}