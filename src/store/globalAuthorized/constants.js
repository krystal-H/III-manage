const namespace = "golbalAuthorized"
const actionName = (name)=> {
  return namespace + "/" + name
}
export const AuthorizedSuccessAction = actionName("AuthorizedSuccess")  // 授权成功
export const AuthorizedFailedAction = actionName("AuthorizedFailed")  // 授权失败