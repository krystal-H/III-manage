import { notification } from 'antd';
import { Dispatch } from 'redux';
import * as apis from './apis';
import { constants } from '.';
import { REQUEST_SUCCESS } from '../../../../config/config';
import { fromJS } from 'immutable';

// 获取消息列表
export const getList = (pager: IPagerParams) => {
    let [pageIndex, pageRows, version] = [1, 10, 1.1];
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatus(true));
        return apis.getList({ pageIndex, pageRows, ...pager, version }).then((res: any) => {
            dispatch(setLoadingStatus(false));
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setList(result));
            }
        }).catch(err => console.log(err));
    };
};

// 设置消息列表
export const setList = (result: { list: INotice[], pager: IPager }) => ({
    type: constants.SET_MESSAGE_LIST,
    list: fromJS(result.list),
    pager: fromJS(result.pager)
});

// 设置loading状态
export const setLoadingStatus = (loading: boolean) => ({
    type: constants.SET_LOADING_STATUS,
    loading
});

// 新增
export const saveNotice = (params: INotice) => {
    return (dispatch: Dispatch) => {
        return apis.saveNotice({ ...params, version: 1.1 }).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "保存成功",
                    duration: 3,
                });
                return Promise.resolve(1);
            }
            return Promise.resolve(0);
        });
    };
};

// 校验账号
export const validateAccout = (userName: string) => {
    return (dispatch: Dispatch) => {
        return apis.validateAccout({ userName, version: 1.1 }).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS && result) {
                return Promise.resolve(result);
            }
            return Promise.resolve(0);
        });
    };
};

// 删除消息
export const delNotice = (noticeId: number) => {
    return (dispatch: Dispatch) => {
        return apis.delNotice({ noticeId, version: 1.1 }).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "删除消息成功",
                    duration: 3,
                });
                return Promise.resolve(1);
                // dispatch<any>(getList({ pageIndex: 1 }));
            }
            return Promise.resolve(0);
        });
    };
};

// 发布
export const publishNotice = (noticeId: number) => {
    return (dispatch: Dispatch) => {
        return apis.publishNotice({ noticeId, version: 1.1 }).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "发布消息成功",
                    duration: 3,
                });
                return Promise.resolve(1);
                // dispatch<any>(getList({ pageIndex: 1 }));
            }
            return Promise.resolve(0);
        });
    };
};

// 撤销消息
export const cancelNotice = (noticeId: number) => {
    return (dispatch: Dispatch) => {
        return apis.cancelNotice({ noticeId, version: 1.1 }).then((res: any) => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                notification.success({
                    message: "撤销消息成功",
                    duration: 3,
                });
                return Promise.resolve(1);
                // dispatch<any>(getList({ pageIndex: 1 }));
            }
            return Promise.resolve(0);
        });
    };
};

// 设置消息内容
export const setNotice = (notice: INotice) => ({
    type: constants.SET_NOTICE_CONTENT,
    notice
});

// 获取消息内容
export const getNotice = (noticeId: number) => {
    return (dispatch: Dispatch) => {
        return apis.getNotice({ noticeId, version: 1.1 }).then((res: any) => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setNotice(result));
                return Promise.resolve(result);
            }
            return Promise.resolve(0);
        });
    };
};

// 清除消息
export const clearNotice = () => ({
    type: constants.CLEAR_NOTICE_CONTENT
});