import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取用户列表
export const getList = (data={}) => {
    return axios.request({
        url: '/manage-open/manage/user/getUserList',
        method: 'get',
        params:data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
};
// 更改用户状态
export const changeStatus = (data) => {
    return axios.request({
        url: '/manage-open/manage/user/updateUserStatus',
        method: 'get',
        params:data,
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
