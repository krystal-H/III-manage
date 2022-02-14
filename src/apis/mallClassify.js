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
// 删除
export const delData = (data) => {
    return axios.request({
        url: '/manage-open/manage/classify/removeClassify',
        method: 'get',
        params: data,
        headers: {}
        // needFormData: true,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        // },
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
