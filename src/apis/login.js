import axios from '../util/api.request'

export const LoginRequest = ({username, password}) => {
  return axios.Post(
    '/manage-open/common/admin/loginCheck',
    {username,password},
    )
}

export const LogoutRequest = () => {
  return axios.request({
    url:'/manage-open/common/admin/logout',
    method:'get'
  })
}

export const GetAppInfo = () => {
  return axios.request({
    url:'/manage-open/auth/data/getAppInfo',
    method:'get'
  })
}

export const GetType = () => {
  return axios.request({
    url:'/manage-open/auth/data/getType',
    method:'get'
  })
}

//test fro mock
export const getTestData = () => {
  return axios.request({
    url:'/getTestJson'
  })
}

export const ResetPwd = (password,verifyCode) => {
  return axios.Post(
    '/manage-open/common/user/resetPwd',
   {password,verifyCode}
  )
}
