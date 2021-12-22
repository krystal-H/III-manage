import asyncComponent from '../lazy'

// 方案管理
const schemeManagement = asyncComponent(() => import( /* webpackChunkName: "schemeManagement" */ '../pages/5xmanage/schemeManagement'))
// 免开发上传固件管理
const FirmwareMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/firmwareMagement'))
// 模组固件管理
const moduleManagement = asyncComponent(() => import('../pages/5xmanage/moduleFirmwareMagment'))

// 工单管理
const orderMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/repairOrder'))
// banner管理
const bannerMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/bannerMn'))
// 面板管理
const panelMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/panelMn'))
// 物模型管理
const PhysicalModelMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/PhysicalModel'))

const applyModuleAuditing = asyncComponent(() => import('../pages/5xmanage/applyModuleAuditing'))
const CustomerService = asyncComponent(() => import('../pages/5xmanage/customerService'))

// 权限管理  修改开放平台菜单/新增接口权限
const authManagement = asyncComponent(() => import('../pages/5xmanage/authManagement'))


const proFirmwareUpdate = asyncComponent(() => import('../pages/5xmanage/proFirmwareUpdate'))


const route = {
  icon: "tool",
  name: '5.X管理',
  path: '/5xmanage',
  redirect: '/5xmanage/schemeManagement',
  routes: [
    {
      name: '方案管理',
      path: '/5xmanage/schemeManagement',
      component: schemeManagement,
    },
    {
      name: '免开发上传固件管理',
      path: '/5xmanage/firmwareMagement/list',
      component: FirmwareMagement,
    },
    {
      name: '模组&固件管理',
      path: '/5xmanage/moduleFirmwareManagement',
      component: moduleManagement
    },
    {
      name: '产品模组升级',
      path: '/5xmanage/proFirmwareUpdate',
      component: proFirmwareUpdate,
    },
    {
      name: '工单管理',
      path: '/5xmanage/repairOrder',
      component: orderMagement,
    },
    {
      name: 'banner管理',
      path: '/5xmanage/bannerMagement',
      component: bannerMagement,
    },
    {
      name: '物模型管理',
      path: '/5xmanage/physicalModelMagement',
      component: PhysicalModelMagement,
    },
    {
      name: '标准面板管理',
      path: '/5xmanage/panelModelMagement',
      component: panelMagement,
    },
    {
      name: '申请&采购模组申请',
      path: '/5xmanage/applyModuleAuditing',
      component: applyModuleAuditing,
    },
    {
      name: '在线客服',
      path: '/5xmanage/customerService',
      component: CustomerService,
    }, 
    {
      name: '权限管理',
      path: '/5xmanage/authManagement',
      component: authManagement
    }  
  ]

}

export default route
