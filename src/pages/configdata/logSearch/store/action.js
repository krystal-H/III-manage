import {
  LISTLOADING,
  LISTLOADED,
  ERRORFORGETLIST,
  OPEN_DETAILMODAL,
  CLOSE_DETAILMODAL
} from "./actionNames";
import { _getList } from "./api";
import { getAllList } from "../../dataCollection/store/action";

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

export const init = () => {
  return dispatch => {
    search = {
      paged: true,
      pageRows: 10,
      pageIndex: 1
    };
    getList()(dispatch);

    //拉取全部应用列表
    getAllList()(dispatch);
  };
};
export const loading = () => ({ type: LISTLOADING });
export const loaded = ({ list, pager }) => ({ type: LISTLOADED, list, pager });
export const listCrash = () => ({ type: ERRORFORGETLIST });
export const openModal = detailData => ({ type: OPEN_DETAILMODAL, detailData });
export const closeModal = () => ({ type: CLOSE_DETAILMODAL });
export const getList = () => {
  return dispatch => {
    dispatch(loading());
    // 查询列表
    _getList({ ...search })
      .then(({ list, pager }) => {
        dispatch(loaded({ list, pager }));
      })
      .catch(e => {
        dispatch(listCrash());
      });
  };
};
export const changeSearchData = data => {
  fliterObj(search, data);
};
