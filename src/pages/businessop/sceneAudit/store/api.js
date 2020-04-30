import axios from "../../../../util/api.request";

/* 场景服务审核列表、审核记录设置成已读、 */
export { _detailRead } from "../../serverAudit/store/api";

/* 场景服务审核列表 */
export const _getList = data => {
  return axios.Post("manage-open/auditScene/getSceneList", data).then(d => ({
    list: d.data.data.list,
    pager: d.data.data.pager,
    code: d.data.code,
    data: d
  }));
};

/* 更新场景服务审核状态 */
export const _checkForAPP = data => {
  return axios.Post(
    "manage-open/auditScene/update",
    data,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      isModalError: true
    }
  );
};

/* 拉取场景服务详情 */
export const _getDetailForAPP = data => {
  return axios.Post(
    "manage-open/auditScene/getSceneDetailById",
    data,
    {},
    { isModalError: true }
  );
};
