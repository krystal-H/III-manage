import { combineReducers } from "redux";
import logSearchReducer from "../../logSearch/store/reducer";

const menuList = () => [
  { key: "application", value: "应用管理" },
  { key: "event", value: "事件管理" }
];
const defaultPager = {
  currPageRows: 10,
  defaultPageRows: 20,
  hasNextPage: false,
  hasPrevPage: false,
  pageEndRow: 0,
  pageIndex: 0,
  pageRows: 10,
  pageStartRow: 0,
  paged: true,
  totalPages: 0,
  totalRows: 0
};

const menuName = (state = menuList()[0].key, { type, menuName }) => {
  return type === "LCP_SET_MENU" ? menuName : state;
};

const needResetSearchData = (state = false, { type, needResetSearchData }) => {
  return type === "LCP_SET_NEED_RESET_SEARCHDATA" ? needResetSearchData : state;
};

/* 三个预置列表 */
const allList = (state = [], { type, list }) => {
  return type === "LCP_SET_ALLLIST" ? list || state : state;
};
const allListMap = (state = {}, { type, list }) => {
  if (type !== "LCP_SET_ALLLIST") return state;
  let obj = {};
  list.forEach(({ applicationId, applicationName }) => {
    obj[applicationId] = applicationName;
  });
  return obj;
};

const openAppList = (state = [], { type, list }) => {
  return type === "LCP_SET_OPENAPPLIST" ? list || state : state;
};

const openMiniList = (state = [], { type, list }) => {
  return type === "LCP_SET_OPENMINILIST" ? list || state : state;
};

const webAppList = (state = [], { type, list }) => {
  return type === "LCP_SET_WEBAPPLIST" ? list || state : state;
};

/* 应用 */
const listForAPP = (
  state = { list: [], pager: defaultPager },
  { type, list, pager }
) => {
  return type === "LCP_SET_LIST_FOR_APP" ? { list, pager } : state;
};

const searchDataForAPP = (state = {}, { type, data }) => {
  return type === "LCP_SET_SEARCHDATA_FOR_APP" ? data : state;
};

const isErrorForAPP = (state = false, { type, isError }) => {
  return type === "LCP_CHANGE_ISERROR_FOR_APP" ? isError : state;
};

const isLoadingForAPP = (state = false, { type, isLoading }) => {
  return type === "LCP_CHANGE_ISLOADING_FOR_APP" ? isLoading : state;
};

const isAddingForAPP = (state = false, { type, isAdding }) => {
  return type === "LCP_CHANGE_ISADDING_FOR_APP" ? isAdding : state;
};

const showAddModalForAPP = (state = false, { type, showModal }) => {
  return type === "LCP_CHANGE_ISSHOW_ADDMODAL_FOR_APP" ? showModal : state;
};

/* 事件 */
const isLoadListForEvent = (state = false, { type, isLoadList }) => {
  return type === "LCP_CHANGE_ISLOADLIST_FOR_EVENT" ? isLoadList : state;
};

const listForEvent = (
  state = { list: [], pager: defaultPager },
  { type, list, pager }
) => {
  return type === "LCP_SET_LIST_FOR_EVENT" ? { list, pager } : state;
};

const searchDataForEvent = (state = {}, { type, data }) => {
  return type === "LCP_SET_SEARCHDATA_FOR_EVENT" ? data : state;
};

// 是否处于编辑事件中
const isUpdatingForEvent = (state = false, { type, isUpdating }) => {
  return type === "LCP_SET_ISUPDATING_FOR_EVENT" ? isUpdating : state;
};
// 处于编辑事件中，原数据存储
const detailData = (state = null, { type, detailData }) => {
  return type === "LCP_SET_DETAILDATA_FOR_EVENT" ? detailData : state;
};

const isErrorForEvent = (state = false, { type, isError }) => {
  return type === "LCP_CHANGE_ISERROR_FOR_EVENT" ? isError : state;
};

const isLoadingForEvent = (state = false, { type, isLoading }) => {
  return type === "LCP_CHANGE_ISLOADING_FOR_EVENT" ? isLoading : state;
};

const isSavingForEvent = (state = false, { type, isAdding }) => {
  return type === "LCP_CHANGE_ISSAVING_FOR_EVENT" ? isAdding : state;
};

const showAddModalForEvent = (state = false, { type, showModal }) => {
  return type === "LCP_CHANGE_ISSHOW_ADDMODAL_FOR_EVENT" ? showModal : state;
};

const reducer = combineReducers({
  menuList,
  menuName,
  needResetSearchData,
  allList,
  allListMap,
  openAppList,
  openMiniList,
  webAppList,
  searchDataForAPP,
  listForAPP,
  isErrorForAPP,
  isLoadingForAPP,
  isAddingForAPP,
  showAddModalForAPP,
  isLoadListForEvent,
  listForEvent,
  searchDataForEvent,
  isUpdatingForEvent,
  detailData,
  isErrorForEvent,
  isLoadingForEvent,
  isSavingForEvent,
  showAddModalForEvent,

  // 这里顺手加入日志查询的reducer
  logSearch: logSearchReducer
});

export default reducer;
