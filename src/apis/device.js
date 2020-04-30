import axios from '../util/api.request';

// 获取设备三级分类
export const deviceCategoryRequest = () => {
  return axios.request({
    url:'/manage-open/common/product/deviceCategory/allList',
    method:'get'
  });
};

// 1.获取大类列表
export const DeviceTypeRequset = () => {
  return axios.request({
    url:'/manage-open/auth/data/getType',
    method:'get'
  });
};
// 2.获取小类列表
export const DeviceSubTypeRequest = ({deviceTypeId}) => {
  return axios.request({
    url:'manage-open/auth/data/getSubType',
    
    params:{
      deviceTypeId,
    },
    method:'get'
  });
};

// 3.获取设备绑定类型
export const DeviceBindTypeList = () => {
  return axios.request({
    url:'/manage-open/common/product/bindtype/list',
    method:'get'
  });
};

// 4.获取具体的产品协议
export const ProtocolTemplateRequest=(params)=>{
  return axios.request({
    url:'/manage-open/panel/template/getProtocolTemplate',
    params:params,
    method:'get'
  });
};

// 5.获取所有产品类目数据
export const AllProductCategoryListRequest=(params)=>{
  return axios.request({
    url:'/manage-open/common/product/deviceCategory/allList',
    params:params,
    method:'get'
  });
};

// 获取用户权限模块
export const GetAuthModule = () => {
  return axios.request({
    url:'/manage-open/role/getResourceList',
    method:'get'
  });
};
