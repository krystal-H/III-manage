import {
  INIT,
  DATALOADING,
  DATALOADED,
  ERRORFORGETDATA,
  SETSEARCHDATA
} from "./actionNames";
import { _getData, _download } from "./api";
import { actionProps } from "./types";

let search = {}; //应用列表的查询参数

export const init = () => {
  return (dispatch: Function) => {
    search = {};
    dispatch(initState());
  };
};

const initState = (): actionProps => ({ type: INIT });
const loading = (): actionProps => ({ type: DATALOADING });
const loaded = ({ data }: any): actionProps => ({
  type: DATALOADED,
  data
});
const dataCrash = (): actionProps => ({ type: ERRORFORGETDATA });

export const getData = (): Function => {
  return (dispatch: Function) => {
    dispatch(loading());
    // 查询列表
    _getData({ ...search })
      .then(({ data: { data, code } }: any) => {
        if (code === 0) {
          dispatch(loaded({ data }));
        } else {
          dispatch(dataCrash());
        }
      })
      .catch(() => {
        dispatch(dataCrash());
      });
  };
};
export const changeSearchData = (data: object): void => {
  search = { ...data };
};
export const setSearchData = (data: object): actionProps => ({
  type: SETSEARCHDATA,
  data
});

export const download = () => {
  let href = "";
  for (let i in search) {
    if (i !== "moreData") {
      href += i + "=" + search[i] + "&";
    }
  }
  href = href + search["moreData"];
  _download(href);
};
