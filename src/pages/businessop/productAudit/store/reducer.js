import { fromJS } from 'immutable';
import { constants } from '.';

const defaultState = fromJS({
    productAuditList: [],
    pager: {
      totalRows: 0,
      pageIndex: 0
    },
    auditDetail: {},
    loading: false
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_PRODUCT_AUDIT_LIST:
            return state.merge({
                productAuditList: action.list,
                pager: action.pager,
            });
        case constants.SET_PRODUCT_AUDIT_DETAIL:
            return state.merge({
                auditDetail: action.auditDetail
            })
        case constants.TRIGGER_LOADING:
            return state.merge({
                loading: action.loading
            })
        default:
            return state
    }
}

