import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取厂商账号列表
export const getList = (data = {}) => {
    return axios.request({
        url: '/manage-open/manufacturer/getManufacturerList',
        data,
        method: 'post',
        headers: {}
    })
};
// 新增
export const addAccount = (id) => {
    return axios.request({
        url: '/manage-open/manufacturer/createManufacturerAccount',
        method: 'post',
        data,
        headers: {}
    })
};
// 查看账号信息
export const getAccountInfo = (id) => {
    return axios.request({
        url: '/manage-open/manufacturer/getManufacturerDetail/'+id,
        method: 'get',
        headers: {}
    })
};
// 获取快递信息
export const getExpressInfo = (id) => {
    return axios.request({
        url: '/manage-open/manage/order/getExpressDetail/'+id,
        method: 'get',
        headers: {}
    })
};
// 填写快递信息
export const fillExpressInfo = (data) => {
    return axios.request({
        url: '/manage-open/manage/order/addExpress',
        method: 'post',
        data,
        headers: {}
    })
};