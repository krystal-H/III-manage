import {
  ALLAPPLISTLOADED,
  VERSIONLISTLOADED,
  CHANNELLISTLOADED,
  EVENTLISTLOADED,
  PROPERTYLISTLOADED,
  USERAGENTLISTLOADED
} from "./actionNames";
import {
  _getAllAppList,
  _getVersionList,
  _getChannelList,
  _getEventList,
  _getPropertyList,
  _getUserAgentList
} from "./api";
import { actionProps, selectItemProps } from "./types";
import { channelMap, userAgentMap } from "./params";
import { Modal } from "antd";

let isAllAppListLoaded: boolean = false, // 是否加载全部应用列表完成
  isAllAppListLoading: boolean = false, // 是否正在加载全部应用列表
  userAgentLoadedMap: object = {}, // 终端列表已加载的映射列表
  versionLoadedMap: object = {}, // 版本列表已加载的映射列表
  channelLoadedMap: object = {}, // 渠道列表已加载的映射列表
  eventListLoadedMap: object = {}, // 事件列表已加载的映射列表
  propertyListLoadedMap: object = {}; // 属性列表已加载的映射列表

// 属性类型对应表
const propMap = {
  "0": "字符串",
  "1": "枚举",
  "2": "布尔",
  "3": "数值"
};

const allAppListLoaded = (list: selectItemProps[]): actionProps => ({
  type: ALLAPPLISTLOADED,
  list
});
const userAgentListLoaded = (
  appId: string | number,
  list: selectItemProps[]
): actionProps => ({
  type: USERAGENTLISTLOADED,
  appId,
  list
});
const versionListLoaded = (
  appId: string | number,
  userAgent: string | number,
  list: selectItemProps[]
): actionProps => ({
  type: VERSIONLISTLOADED,
  appId,
  userAgent,
  list
});
const channelListLoaded = (
  appId: string | number,
  userAgent: string | number,
  list: selectItemProps[]
): actionProps => ({
  type: CHANNELLISTLOADED,
  appId,
  userAgent,
  list
});
const eventListLoaded = (
  applicationId: string | number,
  list: selectItemProps[]
): actionProps => ({
  type: EVENTLISTLOADED,
  applicationId,
  list
});
const propertyListLoaded = (
  eventId: string | number,
  list: selectItemProps[]
): actionProps => ({
  type: PROPERTYLISTLOADED,
  eventId,
  list
});

// 获取全部应用列表
let isReset = false; // 记录当前是否需要重新拉取列表提醒
export const getAllAppList = (isFirst?: boolean): Function => {
  return (dispatch: Function) => {
    if (isAllAppListLoaded || isAllAppListLoading) {
      // 如果全部应用列表在加载或者已经加载完成，则跳过本次加载
      return;
    }
    isAllAppListLoading = true;
    if (isFirst) isReset = false;
    const errorCB = () => {
      if (!isReset) {
        Modal.confirm({
          title: "关键数据--应用列表读取失败，是否重新获取？",
          centered: true,
          okText: "好的",
          zIndex: 1080,
          onOk: () => {
            isReset = true;
            dispatch(getAllAppList()); // 重新获取
          }
        });
      } else {
        Modal.error({
          title: "关键数据--应用列表再次读取失败，请联系相关开发人员。",
          centered: true,
          zIndex: 1080
        });
      }
    };
    _getAllAppList()
      .then(({ data: { data, code } }: any) => {
        isAllAppListLoaded = true;
        if (code === 0) {
          dispatch(
            allAppListLoaded(
              data.map((d: any) => ({
                ...d,
                id: d.applicationId,
                value: d.applicationId + "-" + d.applicationName
              }))
            )
          );

          if (data.length > 0) {
            // 获取到全部应用列表后，立马获取一遍渠道列表和版本列表
            const { applicationId } = data[0];

            dispatch(getUserAgentList(applicationId));
            dispatch(getVersionList(applicationId, ""));
            dispatch(getChannelList(applicationId, ""));
          }
        } else {
          errorCB();
        }
      })
      .catch(errorCB)
      .finally(() => {
        isAllAppListLoading = false;
      });
  };
};

