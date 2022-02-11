import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/manage/classify/getClassifyList',
        // params: pager,
        method: 'get',
        headers: {}
    })
};
// 更改状态
export const relData = (data) => {
    return axios.request({
        url: '/manage-open/panel/template/saveStandardPanel',
        method: 'post',
        data,
        headers: {}
    })
};
// 获取物模型列表
export const getPhyList = (id) => {
    return axios.request({
        url: `/manage-open/physicalModel/list/deviceTypeId/${id}`,
        method: 'get',
    })
};
//获取物模型下的数据
export const getPhyData = (data) => {
    return axios.request({
        url: '/manage-open/physicalModel/func/list',
        method: 'post',
        data,
        headers: {}
    })
};
