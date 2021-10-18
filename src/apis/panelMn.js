import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取订单列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/panel/template/getTemplateListByPage',
        data: pager,
        method: 'post',
        headers: {}
    })
};
// 获取订单类型
export const getOrderType = () => {
    return axios.request({
        url: '/manage-open/workOrder/getWorkOrderDictionary',
        method: 'post',
        data:{}
    })
};
// 回复
export const getCallback = (data) => {
    return axios.request({
        url: '/manage-open/workOrder/replyWorkOrder',
        method: 'post',
        data,
        headers: {}
    })
};
//上传
export const upFile = (pager) => {
    return axios.request({
        url: "/v4/web/tencentcloud/upload",
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:pager
    })
};

// 获取产品详情
export const getProduct = (productId) => {
    return axios.request({
        url: prefix + '/product/getInfo',
        params: productId,
        method: 'get'
    })
}

// 获取产品服务
export const getServer = (productId) => {
    return axios.request({
        url: prefix + '/product/getServer',
        params: productId,
        method: 'get'
    })
}
