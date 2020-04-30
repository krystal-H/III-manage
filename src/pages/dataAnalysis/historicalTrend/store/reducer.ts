import {
  INIT,
  DATACOUNTLOADING,
  DATACOUNTLOADED,
  ERRORFORGETDATACOUNT,
  TABCHANGE,
  TOGGLETABLELIST,
  PAGECHANGE,
  KEEPTABCHANGE,
  KEEPCHARTTABCHANGE,
  KEEPPAGECHANGE,
  TIMECHANGE,
  DATALISTALLLOADING,
  DATALISTLOADING,
  DATALISTLOADED,
  ERRORFORGETDATALIST
} from "./actionNames";
import {
  SystemState,
  actionProps,
  TabMap,
  KeepTabMap,
  KeepChartTabMap,
  dataItemProps
} from "./types";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const defaultStartDay = moment().subtract(30, "days");
const defaultEndDay = moment().subtract(1, "days");

/* 根据后台数据，填入state时做一个转化操作 */
const listCopy = { list: [], isLoading: true, isError: false };
const listCopy2 = {
  isError: false,
  isLoading: true,
  tab: KeepTabMap.PERCENT,
  chartTab: KeepChartTabMap.DAY1,
  pageIndex: 1, // 留存率/留存数的页码
  list: []
};

// 设置总数
const getAllCount = (state: SystemState, data: any) => {
  const {
    addCount,
    startCount,
    avgDuration,
    activeCount,
    crashCount,
    addPreserveCountRate,
    totalCount,
    activePreserveCountRate
  } = data;
  return {
    ...state,
    total: {
      userTotal: totalCount,
      [TabMap.NEWUSERS]: addCount,
      [TabMap.ACTIVEUSERS]: activeCount,
      [TabMap.STARTUSERS]: startCount,
      [TabMap.KEEPUSERSFORNEW]: addPreserveCountRate,
      [TabMap.KEEPUSERSFORACTIVE]: activePreserveCountRate,
      [TabMap.TIMEFORPERPERSON]: avgDuration,
      [TabMap.CRASH]: crashCount
    }
  };
};

// 设置所有列表的列表加载状态为loading
const getAllListLoading = (state: SystemState) => {
  return {
    ...state,
    [TabMap.NEWUSERS]: { ...listCopy },
    [TabMap.ACTIVEUSERS]: { ...listCopy },
    [TabMap.STARTUSERS]: { ...listCopy },
    [TabMap.KEEPUSERSFORNEW]: { ...listCopy },
    [TabMap.KEEPUSERSFORACTIVE]: { ...listCopy },
    [TabMap.TIMEFORPERPERSON]: { ...listCopy },
    [TabMap.CRASH]: { ...listCopy },
    keepDetailForNew: { ...listCopy2 },
    keepDetailForActive: { ...listCopy2 }
  };
};

// 设置相应列表的列表加载状态为loading
const getListLoading = (state: SystemState, tab: TabMap) => {
  let copy = {
    ...state,
    [tab]: { ...listCopy }
  };
  if (tab === TabMap.KEEPUSERSFORNEW) {
    copy.keepDetailForNew = { ...listCopy2 };
  } else if (tab === TabMap.KEEPUSERSFORACTIVE) {
    copy.keepDetailForActive = { ...listCopy2 };
  }
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
    list = [];
  if (tab === TabMap.KEEPUSERSFORNEW) {
    list = data.map(d => ({
      ...d,
      name: d.add_date,
      count: d.day1CountRate
    }));
    copy.keepDetailForNew = {
      ...copy.keepDetailForNew,
      list: list as dataItemProps[],
      isLoading: false,
      isError: false
    };
  } else if (tab === TabMap.KEEPUSERSFORACTIVE) {
    list = data.map(d => ({
      ...d,
      name: d.active_date,
      count: d.day1CountRate
    }));
    copy.keepDetailForActive = {
      ...copy.keepDetailForActive,
      list: list as dataItemProps[],
      isLoading: false,
      isError: false
    };
  } else if (tab === TabMap.TIMEFORPERPERSON) {
    list = data.map(d => ({
      ...d,
      name: d.createDate,
      count: d.avgDuration
    }));
  } else {
    // 新增用户、活跃用户、启动次数、人均使用时长、崩溃数
    list = data.map(d => ({
      ...d,
      name: d.createDate,
      count: d.day1Count
    }));
  }
  copy[tab] = { list, isLoading: false, isError: false };
  return copy;
};

const defaultState: SystemState = {
  isLoading: true, // 外部总数的加载状态
  isError: false, // 外部总数的错误状态

  start: defaultStartDay,
  end: defaultEndDay,

  total: {
    userTotal: undefined,
    [TabMap.NEWUSERS]: undefined,
    [TabMap.ACTIVEUSERS]: undefined,
    [TabMap.STARTUSERS]: undefined,
    [TabMap.KEEPUSERSFORNEW]: undefined,
    [TabMap.KEEPUSERSFORACTIVE]: undefined,
    [TabMap.TIMEFORPERPERSON]: undefined,
    [TabMap.CRASH]: undefined
  },

  tab: TabMap.NEWUSERS,

  isShowTableList: true, // 是否显示最下方全体数据列表
  pageIndex: 1, // 最下方全体数据列表的页码

  [TabMap.NEWUSERS]: { ...listCopy },
  [TabMap.ACTIVEUSERS]: { ...listCopy },
  [TabMap.STARTUSERS]: { ...listCopy },
  [TabMap.KEEPUSERSFORNEW]: { ...listCopy },
  [TabMap.KEEPUSERSFORACTIVE]: { ...listCopy },
  [TabMap.TIMEFORPERPERSON]: { ...listCopy },
  [TabMap.CRASH]: { ...listCopy },

  keepDetailForNew: { ...listCopy2 },
  keepDetailForActive: { ...listCopy2 }
};

const reducer = (
  state: SystemState = defaultState,
  { type, tab, data, chartTab, pageIndex, start, end }: actionProps
) => {
  const { tab: nowTab } = state;
  const keepKey =
    nowTab === TabMap.KEEPUSERSFORNEW
      ? "keepDetailForNew"
      : "keepDetailForActive";
  const keepVal = state[keepKey];
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

    case TIMECHANGE: // 修改时间筛选
      return { ...state, start, end };

    case TABCHANGE: // 加载列表报错
      return { ...state, tab };
    case TOGGLETABLELIST: // 切换是否显示最下方全体数据列表
      return { ...state, isShowTableList: !state.isShowTableList };
    case PAGECHANGE: // 修改最下方全体数据列表的页码
      return { ...state, pageIndex };

    // 处理留存系列状态 - 页码，切换标识
    case KEEPTABCHANGE:
      return { ...state, [keepKey]: { ...keepVal, tab } };
    case KEEPCHARTTABCHANGE:
      return { ...state, [keepKey]: { ...keepVal, chartTab } };
    case KEEPPAGECHANGE:
      return { ...state, [keepKey]: { ...keepVal, pageIndex } };
    default:
      return state;
  }
};

export default reducer;
