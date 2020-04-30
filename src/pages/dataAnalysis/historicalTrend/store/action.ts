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
  DATALISTLOADING,
  DATALISTLOADED,
  ERRORFORGETDATALIST,
  DATALISTALLLOADING
} from "./actionNames";
import { _getData, _getList } from "./api";
import { message } from "antd";
import {
  actionProps,
  TabMap,
  KeepTabMap,
  KeepChartTabMap,
  dataItemProps
} from "./types";
import moment from "moment";

const format = "YYYY-MM-DD";
const defaultStartDay = moment()
  .subtract(30, "days")
  .format(format);
const defaultEndDay = moment()
  .subtract(1, "days")
  .format(format);
let search = {
  start: defaultStartDay,
  end: defaultEndDay
}; //应用列表的查询参数
const checkNull = (d: any) => d === undefined || d === null || d === "";

const fliterObj = (obj: object, addObj: object) => {
  Object.keys(addObj).forEach(key => {
    const val = addObj[key],
      valid = !checkNull(val);
    if (!valid && key in obj) {
      delete obj[key];
    } else if (valid) {
      obj[key] = val;
    }
  });
};
const addObj = (obj: any, addObj: object) => {
  Object.keys(addObj).forEach(key => {
    const val = addObj[key];
    if (!checkNull(val)) {
      obj[key] = val;
    } else if (obj[key]) {
      delete obj[key];
    }
  });
  if (typeof obj.start !== "string") {
    obj.start = obj.start.format(format);
  }
  if (typeof obj.end !== "string") {
    obj.end = obj.end.format(format);
  }
};

export const init = () => {
  return (dispatch: Function) => {
    search = {
      start: defaultStartDay,
      end: defaultEndDay
    };
    dispatch(initState());
  };
};

const initState = (): actionProps => ({ type: INIT });

// 以下部分为总数查询接口的状态设置
const countLoading = (): actionProps => ({ type: DATACOUNTLOADING });
const countLoaded = (data: any): actionProps => ({
  type: DATACOUNTLOADED,
  data
});
const countDataCrash = (): actionProps => ({ type: ERRORFORGETDATACOUNT });

// 以下部分为列表查询接口的状态设置
const listAllLoading = (): actionProps => ({ type: DATALISTALLLOADING });
const listLoading = (tab: TabMap): actionProps => ({
  type: DATALISTLOADING,
  tab
});
const listLoaded = (data: dataItemProps[], tab: TabMap): actionProps => ({
  type: DATALISTLOADED,
  data,
  tab
});
const listDataCrash = (tab: TabMap): actionProps => ({
  type: ERRORFORGETDATALIST,
  tab
});

// 获取总数
export const getData = (onlyCount?: boolean): Function => {
  return (dispatch: Function) => {
    dispatch(countLoading());
    // 查询列表
    _getData({ ...search })
      .then(({ data, code }: any) => {
        if (code === 0) {
          dispatch(countLoaded(data));
        } else {
          dispatch(countDataCrash());
        }
      })
      .catch(() => {
        dispatch(countDataCrash());
      });
    // 如果不是只要加载总数
    if (!onlyCount) dispatch(getList());
  };
};
// 获取列表
export const getList = (tab?: TabMap): Function => {
  return (dispatch: Function) => {
    const get = (tab: TabMap) => {
      _getList({ ...search }, tab)
        .then(
          ({
            data: {
              data: { list },
              code
            }
          }: any) => {
            if (code === 0) {
              dispatch(listLoaded(list, tab));
            } else {
              dispatch(listDataCrash(tab));
            }
          }
        )
        .catch(() => {
          dispatch(listDataCrash(tab));
        });
    };
    // 查询列表
    if (tab) {
      dispatch(listLoading(tab));
      get(tab);
    } else {
      dispatch(listAllLoading());
      get(TabMap.NEWUSERS); // 新增用户列表
      setTimeout(() => {
        get(TabMap.ACTIVEUSERS); // 活跃用户列表
        get(TabMap.STARTUSERS); // 启动次数列表
        get(TabMap.TIMEFORPERPERSON); // 人均使用时长列表
        get(TabMap.CRASH); // 崩溃数列表
        get(TabMap.KEEPUSERSFORNEW); // 新增用户次日留存列表
        get(TabMap.KEEPUSERSFORACTIVE); // 活跃用户次日留存列表
      }, 100);
    }
  };
};

export const changeSearchData = (data: object): void => {
  fliterObj(search, data);
};
export const addSearchData = (data: object): void => {
  addObj(search, data);
};

export const tab = (tab: TabMap): actionProps => ({ type: TABCHANGE, tab });

// 修改最下方全体数据列表的页码
export const toggleTableList = (): actionProps => ({ type: TOGGLETABLELIST });

// 修改时间筛选
export const changeTimeValue = (start: any, end: any): actionProps => ({
  type: TIMECHANGE,
  start,
  end
});
// 修改最下方全体数据列表的页码
export const setPage = (pageIndex: number): actionProps => ({
  type: PAGECHANGE,
  pageIndex
});

// 修改时间筛选
export const changeTime = (start: any, end: any) => {
  return (dispatch: Function) => {
    addSearchData({ start, end });
    dispatch(changeTimeValue(start, end));
    dispatch(getData());
  };
};

// 新增/活跃用户留存的相关Action
export const keepTab = (tab: KeepTabMap): actionProps => ({
  type: KEEPTABCHANGE,
  tab
});
export const keepChartTab = (chartTab: KeepChartTabMap): actionProps => ({
  type: KEEPCHARTTABCHANGE,
  chartTab
});
export const keepSetPage = (pageIndex: number): actionProps => ({
  type: KEEPPAGECHANGE,
  pageIndex
});
