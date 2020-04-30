import axios from '../util/api.request';

const prefix = '/manage-open';

// 获取设备列表 
export const getEquipmentList = (pager) => {
  return axios.request({
    url: prefix+'/device/getList',
    params: pager,
    method: 'get',
  });
};

// 获取设备详情 
export const getEquipmentInfo = (deviceId) => {
  return axios.request({
    url: prefix+'/device/get',
    params: deviceId,
    method: 'get',
  });
};

// 获取设备标签列表
export const getEquipmentLabelList = (params) => {
  return axios.request({
    url: prefix+'/deviceLabel/getList',
    params,
    method: 'get',
  });
};

// 新建保存设备标签
export const equipmentLabelAdd = (params) => {
  return axios.request({
    url: prefix+'/deviceLabel/add',
    params,
    method: 'post',
  });
};

// 删除设备标签
export const equipmentLabelDelete = (params) => {
  return axios.request({
    url: prefix+'/deviceLabel/delete',
    params,
    method: 'post',
  });
};

// 编辑设备标签
export const equipmentLabelUpdate = (params) => {
  return axios.request({
    url: prefix+'/deviceLabel/update',
    params,
    method: 'post',
  });
};

// 删除设备
export const equipmentDelete = (params) => {
  return axios.request({
    url: prefix+'/device/delete',
    params,
    method: 'get',
  });
};

// 端口设置
export const setPort = (params) => {
  return axios.request({
    url: prefix+'/device/setPort',
    params,
    method: 'post',
  });
};

// 位置模型列表
export const getSiteModel = (params) => {
  return axios.request({
    url: prefix+'/device/getSiteModel',
    params,
    method: 'get',
  });
};

// // 位置模型详情列表 一次性获取
// export const getSite = (params) => {
//   return axios.request({
//     url: prefix+'/device/getSite',
//     params,
//     method: 'get',
//   });
// };

// 位置模型详情列表 一次性获取
export const getSite = (params) => {
  return axios.request({
    url: prefix+'/device/getChildElement',
    params,
    method: 'get',
  });
};

//保存位置数据 
export const setSite = (params) => {
  return axios.request({
    url: prefix+'/device/setSite',
    params,
    method: 'get',
  });
};