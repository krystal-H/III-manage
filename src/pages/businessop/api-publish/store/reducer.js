import { fromJS, setIn, Map } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  loading: false,
  apiList: [],
  curApi: {},
  showApiDialog: false,
  showDimensionDialog: false,
  dimensionType: null,
  pager: {},
  dataDimension: [], // 数据维度
  dataIndex: [], // 数据指标
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_API_LIST:
      return state.merge({
        apiList: action.apiList,
        pager: action.pager,
      });
    case constants.SET_LOADING:
      return state.set('loading', action.loading);
    case constants.GET_CUR_API:
      return state.set('curApi', action.curApi);
    case constants.TOGGLE_API_DIALOG:
      return state.set('showApiDialog', !state.get('showApiDialog'));
    case constants.TOGGLE_DIMENSION_DIALOG:
      return state.merge({
        showDimensionDialog: !state.get('showDimensionDialog'),
        dimensionType: action.dimensionType,
      });
    case constants.SET_DIMENSION:
      return state.merge({
        dataDimension: action.dataDimension,
        dataIndex: action.dataIndex,
      });
    case constants.ADD_DIMENSION_ITEM:
      if (action.category === 'dimension') {
        return state.set('dataDimension', state.get('dataDimension').push(Map({
          dimensionName: '',
          dimensionDesc: '',
        })));
      } else {
        return state.set('dataIndex', state.get('dataIndex').push(Map({
          indexName: '',
          indexDesc: '',
        })));
      }
    case constants.DEL_DIMENSION_ITEM:
      if (action.category === 'dimension') {
        return state.set('dataDimension', state.get('dataDimension').delete(action.index));
      } else {
        return state.set('dataIndex', state.get('dataIndex').delete(action.index));
      }
    case constants.CHANGE_DIMENSION_DATA:
      let type = action.category;
      let index = action.index;
      // 数据维度
      if (type === 'dimensionName' || type === 'dimensionDesc') {
        return state.set('dataDimension', state.get('dataDimension').update(index, (value) => {
          return value.set(type, action.value);
        }));
      } else { // 数据指标
        return state.set('dataIndex', state.get('dataIndex').update(index, (value) => {
          return value.set(type, action.value);
        }));
      }
    default:
      return state;
  }
}
