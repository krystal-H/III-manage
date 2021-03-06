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
  name: '????????????',
  path: '/config',
  redirect: '/config/ProductCategory',
  routes: [{
      name: '????????????',
      path: '/config/ProductCategory',
      component: ProductCategory,
    },
    {
      name: '????????????',
      path: '/config/ModuleManager',
      redirect: '/config/ModuleManager/list',
      routes: [{
          name: '????????????',
          path: '/config/ModuleManager/list',
          component: ModuleManagerList,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: '????????????',
          path: '/config/ModuleManager/add',
          component: AddModule,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: '????????????',
          path: '/config/ModuleManager/edit/:moduleId',
          component: AddModule,
          meta: {
            hideInMenu: true,
          }
        },
      ]
    },
    {
      name: 'H5??????',
      path: '/config/h5template',
      redirect: '/config/h5template/list',
      routes: [{
          name: 'H5????????????',
          path: '/config/h5template/list',
          component: H5TemplateList,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
        {
          name: '??????????????????',
          path: '/config/h5template/info/:templateId',
          component: H5TemplateInfo,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
      ]
    },

    {
      name: '????????????',
      path: '/config/protocoltemplate',
      redirect: '/config/protocoltemplate/list',
      routes: [{
          name: '??????????????????',
          path: '/config/protocoltemplate/edit/:templateNumber',
          component: ProtocolTemplateEdit,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
        {
          name: '??????????????????',
          path: '/config/protocoltemplate/add',
          component: ProtocolTemplateEdit,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
        {
          name: '??????????????????',
          path: '/config/protocoltemplate/list',
          component: ProtocolTemplate,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        }
      ]
    },
    // {
    //   name:'???????????????',
    //   path:'/config/devfreep'
    // },
    /*{
      name: '??????????????????',
      path: '/config/datacollection',
      component: DataCollection,
    },
    {
      name: '??????????????????',
      path: '/config/logSearch',
      component: LogSearch,
    },*/
    {
      name: '?????????',
      path: '/config/protocoltag',
      component: ProtocolTag
    },
    {
      name: '????????????',
      path: '/config/protocoldic',
      component: ProtocolManager
    },
    {
      name: '????????????',
      path: '/config/datadic',
      redirect: '/config/datadic/list',
      routes: [{
          name: '??????????????????',
          path: '/config/datadic/list',
          component: DataDictManager,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
        {
          name: '??????????????????',
          path: '/config/datadic/add',
          component: DataDictManagerEdit,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
        {
          name: '??????????????????',
          path: '/config/datadic/edit/:paramId',
          component: DataDictManagerEdit,
          meta: {
            hideInMenu: true, //?????????????????????????????????
          }
        },
      ]
    },
    {
      name: '??????????????????',
      path: '/config/positionmodel',
      component: PositionModel,
    },
    {
      name: '????????????',
      path: '/config/projectManage',
      component: ProjectManage,
    },
    {
      name: '?????????MAC??????',
      path: '/config/macallo',
      component: MacAllocation,
    },
    {
      name: 'B???OpenAPI??????',
      path: '/config/openApiConfig',
      redirect: '/config/openApiConfig/list',
      routes: [{
          name: 'B???OpenApi????????????',
          path: '/config/openApiConfig/list',
          component: OpenApiList,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: 'B???OpenApi??????',
          path: '/config/openApiConfig/info/:detail',
          component: OpenApiListDetail,
          meta: {
            hideInMenu: true,
          }
        },
        {
          name: '??????OpenApi??????',
          path: '/config/openApiConfig/create',
          component: CreateOpenApi,
          meta: {
            hideInMenu: true,
          }
        },
      ]
    },
    {
      name: '????????????????????????',
      path: '/config/interfaceRole',
      component: InterfaceRole
    },
    {
      name: '??????????????????',
      path: '/config/interfaceUser',
      component: InterfaceUser
    },
    {
      name: '??????????????????',
      path: '/config/voiceAudit',
      component: VoiceAudit
    }
  ]
}

export default route
