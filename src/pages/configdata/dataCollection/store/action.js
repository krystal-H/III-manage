import { message } from "antd";
import {
  _getAllListForAPP,
  _getOpenAppListForAPP,
  _getWebAppListForAPP,
  _addApp,
  _getListForAPP,
  _refreshToken,
  _deleteAPP,
  _getListForEvent,
  _addEvent,
  _updateEvent,
  _getEventDetail,
  _deleteEvent,
  _disableEvent
} from "./api";

const allListParams = {
  paged: false,
  pageRows: 9999,
  pageIndex: 1
};
let searchForApp = {}; //应用列表的查询参数
let searchForEvent = {}; //事件列表的查询参数
const checkNull = d => d === undefined || d === null || d === "";
const fliterObj = (obj, addObj) => {
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
  return dispatch => {
    searchForApp = {
      paged: true,
      pageRows: 10,
      pageIndex: 1
    };
    searchForEvent = {
      paged: true,
      pageRows: 10,
      pageIndex: 1
    };
    dispatch(switchMenu("application")); // 转换成一开始的菜单选项
    dispatch(changeIsLoadListForEvent(false)); // 重置事件列表为未加载
    getListForAPP()(dispatch);

    // 拉取三个预置列表
    getAllList()(dispatch);
    getOpenAppList()(dispatch);
    getOpenMiniList()(dispatch); // 额外新增一个拉取小程序的列表
    getWebAppList()(dispatch);
  };
};

/* 切换菜单栏   ->   查看应用管理或事件管理 */
export const switchMenu = menuName => {
  return dispatch => {
    dispatch(setMenu(menuName));
    if (menuName === "event") {
      dispatch(setSearchDataForEvent(searchForEvent));
    } else {
      dispatch(setSearchDataForAPP(searchForApp));
    }
    dispatch(setNeedResetSearchData(true));
  };
};
export const setMenu = menuName => ({
  type: "LCP_SET_MENU",
  menuName
});
export const setSearchDataForAPP = data => ({
  type: "LCP_SET_SEARCHDATA_FOR_APP",
  data
});
export const setSearchDataForEvent = data => ({
  type: "LCP_SET_SEARCHDATA_FOR_EVENT",
  data
});
export const setNeedResetSearchData = needResetSearchData => ({
  type: "LCP_SET_NEED_RESET_SEARCHDATA",
  needResetSearchData
});

/* 打开新建应用弹窗 */
export const openAddModalForAPP = () => ({
  type: "LCP_CHANGE_ISSHOW_ADDMODAL_FOR_APP",
  showModal: true
});
export const closeAddModalForAPP = () => ({
  type: "LCP_CHANGE_ISSHOW_ADDMODAL_FOR_APP",
  showModal: false
});

/* 打开新建事件弹窗 */
export const openAddModalForEvent = () => ({
  type: "LCP_CHANGE_ISSHOW_ADDMODAL_FOR_EVENT",
  showModal: true
});
export const closeAddModalForEvent = () => {
  return dispatch => {
    dispatch(changeIsShowAddModalForEvent(false));
    dispatch(setIsUpdatingForEvent(false));
  };
};
/* 打开编辑事件弹窗 */
export const openUpdateModalForEvent = ({ eventId }) => {
  return dispatch => {
    const hide = message.loading("正在读取详情数据...", 0);
    _getEventDetail({ eventId })
      .then(({ data: { code, data, msg } }) => {
        hide();
        if (code === 0) {
          dispatch(setDetailDataForEvent(data));
          dispatch(setIsUpdatingForEvent(true));
          dispatch(openAddModalForEvent());
        }
      })
      .catch(e => {
        hide();
      });
  };
};
export const changeIsShowAddModalForEvent = () => ({
  type: "LCP_CHANGE_ISSHOW_ADDMODAL_FOR_EVENT",
  showModal: false
});
export const setIsUpdatingForEvent = isUpdating => ({
  type: "LCP_SET_ISUPDATING_FOR_EVENT",
  isUpdating
});
export const setDetailDataForEvent = detailData => ({
  type: "LCP_SET_DETAILDATA_FOR_EVENT",
  detailData
});

/* 查询三个预置列表 */
export const getAllList = () => {
  return dispatch => {
    // 查询所有应用列表
    _getAllListForAPP({ ...allListParams }).then(({ list }) => {
      dispatch(setAllList({ list }));
    });
  };
};
export const setAllList = ({ list }) => ({
  type: "LCP_SET_ALLLIST",
  list
});

