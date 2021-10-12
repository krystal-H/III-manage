import asyncComponent from '../lazy'

// 方案管理
const schemeManagement = asyncComponent(() => import( /* webpackChunkName: "schemeManagement" */ '../pages/5xmanage/schemeManagement'))

// 免开发上传固件管理
const FirmwareMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/firmwareMagement'))

// 工单管理
const orderMagement = asyncComponent(() => import( /* webpackChunkName: "FirmwareMagement" */ '../pages/5xmanage/repairOrder'))

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
      name: '工单管理',
      path: '/5xmanage/repairOrder',
      component: orderMagement,
    },
    {
      name: 'banner管理'
    },
    {
      name: '物模型管理'
    },
    {
      name: '标准面板管理'
    },
    {
      name: '模组&固件管理'
    },
    
  ]

}

export default route
