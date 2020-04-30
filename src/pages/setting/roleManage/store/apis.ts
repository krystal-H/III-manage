import axios from '../../../../util/api.request';
import { IPager, IRoleParam } from './types';

const prefix = '/manage-open';

// 获取角色列表
export const getList = (pager: IPager) => {
    return axios.request({
      url: prefix+'/role/getList',
      params: pager,
      method: 'get'
    });
};

// 获取角色权限
export const getRoleAuth = (params: {roleId?: number}) => {
  return axios.request({
    url: prefix + '/role/getResourceList',
    params,
    method: 'get'
  });
};

// 保存角色信息
export const saveRole = (params: IRoleParam) => {
  return axios.Post(
    prefix + '/role/save',
    params,
  );
};

// 删除角色
export const delRole = (params: {roleId?: number}) => {
  return axios.request({
    url: prefix + '/role/delete',
    params,
    method: 'get'
  });
};
