import {
  INIT,
  TABCHANGE,
  PAGECHANGE,
  TOGGLETABLELIST,
  DATACOUNTLOADING,
  DATACOUNTLOADED,
  ERRORFORGETDATACOUNT,
  DATALISTALLLOADING,
  DATALISTLOADING,
  DATALISTLOADED,
  ERRORFORGETDATALIST
} from "./actionNames";
import { SystemState, actionProps, TabMap, dataItemProps } from "./types";
import moment from "moment";

const format = "YYYY-MM-DD HH:mm:ss";

// const createList = (unit: string, max: number = 10) => {
//   return new Array(new Date().getHours() + 1).fill(0).map((d, i) => {
//     return { name: i + unit, count: Math.ceil(Math.random() * max) };
//   });
// };
// const newUsersList = createList("时", 5);
// const newUsersTotal = newUsersList.reduce((r, n) => r + n.count, 0);

// const activeUsersList = createList("时", 25);
// const activeUsersTotal = activeUsersList.reduce((r, n) => r + n.count, 0);

// const startUsersList = createList("时", 50);
// const startUsersTotal = startUsersList.reduce((r, n) => r + n.count, 0);

// const keepUsersList = createList("时", 25);
// const keepUsersTotal = keepUsersList.reduce((r, n) => r + n.count, 0);

const defaultProps = {
  isError: false,
  isLoading: true,
  list: []
};

// 设置总数
const getAllCount = (state: SystemState, data: any) => {
  const { newUsersNum, lauchTimesNum, activeUsersNum, retainUserNum } = data;
  return {
    ...state,
    updateTime: moment().format(format), // 数据更新时间
    total: {
      [TabMap.NEWUSERS]: newUsersNum,
      [TabMap.ACTIVEUSERS]: activeUsersNum,
      [TabMap.STARTUSERS]: lauchTimesNum,
      [TabMap.KEEPUSERS]: retainUserNum
    }
  };
};

// 设置所有列表的列表加载状态为loading
const getAllListLoading = (state: SystemState) => {
  return {
    ...state,
    [TabMap.NEWUSERS]: { ...defaultProps },
    [TabMap.ACTIVEUSERS]: { ...defaultProps },
    [TabMap.STARTUSERS]: { ...defaultProps },
    [TabMap.KEEPUSERS]: { ...defaultProps }
  };
};

// 设置相应列表的列表加载状态为loading
const getListLoading = (state: SystemState, tab: TabMap) => {
  let copy = {
    ...state,
    [tab]: { ...defaultProps }
  };
  return copy;
};

// 设置相应列表的列表加载状态为error
const getListError = (state: SystemState, tab: TabMap) => {
  let copy = {
    ...state,
    [tab]: { ...state[tab], isLoading: false, isError: true }
  };
  return copy;
};

// 设置相应列表
const getList = (state: SystemState, tab: TabMap, data: dataItemProps[]) => {
  let copy = { ...state },
    list = data.map(d => ({
      ...d,
      name: d.timeStats,
      count: d.hourCount
    }));
  copy[tab] = { list, isLoading: false, isError: false };
  return copy;
};

const defaultState: SystemState = {
  isLoading: true, // 外部总数的加载状态
  isError: false, // 外部总数的错误状态
  updateTime: "", // 数据更新时间

  tab: TabMap.NEWUSERS,

  total: {
    [TabMap.NEWUSERS]: undefined,
    [TabMap.ACTIVEUSERS]: undefined,
    [TabMap.STARTUSERS]: undefined,
    [TabMap.KEEPUSERS]: undefined
  },

  isShowTableList: true, // 是否显示最下方全体数据列表
  pageIndex: 1, // 最下方全体数据列表的页码

  [TabMap.NEWUSERS]: { ...defaultProps },
  [TabMap.ACTIVEUSERS]: { ...defaultProps },
  [TabMap.STARTUSERS]: { ...defaultProps },
  [TabMap.KEEPUSERS]: { ...defaultProps }
};

const reducer = (
  state: SystemState = defaultState,
  { type, tab, data, pageIndex }: actionProps
) => {
  switch (type) {
    case INIT: // 初始化状态
      return defaultState;

    case DATACOUNTLOADING: // 设置成加载中...
      return { ...state, isLoading: true, isError: false };
    case DATACOUNTLOADED: // 设置列表
      return getAllCount({ ...state, isLoading: false }, data);
    case ERRORFORGETDATACOUNT: // 加载列表报错
      return { ...state, isLoading: false, isError: true };

    case DATALISTALLLOADING: // 所有列表开始加载
      return getAllListLoading({ ...state });
    case DATALISTLOADING: // 单个列表进入加载状态
      return getListLoading({ ...state }, tab);
    case DATALISTLOADED: // 单个列表加载完成
      return getList({ ...state }, tab, data);
    case ERRORFORGETDATALIST: // 单个列表加载出错
      return getListError({ ...state }, tab);

    case TABCHANGE: // 加载列表报错
      return { ...state, tab };
    case TOGGLETABLELIST: // 切换是否显示最下方全体数据列表
      return { ...state, isShowTableList: !state.isShowTableList };
    case PAGECHANGE: // 修改最下方全体数据列表的页码
      return { ...state, pageIndex };
    default:
      return state;
  }
};

export default reducer;
