import {fromJS} from 'immutable'
import * as Constants from './constants'



const defaultState = fromJS({
  isAuthorized: true,
  userInfo:{}
})

export default (state = defaultState, action) => {
  switch(action.type){
    case Constants.AuthorizedSuccessAction:
      {
        let newState = state.set("isAuthorized" , true);
        return newState.set("userInfo", action.data)
      }
    case Constants.AuthorizedFailedAction:
        {
          let newState = state.set("isAuthorized" , false);
          return newState.set("userInfo", action.data)
        }
    default:
      return state
  }
}