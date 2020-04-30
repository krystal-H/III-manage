import { fromJS } from 'immutable';
import { constants } from '.';

const defaultState = fromJS({
    productList: [],
    pager: {
      totalRows: 0,
      pageIndex: 0
    },   
    productDetail: {
        // 产品详情含技术方案
        product: {},
        // technicalSolution: {},
        // 协议
        protocolList: [],
        // 模组
        communicateModule: {},
        // 商业化信息
        productCommerceInfo: {}
    },
    productService: {
        appProjectList: [],
        timerServiceList: []
    },
    loading: false  
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_PRODUCT_LIST:
            return state.merge({
                productList: action.list,
                pager: action.pager,
            });
        case constants.SET_PRODUCT:
            return state.set('productDetail', action.productDetail)    
        case constants.SER_PRODUCT_SERVICE:
            return state.set('productService', action.productService)
        case constants.CLEAR_PRODUCT_INFO:
            return state.merge({
                productDetail: defaultState.getIn(["productDetail"])
            })
        case constants.TRIGGER_LOADING:
            return state.merge({
                loading: action.loading
            })        
        default:
            return state
    }
}

