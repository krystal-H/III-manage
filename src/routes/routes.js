import configdata from './configdata'
import businessdata from './businessdata'
import businessop from './businessop'
//import dataAnalysis from './dataAnalysis'
import setting from './setting'
import manage5x from './manage5x'
import sceneManage from './sceneManage'

import Home from '../pages/home/Home'
import Exception403 from '../pages/exception/403'
import Exception404 from '../pages/exception/404'
import Exception500 from '../pages/exception/500'
// 消息列表
import Message from '../pages/message/Message';
import MessageContent from '../pages/message/MessageContent';



//该路由配置表会在加载的时候读取，遍历路由配置，自动添加到路由表

const routes =[
  /* 配置数据 */
  configdata,
  /* 业务数据 */
  businessdata,
  /* 产品业务 */
  businessop,
  /* 数据分析 */
  //dataAnalysis,
  /* 系统设置 */
  setting,
  // 5.x管理
  manage5x,
  // 场景管理
  sceneManage,
  /* 其他 */
  {
    name: '消息管理',
    path:'/message',
    component: Message,
    meta:{
      hideInMenu: true, //该路由不会显示在侧边栏
    },
  },
  {
    name: '异常管理',
    path:'/exception',
    meta:{
      hideInMenu: true, //该路由不会显示在侧边栏
    },
    routes:[
      {
        name: '403',
        path: '/exception/403',
        component: Exception403,
        meta:{
          hideInMenu: true, //该路由不会显示在侧边栏
        }
      },
      {
        name: '404',
        path: '/exception/404',
        component: Exception404,
        meta:{
          hideInMenu: true, //该路由不会显示在侧边栏
        }
      },
      {
        name: '500',
        path: '/exception/500',
        component: Exception500,
        meta:{
          hideInMenu: true, //该路由不会显示在侧边栏
        }
      }
    ]
  },
  // {
  //   component:Home,
  //   path:'/home',
  //   meta:{
  //     hideInMenu: true, //该路由不会显示在侧边栏
  //   }
  // },
]

export { routes }
