import { fromJS } from 'immutable';
import * as constants from './constants'
import { REQUEST_SUCCESS } from '../../../config/config';
import {
    getList,
    updateToRead,
    getMessageCount
} from '../../../apis/message'

// 获取产品审核列表
export const getMessageList = (pager) => {
    let [pageIndex, pageRows] = [1, 10];
    return (dispatch) => {
        return getList({pageIndex, pageRows, ...pager}).then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setMessageList(result));
                return Promise.resolve()
            }
        }).catch(err => console.log(err))
    }
}

// 设置列表
export const setMessageList = (result) => {
    return {
        type: constants.SET_MESSAGE_LIST,
        list: fromJS(result.list),
        pager: fromJS(result.pager)
    }
}

// 更新已读状态
export const updateReadStatus = (id) => {
    return (dispatch, getState) => {
        updateToRead({id})
        let count = +getState().getIn(["message","count"])
        dispatch(setMsgCount(--count))
    }
}

// 获取消息列表总数
export const getMsgCount = () => {
   return (dispatch) => {
        getMessageCount().then(res => {
            const result = res.data.data;
            const code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setMsgCount(result));
            }
        }).catch(err => console.log(err))
   }
}

// 设置消息总数
export const setMsgCount = (data) => {
    return {
        type: constants.SET_MESSAGE_COUNT,
        count: data
    }
}
