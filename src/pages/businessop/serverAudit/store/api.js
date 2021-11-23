import axios from "../../../../util/api.request";

/* 服务审核列表 */
export const _getList = data => {
  return axios.Post("manage-open/audit/getList", data).then(d => ({
    list: d.data.data.list,
    pager: d.data.data.pager,
    code: d.data.code,
    data: d
  }));
};

/* 拉取APP控制服务详情 */
export const _getDetailForAPP = data => {
  return axios.Post(
    "manage-open/audit/app/get",
    data,
    { isModalError: true }
  );
};

/* 将APP控制服务设置成已读状态 */
export const _detailRead = data => {
  return axios.Post("manage-open/audit/updateToRead", data);
};

/* 更新APP控制服务审核状态 */
export const _checkForAPP = data => {
  return axios.Post(
    "manage-open/audit/update",
    data,
    { isModalError: true }
  );
};
