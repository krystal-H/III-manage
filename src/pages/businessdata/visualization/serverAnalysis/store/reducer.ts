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
import { SystemState, actionProps } from "./types";

const defaultState: SystemState = {
  headData: {
    isLoading: false,
    isError: false,
    data: {
      requertCollect: {
        day7Count: 0,
        day1Count: 0
      },
      uplinkCollect: {
        day7Count: 0,
        day1Count: 0
      },
      downlinkCollect: {
        day7Count: 0,
        day1Count: 0
      }
    }
  },
  server: {
    isLoading: false,
    isError: false,
    data: {
      appResponse: { app: [], service: [] },
      appFlow: { app: [], service: [] },
      appSucess: { app: [], service: [] },
      appRequest: { app: [], service: [] }
    }
  },
  message: {
    isLoading: false,
    isError: false,
    data: {
      uplink: [],
      downlink: []
    }
  }
};

const reducer = (
  state: SystemState = defaultState,
  { type, tabData, headData }: actionProps
): SystemState => {
  const { headData: prevHeadData, server, message } = state;
  let copy;
  switch (type) {
    // 头部数据
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
          requertCollect: {
            day7Count: 0,
            day1Count: 0
          },
          uplinkCollect: {
            day7Count: 0,
            day1Count: 0
          },
          downlinkCollect: {
            day7Count: 0,
            day1Count: 0
          }
        }
      };
      return { ...state, headData: copy };

    /*** 以下是获取切换列表数据 - 接口服务数据/消息数据 ***/
    // 接口服务数据
    case SERVERDATALOADING:
      copy = { ...server, isLoading: true, isError: false };
      return { ...state, server: copy };
    case SERVERDATALOADED:
      copy = { data: tabData, isLoading: false, isError: false };
      return { ...state, server: copy };
    case SERVERDATALOADEDCRASH:
      copy = {
        isLoading: false,
        isError: true,
        data: {
          appResponse: { app: [], service: [] },
          appFlow: { app: [], service: [] },
          appSucess: { app: [], service: [] },
          appRequest: { app: [], service: [] }
        }
      };
      return { ...state, server: copy };

    // 消息数据
    case MESSAGEDATALOADING:
      copy = { ...message, isLoading: true, isError: false };
      return { ...state, message: copy };
    case MESSAGEDATALOADED:
      copy = {
        data: tabData,
        isLoading: false,
        isError: false
      };
      return { ...state, message: copy };
    case MESSAGEDATALOADEDCRASH:
      copy = {
        isLoading: false,
        isError: true,
        data: {
          uplink: [],
          downlink: []
        }
      };
      return { ...state, message: copy };
    default:
      return state;
  }
};

export default reducer;
