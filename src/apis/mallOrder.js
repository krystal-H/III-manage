import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取订单列表
export const getList = (data = {}) => {
    return axios.request({
        url: '/manage-open/manage/order/getOrderList',
        data,
        method: 'post',
        headers: {}
    })
};
// 查看收件人信息
export const getMenInfo = (id) => {
    return axios.request({
        url: '/manage-open/manage/order/getReceiverDetail/'+id,
        method: 'get',
        headers: {}
    })
};
// 查看订单信息
export const getOrderInfo = (id) => {
    return axios.request({
        url: '/manage-open/manage/order/getOrderDetail/'+id,
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