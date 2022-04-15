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
export const addAccount = (data) => {
    return axios.request({
        url: '/manage-open/manufacturer/createManufacturerAccount',
        method: 'post',
        data,
        headers: {}
    })
};
// 重置
export const resetAccount = (data) => {
    return axios.request({
        url: '/manage-open/manufacturer/resetPassword',
        method: 'post',
        data,
        headers: {}
    })
};
// 发送重置
export const sentREset = (data) => {
    return axios.request({
        url: '/manage-open/manufacturer/sendPassword',
        method: 'post',
        data,
        headers: {}
    })
};