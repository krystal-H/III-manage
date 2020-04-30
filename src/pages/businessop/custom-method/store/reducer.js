import { fromJS, setIn } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  methodListLoading: false,
  methodList: [],
  pager: {},
  curApi: {},
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_METHOD_LIST:
      return state.merge({
        methodList: action.methodList,
        pager: action.pager,
      });
    case constants.CHANGE_CUR_API:
      return state.set('curApi', action.curApi);
    case constants.SET_METHOD_LIST_LOADING:
      return state.set('methodListLoading', action.loading);
    case constants.TOGGLE_MODAL:
      return state.set('visible', !state.get('visible'));
    default:
      return state;
  }
}
