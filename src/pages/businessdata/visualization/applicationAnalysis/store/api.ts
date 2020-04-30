import axios from "../../../../../util/api.request";

/* 站点数据 */
export const _getTabDataForUser = (data: object) => {
  return axios.Post("collection/statsUser/getStatsUserWeb", data);
};
export const _getTabDataForApplication = (data: object) => {
  return axios.Post("collection/statsUser/getStatsUserApp", data);
};
export const _getTabDataForDevice = (data: object) => {
  return axios.Post("collection/statsUser/getStatsDevice", data);
};

/* 头部展示数据获取       新增设备数、激活设备数、故障设备数 */
export const _getHeadData = (data: object = {}) => {
  return axios.Post("collection/statsUser/getCollect", data);
};
