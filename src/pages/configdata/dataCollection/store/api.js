import axios from "../../../../util/api.request";

/* 三个预置列表选项 */
export const _getAllListForAPP = data => {
  return axios.Post("collection/application/getList", data).then(d => ({
    list: d.data.data,
    data: d
  }));
};
export const _getOpenAppListForAPP = data => {
  return axios.Post("collection/application/getAppInfo", data).then(d => ({
    list: d.data.data,
    data: d
  }));
};
export const _getWebAppListForAPP = data => {
  return axios
    .Post("collection/application/getAppInfoWebType", data)
    .then(d => ({
      list: d.data.data,
      data: d
    }));
};
/* 三个预置列表选项 */

/* 应用列表 */
export const _addApp = data => {
  return axios.Post(
    "collection/application/add",
    data,
    { isModalError: true }
  );
};

export const _getListForAPP = data => {
  return axios.Post("collection/application/getList", data).then(d => ({
    list: d.data.data.list,
    pager: d.data.data.pager,
    data: d
  }));
};

export const _refreshToken = data => {
  return axios.Post(
    "collection/application/updateToken",
    data,
    { isModalError: true }
  );
};

export const _deleteAPP = data => {
  return axios.Post(
    "collection/application/delete",
    data,
    { isModalError: true }
  );
};

/* 事件列表 */
export const _addEvent = data => {
  return axios.Post(
    "collection/logsEvent/add",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      isModalError: true
    }
  );
};

export const _getListForEvent = data => {
  return axios.Post("collection/logsEvent/getList", data).then(d => ({
    list: d.data.data.list,
    pager: d.data.data.pager,
    data: d
  }));
};

export const _getEventDetail = data => {
  return axios.Post(
    "collection/logsEvent/get",
    data,
    { isModalError: true }
  );
};

export const _updateEvent = data => {
  return axios.Post(
    "collection/logsEvent/update",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      isModalError: true
    }
  );
};

export const _deleteEvent = data => {
  return axios.Post(
    "collection/logsEvent/delete",
    data,
    { isModalError: true }
  );
};

export const _disableEvent = data => {
  return axios.Post(
    "collection/logsEvent/ope",
    data,
    { isModalError: true }
  );
};
