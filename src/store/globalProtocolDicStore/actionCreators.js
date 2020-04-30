import * as Constants from './constants';
import {
        protocolDicSubjectListRequest,
        protocolDicSubjectExtendsListRequest,
        protocolDicFunctionListRequest,
        protocolDicFunctionExtendsListRequest,
        protocolDicFunctionGetAllListRequest // 全部功能列表
      } from '../../apis/protocolDic'
import {REQUEST_SUCCESS} from '../../config/config'

//主体列表
export const SubjectListAction = (data) => {
  return {
    type: Constants.GET_SUBJECT_MENU,
    data:data
  }
}

export const SubjectListAsyncAction = (data) => {
  return (dispatch) => {
    protocolDicSubjectListRequest().then(res => {
      let code = res.data.code ;
      if(code === REQUEST_SUCCESS){
        dispatch(SubjectListAction(res.data.data));
      }
    })
  }
}

//主体扩展列表
export const SubjectExtendsListAction = (data) => {
  return {
    type: Constants.GET_SUBJECT_EXTENDS_MENU,
    data:data
  }
}

export const SubjectExtendsListAsyncAction = (data) => {
  return (dispatch) => {
    protocolDicSubjectExtendsListRequest().then(res => {
      let code = res.data.code ;
      if(code === REQUEST_SUCCESS){
        dispatch(SubjectExtendsListAction(res.data.data));
      }
    })
  }
}
//功能列表
export const FunctionListAction = (data) => {
  return {
    type: Constants.GET_FUNCTION_MENU,
    data:data
  }
}

export const FunctionListAsyncAction = (data) => {
  return (dispatch) => {
    protocolDicFunctionListRequest().then(res => {
      let code = res.data.code ;
      if(code === REQUEST_SUCCESS){
        dispatch(FunctionListAction(res.data.data));
      }
    })
  }
}
//功能扩展列表
export const FunctionExtendsListAction = (data) => {
  return {
    type: Constants.GET_FUNCTION_EXTENDS_MENU,
    data:data
  }
}

export const FunctionExtendsListAsyncAction = (data) => {
  return (dispatch) => {
    protocolDicFunctionExtendsListRequest().then(res => {
      let code = res.data.code ;
      if(code === REQUEST_SUCCESS){
        dispatch(FunctionExtendsListAction(res.data.data));
      }
    })
  }
}

//功能列表全部
export const FunctionAllListAction = (data) => {
  return {
    type: Constants.GET_FUNCTION_ALL_LIST,
    data:data
  }
}

export const FunctionAllListAsyncAction = (data) => {
  return (dispatch) => {
    protocolDicFunctionGetAllListRequest().then(res => {
      let code = res.data.code ;
      if(code === REQUEST_SUCCESS){
        dispatch(FunctionAllListAction(res.data.data));
      }
    })
  }
}