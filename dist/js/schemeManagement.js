(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1378:function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"d",function(){return o}),a.d(t,"c",function(){return i}),a.d(t,"b",function(){return c});var n=a(4),r=function(e){return n.c.request({url:"/manage-open/panel/template/getTemplateListByPage",data:e,method:"post",headers:{}})},o=function(e){return n.c.request({url:"/manage-open/panel/template/saveStandardPanel",method:"post",data:e,headers:{}})},i=function(e){return n.c.request({url:"/manage-open/physicalModel/list/deviceTypeId/".concat(e),method:"get"})},c=function(e){return n.c.request({url:"/manage-open/physicalModel/func/list",method:"post",data:e,headers:{}})}},1379:function(e,t,a){"use strict";a.d(t,"b",function(){return o}),a.d(t,"e",function(){return i}),a.d(t,"i",function(){return c}),a.d(t,"g",function(){return l}),a.d(t,"d",function(){return u}),a.d(t,"h",function(){return s}),a.d(t,"k",function(){return d}),a.d(t,"l",function(){return m}),a.d(t,"c",function(){return p}),a.d(t,"a",function(){return f}),a.d(t,"f",function(){return y}),a.d(t,"j",function(){return h});var n=a(4),r="/manage-open",o=function(e){return n.c.request({url:r+"/module/search",method:"post",data:e,headers:{"Content-Type":"application/json"}})},i=function(e){return n.c.request({url:r+"/module/type/getAllModuleBrandList",method:"get"})},c=function(){return n.c.request({url:r+"/module/type/getList",method:"post",data:[],headers:{"Content-Type":"application/json"}})},l=function(){return n.c.request({url:r+"/module/type/getMenu",method:"get"})},u=function(e){return n.c.request({url:r+"/module/type/bindSceneType/list",params:{moduleId:e},method:"get"})},s=function(){return n.c.request({url:r+"/module/type/getMenu",method:"get"})},d=function(e){return n.c.request({url:r+"/module/create",method:"post",data:e,headers:{"Content-Type":"application/json"}})},m=function(e){return n.c.request({url:r+"/module/update",method:"post",data:e,headers:{"Content-Type":"application/json"}})},p=function(e,t){return n.c.request({url:r+"/module/type/release",params:{moduleId:e,releaseStatus:t},method:"get"})},f=function(e){return n.c.request({url:"".concat(r,"/module/delete/").concat(e),method:"get"})},y=function(e){return n.c.request({url:"".concat(r,"/module/detail/").concat(e)})},h=function(e){return n.c.request({url:"".concat(r,"/module/update/firmware"),method:"post",data:e,headers:{"Content-Type":"application/json"}})}},1446:function(e,t,a){},1447:function(e,t,a){},1448:function(e,t,a){},1449:function(e,t,a){},1492:function(e,t,a){"use strict";a.r(t);a(99),a(246);var n=a(0),r=a.n(n),o=a(110),i=(a(94),a(38)),c=(a(143),a(33)),l=(a(189),a(75)),u=(a(244),a(134)),s=(a(213),a(82)),d=(a(72),a(22)),m=(a(212),a(91)),p=a(1333),f=a.n(p),y=(a(66),a(23),a(63),a(441),a(166),a(37),a(36),a(26),a(28),a(29),a(19),a(35),a(34),a(39),a(32),a(40),a(439)),h=a(92),g=(a(812),a(347)),v=(a(281),a(100)),b=(a(442),a(169)),E=l.a.Option,I={display:"block",height:"30px",lineHeight:"30px"};var O=c.a.create()(Object(n.forwardRef)(function(e,t){var a=e.form,o=e.setStepCur,i=e.thirdCategoryList,u=e.editData,s=void 0===u?{}:u;e.opeType,Object(n.useImperativeHandle)(t,function(){return{onFinish:d}});var d=function(){a.validateFields(function(e,t){e||(console.log("Received values of form: ",t),o(1,t))})},m=a.getFieldDecorator;return r.a.createElement(c.a,{labelCol:{span:10},wrapperCol:{span:14},onSubmit:function(){return d()}},r.a.createElement(c.a.Item,{label:"产品三级分类"},m("deviceTypeId",{initialValue:s.deviceTypeId,rules:[{required:!0,message:"请选择产品三级分类"}]})(r.a.createElement(l.a,{placeholder:"请选择产品三级分类",style:{width:220},showSearch:!0,optionFilterProp:"children",onChange:function(e){return function(e){sessionStorage.setItem("categoryId",e)}(e)}},i&&i.length>0&&i.map(function(e){return r.a.createElement(E,{key:e.deviceTypeId,value:e.deviceTypeId},e.deviceTypeName)})))),r.a.createElement(c.a.Item,{label:"品类可支持方案"},m("type",{initialValue:s.type,rules:[{required:!0,message:"请选择品类可支持方案"}]})(r.a.createElement(b.a.Group,{onChange:function(e){return function(e){console.log("radio checked",e.target.value)}(e)}},r.a.createElement(b.a,{style:I,value:1},"免开发方案"),r.a.createElement(b.a,{style:I,value:2},"独立MCU方案"),r.a.createElement(b.a,{style:I,value:3},"Soc方案")))))})),w=(a(1335),a(1334)),j=(a(167),a(10)),S=(a(122),a(58)),T=(a(440),a(31));function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var x=l.a.Option,P=S.a.TextArea;function F(e,t){var a=e.setStepCur,o=e.form,i=e.communicationMethodsList,s=e.editData,p=void 0===s?{}:s,f=e.opeType,y=C(Object(n.useState)([]),2),h=y[0],g=y[1],v=C(Object(n.useState)(!1),2),b=v[0],E=v[1];Object(n.useEffect)(function(){"edit"===f&&p.picture&&g([{url:p.picture,name:"简介图",uid:1}])},[p]);var I=function(e){var t="image/jpeg"===e.type||"image/png"===e.type;t||u.a.error("只能上传JPG或者PNG格式");var a=e.name.length<=50;return a||u.a.error("文件名称长度不超过50个字符"),t&&a},O=function(){o.validateFields(function(e,t){e||(t.picture=h[0].url||"",console.log("Received values of form: ",t),a(2,t))})};Object(n.useImperativeHandle)(t,function(){return{onFinish:O}},[h]);var F={action:T.j,className:"upload-list-inline",data:function(e){return{appId:31438,domainType:4}}},L=o.getFieldDecorator;o.getFieldValue;return r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18}},r.a.createElement(c.a.Item,{label:"方案名称"},L("name",{initialValue:p.name,rules:[{required:!0,message:"请输入方案名称",whitespace:!0}]})(r.a.createElement(S.a,{placeholder:"请输入方案名称",maxLength:50}))),r.a.createElement(c.a.Item,{label:"通信协议",hasFeedback:!0},L("protocol",{initialValue:p.protocol,rules:[{required:!0,message:"请选择通信协议"}]})(r.a.createElement(l.a,{placeholder:"请选择通信协议",showSearch:!0,optionFilterProp:"children",onChange:function(e){return sessionStorage.setItem("communicationType",e)}},i&&i.map(function(e,t){return r.a.createElement(x,{value:e.moduleType,key:e.moduleType},e.moduleTypeName)})))),r.a.createElement(c.a.Item,{label:"概况",hasFeedback:!0},L("summarize",{initialValue:p.summarize,rules:[{required:!0,message:"请输入概况"}]})(r.a.createElement(P,{rows:3,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(c.a.Item,{label:"特点",hasFeedback:!0},L("feature",{initialValue:p.feature,rules:[{required:!0,message:"请输入特点"}]})(r.a.createElement(P,{rows:3,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(c.a.Item,{label:"适合场景",hasFeedback:!0},L("illustrate",{initialValue:p.illustrate,rules:[{required:!0,message:"请输入适合场景"}]})(r.a.createElement(P,{rows:3,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(c.a.Item,{label:"简介图",extra:"支持格式：png、jpg 建议尺寸：134 * 188px",wrapperCol:{span:10}},L("picture",{initialValue:p.picture,rules:[{required:!0,message:"请上传简介图"}]})(r.a.createElement("div",null,r.a.createElement(w.a,k({},F,{listType:"picture",defaultFileList:"edit"===f?[{url:p.picture,name:"简介图",uid:1}]:[],onPreview:function(){return E(!0)},beforeUpload:function(){return I},accept:"image/png,image/jpeg",onChange:function(e){console.log("上传的info",e);var t=e.file;e.fileList;"done"===t.status?(g([{status:"done",name:t.name,url:t.response.data.url}]),o.setFieldsValue({picture:t.response.data.url})):"error"===t.status?(u.a.error("".concat(e.file.name," 上传失败")),g(""),o.setFieldsValue({picture:""})):(g(""),o.setFieldsValue({picture:""}))}}),h&&h.length>=1?null:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"上传文档";return r.a.createElement(d.a,null,r.a.createElement(j.a,{type:"upload"}),e)}("上传图片"))))),r.a.createElement(m.a,{visible:b,footer:null,onCancel:function(){return E(!1)}},r.a.createElement("img",{alt:"example",style:{width:"100%"},src:h&&h.length&&h[0].url})))}F=Object(n.forwardRef)(F);var L=c.a.create()(F),N=(a(282),a(155)),q=(a(340),a(245),a(283),a(1446),a(447)),R=a(1378);function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var M={r:"可上报",w:"可下发",rw:"可下发可上报"};var V=c.a.create()(Object(n.forwardRef)(function(e,t){var a=e.form,o=e.commitAll,i=e.editData,u=void 0===i?{}:i,s=e.opeType,d=D(Object(n.useState)([]),2),m=d[0],p=d[1],f=D(Object(n.useState)([]),2),y=f[0],h=f[1],g=D(Object(n.useState)([]),2),v=g[0],b=g[1],E=D(Object(n.useState)([]),2),I=E[0],O=E[1],w=a.getFieldDecorator,j=(a.validateFields,[{title:"功能名称",dataIndex:"funcName",key:"funcName"},{title:"标识符",dataIndex:"funcIdentifier",key:"funcIdentifier"},{title:"数据传输类型",dataIndex:"funcParamList",key:"funcParamList",render:function(e){return r.a.createElement("span",null,e&&e[0].accessMode?M[e[0].accessMode]:"")}}]);Object(n.useImperativeHandle)(t,function(){return{onFinish:C}});var S,T,k,C=function(){a.validateFields(function(e,t){e||(console.log("Received values of form: ",t),t.moduleIds=t.moduleIds.join("#"),t.panelId=-1,o(t))})},x=function(e){Object(q.a)({id:e}).then(function(e){e.data.data&&h(e.data.data)})},P=function(){var e=sessionStorage.getItem("communicationType"),t=e==u.protocol?u.protocol.toString().split(""):e.split("");Object(q.b)(t).then(function(e){e.data.data&&b(e.data.data)})};return Object(n.useEffect)(function(){var e;"edit"===s&&u.deviceTypeId==sessionStorage.getItem("categoryId")?x(u.physicalModelId):(h([]),a.setFields({physicalModelId:""})),e=u.deviceTypeId==sessionStorage.getItem("categoryId")?u.deviceTypeId:sessionStorage.getItem("categoryId"),Object(q.c)(e).then(function(e){e.data.data&&p(e.data.data)})},[sessionStorage.getItem("categoryId")]),Object(n.useEffect)(function(){"edit"===s&&u.deviceTypeId==sessionStorage.getItem("communicationType")?P():(b([]),a.setFields({moduleIds:[]}),P())},[sessionStorage.getItem("communicationType")]),Object(n.useEffect)(function(){var e;e={deviceTypeId:sessionStorage.getItem("categoryId")||u.deviceTypeId||"",templateName:"",pageIndex:1,pageRows:5},Object(R.a)(e).then(function(e){e.data.data&&O(e.data.data.list)})},[]),r.a.createElement("div",{className:"config-scheme-detail"},r.a.createElement(c.a,{labelCol:{span:3},wrapperCol:{span:19},onSubmit:function(){return C()}},r.a.createElement(c.a.Item,{label:"方案功能点"},w("physicalModelId",{initialValue:u.deviceTypeId==sessionStorage.getItem("categoryId")?u.physicalModelId:"",rules:[{required:!0,message:"请选择此三级品类关联的物模型"}]})(r.a.createElement(l.a,{placeholder:"请选择此三级品类关联的物模型",style:{width:250,marginBottom:10},showSearch:!0,optionFilterProp:"children",onChange:function(e){return function(e){x(e)}(e)}},m&&m.map(function(e){return r.a.createElement(l.a.Option,{value:e.id,key:e.id},e.name)}))),r.a.createElement(N.a,(S={className:"config-table",dataSource:y.standard,rowKey:"funcIdentifier",columns:j,pagination:!1,scroll:{y:140}},k=!1,(T="pagination")in S?Object.defineProperty(S,T,{value:k,enumerable:!0,configurable:!0,writable:!0}):S[T]=k,S))),I.length>0&&r.a.createElement(c.a.Item,{label:"方案控制面板"},"此三级品类关联的控制面板如下",r.a.createElement("div",{className:"control-panel-box"},I&&I.map(function(e){return r.a.createElement("div",{className:"panel-item",key:e.templateId},r.a.createElement("div",{className:"panel-item-pic"},r.a.createElement("img",{src:e.page1,alt:"pic"})),r.a.createElement("div",{className:"panel-item-tip"},e.templateName))}))),r.a.createElement(c.a.Item,{label:"对应模组"},w("moduleIds",{initialValue:u.protocol==sessionStorage.getItem("communicationType")?u.moduleIds.split("#").map(function(e){return e-0}):[],rules:[{required:!0,message:"请选择对应模组"}]})(r.a.createElement(l.a,{placeholder:"请选择对应支持模组",mode:"multiple",showSearch:!0,optionFilterProp:"children"},v&&v.map(function(e){return r.a.createElement(l.a.Option,{value:e.moduleId,key:e.moduleId},e.moduleName)}))))))}));a(1447);function A(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?A(a,!0).forEach(function(t){H(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):A(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function H(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var U=v.a.TabPane,B=g.a.Step,G=["选择品类方案","配置方案简介","配置方案详情"];var K=c.a.create()(function(e){var t=e.visible,a=e.handleOk,o=e.handleCancel,i=e.thirdCategoryList,c=e.communicationMethodsList,l=e.getTableData,s=e.opeType,p=e.editData,y=J(Object(n.useState)(0),2),h=y[0],b=y[1],E=Object(n.useRef)(),I=Object(n.useRef)(),w=Object(n.useRef)(),j=J(Object(n.useState)({one:{},two:{},three:{}}),2),S=j[0],T=j[1],k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;0===h?T(function(e){var a=f()(e);return a.one=f()(t),a}):1===h&&T(function(e){var a=f()(e);return a.two=f()(t),a}),b(e)};return r.a.createElement(m.a,{title:"edit"===s?"编辑":"新增",width:900,visible:t,onOk:a,onCancel:o,maskClosable:!1,wrapClassName:"add-scheme",footer:[0!==h&&r.a.createElement(d.a,{key:"previous",onClick:function(){b(h-1)}},"上一步"),r.a.createElement(d.a,{type:"primary",key:"next",onClick:function(){0===h?(console.log(E,"refScheme"),E.current.onFinish()):1===h?I.current.onFinish():2===h&&w.current.onFinish()}},2===h?"提交":"下一步")]},r.a.createElement("div",{className:"add-scheme-modal"},r.a.createElement("div",{className:"step-box"},r.a.createElement(g.a,{current:h},G.map(function(e,t){return r.a.createElement(B,{key:e,title:e})}))),r.a.createElement("div",{className:"formbox"},r.a.createElement(v.a,{activeKey:h+"",animated:!1},r.a.createElement(U,{tab:"选择品类方案",key:"0"},r.a.createElement(O,{thirdCategoryList:i,wrappedComponentRef:E,setStepCur:k,editData:p,opeType:s})),r.a.createElement(U,{tab:"配置方案简介",key:"1"},r.a.createElement(L,{communicationMethodsList:c,wrappedComponentRef:I,setStepCur:k,editData:p,opeType:s})),r.a.createElement(U,{tab:"配置方案详情",key:"2"},r.a.createElement(V,{wrappedComponentRef:w,setStepCur:k,commitAll:function(e){var t=z(z(z({},S.one),S.two),e);console.log(t),"edit"===s?(t.id=p.id,console.log(t),Object(q.j)(t).then(function(e){0===e.data.code&&(u.a.success("提交成功"),o(),l())})):Object(q.h)(t).then(function(e){0===e.data.code&&(u.a.success("提交成功"),o(),l())})},editData:p,opeType:s}))))))}),Q=a(1379),W=(a(287),a(65));a(1448);function X(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Y={1:"免开发方案",2:"独立MCU方案",3:"Soc方案"};var Z=function(e){var t=e.visible,a=e.handleOk,o=e.handleCancel,i=e.editData,c=void 0===i?{}:i,l=e.thirdCategoryList,u=e.communicationMethodsList,s=X(Object(n.useState)(""),2),d=s[0],p=s[1],f=X(Object(n.useState)([]),2),y=f[0],h=f[1],g=X(Object(n.useState)([]),2),v=g[0],b=g[1],E=X(Object(n.useState)([]),2),I=E[0],O=E[1];Object(n.useEffect)(function(){w(),j();var e=l.filter(function(e){return e.deviceTypeId==c.deviceTypeId});p(e[0].deviceTypeName),u&&u.map(function(e){c.protocol==e.moduleType&&O(e.moduleTypeName)})},[c]);var w=function(){Object(q.c)(c.deviceTypeId).then(function(e){if(e.data.data){var t=e.data.data.filter(function(e){return e.id===c.physicalModelId});h(t[0].name)}})},j=function(){var e=c.protocol.toString().split("")||"";Object(q.b)(e).then(function(e){if(e.data.data){var t=[];c.moduleIds.split("#").forEach(function(a){e.data.data.forEach(function(e){a==e.moduleId&&t.push(e.moduleName)})}),b(t.join(" , "))}})};return r.a.createElement(m.a,{width:800,title:"查看方案",visible:t,onOk:a,onCancel:o,maskClosable:!1,wrapClassName:"view-scheme-modal"},r.a.createElement(W.a,{title:"品类方案",size:"small",column:4},r.a.createElement(W.a.Item,{label:"产品三级品类",span:2},d),r.a.createElement(W.a.Item,{label:"品类支持方案",span:2},Y[c.type]||"-")),r.a.createElement("br",null),r.a.createElement(W.a,{title:"方案简介",size:"small",column:1},r.a.createElement(W.a.Item,{label:"方案名称",span:2},c.name),r.a.createElement(W.a.Item,{label:"通信协议",span:2},I),r.a.createElement(W.a.Item,{label:"概述",span:2},c.summarize),r.a.createElement(W.a.Item,{label:"特点",span:2},c.feature),r.a.createElement(W.a.Item,{label:"适合场景",span:2},c.illustrate),r.a.createElement(W.a.Item,{label:"简介图"},r.a.createElement("div",{className:"desc-pic"},r.a.createElement("img",{src:c.picture,alt:"pic"})))),r.a.createElement("br",null),r.a.createElement(W.a,{title:"方案详情",size:"small",column:1},r.a.createElement(W.a.Item,{label:"方案物模型",span:2},y),r.a.createElement(W.a.Item,{label:"对应模组",span:2},v)))};a(1449);function $(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function _(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function ee(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var te=m.a.confirm,ae={1:"草稿",2:"已发布"},ne={1:"免开发",2:"MCU方案",3:"Soc方案"};var re=c.a.create()(function(e){var t=e.form,a=ee(Object(n.useState)({pageIndex:1,pageRows:10}),2),o=a[0],m=a[1],p=ee(Object(n.useState)(0),2),g=p[0],v=p[1],b=ee(Object(n.useState)([]),2),E=b[0],I=b[1],O=ee(Object(n.useState)(!1),2),w=O[0],j=O[1],S=ee(Object(n.useState)(!1),2),T=S[0],k=S[1],C=ee(Object(n.useState)([]),2),x=C[0],P=C[1],F=t.getFieldDecorator,L=t.getFieldsValue,N=ee(Object(n.useState)({}),2),R=N[0],D=N[1],M=ee(Object(n.useState)(!1),2),V=M[0],A=M[1],z=ee(Object(n.useState)(!1),2),H=z[0],J=z[1],U=ee(Object(n.useState)(!1),2),B=U[0],G=U[1],W=[{title:"修改账号",dataIndex:"account",key:"account",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"品类",dataIndex:"deviceType",key:"deviceType",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"方案类型",dataIndex:"type",key:"type",render:function(e){return r.a.createElement("span",null,ne[e]||"")}},{title:"方案名称",dataIndex:"name",key:"name",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"status",key:"status",render:function(e){return r.a.createElement("span",{style:{color:"".concat(["","green","gray"][e])}},ae[e])}},{title:"更新时间",dataIndex:"updateTime",key:"updateTime",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"操作",dataIndex:"productId",key:"operation",width:180,render:function(e,t){return r.a.createElement("div",null,X(t))}}],X=function(e){return(2===e.status?[{title:"查看",icon:"info",key:"view"}]:[{title:"发布",icon:"cloud-upload",key:"release"},{title:"编辑",icon:"edit",key:"edit"}]).map(function(t,a){return Y(t,e)})},Y=function(e,t){return r.a.createElement(s.a,{key:e.key,placement:"top",title:e.title},r.a.createElement(d.a,{style:{marginLeft:"10px"},shape:"circle",size:"small",icon:e.icon,key:e.templateId,onClick:function(){return oe(e,t)}}))},re=function(e,t){Object(q.e)({id:e}).then(function(e){e.data.data?(G(e.data.data),sessionStorage.setItem("categoryId",e.data.data.deviceTypeId),sessionStorage.setItem("communicationType",e.data.data.protocol),"view"===t?A(!0):J(!0)):u.a.warning("返回数据不存在")})},oe=function(e,t){switch(console.log(e.key),e.key){case"release":te({title:"发布方案",content:"确认发布后，方案信息将会同步到开放平台,确定要这样做吗？",okText:"确定",cancelText:"取消",onOk:function(){ie(t)},onCancel:function(){}});break;case"view":re(t.id,"view");break;case"edit":re(t.id,"edit")}},ie=function(e){Object(q.g)({id:e.id}).then(function(e){0===e.data.code&&(u.a.success("发布成功"),le())})},ce=function(){1===o.pageIndex?le():m({pageIndex:1,pageRows:10})},le=function(){j(!0);var e=L(),t=e.deviceTypeId,a=e.status,n=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?$(a,!0).forEach(function(t){_(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):$(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({deviceTypeId:t||"",status:a||""},o);Object(q.i)(n).then(function(e){0===e.data.code&&(I(e.data.data.list),v(e.data.data.pager.totalRows))}).finally(function(){j(!1)})};return Object(n.useEffect)(function(){le()},[o.pageRows,o.pageIndex]),Object(n.useEffect)(function(){Object(q.f)({}).then(function(e){P(e.data.data)}),Object(Q.h)().then(function(e){D(e.data.data)}),sessionStorage.removeItem("categoryId"),sessionStorage.removeItem("communicationType")},[]),r.a.createElement("div",{className:"schemeList"},r.a.createElement(y.a,{title:"方案信息导入"},r.a.createElement(c.a,{layout:"inline",className:"schemeList-form"},r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"三级品类"},F("deviceTypeId")(r.a.createElement(l.a,{allowClear:!0,style:{width:240},placeholder:"搜索产品品类",showSearch:!0,optionFilterProp:"children"},x&&x.length>0&&x.map(function(e){return r.a.createElement(l.a.Option,{key:e.deviceTypeId,value:e.deviceTypeId},e.deviceTypeName)})))),r.a.createElement(c.a.Item,{label:"状态"},F("status")(r.a.createElement(l.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(ae).map(function(e,t){return r.a.createElement(l.a.Option,{key:t,value:+e},ae[e])})))),r.a.createElement(c.a.Item,null,r.a.createElement(d.a,{type:"primary",onClick:function(){return ce()}},"查询")),r.a.createElement(c.a.Item,null,r.a.createElement(d.a,{onClick:function(){return t.resetFields(),void ce()}},"重置"))),r.a.createElement("div",null,r.a.createElement(c.a.Item,null,r.a.createElement(d.a,{type:"primary",onClick:function(){return k(!0)}},"新增"))))),r.a.createElement(i.a,null,r.a.createElement(h.a,{rowKey:"id",columns:W,dataSource:E,pager:o,loading:w,pagination:{defaultCurrent:1,current:o.pageIndex,onChange:function(e,t){m(function(a){var n=f()(a);return Object.assign(n,{pageIndex:t===o.pageRows?e:1,pageRows:t})})},pageSize:o.pageRows,total:g,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return r.a.createElement("span",null,"共 ",r.a.createElement("a",null,g)," 条")}}})),T&&r.a.createElement(K,{opeType:"add",visible:T,thirdCategoryList:x,communicationMethodsList:R.moduleTypeList,getTableData:le,handleOk:function(){return k(!1)},handleCancel:function(){return k(!1)}}),H&&r.a.createElement(K,{opeType:"edit",editData:B,visible:H,thirdCategoryList:x,communicationMethodsList:R.moduleTypeList,getTableData:le,handleOk:function(){return J(!1)},handleCancel:function(){return J(!1)}}),V&&r.a.createElement(Z,{visible:V,editData:B,thirdCategoryList:x,communicationMethodsList:R.moduleTypeList,handleOk:function(){return A(!1)},handleCancel:function(){return A(!1)}}))});t.default=function(e){var t=e.match;return r.a.createElement(o.d,null,r.a.createElement(o.b,{path:"".concat(t.url,"/list"),component:re}),r.a.createElement(o.a,{from:"".concat(t.url,"/"),to:"".concat(t.url,"/list")}))}}}]);