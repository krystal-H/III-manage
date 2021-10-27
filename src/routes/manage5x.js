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

const route = {
  icon: "setting",
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
      component: panelMagement,
    },    
  ]

}

export default route
