import {
  LISTLOADING,
  LISTLOADED,
  ERRORFORGETLIST,
  OPEN_DETAILMODAL,
  CLOSE_DETAILMODAL
} from "./actionNames";

const defaultState = {
  isLoading: false,
  isError: false,
  list: [],
  pager: {},
  showDetailModal: false,
  detailData: null
};

const reducer = (state = defaultState, { type, list, pager, detailData }) => {
  switch (type) {
    case LISTLOADING: // 设置成加载中...
      return { ...state, isLoading: true, isError: false };
    case LISTLOADED: // 设置列表
      return { ...state, list, pager, isLoading: false };
    case ERRORFORGETLIST: // 加载列表报错
      return { ...state, list: [], pager: {}, isLoading: false, isError: true };
    case OPEN_DETAILMODAL: // 打开详情弹框
      return { ...state, detailData, showDetailModal: true };
    case CLOSE_DETAILMODAL: // 关闭详情弹框
      return { ...state, showDetailModal: false };
    default:
      return state;
  }
};

export default reducer;