export const getOpenAppList = () => {
  return dispatch => {
    // 查询所有开放平台应用列表
    _getOpenAppListForAPP({ ...allListParams, appType: 0 }).then(({ list }) => {
      dispatch(setOpenAppList({ list }));
    });
  };
};
export const setOpenAppList = ({ list }) => ({
  type: "LCP_SET_OPENAPPLIST",
  list
});
export const getOpenMiniList = () => {
  return dispatch => {
    // 查询所有开放平台应用列表
    _getOpenAppListForAPP({ ...allListParams, appType: 2 }).then(({ list }) => {
      dispatch(setOpenMiniList({ list }));
    });
  };
};
export const setOpenMiniList = ({ list }) => ({
  type: "LCP_SET_OPENMINILIST",
  list
});

export const getWebAppList = () => {
  return dispatch => {
    // 查询所有开放平台应用列表
    _getWebAppListForAPP({ ...allListParams }).then(({ list }) => {
      dispatch(setWebAppList({ list }));
    });
  };
};
export const setWebAppList = ({ list }) => ({
  type: "LCP_SET_WEBAPPLIST",
  list
});

/* 应用 */
/* 应用查询列表 */
export const getListForAPP = () => {
  return dispatch => {
    dispatch(changeIsLoadingForAPP(true));
    dispatch(changeIsErrorForAPP(false));
    // 查询列表
    _getListForAPP({ ...searchForApp })
      .then(({ list, pager }) => {
        dispatch(changeIsLoadingForAPP(false));
        dispatch(setListForAPP({ list, pager }));
      })
      .catch(e => {
        dispatch(setListForAPP({ list: [], pager: {} }));
        dispatch(changeIsErrorForAPP(true));
        dispatch(changeIsLoadingForAPP(false));
      });
  };
};
/* 应用设置列表 */
export const setListForAPP = ({ list, pager }) => ({
  type: "LCP_SET_LIST_FOR_APP",
  list,
  pager
});
/* 修改搜索条件 */
export const changeSearchDataForAPP = params => {
  fliterObj(searchForApp, params);
};
export const changeIsErrorForAPP = isError => ({
  type: "LCP_CHANGE_ISERROR_FOR_APP",
  isError
});
export const changeIsLoadingForAPP = isLoading => ({
  type: "LCP_CHANGE_ISLOADING_FOR_APP",
  isLoading
});
export const changeIsAddingForAPP = isAdding => ({
  type: "LCP_CHANGE_ISADDING_FOR_APP",
  isAdding
});
/* 应用新增 */
export const addApp = data => {
  return dispatch => {
    dispatch(changeIsAddingForAPP(true));
    // 查询列表
    _addApp(data)
      .then(({ data: { code, msg } }) => {
        dispatch(changeIsAddingForAPP(false));
        if (code === 0) {
          message.success("新建应用成功");
          dispatch(closeAddModalForAPP());

          changeSearchDataForAPP({ pageIndex: 1 });
          dispatch(getListForAPP());
          dispatch(getAllList());
        }
      })
      .catch(e => {
        dispatch(changeIsAddingForAPP(false));
      });
  };
};

/* 应用刷新Token */
export const refreshToken = ({ applicationId }) => {
  return dispatch => {
    dispatch(changeIsLoadingForAPP(true));
    // 查询列表
    _refreshToken({ applicationId })
      .then(({ data: { code, msg } }) => {
        if (code === 0) {
          message.success("刷新Token成功");
          dispatch(getListForAPP());
        }
      })
      .catch(e => {
        message.success("刷新Token失败");
        dispatch(changeIsLoadingForAPP(false));
      });
  };
};
/* 应用删除 */
export const deleteAPP = ({ applicationId }, isPageIndexPrev, pageIndex) => {
  return dispatch => {
    dispatch(changeIsLoadingForAPP(true));
    _deleteAPP({ applicationId })
      .then(({ data: { code, msg } }) => {
        if (code === 0) {
          message.success("删除应用成功");
          if (isPageIndexPrev) {
            // 如果本页只剩下一条记录，则删除成功后重置对应的页码，再进行查询
            changeSearchDataForAPP({ pageIndex });
          }
          dispatch(getListForAPP());
        }
      })
      .catch(e => {
        dispatch(changeIsLoadingForAPP(false));
      });
  };
};