// 获取终端列表
export const getUserAgentList = (appId: string | number): Function => {
  return (dispatch: Function) => {
    const key = appId;
    if (userAgentLoadedMap[key] !== undefined) {
      // 如果加载过该种情况则过滤掉
      return;
    }
    userAgentLoadedMap[key] = "loading";
    _getUserAgentList({ appId })
      .then(({ data: { data, code } }: any) => {
        if (code === 0) {
          dispatch(
            userAgentListLoaded(
              appId,
              data.map((d: any) => ({
                id: d,
                value: userAgentMap[d.replace(/;$/, "").toLowerCase()] || d
              }))
            )
          );
          userAgentLoadedMap[key] = "loaded";
        } else {
          userAgentLoadedMap[key] = undefined;
        }
      })
      .catch(() => {
        userAgentLoadedMap[key] = undefined;
      });
  };
};

// 获取版本列表
export const getVersionList = (
  appId: string | number,
  userAgent: string | number
): Function => {
  return (dispatch: Function) => {
    const key = appId + "-" + userAgent;
    if (versionLoadedMap[key] !== undefined) {
      // 如果加载过该种情况则过滤掉
      return;
    }
    versionLoadedMap[key] = "loading";
    _getVersionList({ appId, userAgent })
      .then(({ data: { data, code } }: any) => {
        if (code === 0) {
          dispatch(
            versionListLoaded(
              appId,
              userAgent,
              data.map((d: any) => ({ id: d, value: d }))
            )
          );
          versionLoadedMap[key] = "loaded";
        } else {
          versionLoadedMap[key] = undefined;
        }
      })
      .catch(() => {
        versionLoadedMap[key] = undefined;
      });
  };
};

// 获取渠道列表
export const getChannelList = (
  appId: string | number,
  userAgent: string | number
): Function => {
  return (dispatch: Function) => {
    const key = appId + "-" + userAgent;
    if (channelLoadedMap[key] !== undefined) {
      // 如果加载过该种情况则过滤掉
      return;
    }
    channelLoadedMap[key] = "loading";
    _getChannelList({ appId, userAgent })
      .then(({ data: { data, code } }: any) => {
        if (code === 0) {
          dispatch(
            channelListLoaded(
              appId,
              userAgent,
              data.map((d: any) => ({
                id: d,
                value: channelMap[d] || "未知渠道"
              }))
            )
          );
          channelLoadedMap[key] = "loaded";
        } else {
          channelLoadedMap[key] = undefined;
        }
      })
      .catch(() => {
        channelLoadedMap[key] = undefined;
      });
  };
};

export const getEventList = (applicationId: string | number): Function => {
  return (dispatch: Function) => {
    if (eventListLoadedMap[applicationId]) {
      // 如果已经加载完成，则跳过本次加载
      return;
    }
    _getEventList({ applicationIds: applicationId }).then(
      ({ data: { data, code } }: any) => {
        if (code === 0) {
          dispatch(
            eventListLoaded(
              applicationId,
              data.map((d: any) => ({
                ...d,
                id: d.eventId,
                value: d.eventKey + "-" + d.eventName
              }))
            )
          );
          eventListLoadedMap[applicationId] = "loaded";
        }
      }
    );
  };
};

export const getPropertyList = (eventId: string | number): Function => {
  return (dispatch: Function) => {
    if (propertyListLoadedMap[eventId]) {
      // 如果已经加载完成，则跳过本次加载
      return;
    }
    _getPropertyList({ eventId }).then(({ data: { data, code } }: any) => {
      if (code === 0) {
        let list = [{ id: "", value: "不选择属性" }];
        data.eventPropertyList.forEach((d: any) => {
          const { propertyId, propertyName, propertyRemark, propertyType } = d;
          list.push({
            ...d,
            id: propertyId,
            value:
              (propertyRemark || propertyName) + "-" + propMap[propertyType]
          });
        });
        dispatch(propertyListLoaded(eventId, list));
        propertyListLoadedMap[eventId] = "loaded";
      }
    });
  };
};
