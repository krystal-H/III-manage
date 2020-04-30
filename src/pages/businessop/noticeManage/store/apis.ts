import axios from '../../../../util/api.request';

const prefix = '/manage-open';

// 获取角色列表
export const getList = (pager: IPagerParams) => {
  return axios.request({
    url: prefix + '/systemNotice/getList',
    params: pager,
    method: 'get'
  });
};

// 保存消息
export const saveNotice = (params: INotice) => {
  return axios.Post(
    prefix + '/systemNotice/addAndUpdate',
    params
  );
};

// 校验账号-接口文档暂未提供
export const validateAccout = (params: { userName: string, version: number }) => {
  return axios.Post(
    prefix + '/common/user/getUserInfo',
    params
  );
};

// 删除消息
export const delNotice = (params: { noticeId: number, version: number }) => {
  return axios.Post(
    prefix + '/systemNotice/deleteNotice',
    params
  );
};

// 发布消息
export const publishNotice = (params: { noticeId: number, version: number}) => {
  return axios.Post(
    prefix + '/systemNotice/releaseNotice',
    params,
  );
};

// 撤销消息
export const cancelNotice = (params: { noticeId: number, version: number }) => {
  return axios.Post(
    prefix + '/systemNotice/cancelNotice',
    params
  );
};

// 获取消息内容
export const getNotice = (params: {noticeId: number, version: number}) => {
  return axios.request({
    url: prefix + '/systemNotice/get',
    params,
    method: 'get'
  });
}