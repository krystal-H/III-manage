import {fromJS} from 'immutable'
import * as Constants from './constants'

const defaultState = fromJS({
  subjectMenu:[],
  subjectExtendsMenu:[],
  functionMenu:[],
  functionExtendsMenu:[]
})

// 返回设备的大类，小类
export default (state = defaultState, action) => {
  switch (action.type) {
    case Constants.GET_SUBJECT_MENU:
      return state.set('subjectMenu', action.data);
    case Constants.GET_SUBJECT_EXTENDS_MENU:
      return state.set('subjectExtendsMenu', action.data);
    case Constants.GET_FUNCTION_MENU:
      return state.set('functionMenu', action.data);
    case Constants.GET_FUNCTION_EXTENDS_MENU:
      return state.set('functionExtendsMenu', action.data);
    case Constants.GET_FUNCTION_ALL_LIST:
      return state.set('functionAllList', action.data);
    default:
      return state;
  }
}

