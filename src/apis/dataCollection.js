import axios from '../util/api.request'
// 数据采集应用接口
export const ApplicationGetListRequest = (params) => {
    return axios.request({
        url: '/collection/application/getList',
        data: params,
        method: 'post'
    })
}
// 数据采集事件接口
export const LogsEventGetListRequest = (params) => {
    return axios.request({
        url: '/collection/logsEvent/getList',
        data: params,
        method: 'post'
    })
}

// 获取web端列表接口
export const GetWebTypeListRequest = (arams) => {
    return axios.request({
        url: '/collection/application/getAppInfoWebType',
        data: {
            pageRows: 9999,
            pageIndex: 1
        },
        method: 'post'
    })
}

// 获取移动端列表接口
export const GetPhoneTypeListRequest = () => {
    return axios.request({
        url: '/manage/app/info/list',
        params: {
            pageRows: 9999,
            pageIndex: 1
        },
        method: 'get'
    })
}

// 获取第三方应用列表
export const GetAuthTypeListRequest = () => {
    return axios.request({
        url: '/manage/auth/data/getAppInfo',
        params: {},
        method: 'get'
    })
}

// 添加应用接口
export const AddAPPRequest = (params) => {
    return axios.request({
        url: '/collection/application/add',
        data: params,
        method: 'post'
    })
}

// 刷新Token applicationId: 10113
export const UpdateTokenRequest = (params) => {
    return axios.request({
        url: '/collection/application/updateToken',
        data: params,
        method: 'post'
    })
}

// 删除应用接口 applicationId: 10113
export const DeletAppRequest = (params) => {
    return axios.request({
        url: '/collection/application/delete',
        data: params,
        method: 'post'
    })
}

// 添加事件的接口
export const AddLogsEventRequest = (params) => {
    return axios.request({
        url: '/collection/logsEvent/add',
        data: params,
        method: 'post'
    })
}


// 停用/启动事件接口
export const SetLogsEventRequest = (params) => {
    return axios.request({
        url: '/collection/logsEvent/ope',
        data: params,
        method: 'post'
    })
}

export const DeleteLogsEventRequest = (params) => {
    return axios.request({
        url: '/collection/logsEvent/delete',
        data: params,
        method: 'post'
    })
}


export const GetEventDeatilRequest = (params) => {
    return axios.request({
        url: '/collection/logsEvent/get',
        data: params,
        method: 'post'
    })
}

