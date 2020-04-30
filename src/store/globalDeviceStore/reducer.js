import {
  fromJS
} from 'immutable';
import * as Constants from './constants';
import {
  DeviceCategoryUtils
} from '../../util/utils';
import Home from '../../pages/home/Home';

const defaultState = fromJS({
  deviceType: [],
  deviceCategoryList: [],
  authTree: [],
  authRoutes: [{
    component:Home,
    meta:{
      hideInMenu: true, //该路由不会显示在侧边栏
    }
  }]
});

// 返回设备的大类，小类
export default (state = defaultState, action) => {
  switch (action.type) {
    case Constants.DeviceTypeAction:
      return state.set('deviceType', action.data);
    case Constants.DeviceCategoryAction: {
      let deviceCategoryTreeSelect = DeviceCategoryUtils.transformDataToTreeSelectData(action.data);
      let deviceCascaderData = DeviceCategoryUtils.transformDataToCascaderData(action.data);
      let newstate = state.set('deviceCategoryList', action.data);
      newstate = newstate.set('deviceCascaderList', deviceCascaderData);
      return newstate.set("deviceCategoryTreeSelect", deviceCategoryTreeSelect);
    }
    case Constants.SET_AUTH_MODULE:
      return state.merge({
        authTree: action.authTree,
        authRoutes: action.authRoutes
      });
    default:
      return state;
  }
};
