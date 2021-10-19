import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取订单列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/physicalModel/search',
        data: pager,
        method: 'post',
        headers: {}
    })
};
// 获取类型
export const getOrderType = () => {
    return axios.request({
        url: '/manage-open/deviceCategory/deviceType/all',
        method: 'get',
    })
};
// 回复
export const relData = (data) => {
    return axios.request({
        url: '/manage-open/physicalModel/publish',
        method: 'post',
        data,
        headers: {}
    })
};
//上传
export const upFile = (pager) => {
    return axios.request({
        url: "/manage-open/physicalModel/upload",
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: pager
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
