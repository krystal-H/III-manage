import axios, { baseUrl } from "../../../util/api.request";
import { message } from "antd";

// 获取所有应用列表
export const _getAllAppList = () => {
  return axios.Post("collection/application/getList", {
    paged: false,
    pageRows: 9999,
    pageIndex: 1
  });
};

// 获取终端列表
export const _getUserAgentList = (data: object) => {
  return axios.Post("collection/statsLogCondition/getUserAgents", data);
};

// 获取版本列表
export const _getVersionList = (data: object) => {
  return axios.Post("collection/statsLogCondition/getAppVersions", data);
};

// 获取所有渠道列表
export const _getChannelList = (data: object) => {
  return axios.Post("collection/statsLogCondition/getChannelIds", data);
};

// 获取事件列表 - 根据应用ids
export const _getEventList = (data: object) => {
  return axios.Post(
    "collection/logsEvent/getByApplicationIdAndEventType",
    data
  );
};

// 获取属性列表 - 根据事件id
export const _getPropertyList = (data: object) => {
  return axios.Post("collection/logsEvent/get", data);
};

/* 下载文件 */
export const _Download = (url: string, paramsStr: string) => {
  const href = window.location.origin + baseUrl + url + paramsStr;
  try {
    window.open(href);
  } catch (e) {
    message.warn("下载失败");
  }
};
