import axios from "../../../../util/api.request";
import { IPagerParam, IRoleParam, SearchTypes } from "./types";

const prefix = '/manage-open';

// 获取角色列表
export const getList = (pager: IPagerParam) => {
    return axios.request({
      url: prefix+'/openapi/defaultRole/getPage',
      params: pager,
      method: 'get'
    });
};

// 获取角色详情
export const getRoleDetail = (params: {roleId: number}) => {
  return axios.request({
    url: prefix+'/openapi/defaultRole/getBaseInfo',
    params,
    method: 'get'
  });
};

// 获取角色权限
export const getRoleAuth = (params: {roleId?: number, userId?: number}) => {
  return axios.request({
    url: prefix + '/openapi/user/getRights',
    params,
    method: 'get'
  });
};

// 保存角色权限
export const saveRoleAuth = (params: IRoleParam) => {
  return axios.Post(
    prefix + '/openapi/defaultRole/saveRole',
    params,
  );
};

// 删除角色
export const delRole = (params: {roleId: number}) => {
  return axios.request({
    url: prefix + '/openapi/defaultRole/deleteRole',
    params,
    method: 'get'
  });
};

// 特殊查询
export const searchAuth = (params: {type: number, typeName: string}) => {
  const { type, typeName } = params;
  // 0 为设备标签
  const url = {
    [SearchTypes.Product]: "/openapi/defaultRole/findProduct",
    [SearchTypes.App]: "/openapi/defaultRole/findApp",
    [SearchTypes.AppWeChat]: "/openapi/defaultRole/findApp",
    [SearchTypes.Label]: "/openapi/defaultRole/findLabel",
  };
  console.log(type, url[type]);
  let obj: any = {};
  if(type === SearchTypes.App || type === SearchTypes.AppWeChat){
    obj.appName = typeName;
    obj.appType = type === SearchTypes.App ? 0 : 2
  }else if(type === SearchTypes.Product){
    obj.productName = typeName;
  }else if(type === SearchTypes.Label){
    obj.name = typeName;
  }
  
  return axios.request({
    url: prefix + url[type],
    params: obj,
    method: 'get'
  });
}