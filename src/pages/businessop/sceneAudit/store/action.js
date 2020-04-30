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
import { _getList, _getDetailForAPP, _detailRead, _checkForAPP } from "./api";
import { getMsgCount } from "../../../message/store/actionCreators";
import { serverTypeList } from "./reducer";
import { message } from "antd";

let search = {}; //应用列表的查询参数
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

const initTypes = () =>
  serverTypeList
    .slice(1)
    .map(d => d.id)
    .join(",");
export const init = () => {
  return dispatch => {
    search = {
      pageRows: 10,
      pageIndex: 1,
      types: initTypes()
    };
    getList()(dispatch);
  };
};
export const loading = () => ({ type: LISTLOADING });
export const loaded = ({ list, pager }) => ({ type: LISTLOADED, list, pager });
export const listCrash = () => ({ type: ERRORFORGETLIST });
export const saving = () => ({ type: SAVING });
export const saved = () => ({ type: SAVED });
export const saveCrash = () => ({ type: ERRORFORSAVING });
export const openModal = detailData => ({ type: OPEN_DETAILMODAL, detailData });
export const closeModal = () => ({ type: CLOSE_DETAILMODAL });
export const getList = () => {
  return dispatch => {
    dispatch(loading());
    // 查询列表
    _getList({ ...search })
      .then(({ code, list, pager }) => {
        if (code === 0) {
          dispatch(loaded({ list, pager }));
        } else {
          dispatch(listCrash());
        }
      })
      .catch(e => {
        dispatch(listCrash());
      });
  };
};
export const changeSearchData = data => {
  let { types } = data;
  if (!types) {
    // 如果types没选或者选择了全部，则修改types的值为"11,13"
    types = initTypes();
  }
  fliterObj(search, { ...data, types });
};

/* 打开编辑事件弹窗 */
export const getDetailAndOpenModal = d => {
  const { id, productId } = d;
  return dispatch => {
    const hide = message.loading("正在读取详情数据...", 0);
    _getDetailForAPP({ id, productId })
      .then(({ data: { code, data, msg } }) => {
        hide();
        if (code === 0) {
          dispatch(openModal({ ...data, prevDetailData: d }));

          // 如果发现是未读的消息，则改成已读
          const { readStatus } = data;
          if (readStatus !== 1) {
            _detailRead({ id }).then(data => {
              // 如果设置已读成功，则重新读取未读消息条数
              if (data.data.code === 0) {
                dispatch(getMsgCount());
              }
              // 失败不做任何处理
            });
          }
        }
      })
      .catch(e => {
        hide();
      });
  };
};

/* 场景服务审核 */
// 提交审核 - 场景服务审核
export const checkForAPP = d => {
  return dispatch => {
    dispatch(saving());
    _checkForAPP(d)
      .then(({ data: { code } }) => {
        if (code === 0) {
          message.success("提交审核成功");
          dispatch(saved());
          dispatch(getList());
        } else {
          dispatch(saveCrash());
        }
      })
      .catch(e => {
        dispatch(saveCrash());
      });
  };
};
