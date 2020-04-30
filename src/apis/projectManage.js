import axios from '../util/api.request'

const prefix = '/manage-open'

// 获取项目列表
export const getList = (pager) => {
    return axios.request({
      url: prefix+'/project/management/getNaviPage',
      params: pager,
      method: 'get'
    })
};

// 删除项目
export const delProject = (params) => {
    return axios.request({
        url: prefix+'/project/management/delete',
        params,
        method: 'get'
    })
}

// 获取项目详情
export const getProject = (params) => {
    return axios.request({
        url: prefix+'/project/management/get',
        params,
        method: 'get'
    })
}
  
// 根据mac地址查询设备列表
export const getDevice = (params) => {
    return axios.request({
        url: prefix+'/project/management/findDeviceProduct',
        params,
        method: 'get'
    })
}

// 获取位置数据模型列表
export const getPositionList = () => {
    return axios.request({
        url: prefix+'/position/data/model/getAllList',
        method: 'get'
    })
}

// 获取位置数据
export const getSummaryList = (params) => {
    return axios.request({
        url: prefix+'/project/management/findPositionSummaryList',
        params,
        method: 'get'
    })
}

// 导入设备文件
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("uploadExcel", file);
    return axios.request({
        url: prefix+'/project/management/deviceProduct/importExcel',
        method: 'post',
        data: formData,
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })   
}

// 保存项目信息
export const saveProject = (params) => {
    return axios.request({
        url: prefix+'/project/management/save',
        method: 'post',
        data: params,
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        }
    })
}