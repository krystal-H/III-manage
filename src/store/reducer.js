import { combineReducers } from 'redux-immutable';
import { reducer as apiPublishReducer } from '../pages/businessop/api-publish/store';

import { reducer as customMethodReducer } from '../pages/businessop/custom-method/store';
import { reducer as globalDeviceInfoReducer } from './globalDeviceStore'
import { reducer as globalProtocolDicReducer } from './globalProtocolDicStore'
import { reducer as globalUserInfoReducer } from './globalAuthorized'

import { reducer as productReducer } from '../pages/businessdata/Product/store';
import { reducer as dataLabelReducer } from '../pages/businessdata/data-label/store'
import { reducer as moduleManagerReducer } from '../pages/configdata/moduleManager/store'
import { reducer as productAuditReducer} from '../pages/businessop/productAudit/store'
import { reducer as massageReducer} from '../pages/message/store'
import { reducer as positionModelReducer } from '../pages/configdata/positionModel/store'
import { reducer as projectManageReducer } from '../pages/configdata/projectManage/store'
import { reducer as macAllocationReducer } from '../pages/configdata/macAllocation/store'
import { reducer as subAccountReducer}  from '../pages/setting/subAccount/store'
import { reducer as accountManageReducer } from '../pages/businessdata/accountManage/store'
import { reducer as roleManageReducer } from '../pages/setting/roleManage/store'
import { reducer as interfaceUserReducer } from '../pages/configdata/interfaceUser/store'
import { reducer as interfaceRoleReducer } from '../pages/configdata/interfaceRole/store'
import { reducer as dataObserverReducer } from '../pages/businessdata/dataObserver/store'
import { reducer as loadingReducer } from '../components/loading/store'
import { reducer as NoticeManageReducer } from '../pages/businessop/noticeManage/store'
/* add by lcp 2019-10-12 10:28 */
import dataColletorReducer from '../pages/configdata/dataCollection/store/reducer'
import visualizationReducer from '../pages/businessdata/visualization/store/reducer'
import serverCheckerReducer from '../pages/businessop/serverAudit/store/reducer'
import sceneCheckerReducer from '../pages/businessop/sceneAudit/store/reducer'
import userCheckerReducer from '../pages/businessop/userAudit/store/reducer'
//import dataAnalysisReducer from '../pages/dataAnalysis/store/reducer'

import { reducer as equipmentReducer } from '../pages/businessdata/equipment/store';
import equipmentDataReducer from '../pages/businessdata/equipmentData/store/reducer';

import { reducer as appManagementReducer} from '../pages/businessdata/AppManagement/store' //应用管理

const reducer = combineReducers({

  loadingShow:loadingReducer,

  globalUserInfo: globalUserInfoReducer,
  /***
   * 协议字典内容
   */
  globalProtocolDicInfo: globalProtocolDicReducer,
  /**
   * 保存全局设备信息
   */
  globalDeviceInfo: globalDeviceInfoReducer,
  /**
   * 业务运营相关reducer
   */
  apiPublish: apiPublishReducer,
  customMethod: customMethodReducer,
  /**
   * 产品
   */
  product: productReducer,
  /**
   * 业务数据相关reducer
   */
  dataLabel: dataLabelReducer,
  /**
   * 模组管理相关reducer
   */
  moduleManager: moduleManagerReducer,
  /**
   * 产品审核
   */
  productAudit: productAuditReducer,
   /**
   * 消息列表
   */
  message: massageReducer,
  /**
   * 应用管理
   */
  appManagement: appManagementReducer,
  /**
   * 位置数据模型
   */
  positionModel: positionModelReducer,
   /**
   * 设备管理
   */
  equipment: equipmentReducer,
  equipmentData: equipmentDataReducer,
  positionModel: positionModelReducer,
  /**
   * 项目管理
   */
  projectManage: projectManageReducer,

  /**
   * 数据采集管理  Lcp
   */

  dataCollection: dataColletorReducer,

  /**
   * 数据订阅
   */
  dataObserver: dataObserverReducer,

  /**
   * mac地址分配
   */
  macAllocation: macAllocationReducer,
  /**
   * 子账户管理
   */
  subAccount: subAccountReducer,
  /**
   * 角色管理
   */
  roleManage: roleManageReducer,
  /**
   * 用户管理
   */
  accountManage: accountManageReducer,
   /**
   * 接口访问用户管理
   */
  interfaceUser: interfaceUserReducer,
 /**
   * 接口访问用户角色
   */
  interfaceRole: interfaceRoleReducer,

  /**
   * 数据看板  Lcp
   */
  visualization: visualizationReducer,
  /**
   * APP控制服务审核  Lcp
   */
  serverChecker: serverCheckerReducer,
  /**
   * 场景服务审核  Lcp
   */
  sceneChecker: sceneCheckerReducer,
  /**
   * 用户审核  Lcp
   */
  userChecker: userCheckerReducer,
  /**
   * 消息管理
   */
  noticeManage: NoticeManageReducer,
  /**
   * 数据分析  Lcp
   */
  //dataAnalysis: dataAnalysisReducer,


});

export default reducer;
