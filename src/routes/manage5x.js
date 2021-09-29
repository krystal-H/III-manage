import asyncComponent from '../lazy'

// 方案管理
const schemeManagement = asyncComponent(() => import( /* webpackChunkName: "schemeManagement" */ '../pages/5xmanage/schemeManagement'))
const AddScheme = asyncComponent(() => import( /* webpackChunkName: "schemeManagement" */ '../pages/5xmanage/schemeManagement/addScheme'))

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
      path: '/5xmanage/firmwareMagement',
      redirect: '/5xmanage/firmwareMagement/list',
      routes: [{
        name: '固件列表',
        path: '/5xmanage/firmwareMagement/list',
        component: FirmwareMagement,
        meta: {
          hideInMenu: true, //该路由不会显示在侧边栏
        }
      },
      ]
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
    {
      name: '工单管理',
      path: '/5xmanage/repairOrder',
      component: orderMagement,
    },
  ]

}

export default route
