import { fromJS } from "immutable";
import { constants } from ".";


const defaultState = fromJS({
    list: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    loading: false,
    notice: {},
});

export default (state = defaultState, action: IAction) => {
    switch (action.type) {
        case constants.SET_MESSAGE_LIST:
            return state.merge({
                list: action.list,
                pager: action.pager,
            });
        case constants.SET_LOADING_STATUS:
            return state.merge({
                loading: action.loading
            });
        case constants.SET_NOTICE_CONTENT:
            return state.merge({
                notice: action.notice
            });
        case constants.CLEAR_NOTICE_CONTENT:
            return state.merge({
                notice: {}
            });
        default:
            return state;
    };
};