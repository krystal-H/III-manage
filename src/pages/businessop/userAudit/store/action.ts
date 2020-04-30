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
import { _getList, _getDetailForUser, _detailRead, _checkForUser } from "./api";
import { getMsgCount } from "../../../message/store/actionCreators";
import { message } from "antd";
import { actionProps, listDataProps } from "./types";

let search = {}; //应用列表的查询参数
const checkNull = (d: any) => d === undefined || d === null || d === "";

const fliterObj = (obj: object, addObj: object) => {
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
  return (dispatch: Function) => {
    search = {
      pageRows: 10,
      pageIndex: 1
    };
    getList()(dispatch);
  };
};

export const loading = (): actionProps => ({ type: LISTLOADING });
export const loaded = ({ list, pager }: listDataProps): actionProps => ({
  type: LISTLOADED,
  list,
  pager
});
export const listCrash = (): actionProps => ({ type: ERRORFORGETLIST });
export const saving = (): actionProps => ({ type: SAVING });
export const saved = (): actionProps => ({ type: SAVED });
export const saveCrash = (): actionProps => ({ type: ERRORFORSAVING });
export const openModal = (detailData: object): actionProps => ({
  type: OPEN_DETAILMODAL,
  detailData
});
export const closeModal = (): actionProps => ({ type: CLOSE_DETAILMODAL });

export const getList = (): Function => {
  return (dispatch: Function) => {
    dispatch(loading());
    // 查询列表
    _getList({ ...search })
      .then(({ list, pager, code }: listDataProps) => {
        if (code === 0) {
          dispatch(loaded({ list, pager }));
        } else {
          dispatch(listCrash());
        }
      })
      .catch(() => {
        dispatch(listCrash());
      });
  };
};
export const changeSearchData = (data: object): void => {
  fliterObj(search, data);
};

/* 打开编辑事件弹窗 */
export const getDetailAndOpenModal = (d: any): Function => {
  const { id } = d;
  return (dispatch: Function) => {
    const hide = message.loading("正在读取详情数据...", 0);
    _getDetailForUser({ id })
      .then(({ data: { code, data } }) => {
        hide();
        if (code === 0) {
          dispatch(openModal({ data, prevDetailData: d }));

          // 如果发现是未读的消息，则改成已读
          const { readStatus } = data;
          if (readStatus !== 1) {
            _detailRead({ id }).then(data => {
              // 如果设置已读成功，则重新读取未读消息条数
              if (data.data.code === 0) {
                dispatch(getMsgCount());
              }
            });
          }
        }
      })
      .catch(e => {
        hide();
      });
  };
};

// 提交审核 - 用户注销服务
export const checkForUser = (d: any): Function => {
  const { id, statu, remark } = d;
  let data: any = { id, statu };
  if (remark) data.remark = remark;
  return (dispatch: Function) => {
    dispatch(saving());
    _checkForUser(data)
      .then(({ data: { code } }) => {
        if (code === 0) {
          message.success("提交审核成功");
          dispatch(saved());
          dispatch(getList()); // 重新拉取列表
        } else {
          dispatch(saveCrash());
        }
      })
      .catch(() => {
        dispatch(saveCrash());
      });
  };
};
