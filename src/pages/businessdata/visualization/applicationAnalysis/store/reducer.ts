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
import { SystemState, actionProps } from "./types";

const defaultState: SystemState = {
  headData: {
    isLoading: false,
    isError: false,
    data: {
      addDeviceCollect: {
        day7Count: 0,
        day1Count: 0
      },
      activeDeviceCollect: {
        day7Count: 0,
        day1Count: 0
      },
      errorDeviceCollect: {
        day7Count: 0,
        day1Count: 0
      }
    }
  },
  user: {
    isLoading: false,
    isError: false,
    data: {
      register: [],
      accessCount: [],
      userLogin: [],
      userAccess: []
    }
  },
  application: {
    isLoading: false,
    isError: false,
    data: {
      userRegister: [],
      userLogin: [],
      userStart: [],
      userActive: []
    }
  },
  device: {
    isLoading: false,
    isError: false,
    data: {
      product: [],
      addDevice: [],
      activeDevice: [],
      onlineDevice: [],
      errorDevice: []
    }
  }
};

const reducer = (
  state: SystemState = defaultState,
  { type, tabData, headData }: actionProps
): SystemState => {
  const { headData: prevHeadData, user, application, device } = state;
  let copy;
  switch (type) {
    /*** 以下是获取切换列表数据 - 站点数据/应用数据/设备数据 ***/
    case HEADDATALOADING:
      copy = { ...prevHeadData, isLoading: true, isError: false };
      return { ...state, headData: copy };
    case HEADDATALOADED:
      copy = { data: headData, isLoading: false, isError: false };
      return { ...state, headData: copy };
    case HEADDATALOADEDCRASH:
      copy = {
        isLoading: false,
        isError: true,
        data: {
          addDeviceCollect: {
            day7Count: 0,
            day1Count: 0
          },
          activeDeviceCollect: {
            day7Count: 0,
            day1Count: 0
          },
          errorDeviceCollect: {
            day7Count: 0,
            day1Count: 0
          }
        }
      };
      return { ...state, headData: copy };

    // 站点数据
    case USERDATALOADING:
      copy = { ...user, isLoading: true, isError: false };
      return { ...state, user: copy };
    case USERDATALOADED:
      copy = { data: tabData, isLoading: false, isError: false };
      return { ...state, user: copy };
    case USERDATALOADEDCRASH:
      copy = {
        isLoading: false,
        isError: true,
        data: {
          register: [],
          accessCount: [],
          userLogin: [],
          userAccess: []
        }
      };
      return { ...state, user: copy };
    // 应用数据
    case APPLICATIONDATALOADING:
      copy = { ...application, isLoading: true, isError: false };
      return { ...state, application: copy };
    case APPLICATIONDATALOADED:
      copy = {
        data: tabData,
        isLoading: false,
        isError: false
      };
      return { ...state, application: copy };
    case APPLICATIONDATALOADEDCRASH:
      copy = {
        isLoading: false,
        isError: true,
        data: {
          userRegister: [],
          userLogin: [],
          userStart: [],
          userActive: []
        }
      };
      return { ...state, application: copy };
    // 设备数据
    case DEVICEDATALOADING:
      copy = { ...device, isLoading: true, isError: false };
      return { ...state, device: copy };
    case DEVICEDATALOADED:
      copy = {
        data: tabData,
        isLoading: false,
        isError: false
      };
      return { ...state, device: copy };
    case DEVICEDATALOADEDCRASH:
      copy = {
        isLoading: false,
        isError: true,
        data: {
          product: [],
          addDevice: [],
          activeDevice: [],
          onlineDevice: [],
          errorDevice: []
        }
      };
      return { ...state, device: copy };
    default:
      return state;
  }
};

export default reducer;
