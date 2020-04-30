const fs = require('fs');
const path = require('path');

function fromJSONFile(filename) {
  console.log('filename',filename);
  return (req, res) => {
    const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}.json`)).toString();
    const json = JSON.parse(data);
    return res.json(json);
  };
}

// 文档 ： https://github.com/jaywcjlove/mocker-api
const proxy = {
  // 数据订阅
  'GET /v1/web/manage-open/data/push/config/getList' : fromJSONFile('/dataObserver/dataObserver'),
  'GET /v1/web/manage-open/data/push/config/stop': (req, res) => {
    return res.json({
      code: 0,
    });
  },
  'GET /v1/web/manage-open/data/push/config/get': fromJSONFile('/dataObserver/dataObserverDetail'),

  'GET /v1/web/manage-open/data/push/config/getLabelList': fromJSONFile('/dataObserver/dataObserverLabelList'),
  'GET /v1/web/manage-open/data/push/config/getProductByLabelIds': fromJSONFile('/dataObserver/dataObserverProductInfoList'),
  // 'GET /app/product/example': fromJSONFile('example'),
  'GET /v1/web/manage/product/deviceCategory/allList':fromJSONFile('/product/deviceCategory'),
  'GET /v1/web/open/apiInfo/getOpenApiList': fromJSONFile('/api-publish/apiList'),
  'GET /v1/web/open/apiInfo/changeState': fromJSONFile('/api-publish/changeState'),
  'GET /v1/web/open/apiInfo/getOpenApiDetail': fromJSONFile('/api-publish/get'),
  'GET /v1/web/open/dimension/getDimensionDetail': fromJSONFile('/api-publish/getDimension'),
  'GET /v1/web/open/dimension/saveDimensionIndex': fromJSONFile('/api-publish/saveDimensionIndex'),
  'GET /v1/web/open/apiInfo/saveOpenApi': fromJSONFile('/api-publish/addAndUpdate'),
  'GET /product/getList': fromJSONFile('/product/getList'),
  'GET /product/get': fromJSONFile('/product/get'),
  'GET /product/getServer': fromJSONFile('/product/getServer'),
  // 真实接口path  对应mock文件夹+对应json文件路径
  'GET /v1/web/manage-open/module/type/getPage': fromJSONFile('/moduleManager/moduleList'),
  'GET /v1/web/manage-open/module/type/getAllModuleBrandList': fromJSONFile('/moduleManager/getAllModuleBrandList'),
  'GET /v1/web/manage-open/module/type/release': fromJSONFile('/moduleManager/moduleRelease'),
  'GET /v1/web/manage-open/module/type/delete': fromJSONFile('/moduleManager/deleteModule'),
  'GET /v1/web/manage-open/product/baseType/getList' : fromJSONFile('/moduleManager/getCommuicationMethod'),
  'GET /v1/web/manage-open/module/type/bindSceneType/list' : fromJSONFile('/moduleManager/bindSceneList'),
  'GET /v1/web/manage-open/module/type/get' : fromJSONFile('/moduleManager/getModuleInfo'),
  'GET /v1/web/manage-open/openapi/getPage' : fromJSONFile('/openApiConfig/getOpenApiList'),
  'GET /v1/web/manage-open/openapi/getUserInfo' : fromJSONFile('/openApiConfig/getUserInfo'),
  'GET /v1/web/manage-open/openapi/getLabelList' : fromJSONFile('/openApiConfig/getLabelList'),
  'GET /v1/web/manage-open/common/user/getGroupMenuList' : fromJSONFile('/openApiConfig/getGroupMenuList'),
  /* 自定义统计方法 start */
  'GET /v1/web/manage-open/stats/customApi/getMethodList' : fromJSONFile('/custom-method/getMethodList'),
  'GET /v1/web/manage-open/stats/customApi/getMethodDeail' : fromJSONFile('/custom-method/getMethodDetail'),
  'POST /v1/web/manage-open/stats/customApi/auditOperation': (req, res) => {
    return res.json({
      code: 0,
    });
  },
  /* 自定义统计方法 end */
  'POST /v1/web/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: "sdfsdfsdfdsf",
        data: {
          id: 1,
          username: 'kenny',
          sex: 6
        }
      });
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
  },
  'POST /v1/web/open/labelInfo/saveStaticLabel': (req, res) => {
    return res.json({
      code: 0,
    });
  },
};

module.exports = proxy;
