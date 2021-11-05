import axios from '../util/api.request'

// 获取列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/firmware/check/search',
        data: pager,
        method: 'post',
        headers: {}
    })
};
// 审批
export const relData = (data) => {
    return axios.request({
        url: '/manage-open/firmware/check',
        method: 'post',
        data,
        headers: {}
    })
};