import axios from '../util/api.request'


// 获取列表
export const getListApi = () => {
    return axios.request({
        url: '/manage-open/manage/commodity/getCommodityList',
        // params: pager,
        method: 'get',
        headers: {}
    })
};
// 上架
export const publicCommodityApi = (data) => {
    return axios.request({
        url: '/manage-open/manage/commodity/publicCommodity',
        method: 'post',
        data,
        headers: {}
    })
};
// 下架
export const offCommodityApi = (data) => {
    return axios.request({
        url: '/manage-open/manage/commodity/offCommodity',
        method: 'post',
        data,
        headers: {}
    })
};
// 获取商品详情
export const getDetailApi = (data) => {
    return axios.request({
        url: '/manage-open/manage/commodity/getCommodityByCommodityId',
        params: data,
        method: 'get',
        headers: {}
    })
};
// 删除
export const delData = (data) => {
    return axios.request({
        url: '/manage-open/manage/classify/removeClassify',
        method: 'post',
        data,
        headers: {}
    })
};
// 新增/编辑
export const addDataApi = (data) => {
    return axios.request({
        url: '/manage-open/manage/classify/addClassify',
        method: 'post',
        data,
        headers: {}
    })
};
