import axios from '../util/api.request'

const prefix = '/manage-open'

// 获取审核列表
export const getList = (pager) => {
    return axios.request({
        url: prefix+'/audit/getList',
        params: pager,
        method: 'get'
    })
}

// 更新产品审核状态
export const updateStatus = (params) => {
    return axios.request({
        url: prefix+'/audit/update',
        params,
        method: 'get'
    })
}

// 获取审核产品信息
export const getAuditProduct = (params) => {
    return axios.request({
        url: prefix+'/audit/product/get',
        params,
        method: 'get'
    })
}


