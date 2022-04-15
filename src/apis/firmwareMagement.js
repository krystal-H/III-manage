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
        url: '/manage-open/firmware/check/',
        method: 'post',
        data,
        headers: {}
    })
};
//查看
export const lookData = (data) => {
    return axios.request({
        url: '/manage-open/product/show/firmware/config',
        method: 'post',
        data,
        headers: {}
    })
};
//查看已审核的信息
export const lookCheckData = (data) => {
    return axios.request({
        url: '/manage-open/firmware/check/details',
        method: 'post',
        data,
        headers: {}
    })
};