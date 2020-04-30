import axios from "../../../../util/api.request";
import { IQueryPager, IAddUser } from './types';

const prefix = '/manage-open';

// 获取接口访问用户角色
export const getList = (pager: IQueryPager) => {
  return axios.request({
    url: prefix + '/openapi/user/getPage',
    params: pager,
    method: 'get'
  });
};

// 获取接口访问用户详情
export const getUserDetail = (params: { userId: number }) => {
  return axios.request({
    url: prefix + '/openapi/user/getChildWithSecret',
    params,
    method: 'get'
  });
};

// 获取角色权限
export const getRoleAuth = (params: { roleId?: number, userId?: number }) => {
  return axios.request({
    url: prefix + '/openapi/user/getRights',
    params,
    method: 'get'
  });
};

//创建接口访问用户
export const addUser = (params: IAddUser) => {
  return axios.request({
    url: prefix + '/openapi/user/addMultiChild',
    data: params,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// 保存接口访问用户
export const saveUser = (params: IAddUser) => {
  return axios.Post(
    prefix + '/openapi/user/updateChild',
    params
  );
};

// 获取角色列表
export const getRoleList = () => {
  return axios.request({
    url: prefix + '/openapi/user/getRoleList',
    method: 'get'
  });
};

// 获取开发者信息
export const getDeveloperInfo = () => {
  return axios.request({
    url: prefix + '/openapi/user/getDefaultDeveloperInfo',
    method: 'get'
  });
};

// 删除用户
export const delUser = (params: { userId: number }) => {
  return axios.request({
    url: prefix + '/openapi/user/deleteChild ',
    params,
    method: 'get'
  });
};