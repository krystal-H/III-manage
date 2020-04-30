import { fromJS } from 'immutable';
import { constants } from '.';

const defaultState = fromJS({
    messageList: [],
    pager: {
      totalRows: 0,
      pageIndex: 0
    },
    count: 0
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_MESSAGE_LIST:
            return state.merge({
                messageList: action.list,
                pager: action.pager,
            });
        case constants.SET_MESSAGE_COUNT:
            return state.merge({
                count: action.count
            })
        
        default:
            return state
    }
}