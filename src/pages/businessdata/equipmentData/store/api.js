import axios from "../../../../util/api.request";
import { baseUrl } from "../../../../util/api.request";

/* 应用列表 */
export const _getList = data => {
  return axios.Post("manage-open/device/file/upload/pathList", data);
};

export const _download = paramsStr => {
  const url = "/manage-open/device/file/upload/excelExport?";
  const href = window.location.origin + baseUrl + url + paramsStr;
  try {
    window.open(href);
  } catch (e) {
    message.warn("下载失败");
  }
};
