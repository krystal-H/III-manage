import {
  LISTLOADING,
  LISTLOADED,
  ERRORFORGETLIST,
  SAVING,
  SAVED,
  ERRORFORSAVING,
  OPEN_DETAILMODAL,
  CLOSE_DETAILMODAL
} from "./actionNames";
import { SystemState, actionProps, checkerListItemPorps } from "./types";

const checkerList: checkerListItemPorps[] = [
  { id: "", value: "所有状态" },
  { id: "0", value: "待审核" },
  { id: "1", value: "已通过" },
  { id: "2", value: "未通过" }
];
let checkerMap = {};
checkerList.forEach(({ id, value }): void => {
  checkerMap[id] = value;
});

const defaultState: SystemState = {
  checkerList,
  checkerMap,
  isLoading: false,
  isError: false,
  isSaving: false, // 提交保存操作时，是否正在进行的标识
  list: [],
  pager: {
    pageIndex: 1, // 默认当前页
    totalPages: 1, // 总页数
    totalRows: 0, // 总记录数
    pageRows: 10 //每页条数
  },
  showDetailModal: false,
  detailData: null
};

const reducer = (
  state: SystemState = defaultState,
  { type, list, pager, detailData }: actionProps
) => {
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
    case SAVING: // 设置成提交中...
      return { ...state, isSaving: true };
    case SAVED: // 设置成提交完成
      return { ...state, isSaving: false, showDetailModal: false };
    case ERRORFORSAVING: // 设置成提交异常
      return { ...state, isSaving: false };
    default:
      return state;
  }
};

export default reducer;
