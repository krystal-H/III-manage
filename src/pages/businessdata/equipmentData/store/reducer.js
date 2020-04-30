import { LISTLOADING, LISTLOADED, ERRORFORGETLIST } from "./actionNames";

const defaultState = {
  isLoading: false,
  isError: false,
  list: [],
  pager: {}
};

const reducer = (state = defaultState, { type, list, pager }) => {
  switch (type) {
    case LISTLOADING: // 设置成加载中...
      return { ...state, isLoading: true, isError: false };
    case LISTLOADED: // 设置列表
      return { ...state, list, pager, isLoading: false };
    case ERRORFORGETLIST: // 加载列表报错
      return { ...state, list: [], pager: {}, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default reducer;
