import axios from '../util/api.request'

const prefix = '/workOrder'

// 获取用户列表
export const getList = (data={}) => {
    return axios.request({
        url: '/manage-open/manage/user/getUserList',
        method: 'post',
        data,
        headers: {}
    })
};
// 更改用户状态
export const changeStatus = (data) => {
    return axios.request({
        url: '/manage-open/manage/user/updateUserStatus',
        method: 'post',
        data,
        headers: {}
    })
};