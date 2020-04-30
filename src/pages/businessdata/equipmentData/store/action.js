import { LISTLOADING, LISTLOADED, ERRORFORGETLIST } from "./actionNames";
import { _getList, _download } from "./api";
import moment from "moment";

const format = "YYYY-MM-DD HH:mm:ss";
export const defaultStartTime = moment("00:00:00", "HH:mm:ss");
export const defaultEndTime = moment("12:00:00", "HH:mm:ss");

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
  if (obj.startTime && typeof obj.startTime !== "string") {
    obj.startTime = obj.startTime.format(format);
  }
  if (obj.endTime && typeof obj.endTime !== "string") {
    obj.endTime = obj.endTime.format(format);
  }
};

export const init = () => {
  return dispatch => {
    search = {
      pageRows: 10,
      pageIndex: 1
    };
    getList()(dispatch);
  };
};
export const loading = () => ({ type: LISTLOADING });
export const loaded = (list, pager) => ({ type: LISTLOADED, list, pager });
export const listCrash = () => ({ type: ERRORFORGETLIST });

export const getList = () => {
  return dispatch => {
    dispatch(loading());
    // 查询列表
    _getList({ ...search })
      .then(
        ({
          data: {
            code,
            data: { list, pager }
          }
        }) => {
          if (code === 0) {
            dispatch(loaded(list, pager));
          } else {
            dispatch(listCrash());
          }
        }
      )
      .catch(e => {
        dispatch(listCrash());
      });
  };
};
export const changeSearchData = data => {
  fliterObj(search, data);
};

export const download = () => {
  let paramsStr = "";
  Object.keys(search).forEach(key => {
    paramsStr += key + "=" + search[key] + "&";
  });
  _download(paramsStr.replace(/&$/, ""));
};
