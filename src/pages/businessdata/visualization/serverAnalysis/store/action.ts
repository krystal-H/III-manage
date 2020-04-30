import {
  HEADDATALOADING,
  HEADDATALOADED,
  HEADDATALOADEDCRASH,
  SERVERDATALOADING,
  SERVERDATALOADED,
  SERVERDATALOADEDCRASH,
  MESSAGEDATALOADING,
  MESSAGEDATALOADED,
  MESSAGEDATALOADEDCRASH
} from "./actionNames";
import {
  _getHeadData,
  _getTabDataForServer,
  _getTabDataForMessage
} from "./api";
import {
  actionProps,
  serverDataProps,
  messageDataProps,
  headDataObjProps
} from "./types";

let searchForTab = {
  server: { timeType: "1" },
  message: { timeType: "1" }
}; //切换列表的查询参数
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

export const init = () => {
  searchForTab = {
    server: { timeType: "1" },
    message: { timeType: "1" }
  };
  return (dispatch: Function) => {
    // 基础初始化
    dispatch(getHeadData());
    dispatch(getTabDataForMessage());
    dispatch(getTabDataForServer());
  };
};
// 头部数据的获取过程状态变化
const loadingForHeadData = (): actionProps => ({ type: HEADDATALOADING });
const rstCrashForHeadData = (): actionProps => ({ type: HEADDATALOADEDCRASH });
const loadedForHeadData = (headData: headDataObjProps): actionProps => ({
  type: HEADDATALOADED,
  headData
});

// 切换列表
const loadingForServerData = (): actionProps => ({ type: SERVERDATALOADING });
const rstCrashForServerData = (): actionProps => ({
  type: SERVERDATALOADEDCRASH
});
const loadedForServerData = (tabData: serverDataProps): actionProps => ({
  type: SERVERDATALOADED,
  tabData
});

const loadingForMessageData = (): actionProps => ({
  type: MESSAGEDATALOADING
});
const rstCrashForMessageData = (): actionProps => ({
  type: MESSAGEDATALOADEDCRASH
});
const loadedForMessageData = (tabData: messageDataProps): actionProps => ({
  type: MESSAGEDATALOADED,
  tabData
});

export const changeSearchData = (data: object, key: string) => {
  fliterObj(searchForTab[key], data);
};

/* 头部展示数据获取       请求次数、消息上行量、消息下行量 */
export const getHeadData = () => {
  return (dispatch: Function) => {
    dispatch(loadingForHeadData());
    // 查询列表
    _getHeadData()
      .then(({ data: { data, code } }) => {
        if (0 === code) {
          dispatch(loadedForHeadData(data));
        } else {
          dispatch(rstCrashForHeadData());
        }
      })
      .catch(e => {
        dispatch(rstCrashForHeadData());
      });
  };
};

/* 切换列表的数据获取 */
export const getTabDataForServer = () => {
  return (dispatch: Function) => {
    dispatch(loadingForServerData());
    const lastTime = +new Date();
    _getTabDataForServer({ ...searchForTab.server })
      .then(({ data: { data, code } }) => {
        if (code === 0) {
          const distTime = +new Date() - lastTime;
          if (distTime < 1500) {
            setTimeout(() => {
              dispatch(loadedForServerData(data));
            }, 1500 - distTime);
          } else {
            dispatch(loadedForServerData(data));
          }
        } else {
          dispatch(rstCrashForServerData());
        }
      })
      .catch(() => {
        dispatch(rstCrashForServerData());
      });
  };
};

export const getTabDataForMessage = () => {
  return (dispatch: Function) => {
    dispatch(loadingForMessageData());
    _getTabDataForMessage({ ...searchForTab.message })
      .then(({ data: { data, code } }) => {
        if (code === 0) {
          dispatch(loadedForMessageData(data));
        } else {
          dispatch(rstCrashForMessageData());
        }
      })
      .catch(e => {
        dispatch(rstCrashForMessageData());
      });
  };
};