/* 事件 */
/* 事件列表 */
export const getListForEvent = () => {
  return dispatch => {
    dispatch(changeIsLoadingForEvent(true));
    dispatch(changeIsErrorForEvent(false));
    dispatch(changeIsLoadListForEvent(true));
    // 查询列表
    _getListForEvent({ ...searchForEvent })
      .then(({ list, pager }) => {
        dispatch(changeIsLoadingForEvent(false));
        dispatch(setListForEvent({ list, pager }));
      })
      .catch(e => {
        dispatch(setListForEvent({ list: [], pager: {} }));
        dispatch(changeIsErrorForEvent(true));
        dispatch(changeIsLoadingForEvent(false));
      });
  };
};
/* 事件设置列表 */
export const changeIsLoadListForEvent = isLoadList => ({
  type: "LCP_CHANGE_ISLOADLIST_FOR_EVENT",
  isLoadList
});
export const setListForEvent = ({ list, pager }) => ({
  type: "LCP_SET_LIST_FOR_EVENT",
  list,
  pager
});
/* 修改搜索条件 */
export const changeSearchDataForEvent = params => {
  fliterObj(searchForEvent, params);
};
export const changeIsErrorForEvent = isError => ({
  type: "LCP_CHANGE_ISERROR_FOR_EVENT",
  isError
});
export const changeIsLoadingForEvent = isLoading => ({
  type: "LCP_CHANGE_ISLOADING_FOR_EVENT",
  isLoading
});
export const changeIsSavingForEvent = isAdding => ({
  type: "LCP_CHANGE_ISSAVING_FOR_EVENT",
  isAdding
});

/* 事件新增 */
export const addEvent = data => {
  return dispatch => {
    dispatch(changeIsSavingForEvent(true));
    _addEvent(data)
      .then(({ data: { code, msg } }) => {
        dispatch(changeIsSavingForEvent(false));
        if (code === 0) {
          message.success("新建事件成功");
          dispatch(closeAddModalForEvent());

          // NOTE
          // TODO ....清除搜索参数
          // NOTE 这里本来要清除所有搜索参数，只保留页码，但是考虑到，不应该擅自清除用户选择的搜索参数，这里就不做了
          // NOTE 只是单纯的返回到第一页罢了

          changeSearchDataForEvent({ pageIndex: 1 });
          dispatch(getListForEvent());
        }
      })
      .catch(e => {
        dispatch(changeIsSavingForEvent(false));
      });
  };
};

/* 事件编辑更新 */
export const updateEvent = data => {
  return dispatch => {
    dispatch(changeIsSavingForEvent(true));
    _updateEvent(data)
      .then(({ data: { code, msg } }) => {
        dispatch(changeIsSavingForEvent(false));
        if (code === 0) {
          message.success("事件编辑成功");
          dispatch(closeAddModalForEvent());

          // NOTE
          // TODO ....清除搜索参数
          // NOTE 这里本来要清除所有搜索参数，只保留页码，但是考虑到，不应该擅自清除用户选择的搜索参数，这里就不做了
          // NOTE 只是单纯的返回到第一页罢了

          changeSearchDataForEvent({ pageIndex: 1 });
          dispatch(getListForEvent());
        }
      })
      .catch(e => {
        dispatch(changeIsSavingForEvent(false));
      });
  };
};

/* 事件禁用 */
export const disableEvent = ({ eventId, status }) => {
  return dispatch => {
    const s = status === 1 ? 0 : 1;
    const text = s === 0 ? "禁用" : "启用";
    dispatch(changeIsLoadingForEvent(true));
    _disableEvent({ eventId, status: s })
      .then(({ data: { code, msg } }) => {
        if (code === 0) {
          message.success("事件" + text + "成功");
          dispatch(getListForEvent());
        }
      })
      .catch(e => {
        dispatch(changeIsLoadingForEvent(false));
      });
  };
};
/* 事件删除 */
export const deleteEvent = ({ eventId }, isPageIndexPrev, pageIndex) => {
  return dispatch => {
    dispatch(changeIsLoadingForEvent(true));
    _deleteEvent({ eventId })
      .then(({ data: { code, msg } }) => {
        if (code === 0) {
          message.success("删除事件成功");
          if (isPageIndexPrev) {
            // 如果本页只剩下一条记录，则删除成功后重置对应的页码，再进行查询
            changeSearchDataForEvent({ pageIndex });
          }
          dispatch(getListForEvent());
        }
      })
      .catch(e => {
        dispatch(changeIsLoadingForEvent(false));
      });
  };
};
