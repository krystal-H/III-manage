(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1458:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return l}));var a=n(3),r=function(e){return a.c.request({url:"/manage-open/panel/template/getTemplateListByPage",data:e,method:"post",headers:{}})},o=function(e){return a.c.request({url:"/manage-open/panel/template/saveStandardPanel",method:"post",data:e,headers:{}})},i=function(e){return a.c.request({url:"/manage-open/physicalModel/list/deviceTypeId/".concat(e),method:"get"})},l=function(e){return a.c.request({url:"/manage-open/physicalModel/func/list",method:"post",data:e,headers:{}})}},1459:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"i",(function(){return l})),n.d(t,"g",(function(){return c})),n.d(t,"d",(function(){return u})),n.d(t,"h",(function(){return s})),n.d(t,"k",(function(){return d})),n.d(t,"l",(function(){return m})),n.d(t,"c",(function(){return p})),n.d(t,"a",(function(){return f})),n.d(t,"f",(function(){return y})),n.d(t,"j",(function(){return h}));var a=n(3),r="/manage-open",o=function(e){return a.c.request({url:r+"/module/search",method:"post",data:e,headers:{"Content-Type":"application/json"}})},i=function(e){return a.c.request({url:r+"/module/type/getAllModuleBrandList",method:"get"})},l=function(){return a.c.request({url:r+"/module/type/getList",method:"post",data:[],headers:{"Content-Type":"application/json"}})},c=function(){return a.c.request({url:r+"/module/type/getMenu",method:"get"})},u=function(e){return a.c.request({url:r+"/module/type/bindSceneType/list",params:{moduleId:e},method:"get"})},s=function(){return a.c.request({url:r+"/module/type/getMenu",method:"get"})},d=function(e){return a.c.request({url:r+"/module/create",method:"post",data:e,headers:{"Content-Type":"application/json"}})},m=function(e){return a.c.request({url:r+"/module/update",method:"post",data:e,headers:{"Content-Type":"application/json"}})},p=function(e,t){return a.c.request({url:r+"/module/type/release",params:{moduleId:e,releaseStatus:t},method:"get"})},f=function(e){return a.c.request({url:"".concat(r,"/module/delete/").concat(e),method:"get"})},y=function(e){return a.c.request({url:"".concat(r,"/module/detail/").concat(e)})},h=function(e){return a.c.request({url:"".concat(r,"/module/update/firmware"),method:"post",data:e,headers:{"Content-Type":"application/json"}})}},1513:function(e,t,n){},1514:function(e,t,n){},1515:function(e,t,n){},1516:function(e,t,n){},1556:function(e,t,n){"use strict";n.r(t);n(78),n(225);var a=n(0),r=n.n(a),o=n(40),i=(n(18),n(35),n(36),n(26),n(27),n(28),n(113),n(122),n(134),n(39),n(43),n(32),n(44),n(104),n(46)),l=(n(133),n(23)),c=(n(158),n(37)),u=(n(224),n(123)),s=(n(226),n(86)),d=(n(69),n(19)),m=(n(200),n(85)),p=n(114),f=n.n(p),y=(n(58),n(22),n(65),n(388),n(143),n(41),n(486)),h=n(97),b=(n(848),n(390)),g=(n(174),n(72)),v=(n(487),n(175)),E=c.a.Option,I={display:"block",height:"30px",lineHeight:"30px"};function O(e,t){var n=e.form,o=e.setStepCur,i=e.thirdCategoryList,u=e.editData,s=void 0===u?{}:u;e.opeType;Object(a.useImperativeHandle)(t,(function(){return{onFinish:d}}));var d=function(){n.validateFields((function(e,t){e||(console.log("Received values of form: ",t),o(1,t))}))},m=n.getFieldDecorator;return r.a.createElement(l.a,{labelCol:{span:10},wrapperCol:{span:14},onSubmit:function(){return d()}},r.a.createElement(l.a.Item,{label:"产品三级分类"},m("deviceTypeId",{initialValue:s.deviceTypeId,rules:[{required:!0,message:"请选择产品三级分类"}]})(r.a.createElement(c.a,{placeholder:"请选择产品三级分类",style:{width:220},showSearch:!0,optionFilterProp:"children",onChange:function(e){return function(e){sessionStorage.setItem("categoryId",e)}(e)}},i&&i.length>0&&i.map((function(e){return r.a.createElement(E,{key:e.deviceTypeId,value:e.deviceTypeId},e.deviceTypeName)}))))),r.a.createElement(l.a.Item,{label:"品类可支持方案"},m("type",{initialValue:s.type,rules:[{required:!0,message:"请选择品类可支持方案"}]})(r.a.createElement(v.a.Group,{onChange:function(e){return function(e){console.log("radio checked",e.target.value)}(e)}},r.a.createElement(v.a,{style:I,value:1},"免开发方案"),r.a.createElement(v.a,{style:I,value:2},"独立MCU方案"),r.a.createElement(v.a,{style:I,value:3},"Soc方案")))))}var j=l.a.create()(Object(a.forwardRef)(O)),w=(n(847),n(493)),S=(n(173),n(7)),T=(n(103),n(48)),k=n(33);function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var P=c.a.Option,F=T.a.TextArea;function L(e,t){var n=e.setStepCur,o=e.form,i=e.communicationMethodsList,s=e.editData,p=void 0===s?{}:s,f=e.opeType,y=x(Object(a.useState)([]),2),h=y[0],b=y[1],g=x(Object(a.useState)(!1),2),v=g[0],E=g[1];Object(a.useEffect)((function(){"edit"===f&&p.picture&&b([{url:p.picture,name:"简介图",uid:1}])}),[p]);var I=function(e){var t="image/jpeg"===e.type||"image/png"===e.type;t||u.a.error("只能上传JPG或者PNG格式");var n=e.name.length<=50;return n||u.a.error("文件名称长度不超过50个字符"),t&&n},O=function(){o.validateFields((function(e,t){e||(t.picture=h[0].url||"",console.log("Received values of form: ",t),n(2,t))}))};Object(a.useImperativeHandle)(t,(function(){return{onFinish:O}}),[h]);var j={action:k.j,className:"upload-list-inline",data:function(e){return{appId:31438,domainType:4}}},A=o.getFieldDecorator;o.getFieldValue;return r.a.createElement(l.a,{labelCol:{span:4},wrapperCol:{span:18}},r.a.createElement(l.a.Item,{label:"方案名称"},A("name",{initialValue:p.name,rules:[{required:!0,message:"请输入方案名称",whitespace:!0}]})(r.a.createElement(T.a,{placeholder:"请输入方案名称",maxLength:50}))),r.a.createElement(l.a.Item,{label:"通信协议",hasFeedback:!0},A("protocol",{initialValue:p.protocol,rules:[{required:!0,message:"请选择通信协议"}]})(r.a.createElement(c.a,{placeholder:"请选择通信协议",showSearch:!0,optionFilterProp:"children",onChange:function(e){return sessionStorage.setItem("communicationType",e)}},i&&i.map((function(e,t){return r.a.createElement(P,{value:e.moduleType,key:e.moduleType},e.moduleTypeName)}))))),r.a.createElement(l.a.Item,{label:"概况",hasFeedback:!0},A("summarize",{initialValue:p.summarize,rules:[{required:!0,message:"请输入概况"}]})(r.a.createElement(F,{rows:3,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(l.a.Item,{label:"特点",hasFeedback:!0},A("feature",{initialValue:p.feature,rules:[{required:!0,message:"请输入特点"}]})(r.a.createElement(F,{rows:3,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(l.a.Item,{label:"适合场景",hasFeedback:!0},A("illustrate",{initialValue:p.illustrate,rules:[{required:!0,message:"请输入适合场景"}]})(r.a.createElement(F,{rows:3,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(l.a.Item,{label:"简介图",extra:"支持格式：png、jpg 建议尺寸：134 * 188px",wrapperCol:{span:10}},A("picture",{initialValue:p.picture,rules:[{required:!0,message:"请上传简介图"}]})(r.a.createElement("div",null,r.a.createElement(w.a,C({},j,{listType:"picture",defaultFileList:"edit"===f?[{url:p.picture,name:"简介图",uid:1}]:[],onPreview:function(){return E(!0)},beforeUpload:function(){return I},accept:"image/png,image/jpeg",onChange:function(e){console.log("上传的info",e);var t=e.file;e.fileList;"done"===t.status?(b([{status:"done",name:t.name,url:t.response.data.url}]),o.setFieldsValue({picture:t.response.data.url})):"error"===t.status?(u.a.error("".concat(e.file.name," 上传失败")),b(""),o.setFieldsValue({picture:""})):(b(""),o.setFieldsValue({picture:""}))}}),h&&h.length>=1?null:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"上传文档";return r.a.createElement(d.a,null,r.a.createElement(S.a,{type:"upload"}),e)}("上传图片"))))),r.a.createElement(m.a,{visible:v,footer:null,onCancel:function(){return E(!1)}},r.a.createElement("img",{alt:"example",style:{width:"100%"},src:h&&h.length&&h[0].url})))}L=Object(a.forwardRef)(L);var R=l.a.create()(L),M=(n(307),n(161)),N=(n(227),n(159),n(308),n(1513),n(494)),q=n(1458);function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var z={r:"可上报",w:"可下发",rw:"可下发可上报"};function U(e,t){var n=e.form,o=e.commitAll,i=e.editData,u=void 0===i?{}:i,s=e.opeType,d=D(Object(a.useState)([]),2),m=d[0],p=d[1],f=D(Object(a.useState)([]),2),y=f[0],h=f[1],b=D(Object(a.useState)([]),2),g=b[0],v=b[1],E=D(Object(a.useState)([]),2),I=E[0],O=E[1],j=n.getFieldDecorator,w=(n.validateFields,[{title:"功能名称",dataIndex:"funcName",key:"funcName"},{title:"标识符",dataIndex:"funcIdentifier",key:"funcIdentifier"},{title:"数据传输类型",dataIndex:"funcParamList",key:"funcParamList",render:function(e){return r.a.createElement("span",null,e&&e[0].accessMode?z[e[0].accessMode]:"")}}]);Object(a.useImperativeHandle)(t,(function(){return{onFinish:S}}));var S=function(){n.validateFields((function(e,t){e||(console.log("Received values of form: ",t),t.moduleIds=t.moduleIds.join("#"),t.panelId=-1,o(t))}))},T=function(e){Object(N.a)({id:e}).then((function(e){e.data.data&&h(e.data.data)}))},k=function(){var e=sessionStorage.getItem("communicationType"),t=e==u.protocol?u.protocol.toString().split(""):e.split("");Object(N.b)(t).then((function(e){e.data.data&&v(e.data.data)}))};Object(a.useEffect)((function(){var e;"edit"===s&&u.deviceTypeId==sessionStorage.getItem("categoryId")?T(u.physicalModelId):(h([]),n.setFields({physicalModelId:""})),e=u.deviceTypeId==sessionStorage.getItem("categoryId")?u.deviceTypeId:sessionStorage.getItem("categoryId"),Object(N.c)(e).then((function(e){e.data.data&&p(e.data.data)}))}),[sessionStorage.getItem("categoryId")]),Object(a.useEffect)((function(){"edit"===s&&u.deviceTypeId==sessionStorage.getItem("communicationType")||(v([]),n.setFields({moduleIds:[]})),k()}),[sessionStorage.getItem("communicationType")]);var C,x,A;return Object(a.useEffect)((function(){var e;e={deviceTypeId:sessionStorage.getItem("categoryId")||u.deviceTypeId||"",templateName:"",pageIndex:1,pageRows:5},Object(q.a)(e).then((function(e){e.data.data&&O(e.data.data.list)}))}),[]),r.a.createElement("div",{className:"config-scheme-detail"},r.a.createElement(l.a,{labelCol:{span:3},wrapperCol:{span:19},onSubmit:function(){return S()}},r.a.createElement(l.a.Item,{label:"方案功能点"},j("physicalModelId",{initialValue:u.deviceTypeId==sessionStorage.getItem("categoryId")?u.physicalModelId:"",rules:[{required:!0,message:"请选择此三级品类关联的物模型"}]})(r.a.createElement(c.a,{placeholder:"请选择此三级品类关联的物模型",style:{width:250,marginBottom:10},showSearch:!0,optionFilterProp:"children",onChange:function(e){return function(e){T(e)}(e)}},m&&m.map((function(e){return r.a.createElement(c.a.Option,{value:e.id,key:e.id},e.name)})))),r.a.createElement(M.a,(C={className:"config-table",dataSource:y.standard,rowKey:"funcIdentifier",columns:w,pagination:!1,scroll:{y:140}},A=!1,(x="pagination")in C?Object.defineProperty(C,x,{value:A,enumerable:!0,configurable:!0,writable:!0}):C[x]=A,C))),I.length>0&&r.a.createElement(l.a.Item,{label:"方案控制面板"},"此三级品类关联的控制面板如下",r.a.createElement("div",{className:"control-panel-box"},I&&I.map((function(e){return r.a.createElement("div",{className:"panel-item",key:e.templateId},r.a.createElement("div",{className:"panel-item-pic"},r.a.createElement("img",{src:e.page1,alt:"pic"})),r.a.createElement("div",{className:"panel-item-tip"},e.templateName))})))),r.a.createElement(l.a.Item,{label:"对应模组"},j("moduleIds",{initialValue:u.protocol==sessionStorage.getItem("communicationType")?u.moduleIds.split("#").map((function(e){return e-0})):[],rules:[{required:!0,message:"请选择对应模组"}]})(r.a.createElement(c.a,{placeholder:"请选择对应支持模组",mode:"multiple",showSearch:!0,optionFilterProp:"children"},g&&g.map((function(e){return r.a.createElement(c.a.Option,{value:e.moduleId,key:e.moduleId},e.moduleName)})))))))}var $=l.a.create()(Object(a.forwardRef)(U));n(1514);function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){B(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function B(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function G(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return K(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return K(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var Q=g.a.TabPane,W=b.a.Step,X=["选择品类方案","配置方案简介","配置方案详情"];var Y=l.a.create()((function(e){var t=e.visible,n=e.handleOk,o=e.handleCancel,i=e.thirdCategoryList,l=e.communicationMethodsList,c=e.getTableData,s=e.opeType,p=e.editData,y=G(Object(a.useState)(0),2),h=y[0],v=y[1],E=Object(a.useRef)(),I=Object(a.useRef)(),O=Object(a.useRef)(),w=G(Object(a.useState)({one:{},two:{},three:{}}),2),S=w[0],T=w[1],k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;0===h?T((function(e){var n=f()(e);return n.one=f()(t),n})):1===h&&T((function(e){var n=f()(e);return n.two=f()(t),n})),v(e)};return r.a.createElement(m.a,{title:"edit"===s?"编辑":"新增",width:900,visible:t,onOk:n,onCancel:o,maskClosable:!1,wrapClassName:"add-scheme",footer:[0!==h&&r.a.createElement(d.a,{key:"previous",onClick:function(){v(h-1)}},"上一步"),r.a.createElement(d.a,{type:"primary",key:"next",onClick:function(){0===h?(console.log(E,"refScheme"),E.current.onFinish()):1===h?I.current.onFinish():2===h&&O.current.onFinish()}},2===h?"提交":"下一步")]},r.a.createElement("div",{className:"add-scheme-modal"},r.a.createElement("div",{className:"step-box"},r.a.createElement(b.a,{current:h},X.map((function(e,t){return r.a.createElement(W,{key:e,title:e})})))),r.a.createElement("div",{className:"formbox"},r.a.createElement(g.a,{activeKey:h+"",animated:!1},r.a.createElement(Q,{tab:"选择品类方案",key:"0"},r.a.createElement(j,{thirdCategoryList:i,wrappedComponentRef:E,setStepCur:k,editData:p,opeType:s})),r.a.createElement(Q,{tab:"配置方案简介",key:"1"},r.a.createElement(R,{communicationMethodsList:l,wrappedComponentRef:I,setStepCur:k,editData:p,opeType:s})),r.a.createElement(Q,{tab:"配置方案详情",key:"2"},r.a.createElement($,{wrappedComponentRef:O,setStepCur:k,commitAll:function(e){var t=J(J(J({},S.one),S.two),e);console.log(t),"edit"===s?(t.id=p.id,console.log(t),Object(N.j)(t).then((function(e){0===e.data.code&&(u.a.success("提交成功"),o(),c())}))):Object(N.h)(t).then((function(e){0===e.data.code&&(u.a.success("提交成功"),o(),c())}))},editData:p,opeType:s}))))))})),Z=n(1459),_=(n(311),n(71));n(1515);function ee(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return te(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return te(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var ne={1:"免开发方案",2:"独立MCU方案",3:"Soc方案"};var ae=function(e){var t=e.visible,n=e.handleOk,o=e.handleCancel,i=e.editData,l=void 0===i?{}:i,c=e.thirdCategoryList,u=e.communicationMethodsList,s=ee(Object(a.useState)(""),2),d=s[0],p=s[1],f=ee(Object(a.useState)([]),2),y=f[0],h=f[1],b=ee(Object(a.useState)([]),2),g=b[0],v=b[1],E=ee(Object(a.useState)([]),2),I=E[0],O=E[1];Object(a.useEffect)((function(){j(),w();var e=c.filter((function(e){return e.deviceTypeId==l.deviceTypeId}));p(e[0].deviceTypeName),u&&u.map((function(e){l.protocol==e.moduleType&&O(e.moduleTypeName)}))}),[l]);var j=function(){Object(N.c)(l.deviceTypeId).then((function(e){if(e.data.data){var t=e.data.data.filter((function(e){return e.id===l.physicalModelId}));h(t[0].name)}}))},w=function(){var e=l.protocol.toString().split("")||"";Object(N.b)(e).then((function(e){if(e.data.data){var t=[];l.moduleIds.split("#").forEach((function(n){e.data.data.forEach((function(e){n==e.moduleId&&t.push(e.moduleName)}))})),v(t.join(" , "))}}))};return r.a.createElement(m.a,{width:800,title:"查看方案",visible:t,onOk:n,onCancel:o,maskClosable:!1,wrapClassName:"view-scheme-modal"},r.a.createElement(_.a,{title:"品类方案",size:"small",column:4},r.a.createElement(_.a.Item,{label:"产品三级品类",span:2},d),r.a.createElement(_.a.Item,{label:"品类支持方案",span:2},ne[l.type]||"-")),r.a.createElement("br",null),r.a.createElement(_.a,{title:"方案简介",size:"small",column:1},r.a.createElement(_.a.Item,{label:"方案名称",span:2},l.name),r.a.createElement(_.a.Item,{label:"通信协议",span:2},I),r.a.createElement(_.a.Item,{label:"概述",span:2},l.summarize),r.a.createElement(_.a.Item,{label:"特点",span:2},l.feature),r.a.createElement(_.a.Item,{label:"适合场景",span:2},l.illustrate),r.a.createElement(_.a.Item,{label:"简介图"},r.a.createElement("div",{className:"desc-pic"},r.a.createElement("img",{src:l.picture,alt:"pic"})))),r.a.createElement("br",null),r.a.createElement(_.a,{title:"方案详情",size:"small",column:1},r.a.createElement(_.a.Item,{label:"方案物模型",span:2},y),r.a.createElement(_.a.Item,{label:"对应模组",span:2},g)))};n(1516);function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function oe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ie(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return le(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return le(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function le(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var ce=m.a.confirm,ue={1:"草稿",2:"已发布"},se={1:"免开发",2:"MCU方案",3:"Soc方案"};var de=l.a.create()((function(e){var t=e.form,n=ie(Object(a.useState)({pageIndex:1,pageRows:10}),2),o=n[0],m=n[1],p=ie(Object(a.useState)(0),2),b=p[0],g=p[1],v=ie(Object(a.useState)([]),2),E=v[0],I=v[1],O=ie(Object(a.useState)(!1),2),j=O[0],w=O[1],S=ie(Object(a.useState)(!1),2),T=S[0],k=S[1],C=ie(Object(a.useState)([]),2),x=C[0],A=C[1],P=t.getFieldDecorator,F=t.getFieldsValue,L=ie(Object(a.useState)({}),2),R=L[0],M=L[1],q=ie(Object(a.useState)(!1),2),D=q[0],V=q[1],z=ie(Object(a.useState)(!1),2),U=z[0],$=z[1],H=ie(Object(a.useState)(!1),2),J=H[0],B=H[1],G=[{title:"修改账号",dataIndex:"account",key:"account",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"品类",dataIndex:"deviceType",key:"deviceType",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"方案类型",dataIndex:"type",key:"type",render:function(e){return r.a.createElement("span",null,se[e]||"")}},{title:"方案名称",dataIndex:"name",key:"name",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"status",key:"status",render:function(e){return r.a.createElement("span",{style:{color:"".concat(["","green","gray"][e])}},ue[e])}},{title:"更新时间",dataIndex:"updateTime",key:"updateTime",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"操作",dataIndex:"productId",key:"operation",width:180,render:function(e,t){return r.a.createElement("div",null,K(t))}}],K=function(e){return(2===e.status?[{title:"查看",icon:"info",key:"view"}]:[{title:"发布",icon:"cloud-upload",key:"release"},{title:"编辑",icon:"edit",key:"edit"}]).map((function(t,n){return Q(t,e)}))},Q=function(e,t){return r.a.createElement(s.a,{key:e.key,placement:"top",title:e.title},r.a.createElement(d.a,{style:{marginLeft:"10px"},shape:"circle",size:"small",icon:e.icon,key:e.templateId,onClick:function(){return X(e,t)}}))},W=function(e,t){Object(N.e)({id:e}).then((function(e){e.data.data?(B(e.data.data),sessionStorage.setItem("categoryId",e.data.data.deviceTypeId),sessionStorage.setItem("communicationType",e.data.data.protocol),"view"===t?V(!0):$(!0)):u.a.warning("返回数据不存在")}))},X=function(e,t){switch(console.log(e.key),e.key){case"release":ce({title:"发布方案",content:"确认发布后，方案信息将会同步到开放平台,确定要这样做吗？",okText:"确定",cancelText:"取消",onOk:function(){_(t)},onCancel:function(){}});break;case"view":W(t.id,"view");break;case"edit":W(t.id,"edit")}},_=function(e){Object(N.g)({id:e.id}).then((function(e){0===e.data.code&&(u.a.success("发布成功"),te())}))},ee=function(){1===o.pageIndex?te():m({pageIndex:1,pageRows:10})},te=function(){w(!0);var e=F(),t=e.deviceTypeId,n=e.status,a=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?re(Object(n),!0).forEach((function(t){oe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({deviceTypeId:t||"",status:n||""},o);Object(N.i)(a).then((function(e){0===e.data.code&&(I(e.data.data.list),g(e.data.data.pager.totalRows))})).finally((function(){w(!1)}))};return Object(a.useEffect)((function(){te()}),[o.pageRows,o.pageIndex]),Object(a.useEffect)((function(){Object(N.f)({}).then((function(e){A(e.data.data)})),Object(Z.h)().then((function(e){M(e.data.data)})),sessionStorage.removeItem("categoryId"),sessionStorage.removeItem("communicationType")}),[]),r.a.createElement("div",{className:"schemeList"},r.a.createElement(y.a,{title:"方案信息导入"},r.a.createElement(l.a,{layout:"inline",className:"schemeList-form"},r.a.createElement("div",null,r.a.createElement(l.a.Item,{label:"三级品类"},P("deviceTypeId")(r.a.createElement(c.a,{allowClear:!0,style:{width:240},placeholder:"搜索产品品类",showSearch:!0,optionFilterProp:"children"},x&&x.length>0&&x.map((function(e){return r.a.createElement(c.a.Option,{key:e.deviceTypeId,value:e.deviceTypeId},e.deviceTypeName)}))))),r.a.createElement(l.a.Item,{label:"状态"},P("status")(r.a.createElement(c.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(ue).map((function(e,t){return r.a.createElement(c.a.Option,{key:t,value:+e},ue[e])}))))),r.a.createElement(l.a.Item,null,r.a.createElement(d.a,{type:"primary",onClick:function(){return ee()}},"查询")),r.a.createElement(l.a.Item,null,r.a.createElement(d.a,{onClick:function(){return t.resetFields(),void ee()}},"重置"))),r.a.createElement("div",null,r.a.createElement(l.a.Item,null,r.a.createElement(d.a,{type:"primary",onClick:function(){return k(!0)}},"新增"))))),r.a.createElement(i.a,null,r.a.createElement(h.a,{rowKey:"id",columns:G,dataSource:E,pager:o,loading:j,pagination:{defaultCurrent:1,current:o.pageIndex,onChange:function(e,t){m((function(n){var a=f()(n);return Object.assign(a,{pageIndex:t===o.pageRows?e:1,pageRows:t})}))},pageSize:o.pageRows,total:b,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return r.a.createElement("span",null,"共 ",r.a.createElement("a",null,b)," 条")}}})),T&&r.a.createElement(Y,{opeType:"add",visible:T,thirdCategoryList:x,communicationMethodsList:R.moduleTypeList,getTableData:te,handleOk:function(){return k(!1)},handleCancel:function(){return k(!1)}}),U&&r.a.createElement(Y,{opeType:"edit",editData:J,visible:U,thirdCategoryList:x,communicationMethodsList:R.moduleTypeList,getTableData:te,handleOk:function(){return $(!1)},handleCancel:function(){return $(!1)}}),D&&r.a.createElement(ae,{visible:D,editData:J,thirdCategoryList:x,communicationMethodsList:R.moduleTypeList,handleOk:function(){return V(!1)},handleCancel:function(){return V(!1)}}))}));t.default=function(e){var t=e.match;return r.a.createElement(o.Switch,null,r.a.createElement(o.Route,{path:"".concat(t.url,"/list"),component:de}),r.a.createElement(o.Redirect,{from:"".concat(t.url,"/"),to:"".concat(t.url,"/list")}))}}}]);