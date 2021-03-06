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

import { reducer as appManagementReducer} from '../pages/businessdata/AppManagement/store' //????????????

const reducer = combineReducers({

  loadingShow:loadingReducer,

  globalUserInfo: globalUserInfoReducer,
  /***
   * ??????????????????
   */
  globalProtocolDicInfo: globalProtocolDicReducer,
  /**
   * ????????????????????????
   */
  globalDeviceInfo: globalDeviceInfoReducer,
  /**
   * ??????????????????reducer
   */
  apiPublish: apiPublishReducer,
  customMethod: customMethodReducer,
  /**
   * ??????
   */
  product: productReducer,
  /**
   * ??????????????????reducer
   */
  dataLabel: dataLabelReducer,
  /**
   * ??????????????????reducer
   */
  moduleManager: moduleManagerReducer,
  /**
   * ????????????
   */
  productAudit: productAuditReducer,
   /**
   * ????????????
   */
  message: massageReducer,
  /**
   * ????????????
   */
  appManagement: appManagementReducer,
  /**
   * ??????????????????
   */
  positionModel: positionModelReducer,
   /**
   * ????????????
   */
  equipment: equipmentReducer,
  equipmentData: equipmentDataReducer,
  positionModel: positionModelReducer,
  /**
   * ????????????
   */
  projectManage: projectManageReducer,

  /**
   * ??????????????????  Lcp
   */

  dataCollection: dataColletorReducer,

  /**
   * ????????????
   */
  dataObserver: dataObserverReducer,

  /**
   * mac????????????
   */
  macAllocation: macAllocationReducer,
  /**
   * ???????????????
   */
  subAccount: subAccountReducer,
  /**
   * ????????????
   */
  roleManage: roleManageReducer,
  /**
   * ????????????
   */
  accountManage: accountManageReducer,
   /**
   * ????????????????????????
   */
  interfaceUser: interfaceUserReducer,
 /**
   * ????????????????????????
   */
  interfaceRole: interfaceRoleReducer,

  /**
   * ????????????  Lcp
   */
  visualization: visualizationReducer,
  /**
   * APP??????????????????  Lcp
   */
  serverChecker: serverCheckerReducer,
  /**
   * ??????????????????  Lcp
   */
  sceneChecker: sceneCheckerReducer,
  /**
   * ????????????  Lcp
   */
  userChecker: userCheckerReducer,
  /**
   * ????????????
   */
  noticeManage: NoticeManageReducer,
  /**
   * ????????????  Lcp
   */
  //dataAnalysis: dataAnalysisReducer,

});

export default reducer;
