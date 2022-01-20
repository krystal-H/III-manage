import asyncComponent from '../lazy'

// 场景库管理
const SceneLibManage = asyncComponent(() => import('../pages/sceneManage/sceneLibManage'))

const SceneList = asyncComponent(() => import('../pages/sceneManage/sceneList'))
const SceneLog = asyncComponent(() => import('../pages/sceneManage/sceneList/SceneLog'))
const SceneConfig = asyncComponent(() => import('../pages/sceneManage/sceneConfig'))
const SceneConfigInfo = asyncComponent(() => import('../pages/sceneManage/sceneConfig/info'))
const route = {
  icon: "apartment",
  name: '场景管理',
  path: '/sceneMgt',
  redirect: '/sceneMgt/sceneLibManage',
  routes: [
    {
      name: '场景库管理',
      path: '/sceneMgt/sceneLibManage',
      component: SceneLibManage,
    },
    {
      name: '场景配置',
      path: '/sceneMgt/sceneConfig',
      redirect: '/sceneMgt/sceneConfig/list',
      routes: [{
        name: '场景配置',
        path: '/sceneMgt/sceneConfig/list',
        component: SceneConfig,
        meta: {
          hideInMenu: true,
        }
      },
      {
        name: '场景详情',
        path: '/sceneMgt/sceneConfig/detail',
        component: SceneConfigInfo,
        meta: {
          hideInMenu: true,
        }
      },
      ]
    },
    {
      name: '场景列表',
      path: '/sceneMgt/sceneList',
      redirect: '/sceneMgt/sceneList/list',
      routes: [{
        name: '场景列表',
        path: '/sceneMgt/sceneList/list',
        component: SceneList,
        meta: {
          hideInMenu: true,
        }
      },
      {
        name: '场景日志',
        path: '/sceneMgt/sceneList/log',
        component: SceneLog,
        meta: {
          hideInMenu: true,
        }
      },
      ]
    },


  ]
}

export default route
