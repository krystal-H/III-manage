import { combineReducers } from "redux";
import { selectItemProps, actionProps } from "./types";
import realtimeDataReducer from "../realtimeData/store/reducer";
import historicalTrendReducer from "../historicalTrend/store/reducer";
// import usingFrequencyReducer from "../usingFrequency/store/reducer";
// import usingDurationReducer from "../usingDuration/store/reducer";
// import deviceDataReducer from "../deviceData/store/reducer";
// import terminalPropertyReducer from "../terminalProperty/store/reducer";
// import channelAnalysisReducer from "../channelAnalysis/store/reducer";
// import eventAnalysisReducer from "../eventAnalysis/store/reducer";
import {
  ALLAPPLISTLOADED,
  VERSIONLISTLOADED,
  CHANNELLISTLOADED,
  EVENTLISTLOADED,
  PROPERTYLISTLOADED,
  USERAGENTLISTLOADED
} from "./actionNames";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

// 全部应用列表
const allAppList = (
  state: selectItemProps[] | null = null,
  { type, list }: actionProps
) => {
  return type === ALLAPPLISTLOADED ? list : state;
};

// 全部应用的映射
const allAppMap = (state = {}, { type, list }: actionProps) => {
  if (type === ALLAPPLISTLOADED) {
    let now = { ...state };
    list.forEach((d: any) => {
      now[d.applicationId] = d;
    });
    return now;
  }
  return state;
};

// 应用类型
const userAgentMap = (
  state = {},
  { type, appId, list }: actionProps
): object => {
  if (type === USERAGENTLISTLOADED) {
    let now = { ...state };
    now[appId] = list;
    return now;
  }
  return state;
};

// 版本列表映射缓存
const versionMap = (
  state = {},
  { type, appId, userAgent, list }: actionProps
): object => {
  if (type === VERSIONLISTLOADED) {
    let now = { ...state };
    now[appId + "-" + userAgent] = list;
    return now;
  }
  return state;
};

// 渠道列表映射缓存
const channelMap = (
  state = {},
  { type, appId, userAgent, list }: actionProps
): object => {
  if (type === CHANNELLISTLOADED) {
    let now = { ...state };
    now[appId + "-" + userAgent] = list;
    return now;
  }
  return state;
};

const eventListMap = (
  state = {},
  { type, applicationId, list }: actionProps
): object => {
  if (type === EVENTLISTLOADED) {
    let now = { ...state };
    now[applicationId] = list;
    return now;
  }
  return state;
};
const eventMap = (state = {}, { type, list }: actionProps): object => {
  if (type === EVENTLISTLOADED) {
    let now = { ...state };
    list.forEach((d: selectItemProps) => {
      now[d.eventId] = { ...d };
    });
    return now;
  }
  return state;
};
const propertyListMap = (
  state = {},
  { type, eventId, list }: actionProps
): object => {
  if (type === PROPERTYLISTLOADED) {
    let now = { ...state };
    now[eventId] = list;
    return now;
  }
  return state;
};
const propertyMap = (state = {}, { type, list }: actionProps): object => {
  if (type === PROPERTYLISTLOADED) {
    let now = { ...state };
    list.forEach((d: selectItemProps) => {
      now[d.propertyId] = { ...d };
    });
    return now;
  }
  return state;
};

const dateStr = "YYYY年MM月DD日";
const lastDay = moment()
  .subtract(1, "days")
  .format(dateStr);
const weekDay = moment()
  .subtract(7, "days")
  .format(dateStr);
const monthDay = moment()
  .subtract(30, "days")
  .format(dateStr);

// 大写数字
const weekList = (): string[] => ["日", "一", "二", "三", "四", "五", "六"];

// 时间周期
const timeList = (): selectItemProps[] => [
  { id: 1, value: "昨日" },
  { id: 2, value: "前7天" },
  { id: 3, value: "前30天" }
];
const timeListMap = (): string[] => ["", "昨日", "前7天", "前30天"];
//时间周期对应的年月日表示
const timeMap = (): string[] => [
  "",
  lastDay,
  weekDay + " 至 " + lastDay,
  monthDay + " 至 " + lastDay
];

// 统计指标
// 1、总次数，事件发生的次数，不按用户数去重；
// 2、平均数，总次数 / 当前周期天数；
// 3、触发用户数，事件发生关联的用户数量，不去重；
// 4、去重用户数，事件发生关联的用户数量，按照用户ID去重；
const statsTypeList = (): selectItemProps[] => [
  { id: 1, value: "总次数", content: "事件发生的次数，不按用户数去重；" },
  { id: 2, value: "触发用户数", content: "事件发生关联的用户数量，不去重；" }, //这里是因为后台改了顺序，不要问我为什么
  { id: 3, value: "平均数", content: "总次数/当前周期天数；" },
  {
    id: 4,
    value: "去重用户数",
    content: "事件发生关联的用户数量，按照用户ID去重；"
  },
  {
    id: 5,
    value: "平均时长",
    content: "每次事件发生持续时长的总计/总发生次数；"
  },
  { id: 6, value: "总时长", content: "每次事件发生持续时长的总计。" }
];
const funnelStatsList = (): selectItemProps[] => [
  { id: 2, value: "触发用户数" },
  { id: 4, value: "去重用户数" }
];
const statsTypeMap = (): string[] =>
  [""].concat(statsTypeList().map(d => d.value));

const reducer = combineReducers({
  /* 相对全局状态 */
  allAppList, // 全部应用列表
  allAppMap, // 全部应用的映射

  userAgentMap, // 终端列表映射缓存

  versionMap, // 版本列表映射缓存

  channelMap, // 渠道列表映射缓存

  eventListMap, // 事件列表映射
  eventMap, // 事件映射
  propertyListMap, // 属性列表映射
  propertyMap, //属性映射

  weekList, // 大写数字
  timeList, // 时间周期
  timeListMap, // 时间周期映射
  timeMap, // 时间周期起始对应映射
  statsTypeList, // 统计指标
  funnelStatsList, // 漏斗统计指标
  statsTypeMap, // 统计指标映射

  /* 页面状态 */
  realtimeData: realtimeDataReducer, // 实时数据
  historicalTrend: historicalTrendReducer // 历史趋势
  // usingFrequency: usingFrequencyReducer, // 使用频率
  // usingDuration: usingDurationReducer, // 使用时长
  // deviceData: deviceDataReducer, // 设备数据
  // terminalProperty: terminalPropertyReducer, // 终端属性
  // channelAnalysis: channelAnalysisReducer, // 渠道分析
  // eventAnalysis: eventAnalysisReducer // 事件分析
});

export default reducer;
