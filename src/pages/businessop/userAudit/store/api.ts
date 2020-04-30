import axios from "../../../../util/api.request";

/* 服务审核列表 */
export const _getList = (data: object) => {
  return axios.Post("manage-open/userAudit/getList", data).then(d => ({
    list: d.data.data.list,
    pager: d.data.data.pager,
    data: d,
    code: d.data.code
  }));
};

/* 拉取用户注销服务详情 */
export const _getDetailForUser = (data: object) => {
  return axios.Post(
    "manage-open/userAudit/get",
    data,
    {},
    { isModalError: true }
  );
};

/* 将APP控制服务设置成已读状态 */
export {
  _detailRead,
  _checkForAPP as _checkForUser
} from "../../serverAudit/store/api";
