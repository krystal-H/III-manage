import * as Constants from './constants';
import {
  DeviceTypeRequset,
  deviceCategoryRequest,
  GetAuthModule
} from '../../apis/device';
import {
  REQUEST_SUCCESS
} from '../../config/config';
import {
  fromJS
} from 'immutable';
import {routes} from '../../routes/routes';
import {deepCopy} from '../../util/utils';


// 异步action，获取设备大类列表
export const getDeviceType = () => {
  return (dispatch) => {
    DeviceTypeRequset().then(res => {
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(setDeviceType(res.data.data));
      }
    });
  };
};
// 同步保存设备大类
export const setDeviceType = (deviceType) => {
  return {
    type: Constants.DeviceTypeAction,
    data: deviceType
  };
};

// 同步保存设备大类
export const getDeviceCategoryAction = (deviceCategory) => {
  return {
    type: Constants.DeviceCategoryAction,
    data: deviceCategory
  };
};

// 异步action，获取设备大类列表
export const getDeviceCategoryAsyncAction = () => {
  return (dispatch) => {
    deviceCategoryRequest().then(res => {
      let code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        dispatch(getDeviceCategoryAction(res.data.data));
      }
    });
  };
};

// 获取所有权限模块
function flattenAuth(data, authList) {
  return data && data.map(item => {
    if (item.isSelected) {
      let urls = item.actionUrl.split('/');
      let a = "/";
      urls.forEach(element => {
        if(element){
          a += element;
          authList.push(a);
          a += '/';
        }
      });
    }
    flattenAuth(item.resourcesVoList, authList);
  });
}

// 修改为单个路由判断通过，过滤消息列表和异常路由,添加test路由
function checkSystemRoute(path){
  return new RegExp(/^\/(message|exception)(\/\w*)?$/).test(path) || new RegExp(/CLIFE/).test(path);
}

// 获取用户权限模块
export const getAuthModule = () => {
  return (dispatch) => {
    GetAuthModule().then(res => {
      let code = res.data.code;
      let data = res.data.data;
      if (code === REQUEST_SUCCESS) {
        // 计算所有路由及其父辈路由
        let authList = [];
        flattenAuth(data, authList);
        authList = Array.from(new Set(authList));
        // console.log(444,authList);
        // 拷贝
        let authRoutes = deepCopy(routes);
        // 过滤路由
        authRoutes = authRoutes.filter(item => {
          if(item.routes){
            item.routes = item.routes.filter(inner => {
              return authList.includes(inner.path) || checkSystemRoute(inner.path);
            });
          }
          return authList.includes(item.path) || checkSystemRoute(item.path);
        });
        // console.log(111,authRoutes);
        dispatch(setAuthModule(data, authRoutes));
      }
    });
  };
};

// 设置用户模块
export const setAuthModule = (authTree, authRoutes) => ({
  type: Constants.SET_AUTH_MODULE,
  authTree: fromJS(authTree),
  authRoutes: fromJS(authRoutes)
});
