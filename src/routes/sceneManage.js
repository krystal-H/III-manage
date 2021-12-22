import asyncComponent from '../lazy'

// 场景库管理
const SceneLibManage = asyncComponent(() => import('../pages/sceneManage/sceneLibManage'))

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
      name: '场景列表',
      // todo
    },
    {
      name: '场景配置',
      // todo
    }
  ]
}

export default route
