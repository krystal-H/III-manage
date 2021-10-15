import { fromJS } from 'immutable';
import * as ActionTypes from './ActionTypes';
// import { REQUEST_SUCCESS } from '../../../../config/config';
// import * as apis from './apis';
import { notification } from 'antd';

// 保存方案品类
export const saveSchemeCategory = (info) => {
  console.log('保存的品类方案', info)
  return {
    type: ActionTypes.SAVE_CATEGORY,
    info
  }
}
// 保存方案简介
export const saveSchemeBrief = (info) => ({
  type: ActionTypes.SAVE_SCHEME_BRIEF,
  info
})