import { fromJS } from 'immutable';
import * as constants from './constants';

export const deleteFileAction = (file) => ({
  type: constants.DELETE_FILE,
  file,
});

export const changeCurrent = (type) => ({
  type: constants.CHANGE_CURRENT,
  optType: type,
});

export const changeFormData = (type, formData) => ({
  type: constants.CHANGE_FORM_DATA,
  formData: fromJS(formData),
  formType: type,
});

export const addFile = (file) => ({
  type: constants.ADD_FILE,
  file,
});

export const deleteFile = (file) => {
  return (dispatch) => {
    dispatch(deleteFileAction(file));
    dispatch(changeFormData('scopeForm', { deviceImport: { value: '' }, }))
  }
};

export const clearFormData = (file) => ({
  type: constants.CLEAR_FORM_DATA,
});
