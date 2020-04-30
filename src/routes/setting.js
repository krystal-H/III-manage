import asyncComponent from '../lazy'

const SubAccount = asyncComponent(() => import( /* webpackChunkName: "setting" */ '../pages/setting/subAccount'))
const RoleManage = asyncComponent(() => import( /* webpackChunkName: "setting" */ '../pages/setting/roleManage'))

const route = {
  icon: "setting",
  name: '系统设置',
  path: '/setting',
  redirect: '/setting/subaccount',
  routes: [{
      name: '子账号管理',
      path: '/setting/subaccount',
      component: SubAccount
    },
    {
      name: '角色管理',
      path: '/setting/rolemanage',
      component: RoleManage
    },
  ]

}

export default route
