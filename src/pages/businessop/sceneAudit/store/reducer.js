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

export const serverTypeList = [
  { id: "", value: "所有服务" },
  // { id: "11", value: "APP控制服务" },
  // { id: "12", value: "账户注销" },
  { id: "13", value: "场景服务" }
];
let serverTypeMap = {};
serverTypeList.forEach(({ id, value }) => (serverTypeMap[id] = value));
const checkerList = [
  { id: "", value: "所有状态" },
  { id: "0", value: "待审核" },
  { id: "10", value: "已审核" }
];
let checkerMap = {};
checkerList.forEach(({ id, value }) => (checkerMap[id] = value));

const sceneType = {
  // 场景联动执行类型映射
  1: "条件",
  2: "动作"
};

const defaultState = {
  serverTypeList,
  serverTypeMap,
  checkerList,
  checkerMap,
  sceneType,
  isLoading: false,
  isError: false,
  isSaving: false, // 提交保存操作时，是否正在进行的标识
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
