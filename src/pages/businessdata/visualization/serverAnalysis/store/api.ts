import axios from "../../../../../util/api.request";

/* 站点数据 */
export const _getTabDataForServer = (data: object) => {
  return axios.Post("collection/messageData/getStatsRequest", data);
};
export const _getTabDataForMessage = (data: object) => {
  return axios.Post("collection/messageData/getStatsDevicelink", data);
};

/* 头部展示数据获取       新增设备数、激活设备数、故障设备数 */
export const _getHeadData = (data: object = {}) => {
  return axios.Post("collection/messageData/getCollect", data);
};
