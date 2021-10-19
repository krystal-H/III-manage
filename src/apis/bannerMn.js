import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/banner/getBannerList',
        data: pager,
        method: 'post',
        headers: {}
    })
};
// 上下线
export const relData = (data) => {
    return axios.request({
        url: '/manage-open/banner/updateStatus',
        method: 'post',
        data,
        headers: {}
    })
};
// 删除
export const delData = (data) => {
    return axios.request({
        url: '/manage-open/banner/delete',
        method: 'post',
        data,
        headers: {}
    })
};
// 新增
export const addData = (data) => {
    return axios.request({
        url: '/manage-open/banner/add',
        method: 'post',
        data,
        headers: {}
    })
}
