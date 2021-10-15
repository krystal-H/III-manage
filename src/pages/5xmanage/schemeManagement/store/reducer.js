import { fromJS } from 'immutable';
import * as ActionTypes from './ActionTypes';

const defaultState = fromJS({
  categoryInfo: {}, // 品类方案信息
  schemeBriefInfo: {} // 方案简介细腻
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_CATEGORY:
      console.log('测试', action.info)
      return state.set('categoryInfo', action.info)
    case ActionTypes.SAVE_SCHEME_BRIEF:
      return state.set('schemeBriefInfo', action.info)
    default:
      return state
  }
}