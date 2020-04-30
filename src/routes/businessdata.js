
import ProductDetail from '../pages/businessdata/Product/ProductDetail';
import AppManagement from "../pages/businessdata/AppManagement/AppManagement";//业务数据--应用管理--列表
import AppManagementView from "../pages/businessdata/AppManagement/AppManagementView";//业务数据--应用管理--查看
import asyncComponent from '../lazy';

const Product = asyncComponent( () => import (/* webpackChunkName: "businessdata" */ '../pages/businessdata/Product'));
const DataLabel = asyncComponent( () => import (/* webpackChunkName: "businessdata" */ "../pages/businessdata/data-label"));
const DataObserver = asyncComponent( () => import(/* webpackChunkName: "businessdata" */ '../pages/businessdata/dataObserver'));
const AccountManage = asyncComponent( () => import(/* webpackChunkName: "businessdata" */ '../pages/businessdata/accountManage'));

const Equipment = asyncComponent( () => import (/* webpackChunkName: "businessdata" */ "../pages/businessdata/equipment"));
const EquipmentData = asyncComponent( () => import (/* webpackChunkName: "businessdata" */ "../pages/businessdata/equipmentData"));
const OperateLog = asyncComponent( () => import (/* webpackChunkName: "businessdata" */ "../pages/businessdata/operate-log/OperateLog"));

/* add by lcp at 2019-10-18 09:56 */
const ApplicationAnalysis = asyncComponent( () => import(/* webpackChunkName: "businessdata" */ '../pages/businessdata/visualization/applicationAnalysis'));
const ServerAnalysis = asyncComponent( () => import(/* webpackChunkName: "businessdata" */ '../pages/businessdata/visualization/serverAnalysis'));
// const analysisRouters = [
// 	{
// 	  name: '站点/应用/设备',
// 	  path:'/businessdata/visualization/applicationAnalysis',
// 	  component: ApplicationAnalysis,
// 	},
// 	{
// 	  name: '接口/服务/消息',
// 	  path:'/businessdata/visualization/serverAnalysis',
// 	  component: ServerAnalysis,
// 	}
// ];

const route = {
  icon:'line-chart',
  name:'业务数据',
  path:'/businessdata',
  redirect:'/businessdata/product',
  routes:[
	// ...analysisRouters,
	/*{
      name:'数据看板',
	  icon:'bar-chart',
      path:'/businessdata/visualization',
	  redirect:'/businessdata/visualization/applicationAnalysis',
      routesForThird:analysisRouters,
	  routes:analysisRouters
    },*/
    {
      name:'产品管理',
      path:'/businessdata/product',
      component:Product
    },
    {
      name:'数据标签',
      path:'/businessdata/dataLabel',
      component:DataLabel,
    },
    {
      name:'数据订阅',
      path:'/businessdata/dataObserver',
      component:DataObserver,
      meta:{
        hideInMenu: false,
      }
    },
    {
      name:'用户管理',
      path:'/businessdata/accountManage',
      component:AccountManage,
      // meta:{
      //   hideInMenu: true,
      // }
    },
    {
      name:'设备管理',
      path:'/businessdata/equipment',
      component:Equipment,
    },
	{
      name:'设备数据管理',
      path:'/businessdata/equipmentData',
      component:EquipmentData,
    },
    {
      name:'应用管理',
      path:'/businessdata/appManagement',
      redirect:'/businessdata/appManagement/list',
      routes:[
        {
          name: '应用管理列表',
          path: '/businessdata/appManagement/list',
          component: AppManagement,
          meta:{
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
        {
          name: '应用管理查看',
          path: '/businessdata/appManagement/view/:appName?/:appId?/:appType?',
          component: AppManagementView,
          meta:{
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
      ]
    },
    {
      name: '操作日志管理',
      path: '/businessdata/operateLog',
      component: OperateLog
    },
  ]
};

export default route;
