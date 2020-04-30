import axios from '../util/api.request'

// 1.获得分页列表
export const OpenApiListRequest = (params) => {
    return axios.request({
        url: '/manage-open/openapi/config/getPage',
        params: params,
        method: 'get'
    })
}

// 2.停用一条配置信息
export const StopOpenApiRequest = (params) => {
    return axios.request({
        url: '/manage-open/openapi/config/disable',
        params: params,
        method: 'get'
    })
}

// 查询一条配置数据
export const GetOpenApInfoRequest = (params) => {
    return axios.request({
        url: '/manage-open/openapi/config/get',
        params: params,
        method: 'get'
    })
}

// 3.获得该账号下的标签数据
export const GetLabelListRequest = (params) => {
    return axios.request({
        url: '/manage-open/openapi/getLabelList',
        params: params,
        method: 'get'
    })
}

// 4.保存OpenAPI配置
export const SaveOpenApiRequest = (params) => {
    return axios.request({
        url: '/manage-open/openapi/config/add',
        params: params,
        method: 'post'
    })
}

// 5.获得全部的接口访问用户
export const GetUserInfoRequest = (params) => {
    return axios.request({
        url: '/manage-open/openapi/config/getUserList',
        params: params,
        method: 'get'
    })
}

// 6.获得开放平台用户的所有菜单列表
export const GetLabelAndOpenapiRequest = (params) => {
    return axios.request({
        url: 'manage-open/openapi/config/getLabelAndOpenapi',
        params: params,
        method: 'get'
    })
}

