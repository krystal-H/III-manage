
import asyncComponent from '../lazy'

const CustomMethod  = asyncComponent( () => import (/* webpackChunkName: "businessop" */ "../pages/businessop/custom-method"))
const ApiPublish = asyncComponent( () => import (/* webpackChunkName: "businessop" */ '../pages/businessop/api-publish'))
const ProductAudit = asyncComponent( () => import (/* webpackChunkName: "businessop" */  '../pages/businessop/productAudit'))
const ServiceAudit = asyncComponent( () => import (/* webpackChunkName: "businessop" */ '../pages/businessop/serverAudit'))
const SceneAudit = asyncComponent( () => import (/* webpackChunkName: "businessop" */ '../pages/businessop/sceneAudit'))
const UserAudit = asyncComponent( () => import (/* webpackChunkName: "businessop" */ '../pages/businessop/userAudit'))
const NoticeManage = asyncComponent( () => import (/* webpackChunkName: "businessop" */ '../pages/businessop/noticeManage'))

const route = {
  icon:'bank',
  name:'业务运营',
  path:'/businessop',
  redirect:'/businessop/productaudit',
  routes:[
    {
      name:'产品审核',
      path:'/businessop/productaudit',
      component: ProductAudit
    },
    {
      name:'APP控制服务审核',
      path:'/businessop/serviceAudit',
      component: ServiceAudit,
    },
	{
      name:'场景服务审核',
      path:'/businessop/sceneAudit',
      component: SceneAudit,
    },
	{
      name:'用户审核',
      path:'/businessop/userAudit',
      component: UserAudit,
    },
    {
      name:'API发布',
      path:'/businessop/apiPublish',
      component: ApiPublish,
    },
    {
      name:'自定义统计方法审核',
      path:'/businessop/customMethod',
      component: CustomMethod,
    },
    {
      name: '消息管理',
      path:'/businessop/noticeManage',
      component: NoticeManage
    }
  ]
}

export default route
