import axios from '../util/api.request'

// 获取列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/gatewayManage/getGatewayListByPage',
        data: pager,
        method: 'post',
        headers: {}
    })
};
// 删除
export const delData = (data) => {
    return axios.request({
        url: '/manage-open/gatewayManage/deleteGatewayInfo',
        method: 'post',
        data,
        headers: {}
    })
};
// 编辑
export const editData = (data) => {
    return axios.request({
        url: '/manage-open/gatewayManage/modifyGatewayInfo',
        method: 'post',
        data,
        headers: {}
    })
};
// 新增
export const addData = (data) => {
    return axios.request({
        url: '/manage-open/gatewayManage/addGatewayInfo',
        method: 'post',
        data,
        headers: {}
    })
};
// 获取产品
export const getProduct = (pager) => {
    return axios.request({
        url: '/manage-open/gatewayManage/getProductListByPage',
        data: pager,
        method: 'post',
        headers: {}
    })
};