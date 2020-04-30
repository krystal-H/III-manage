import axios from '../../../../util/api.request';

const prefix = '/manage-open';

// 获取用户列表
export const getList = (pager) => {
    return axios.request({
      url: prefix+'/user/getList',
      params: pager,
      method: 'get'
    });
};

// 获取子账号列表
export const getSubAccountList = (params) => {
  return axios.request({
    url: prefix + '/user/getSubList',
    params,
    method: 'get'
  });
};

// 获取产品列表
export const getProductList = (params) => {
  return axios.request({
    url: prefix + '/user/getProduct',
    params,
    method: 'get'
  });
};

// 获取用户详情
export const getAccountDetail = (params) => {
  return axios.request({
    url: prefix + '/user/get',
    params,
    method: 'get'
  });
};

// 重置密码
export const resetPwd = (params) => {
  return axios.Post(
    prefix+'/user/resetPwd',
    params
  );
};

// 获取省份列表
export const getProvince = () => {
  return axios.request({
    url: '/env/provincialCascade/province',
    method: 'get'
  });
};

// 获取城市列表
export const getCityByProvinceId = (params) => {
  return axios.request({
    url: '/env/provincialCascade/city',
    params,
    method: 'get'
  }); 
};

// 修改用户资料
export const updateAccount = (params) => {
  return axios.Post(
    prefix+'/user/update',
    params
  );
};