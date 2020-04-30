import { fromJS } from 'immutable';
import { constants } from '.';

const defaultState = fromJS({
    productList: [],
    pager: {
      totalRows: 0,
      pageIndex: 0
    },    

    appLinkList:[], //查看关联产品列表
    appLinkPager:{
        totalRows: 0,
        pageIndex: 0
    }, //关联产品分页

    colophonList:[], // 查看版本记录列表 
    colophonPager:{
        totalRows: 0,
        pageIndex: 0
    }, //版本记录分页

    allProList:[], //所有产品类目菜单

    realProductList:[], // 获取关联的产品列表
    realProductPage:{
        totalRows: 0,
        pageIndex: 0
    }, //获取关联的产品分页
    appInfo:{}, //应用管理-获取应用详情
    
    productIdList:[],  //已关联的产品列表 （不分页）
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_PRODUCT_LIST:
            return state.merge({
                productList: action.list,
                pager: action.pager,
            });
        case constants.SET_APPLINK_LIST: //查看--关联产品列表
            return state.merge({
                appLinkList: action.appLinkList,
                appLinkPager: action.appLinkPager,
            }); 
        case constants.SET_COLOPHON_LIST: //查看--版本记录列表
            return state.merge({
                colophonList: action.colophonList,
                colophonPager: action.colophonPager,
            }); 
        case constants.SET_ALL_PRO_LIST: //所有产品类目菜单
            return state.set('allProList', action.allProList);

        case constants.SET_REAL_PRODUCT_LIST: //获取关联的产品列表
            return state.merge({
                realProductList: action.realProductList,
                realProductPage: action.realProductPage,
            });
        case constants.SET_APP_INFO: //应用管理-获取应用详情
            return state.set('appInfo', action.appInfo);
            
        case constants.SET_PRODUCT_ID_LIST: //设置已关联的产品列表 （不分页）
            return state.set('productIdList', action.productIdList);
        default:
            return state
    }
}

