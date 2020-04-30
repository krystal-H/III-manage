import axios from '../../../../util/api.request';

const prefix = '/manage-open';

// 获取项目列表
export const getList = (pager) => {
    return axios.request({
      url: prefix+'/subUser/getList',
      params: pager,
      method: 'get'
    });
};

// 获取项目
export const getAccount = (params) => {
  return axios.request({
    url: prefix + '/subUser/getSub',
    params,
    method: 'get'
  });
};

// 获取角色列表
export const getRoleList = () => {
  return axios.request({
    url: prefix + '/role/getDownList',
    method: 'get'
  });
};

// 保存角色信息
export const saveSubAccount = (params) => {
  return axios.Post(
    prefix+'/subUser/add',
    params
  );
};

// 重置密码
export const resetPwd = (params) => {
  return axios.Post(
    prefix+'/subUser/resetPwd',
    params
  );
};

// 删除子账号
export const delSubAccount = (params) => {
  return axios.request({
    url: prefix + '/subUser/delete',
    params,
    method: 'get',
  }); 
};

// 获取角色权限
export const getRoleAuth = (params) => {
  return axios.request({
    url: prefix + '/role/getResourceList',
    params,
    method: 'get',
  }); 
};

// 修改子账号信息
export const modifySubAccount = (params) => {
  return axios.Post(
    prefix+'/subUser/update',
    params
  );
};