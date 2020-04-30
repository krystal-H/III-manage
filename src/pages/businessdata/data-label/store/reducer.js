import { fromJS, setIn, Map } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  labelForm: {
    labelAlias: { value: '' },
    labelName: { value: '' },
    labelValue: { value: '' },
  },
  scopeForm: {
    deviceImport: { value: '' },
    batch: { value: '' },
    excelFiles: [],
    accountName: { value: '' },
  },
  current: 0,
});

export default (state = defaultState, action) => {

  switch (action.type) {
    case constants.CHANGE_LABEL_FORM_DATA:
      return state.merge({
        apiList: action.apiList,
        pager: action.pager,
      });
    case constants.CHANGE_CURRENT:
      const type = action.optType;
      if (type === 'next') {
        return state.set('current', state.get('current') + 1);
      } else if (type === 'prev') {
        return state.set('current', state.get('current') - 1);
      } else {
        return state.set('current', 0);
      }
    case constants.CHANGE_FORM_DATA:
      const formType = action.formType;
      return state.set(formType, state.get(formType).merge(action.formData));
    case constants.ADD_FILE:
      return state.setIn(['scopeForm', 'excelFiles'],
        state.getIn(['scopeForm', 'excelFiles']).delete(0).push(action.file)
      );
    case constants.DELETE_FILE:
      const index = state.getIn(['scopeForm', 'excelFiles']).findIndex(value => {
        return value.uid === action.file.uid;
      });
      return state.setIn(['scopeForm', 'excelFiles'],
        state.getIn(['scopeForm', 'excelFiles']).delete(index)
      );
    case constants.CLEAR_FORM_DATA:
      return state.merge({
        labelForm: {
          labelAlias: { value: '' },
          labelName: { value: '' },
          labelValue: { value: '' },
        },
        scopeForm: {
          deviceImport: { value: '' },
          batch: { value: '' },
          excelFiles: [],
          accountName: { value: '' },
        },
      });
    default:
      return state;
  }
}
