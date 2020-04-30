import axios from "../../../../util/api.request";
import { TabMap } from "./types";
import { _Download } from "../../store/api";

const sameUrl = "collection/ReportCommonQuery/getList";

const ruleCodeMap = {
  countFor1: "216620f7243343eda52d5f006b912e71", // 非留存总数
  countFor2: "f3e3631c46a14777a067ae2cc14971b4", // 留存及新增用户总数

  [TabMap.NEWUSERS]: "f82713f50f784cdab610ffdd8090f01d", // 新增用户列表
  [TabMap.ACTIVEUSERS]: "694cb63043df48febe4f41da4dbd658c", // 活跃用户列表
  [TabMap.STARTUSERS]: "954704ac3cb649dfb581b812bb8d44f9", // 启动次数列表
  [TabMap.KEEPUSERSFORNEW]: "ea0ce3ff4bf242229a22ec3387642f69", // 新增用户次日留存列表
  [TabMap.KEEPUSERSFORACTIVE]: "8a9fd3d3aa084656a70e6690e5a3a2f2", // 活跃用户次日留存列表
  [TabMap.TIMEFORPERPERSON]: "6e9e788df0964e9fb5d11d3923a174c6", // 人均使用时长列表
  [TabMap.CRASH]: "f272ff91674e4b4780b25162493a8de3" // 崩溃数列表
};

/* 获取总数 */
export const _getData = (data: object) => {
  const data1 = { ...data, ruleCode: ruleCodeMap.countFor1 };
  const data2 = { ...data, ruleCode: ruleCodeMap.countFor2 };
  return Promise.all([
    axios.Post(sameUrl, data1),
    axios.Post(sameUrl, data2)
  ]).then(([rst1, rst2]) => {
    const {
      data: {
        data: { list: list1 },
        code: code1
      }
    } = rst1;
    const {
      data: {
        data: { list: list2 },
        code: code2
      }
    } = rst2;
    let d = {};
    if (list1[0]) {
      d = { ...d, ...list1[0] };
    }
    if (list2[0]) {
      d = { ...d, ...list2[0] };
    }
    return { code: code1 === 0 && code2 === 0 ? 0 : -1, data: d };
  });
};

/* 获取总数 */
export const _getList = (data: object, tab: TabMap) => {
  return axios.Post(sameUrl, { ...data, ruleCode: ruleCodeMap[tab] });
};

/* 下载文件 */
export const _download = (paramsStr: string) => {
  _Download("/collection/eventAnalysis/downLoadCSVData?", paramsStr);
};
