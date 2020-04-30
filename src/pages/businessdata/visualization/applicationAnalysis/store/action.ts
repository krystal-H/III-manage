import {
  HEADDATALOADING,
  HEADDATALOADED,
  HEADDATALOADEDCRASH,
  USERDATALOADING,
  USERDATALOADED,
  USERDATALOADEDCRASH,
  APPLICATIONDATALOADING,
  APPLICATIONDATALOADED,
  APPLICATIONDATALOADEDCRASH,
  DEVICEDATALOADING,
  DEVICEDATALOADED,
  DEVICEDATALOADEDCRASH
} from "./actionNames";
import {
  _getHeadData,
  _getTabDataForUser,
  _getTabDataForApplication,
  _getTabDataForDevice
} from "./api";
import {
  actionProps,
  userDataProps,
  applicationDataProps,
  deviceDataProps,
  userDataObjProps
} from "./types";

let searchForTab = {
  user: { timeType: "1" },
  application: { timeType: "1" },
  device: { timeType: "1" }
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
    user: { timeType: "1" },
    application: { timeType: "1" },
    device: { timeType: "1" }
  };
  return (dispatch: Function) => {
    // 基础初始化
    dispatch(getHeadData());
    dispatch(getTabDataForUser());
    dispatch(getTabDataForApplication());
    dispatch(getTabDataForDevice());
  };
};
// 头部数据的获取过程状态变化
const loadingForHeadData = (): actionProps => ({ type: HEADDATALOADING });
const rstCrashForHeadData = (): actionProps => ({ type: HEADDATALOADEDCRASH });
const loadedForHeadData = (headData: userDataObjProps): actionProps => ({
  type: HEADDATALOADED,
  headData
});

// 切换列表
const loadingForUserData = (): actionProps => ({ type: USERDATALOADING });
const rstCrashForUserData = (): actionProps => ({ type: USERDATALOADEDCRASH });
const loadedForUserData = (tabData: userDataProps): actionProps => ({
  type: USERDATALOADED,
  tabData
});
const loadingForApplicationData = (): actionProps => ({
  type: APPLICATIONDATALOADING
});
const rstCrashForApplicationData = (): actionProps => ({
  type: APPLICATIONDATALOADEDCRASH
});
const loadedForApplicationData = (
  tabData: applicationDataProps
): actionProps => ({
  type: APPLICATIONDATALOADED,
  tabData
});
const loadingForDeviceData = (): actionProps => ({ type: DEVICEDATALOADING });
const rstCrashForDeviceData = (): actionProps => ({
  type: DEVICEDATALOADEDCRASH
});
const loadedForDeviceData = (tabData: deviceDataProps): actionProps => ({
  type: DEVICEDATALOADED,
  tabData
});

export const changeSearchData = (data: object, key: string) => {
  fliterObj(searchForTab[key], data);
};

/* 头部展示数据获取       新增设备数、激活设备数、故障设备数 */
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
export const getTabDataForUser = () => {
  return (dispatch: Function) => {
    dispatch(loadingForUserData());
    const lastTime = +new Date();
    _getTabDataForUser({ ...searchForTab.user })
      .then(({ data: { data, code } }) => {
        if (code === 0) {
          const distTime = +new Date() - lastTime;
          if (distTime < 1500) {
            setTimeout(() => {
              dispatch(loadedForUserData(data));
            }, 3000 - distTime);
          } else {
            dispatch(loadedForUserData(data));
          }
        } else {
          dispatch(rstCrashForUserData());
        }
      })
      .catch(() => {
        dispatch(rstCrashForUserData());
      });
  };
};
export const getTabDataForApplication = () => {
  return (dispatch: Function) => {
    dispatch(loadingForApplicationData());
    _getTabDataForApplication({ ...searchForTab.application })
      .then(({ data: { data, code } }) => {
        if (code === 0) {
          dispatch(loadedForApplicationData(data));
        } else {
          dispatch(rstCrashForApplicationData());
        }
      })
      .catch(e => {
        dispatch(rstCrashForApplicationData());
      });
  };
};
export const getTabDataForDevice = () => {
  return (dispatch: Function) => {
    dispatch(loadingForDeviceData());
    _getTabDataForDevice({ ...searchForTab.device })
      .then(({ data: { data, code } }) => {
        if (code === 0) {
          dispatch(loadedForDeviceData(data));
        } else {
          dispatch(rstCrashForDeviceData());
        }
      })
      .catch(e => {
        dispatch(rstCrashForDeviceData());
      });
  };
};
