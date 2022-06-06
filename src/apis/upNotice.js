import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取列表
export const getList = (pager) => {
    return axios.request({
        url: '/manage-open/module/search',
        data: pager,
        method: 'post',
        headers: {}
    })
};
// 获取后台管理-模组固件升级-产品列表
export const getProductList= (data) => {
    return axios.request({
        url: '/manage-open/product/published/module',
        method: 'post',
        data,
        headers: {}
    })
};
//第一步提交
export const addOneData= (data) => {
    return axios.request({
        url: '/manage-open/firmware/device/version/addAll',
        method: 'post',
        data,
        headers: {}
    })
};
//升级通知
export const subFinishData= (data) => {
    return axios.request({
        url: '/manage-open/firmware/device/version/inform',
        method: 'post',
        data,
        headers: {}
    })
};
// 更改状态
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

// 新增
export const newData = (data) => {
    return axios.request({
        url: '/manage-open/physicalModel/create',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
// 编辑
export const editData = (data) => {
    return axios.request({
        url: '/manage-open/physicalModel/update',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
// 详情1
export const getDetailTable = (data) => {
    return axios.request({
        // url: '/manage-open/physicalModel/func/list',
        url: '/manage-open/product/dev/show/func',
        method: 'post',
        data,
        headers: {}
    })
}
// 详情2
export const getDetailInfo = (data) => {
    return axios.request({
        url: '/manage-open/physicalModel/details',
        method: 'post',
        data,
        headers: {}
    })
}
//下载
export const getFileUrl = () => {
    return axios.request({
        url: '/manage-open/physicalModel/template/download',
        method: 'get',
        headers: {}
    })
}