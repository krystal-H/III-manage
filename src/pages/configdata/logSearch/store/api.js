import axios from "../../../../util/api.request";

/* 应用列表 */
export const _getList = data => {
  return axios.Post("collection/logSearch/getList", data).then(d => ({
    list: d.data.data.data,
    pager: d.data.data.pager,
    data: d
  }));
};
