import axios from '../util/api.request'

// 模组分页列表
export const ModuleListRequest = (params) => {
    return axios.request({
        url: '/manage-open/module/type/getPage',
        params: params,
        method: 'get'
    })
}


// 发布/下线模组
export const ModuleReleaseRequest = (moduleId, releaseStatus) => {
    return axios.request({
        url: '/manage-open/module/type/release',
        params: {
            moduleId,
            releaseStatus
        },
        method: 'get'
    })
}

// 删除单个模组
export const ModuleDeleteRequest = (moduleId) => {
    return axios.request({
        url: '/manage-open/module/type/delete',
        params: {
            moduleId
        },
        method: 'get'
    })
}

// 保存模组信息
export const ModuleSaveRequest = (params) => {
    return axios.request({
        url: '/manage-open/module/type/save',
        headers:{
            'Content-Type':"application/json;charset=UTF-8"
        },
        data: params,
        method: 'post'
    })
}

// 获得模组厂家菜单
export const GetAllModuleBrandListRequest = () => {
    return axios.request({
        url: '/manage-open/module/type/getAllModuleBrandList',
        method: 'get'
    })
}


// 获得模组所属库的菜单
export const GetAllModuleTypeRequest = (params) => {
    return axios.request({
        headers:{
            'Content-Type':"application/json;charset=UTF-8"
        },
        url: '/manage-open/module/type/getList',
        data:params,
        method:'post'
    })
}


// 获得单个模组信息
export const ModuleInfoRequest = (moduleId) => {
    return axios.request({
        url: '/manage-open/module/type/get',
        params: {
            moduleId
        },
        method: 'get'
    })
}

// 获得绑定场景菜单
export const BindSceneListRequest = (moduleId) => {
    return axios.request({
        url: '/manage-open/module/type/bindSceneType/list',
        params: {
            moduleId
        },
        method: 'get'
    })
}

// 模组专用公共菜单
export const GetModuleTypeMenu = (moduleId) => {
    return axios.request({
        url: '/manage-open/module/type/getMenu',
        method: 'get'
    })
}

// 获得单个模组预览信息
export const ModuleInfoPreview = (moduleId) => {
    return axios.request({
        url: '/manage-open/module/type/preview',
        params: {
            moduleId
        },
        method: 'get'
    })
}

// 获得单个模组预览信息
export const SaveFileUrlRequest = (params) => {
    return axios.request({
        url: '/manage-open/module/type/fileSave',
        params:params,
        method: 'get'
    })
}



