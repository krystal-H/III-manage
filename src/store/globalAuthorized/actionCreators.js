import * as Constants from './constants';



// 同步授权成功
export const AuthorizedSuccess = (userInfo) => {
  return {
    type:Constants.AuthorizedSuccessAction,
    data: userInfo
  }
}

// 同步授权失败
export const AuthorizedFailed = (userInfo) => {
  return {
    type:Constants.AuthorizedFailedAction,
    data: {}
  }
}
