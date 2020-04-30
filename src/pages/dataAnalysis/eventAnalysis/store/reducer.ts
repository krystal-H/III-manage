import {
  INIT,
  DATALOADING,
  DATALOADED,
  ERRORFORGETDATA,
  SETSEARCHDATA
} from "./actionNames";
import { SystemState, actionProps } from "./types";
import { getTN } from "../../util/tools";

const getLists = (data: any, listObj: any) => {
  if (data === null) return null;
  const { eventArr, eventKeyArr } = listObj;
  let type = "line",
    legend = eventArr,
    x: any[] = [],
    line = legend.map(() => []),
    bar = [[]],
    list: any[] = [];
  //读取时间列表
  for (let eventK in data) {
    data[eventK].forEach((d: any) => {
      list.push({ ...d, index: eventKeyArr.indexOf(eventK) });
      x.push(d.timeValue);
    });
  }
  x = Array.from(new Set(x)).sort((a, b) => getTN(a) - getTN(b));
  list.forEach(d => {
    let { timeValue, dataValue, index } = d;
    line[index][x.indexOf(timeValue)] = dataValue;
  });
  x = x.map(d => {
    if (/01\-01$/.test(d)) return d;
    return d.slice(5);
  }); //时间列表去除年份

  return { type, legend, x, line, bar, list };
};

const defaultState: SystemState = {
  isLoading: false,
  isError: false,
  dataObject: null,
  listObj: null
};

const reducer = (
  state: SystemState = defaultState,
  { type, data }: actionProps
) => {
  switch (type) {
    case INIT: // 初始化状态
      return defaultState;

    case SETSEARCHDATA: // 记录获取数据的中间数据
      return { ...state, dataObject: { ...data } };
    case DATALOADING: // 设置成加载中...
      return { ...state, isLoading: true, isError: false };
    case DATALOADED: // 设置列表
      return {
        ...state,
        isLoading: false,
        listObj: getLists(data, state.dataObject)
      };
    case ERRORFORGETDATA: // 加载列表报错
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};

export default reducer;
