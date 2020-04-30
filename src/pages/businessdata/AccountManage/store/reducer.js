import {
  fromJS
} from 'immutable';
import {
  constants
} from '.';

const defaultState = fromJS({
  accountList: [],
  pager: {
    totalRows: 0,
    pageIndex: 0
  },
  loading: false,
  subAccountList: [],
  subAccountPager: {
    totalRows: 0,
    pageIndex: 0
  },
  productList: [],
  productPager: {
    totalRows: 0,
    pageIndex: 0
  },
  accountDetail: {},
  province: [],
  city: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_ACCOUNT_LIST:
      return state.merge({
        accountList: action.list,
        pager: action.pager
      });
    case constants.SET_LOADING_STATUS:
      return state.merge({
        loading: action.loading
      });  
    case constants.SET_ACCOUNT_DETAIL:
      return state.merge({
        accountDetail: action.detail
      });
    case constants.SET_SUB_ACCOUNT_LIST:
      return state.merge({
        subAccountList: action.list,
        subAccountPager: action.pager,
      });
    case constants.SET_PRODUCT_LIST:
      return state.merge({
        productList: action.list,
        productPager: action.pager
      });
    case constants.SET_PROVINCE_LIST:
      return state.merge({
        province: action.list
      });
    case constants.SET_CITY_LIST:
      return state.merge({
        province: fromJS(state.getIn(["province"]).toJS().map(item => item.value === action.provinceId ? {...item, children: action.list} : item))
      });
    case constants.MODIFY_ACCOUNT_DETAIL:
        return state.merge({
          accountDetail: fromJS({...state.getIn(["accountDetail"]).toJS(), ...action.params})
        });
    default:
      return state;
  }
};
