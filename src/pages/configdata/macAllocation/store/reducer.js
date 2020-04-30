import {
  fromJS
} from 'immutable';
import {
  constants
} from '.';

const defaultState = fromJS({
  macList: [],
  moduleList: [],
  pager: {
    totalRows: 0,
    pageIndex: 0
  },
  macDetailList: [],
  macAllocation: {},
  loading: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_MAC_LIST:
      return state.merge({
        macList: action.list,
        pager: action.pager
      });
    case constants.SET_MODULE_LIST:
      return state.merge({
        moduleList: action.list
      })
    case constants.SET_MAC_DETAIL_LIST:
      return state.merge({
        macDetailList: action.list,
        pager: action.pager
      });
    case constants.SET_LOADING_STATUS:
      return state.merge({
        loading: action.loading
      });
    default:
      return state
  }
}
