import asyncComponent from '../lazy'
import OpenApiList from '../pages/configdata/openApiConfig/OpenApiList'
import OpenApiListDetail from '../pages/configdata/openApiConfig/openApiDetail'
import CreateOpenApi from '../pages/configdata/openApiConfig/createOpenApi'

const ProductCategory = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/poductCategory/ProductCategory'))
const ModuleManagerList = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/moduleManager/ModuleManagerList'))
const AddModule = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/moduleManager/AddModule'))
const H5TemplateList = asyncComponent(() => import( /* webpackChunkName: "configdata" */ "../pages/configdata/H5Template/H5TemplateList"))
const H5TemplateInfo = asyncComponent(() => import( /* webpackChunkName: "configdata" */ "../pages/configdata/H5Template/H5TemplateInfo"))
const ProtocolTemplate = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/protocolTemplate/ProtocolTemplateList'))
const ProtocolTemplateEdit = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/protocolTemplate/ProtocolTemplateEdit'))
const DataDictManager = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/dataDict/DataDictManager'))
const DataDictManagerEdit = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/dataDict/DataDicManagerEdit'))
const ProtocolManager = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/protocolDic/protocolDicManager'))
const PositionModel = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/positionModel'))
const ProjectManage = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/projectManage'))
const MacAllocation = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/macAllocation'))
const InterfaceRole = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/interfaceRole'))
const InterfaceUser = asyncComponent( () => import(/* webpackChunkName: "businessdata" */ '../pages/configdata/interfaceUser'));

const ProtocolTag = asyncComponent(() => import(/* webpackChunkName: "businessdata" */ '../pages/configdata/protocolTag/TagList'));

const VoiceAudit = asyncComponent(() => import('../pages/configdata/voiceAudit'))

/* add by lcp at 2019-10-12 09:57 */
//const DataCollection = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/dataCollection'))
//const LogSearch = asyncComponent(() => import( /* webpackChunkName: "configdata" */ '../pages/configdata/logSearch'))


const route = {
  icon: 'unordered-list',
  name: '配置数据',
  path: '/config',
  redirect: '/config/ProductCategory',
  routes: [{
      name: '产品类目',
      path: '/config/ProductCategory',
      component: ProductCategory,
    },
    {
      name: '模组管理',
      path: '/config/ModuleManager',
      redirect: '/config/ModuleManager/list',
      routes: [{
          name: '模组列表',
          path: '/config/ModuleManager/list',
          component: ModuleManagerList,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: '添加模组',
          path: '/config/ModuleManager/add',
          component: AddModule,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: '编辑模组',
          path: '/config/ModuleManager/edit/:moduleId',
          component: AddModule,
          meta: {
            hideInMenu: true,
          }
        },
      ]
    },
    {
      name: 'H5模板',
      path: '/config/h5template',
      redirect: '/config/h5template/list',
      routes: [{
          name: 'H5模板列表',
          path: '/config/h5template/list',
          component: H5TemplateList,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
        {
          name: '模板基本信息',
          path: '/config/h5template/info/:templateId',
          component: H5TemplateInfo,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
      ]
    },

    {
      name: '协议模板',
      path: '/config/protocoltemplate',
      redirect: '/config/protocoltemplate/list',
      routes: [{
          name: '协议模板编辑',
          path: '/config/protocoltemplate/edit/:templateNumber',
          component: ProtocolTemplateEdit,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
        {
          name: '协议模板新增',
          path: '/config/protocoltemplate/add',
          component: ProtocolTemplateEdit,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
        {
          name: '协议模板列表',
          path: '/config/protocoltemplate/list',
          component: ProtocolTemplate,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        }
      ]
    },
    // {
    //   name:'免开发产品',
    //   path:'/config/devfreep'
    // },
    /*{
      name: '数据采集管理',
      path: '/config/datacollection',
      component: DataCollection,
    },
    {
      name: '日志数据查询',
      path: '/config/logSearch',
      component: LogSearch,
    },*/
    {
      name: '物标签',
      path: '/config/protocoltag',
      component: ProtocolTag
    },
    {
      name: '协议字典',
      path: '/config/protocoldic',
      component: ProtocolManager
    },
    {
      name: '数据字典',
      path: '/config/datadic',
      redirect: '/config/datadic/list',
      routes: [{
          name: '数据字典列表',
          path: '/config/datadic/list',
          component: DataDictManager,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
        {
          name: '数据字典新增',
          path: '/config/datadic/add',
          component: DataDictManagerEdit,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
        {
          name: '数据字典编辑',
          path: '/config/datadic/edit/:paramId',
          component: DataDictManagerEdit,
          meta: {
            hideInMenu: true, //该路由不会显示在侧边栏
          }
        },
      ]
    },
    {
      name: '位置数据模型',
      path: '/config/positionmodel',
      component: PositionModel,
    },
    {
      name: '项目管理',
      path: '/config/projectManage',
      component: ProjectManage,
    },
    {
      name: '和而泰MAC分配',
      path: '/config/macallo',
      component: MacAllocation,
    },
    {
      name: 'B端OpenAPI配置',
      path: '/config/openApiConfig',
      redirect: '/config/openApiConfig/list',
      routes: [{
          name: 'B端OpenApi配置列表',
          path: '/config/openApiConfig/list',
          component: OpenApiList,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: 'B端OpenApi详情',
          path: '/config/openApiConfig/info/:detail',
          component: OpenApiListDetail,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: '新增OpenApi配置',
          path: '/config/openApiConfig/create',
          component: CreateOpenApi,
          meta: {
            hideInMenu: true,
          }
        },
      ]
    },
    {
      name: '接口访问用户角色',
      path: '/config/interfaceRole',
      component: InterfaceRole
    },
    {
      name: '接口访问用户',
      path: '/config/interfaceUser',
      component: InterfaceUser
    },
    {
      name: '语音方案审核',
      path: '/config/voiceAudit',
      component: VoiceAudit
    }
  ]
}

export default route
