import axios from '../util/api.request'


// 获取列表
export const getListApi = (data={}) => {
    return axios.request({
        url: '/manage-open/manage/commodity/getCommodityList',
        method: 'post',
        data,
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
        url: '/manage-open/manage/commodity/onOrOffCommodity',
        method: 'post',
        data,
        headers: {}
        // needFormData: true,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        // },
    })
};
// 根据产品id获取详情
export const getDetailByIdApi = (id) => {
    return axios.request({
        url: '/manage-open/manage/commodity/getPublicProductByProductId/'+id,
        method: 'get',
        headers: {}
    })
};
// 获取商品详情
export const getDetailApi = (id) => {
    return axios.request({
        url: '/manage-open/manage/commodity/getCommodityByCommodityId/'+id,
        method: 'get',
        headers: {}
    })
};
//修改库存
export const editStock = (data) => {
    return axios.request({
        url: '/manage-open/manage/commodity/updateCommodityStock',
        data,
        method: 'post',
        headers: {}
    })
};