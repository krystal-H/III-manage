import { fromJS } from "immutable";
import * as constants from './constants';
import { IAction } from "./types";

const defaultState = fromJS({
  loading: false,
  roleList: [],
  pager: {
    totalRows: 0,
    pageIndex: 0
  },
  authList: [ ],
  defaultAuth: [],
  target: [],
  visible: false,
  roleItem: {}
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case constants.SET_LOADING_STATUS: 
      return state.merge({
        loading: action.loading
      });
    case constants.SET_ROLE_LIST:
      return state.merge({
         roleList: action.list,
         pager: action.pager || {
          totalRows: 0,
          pageIndex: 0
         }
      });
    case constants.SET_ROLE_AUTH:
      return state.merge({
        authList: action.authList
      });
    case constants.SET_ROLE_AUTH_ALL:
      return state.merge({
        authList: action.authList,
        defaultAuth: action.authList
      });
    case constants.SET_ROLE_AUTH_TARGET:
      return state.merge({
        target: action.target
      });  
    case constants.OPEN_ROLE_MODAL:
      return state.merge({
        visible: true,
        roleItem: action.roleItem
      });
    case constants.CLOSE_ROLE_MODAL:
      return state.merge({
        visible: false,
        roleItem: {},
        authList: [],
        target: [],
      });  
    case constants.MODIFY_ROLE_DETAIL:
      return state.merge({
        roleItem: {...state.getIn(["roleItem"]).toJS(), ...action.params}
      });

    default:
      return state;
  }
};
