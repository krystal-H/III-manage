import axios from "../../../../util/api.request";
import { TabMap } from "./types";
import moment from "moment";
import { _Download } from "../../store/api";

const format = "YYYY-MM-DD"; // YYYY-MM-DD HH:mm:ss

const sameUrl = "collection/ReportCommonQuery/getList";

const ruleCodeMap = {
  [TabMap.NEWUSERS]: "09ba4392f656408d8e9c2357caa118ce", // 新增用户列表
  [TabMap.ACTIVEUSERS]: "2361a4c5e39648b6a5cc2e7a10b74876", // 活跃用户列表
  [TabMap.STARTUSERS]: "046129134c574daeba622c6e91af5970", // 启动次数列表
  [TabMap.KEEPUSERS]: "7c60989449d949a98988970533d2b4bf" // 新增用户次日留存列表
};

/* 获取总数 */
export const _getData = (data: object) => {
  return axios.Post("collection/UserRealTimeQuery/queryTotalNum", {
    ...data,
    endTimestamp: +new Date()
  });
};

/* 获取列表 */
export const _getList = (data: object, tab: TabMap) => {
  return axios.Post(sameUrl, {
    ...data,
    ruleCode: ruleCodeMap[tab],
    createDate: moment().format(format)
  });
};

/* 下载文件 */
export const _download = (paramsStr: string) => {
  _Download("/collection/eventAnalysis/downLoadCSVData?", paramsStr);
};
