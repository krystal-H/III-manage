(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1516:function(e,t,a){},1517:function(e,t,a){},1518:function(e,t,a){},1519:function(e,t,a){},1542:function(e,t,a){"use strict";a.r(t);a(99),a(258);var n=a(0),r=a.n(n),i=a(58),l=(a(18),a(36),a(37),a(27),a(29),a(30),a(198),a(256),a(38),a(35),a(41),a(33),a(42),a(100),a(40)),c=(a(143),a(34)),o=(a(128),a(60)),u=(a(257),a(137)),m=(a(222),a(83)),s=(a(74),a(20)),d=(a(221),a(91)),p=(a(197),a(77)),f=a(1395),y=a.n(f),g=(a(66),a(118),a(220),a(21),a(67),a(470),a(168),a(469)),v=a(92),b=a(3),h=function(e){return b.c.request({url:"/expert/scene/condition/option/getPage",params:e,method:"get"})},E=function(e){return b.c.request({url:"/expert/scene/condition/getPageList",params:e,method:"get"})},I=function(e){return b.c.request({url:"/expert/combine/deviceType/list/v2.0",params:e,method:"get"})},O=function(e){return b.c.request({url:"/expert/scene/ai/getPageList/v2.0",params:e,method:"get"})};a(1516);function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function k(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return q(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return q(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var N=o.a.TextArea;var C=c.a.create()((function(e){var t=e.form,a=e.visible,i=e.handleOk,l=e.handleCancel,m=e.conditionTypeDetailData,s=void 0===m?{}:m,p=t.getFieldDecorator,f=w(Object(n.useState)(!1),2),y=f[0],g=f[1];return r.a.createElement(d.a,{title:"添加/编辑条件类型",width:800,visible:a,onOk:function(){t.validateFields((function(e,t){if(!e){g(!0);var a=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(Object(a),!0).forEach((function(t){k(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},t);Object.keys(s).length>0&&(a.conditionOptionId=s.conditionOptionId),function(e){return b.c.request({url:"/expert/scene/condition/option/addOrUpdate",data:e,method:"post",needFormData:!0,headers:{"Content-Type":"application/x-www-form-urlencoded"}})}(a).then((function(e){0===e.data.code&&(u.a.success("提交成功"),i())})).finally((function(){return g(!1)}))}}))},onCancel:l,maskClosable:!1,confirmLoading:y,wrapClassName:"module-add-scheme"},r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18},autoComplete:"off"},r.a.createElement(c.a.Item,{label:"条件类型名称"},p("conditionOptionName",{initialValue:s.conditionOptionName,rules:[{required:!0,message:"请输入条件类型名称",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入条件类型名称"}))),r.a.createElement(c.a.Item,{label:"备注"},p("comments",{initialValue:s.comments,rules:[{required:!0,message:"请输入备注",whitespace:!0}]})(r.a.createElement(N,{maxLength:100,autoSize:{minRows:5,maxRows:5}})))))})),j=(a(1400),a(1403)),x=(a(169),a(7));a(1408),a(1517);function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function L(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return V(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var A=p.a.Option,D=[];var F=c.a.create()((function(e){var t=e.form,a=e.visible,i=e.handleOk,l=e.handleCancel,m=e.conditionDicDetailData,f=void 0===m?{}:m,g=e.dicConditionType,v=void 0===g?[]:g,h=e.unitList,E=void 0===h?[]:h,I=t.getFieldDecorator,O=t.getFieldValue,P=S(Object(n.useState)(!1),2),k=P[0],w=P[1],q=S(Object(n.useState)(""),2),N=q[0],C=q[1];Object(n.useEffect)((function(){Object.keys(f).length&&C(f.paramStyleId+"")}),[Object.keys(f).length]),Object.keys(f).length&&"2"===N&&(D=-1!==f.queryParams[0].queryParamName.indexOf("[")?[]:y()(f.queryParams)),I("queryParams",{initialValue:D});var V=O("queryParams").map((function(e,a){return r.a.createElement("div",{className:"inline-form-item2",key:a},r.a.createElement(c.a.Item,{label:"名称",labelCol:{span:6}},I("configList[".concat(a,"].queryParamName"),{initialValue:e.queryParamName,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入名称"}]})(r.a.createElement(o.a,{placeholder:"请输入名称"}))),Object.keys(f).length>0&&r.a.createElement(c.a.Item,{label:"",style:{display:"none"}},I("configList[".concat(a,"].queryParamId"),{initialValue:e.queryParamId})(r.a.createElement(o.a,{style:{display:"none"}}))),"    ",r.a.createElement(c.a.Item,{label:"数值",labelCol:{span:6}},I("configList[".concat(a,"].queryParamValue"),{initialValue:e.queryParamValue,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入数值"},{pattern:/^\d+$/,message:"请输入非负整数"}]})(r.a.createElement(o.a,{placeholder:"请输入数值"}))),r.a.createElement("div",{className:"delete-btn"},"  ",r.a.createElement(x.a,{key:a,type:"minus-circle-o",onClick:function(){return function(e){var a=O("queryParams"),n=O("configList");t.setFieldsValue({queryParams:a.filter((function(t,a){return a!==e})),configList:n.filter((function(t,a){return a!==e}))})}(a)}}),"  (*非负整数)"))}));return r.a.createElement(d.a,{title:"添加/编辑条件字典",width:800,visible:a,onOk:function(){t.validateFields((function(e,t){if(!e){w(!0),console.log("values",t);var a=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach((function(t){L(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},t);"1"===N?(a.queryParams=[{queryParamName:t.rangArr1,queryParamValue:t.rangArr2}],delete a.rangArr1,delete a.rangArr2,Object.keys(f).length&&(a.queryParams[0].queryParamId=f.queryParams[0].queryParamId,a.statusQueryId=f.statusQueryId,a.conditionId=f.conditionId)):"2"===N&&(a.queryParams=y()(t.configList),delete a.configList,Object.keys(f).length>0&&(a.statusQueryId=f.statusQueryId,a.conditionId=f.conditionId,a.queryParams=a.queryParams.map((function(e){var t={};return e.queryParamId&&(t.queryParamId=e.queryParamId),t.queryParamName=e.queryParamName,t.queryParamValue=e.queryParamValue,t})))),console.log("add-data",a),function(e){return b.c.request({url:"/expert/scene/condition/addOrUpdate",data:e,method:"post",headers:{"Content-Type":"application/json"}})}(a).then((function(e){0===e.data.code&&(u.a.success("提交成功"),i())})).finally((function(){return w(!1)}))}}))},onCancel:l,maskClosable:!1,confirmLoading:k,wrapClassName:"condition-dic-modal"},r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18},autoComplete:"off"},r.a.createElement(c.a.Item,{label:"条件字典名称"},I("conditionName",{initialValue:f.conditionName,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入条件字典名称",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入条件字典名称"}))),r.a.createElement(c.a.Item,{label:"条件类型"},I("conditionOptionId",{initialValue:f.conditionOptionId?f.conditionOptionId+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择条件类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择条件类型"},v&&v.map((function(e){return r.a.createElement(A,{key:e.conditionOptionId,value:e.conditionOptionId+""},e.conditionOptionName)}))))),r.a.createElement(c.a.Item,{label:"变化频率"},I("frequency",{initialValue:f.frequency||0===f.frequency?f.frequency+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入变化频率",whitespace:!0}]})(r.a.createElement(j.a,{min:0,placeholder:"请输入变化频率",style:{width:448}})),r.a.createElement("span",{className:"ant-form-text"},"小时(*非负整数)")),r.a.createElement(c.a.Item,{label:"参数单位"},I("unitId",{initialValue:f.unitId?f.unitId+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择参数单位",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择参数单位"},E&&E.map((function(e){return r.a.createElement(A,{key:e.unitId,value:e.unitId+""},e.unitName)}))))),r.a.createElement(c.a.Item,{label:"条件字典key"},I("dataKey",{initialValue:f.dataKey,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入条件字典key",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入条件字典key"}))),r.a.createElement(c.a.Item,{label:"类型"},I("paramStyleId",{initialValue:f.paramStyleId?f.paramStyleId+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择类型",onChange:function(e){console.log("change"),C(e)}},r.a.createElement(A,{value:"1"},"范围"),r.a.createElement(A,{value:"2"},"枚举")))),"1"===N&&r.a.createElement("div",{className:"rang-style"},r.a.createElement(c.a.Item,{label:""},I("rangArr1",{initialValue:f.queryParams?Array.isArray(JSON.parse(f.queryParams[0].queryParamName))?JSON.parse(f.queryParams[0].queryParamName)[0]+"":f.queryParams[0].queryParamName:"",validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?a():a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:159,marginRight:10}}))),r.a.createElement("div",{className:"short-line"},"-"),r.a.createElement(c.a.Item,{label:""},I("rangArr2",{initialValue:f.queryParams?Array.isArray(JSON.parse(f.queryParams[0].queryParamName))?JSON.parse(f.queryParams[0].queryParamName)[1]+"":f.queryParams[0].queryParamName:"",validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?t&&Number(O("rangArr1"))<Number(t)?a():a("填写整数且后者大于前者"):a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:196,marginRight:10}}))),r.a.createElement("div",{className:"tip"},"(*填写整数且后者大于前者)")),"2"===N&&r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"设置参数"},r.a.createElement(s.a,{type:"dashed",onClick:function(){return e=O("queryParams").concat({}),void t.setFieldsValue({queryParams:e});var e},style:{width:"100%"}},r.a.createElement(x.a,{type:"plus"})," 新  增")),V)))}));a(1518);function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return R(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var U=d.a.confirm;var $=function(e){var t=e.visible,a=e.handleOk,i=e.handleCancel,l=e.sceneProductDetail,o=void 0===l?{}:l,u=B(Object(n.useState)([]),2),m=u[0],s=u[1],p=B(Object(n.useState)([]),2),f=p[0],y=p[1];Object(n.useEffect)((function(){v(),g()}),[]);var g=function(){var e;(e={deviceTypeId:o.deviceTypeId},b.c.request({url:"/expert/deviceType/deviceFunction/list",params:e,method:"get"})).then((function(e){0===e.data.code&&s(e.data.data)}))},v=function(){var e;(e={deviceTypeId:o.deviceTypeId},b.c.request({url:"/expert/deviceType/statusQuery/list",params:e,method:"get"})).then((function(e){0===e.data.code&&y(e.data.data)}))},h=function(e,t){U({content:"是否确定删除本条数据？",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){"func"===t&&E(e),"status"===t&&I(e)},onCancel:function(){}})},E=function(e){var t;(t={deviceFunctionId:e.deviceFunctionId},b.c.request({url:"/expert/deviceType/deviceFunction/delete",params:t,method:"get"})).then((function(e){0===e.data.code&&g()}))},I=function(e){var t;(t={statusQueryId:e.statusQueryId},b.c.request({url:"/expert/deviceType/statusQuery/delete",params:t,method:"get"})).then((function(e){0===e.data.code&&v()}))};return r.a.createElement(d.a,{title:"查看详情",width:800,visible:t,onOk:a,onCancel:i,maskClosable:!1,wrapClassName:"scene-porduct-modal"},r.a.createElement("div",{className:"scene-porduct-modal-it"},r.a.createElement("div",{className:"title",style:{paddingTop:0}},"基本属性"),r.a.createElement(c.a,{labelAlign:"left"},r.a.createElement(c.a.Item,{label:"设备大类"},2===o.level?o.parent.deviceTypeName:3===o.level?o.grand.deviceTypeName:""),r.a.createElement(c.a.Item,{label:"设备小类"},2===o.level?o.deviceTypeName:3===o.level?o.parent.deviceTypeName:""),r.a.createElement(c.a.Item,{label:"输入输出类型"},o.inoutType.inoutTypeName),r.a.createElement(c.a.Item,{label:"安全级别"},o.securityLevel.securityLevelName),r.a.createElement(c.a.Item,{label:"设备场景自定义"},1===o.customizable?"是":"否")),r.a.createElement("div",{className:"title"},"扩展功能"),r.a.createElement("div",{className:"func-box"},r.a.createElement("div",{className:"func-box-title"},"状态查询："),r.a.createElement("div",{className:"func-box-cont"},f&&f.map((function(e,t){return r.a.createElement("div",{key:e.statusQueryId},r.a.createElement("div",null,"功能",t+1,"：",e.statusQueryName),r.a.createElement("div",{className:"func-params"},r.a.createElement("div",{className:"func-params-title"},"功能参数:"),r.a.createElement("div",{className:"func-params-box"},e.queryParams&&e.queryParams.map((function(e){return r.a.createElement("div",{key:e.queryParamId,className:"func-params-cont"},e.queryParamName,"：",e.queryParamValue)})),r.a.createElement("div",{className:"delete-btn",onClick:function(){return h(e,"status")}},"删除"))))})))),r.a.createElement("div",{className:"func-box"},r.a.createElement("div",{className:"func-box-title"},"功能控制："),r.a.createElement("div",{className:"func-box-cont"},m&&m.map((function(e,t){return r.a.createElement("div",{key:e.deviceFunctionId},r.a.createElement("div",null,"功能",t+1,"：",e.deviceFunctionName),r.a.createElement("div",{className:"func-params"},r.a.createElement("div",{className:"func-params-title"},"功能参数:"),r.a.createElement("div",{className:"func-params-box"},e.functionParams&&e.functionParams.map((function(e){return r.a.createElement("div",{key:e.functionParamId,className:"func-params-cont"},e.functionParamName,"：",e.functionParamValue)})),r.a.createElement("div",{className:"delete-btn",onClick:function(){return h(e,"func")}},"删除"))))}))))))};a(830),a(1519);function Q(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return J(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return J(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var M=o.a.TextArea,_=p.a.Option,K=0,G=0;var H=c.a.create()((function(e){var t=e.form,a=e.visible,i=e.handleCancel,l=e.handleOk,m=e.aiAbilityDetail,f=void 0===m?{}:m,y=t.getFieldDecorator,g=t.getFieldValue,v=z(Object(n.useState)(!1),2),h=v[0],E=v[1],I=z(Object(n.useState)([]),2),O=I[0],P=I[1],k=z(Object(n.useState)([]),2),w=k[0],q=k[1];Object(n.useEffect)((function(){Object.keys(f).length>0&&(f.aiInParamList&&f.aiInParamList.forEach((function(e){1==e.type&&(e.enums=e.enums.map((function(e){return K++,{name:e.name,value:e.value,uniquekey:K}})))})),P(f.aiInParamList),f.aiOutParamList&&f.aiOutParamList.forEach((function(e){1==e.type&&(e.enums=e.enums.map((function(e){return G++,{name:e.name,value:e.value,uniquekey_2:G}})))})),q(f.aiOutParamList))}),[f]);var N=function(e){return e.map((function(e){return"1"==e.type&&e.enums?(e.enums=e.enums.filter((function(e){return e})),e):e}))},C=function(e,a,n){y("innerList".concat(a),{initialValue:n.enums||[]});var i=g("innerList".concat(a));return console.log("innerList",i),[i.map((function(n,i){return r.a.createElement("div",{className:"inline-form-item2",key:i},r.a.createElement(c.a.Item,{label:"名称",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey,"].name"),{initialValue:n.name,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入名称"}]})(r.a.createElement(o.a,{placeholder:"请输入名称"}))),r.a.createElement(c.a.Item,{label:"数值",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey,"].value"),{initialValue:n.value,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入数值"},{pattern:/^\d+$/,message:"请输入非负整数"}]})(r.a.createElement(o.a,{placeholder:"请输入数值"}))),r.a.createElement("div",{className:"delete-btn"},"  ",r.a.createElement(x.a,{key:i,type:"minus-circle-o",onClick:function(){return function(e,a){var n,r=g("innerList".concat(e)),i=g("aiInParamList");t.setFieldsValue((Q(n={},"innerList".concat(e),r.filter((function(e,t){return e.uniquekey!==a}))),Q(n,"aiInParamList",i[e].enums.filter((function(e,t){return e.uniquekey!==a}))),n))}(a,n.uniquekey)}}),"  (*非负整数)"))}))]};y("queryParams",{initialValue:O||[]});var j=g("queryParams").map((function(e,a){return r.a.createElement("div",{className:"form-item-block",key:a},r.a.createElement(c.a.Item,{label:"输入key"},y("aiInParamList[".concat(a,"].key"),{initialValue:e.key,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入输入key"}]})(r.a.createElement(o.a,{placeholder:"请输入输入key"}))),r.a.createElement(c.a.Item,{label:"类型"},y("aiInParamList[".concat(a,"].type"),{initialValue:e.type?e.type+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择类型"},r.a.createElement(_,{value:"2"},"范围"),r.a.createElement(_,{value:"1"},"枚举")))),r.a.createElement("div",{className:"ai-del-btn",key:a,onClick:function(){return function(e){var a=g("queryParams"),n=g("aiInParamList");t.setFieldsValue({queryParams:a.filter((function(t,a){return a!==e})),aiInParamList:n.filter((function(t,a){return a!==e}))})}(a)}},"删除"),"2"==g("aiInParamList[".concat(a,"].type"))&&r.a.createElement("div",{className:"rang-style"},r.a.createElement(c.a.Item,{label:""},y("aiInParamList[".concat(a,"].range.min"),{initialValue:e.range&&e.range.min,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?a():a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:159,marginRight:10}}))),r.a.createElement("div",{className:"short-line"},"-"),r.a.createElement(c.a.Item,{label:""},y("aiInParamList[".concat(a,"].range.max"),{initialValue:e.range&&e.range.max,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,n){t?/^-?[0-9]\d*$/.test(t)?t&&Number(g("aiInParamList[".concat(a,"].range.min")))<Number(t)?n():n("填写整数且后者大于前者"):n("请输入整数"):n("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:196,marginRight:10}}))),r.a.createElement("div",{className:"tip"},"(*填写整数且后者大于前者)")),"1"==g("aiInParamList[".concat(a,"].type"))&&r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"设置参数"},r.a.createElement(s.a,{type:"dashed",onClick:function(){return function(e){var a=g("innerList".concat(e));K++;var n=a.concat({uniquekey:K});t.setFieldsValue(Q({},"innerList".concat(e),n))}(a)}},r.a.createElement(x.a,{type:"plus"}))),C("aiInParamList[".concat(a,"].enums"),a,e)))})),T=function(e,a,n){y("outerList".concat(a),{initialValue:n.enums||[]});var i=g("outerList".concat(a));return console.log("outerList",i),[i.map((function(n,i){return r.a.createElement("div",{className:"inline-form-item2",key:i},r.a.createElement(c.a.Item,{label:"名称",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey_2,"].name"),{initialValue:n.name,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入名称"}]})(r.a.createElement(o.a,{placeholder:"请输入名称"}))),r.a.createElement(c.a.Item,{label:"数值",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey_2,"].value"),{initialValue:n.value,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入数值"},{pattern:/^\d+$/,message:"请输入非负整数"}]})(r.a.createElement(o.a,{placeholder:"请输入数值"}))),r.a.createElement("div",{className:"delete-btn"},"  ",r.a.createElement(x.a,{key:i,type:"minus-circle-o",onClick:function(){return function(e,a){var n,r=g("outerList".concat(e)),i=g("aiOutParamList");t.setFieldsValue((Q(n={},"outerList".concat(e),r.filter((function(e,t){return e.uniquekey_2!==a}))),Q(n,"aiOutParamList",i[e].enums.filter((function(e,t){return e.uniquekey_2!==a}))),n))}(a,n.uniquekey_2)}}),"  (*非负整数)"))}))]};y("outParams",{initialValue:w||[]});var L=g("outParams").map((function(e,a){return r.a.createElement("div",{className:"form-item-block",key:a},r.a.createElement(c.a.Item,{label:"输出key"},y("aiOutParamList[".concat(a,"].key"),{initialValue:e.key,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入输出key"}]})(r.a.createElement(o.a,{placeholder:"请输入输出key"}))),r.a.createElement(c.a.Item,{label:"类型"},y("aiOutParamList[".concat(a,"].type"),{initialValue:e.type?e.type+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择类型"},r.a.createElement(_,{value:"2"},"范围"),r.a.createElement(_,{value:"1"},"枚举")))),r.a.createElement("div",{className:"ai-del-btn",key:a,onClick:function(){return function(e){var a=g("outParams"),n=g("aiOutParamList");t.setFieldsValue({outParams:a.filter((function(t,a){return a!==e})),aiOutParamList:n.filter((function(t,a){return a!==e}))})}(a)}},"删除"),"2"==g("aiOutParamList[".concat(a,"].type"))&&r.a.createElement("div",{className:"rang-style"},r.a.createElement(c.a.Item,{label:""},y("aiOutParamList[".concat(a,"].range.min"),{initialValue:e.range&&e.range.min,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?a():a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:159,marginRight:10}}))),r.a.createElement("div",{className:"short-line"},"-"),r.a.createElement(c.a.Item,{label:""},y("aiOutParamList[".concat(a,"].range.max"),{initialValue:e.range&&e.range.max,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,n){t?/^-?[0-9]\d*$/.test(t)?t&&Number(g("aiOutParamList[".concat(a,"].range.min")))<Number(t)?n():n("填写整数且后者大于前者"):n("请输入整数"):n("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:196,marginRight:10}}))),r.a.createElement("div",{className:"tip"},"(*填写整数且后者大于前者)")),"1"==g("aiOutParamList[".concat(a,"].type"))&&r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"设置参数"},r.a.createElement(s.a,{type:"dashed",onClick:function(){return function(e){var a=g("outerList".concat(e));G++;var n=a.concat({uniquekey_2:G});t.setFieldsValue(Q({},"outerList".concat(e),n))}(a)}},r.a.createElement(x.a,{type:"plus"}))),T("aiOutParamList[".concat(a,"].enums"),a,e)))}));return r.a.createElement(d.a,{title:"添加/编辑AI能力",width:787,visible:a,onOk:function(){t.validateFields((function(e,t){var a={aiName:t.aiName.trim(),aiUrl:t.aiUrl.trim(),aiDesc:t.aiDesc.trim()};t.aiInParamList&&(a.aiInParamList=N(t.aiInParamList)),t.aiOutParamList&&(a.aiOutParamList=N(t.aiOutParamList)),Object.keys(f).length>0&&(a.aiId=f.aiId),console.log("submit==",a),function(e){return b.c.request({url:"/expert/scene/ai/addOrUpdate/v2.0",data:e,method:"post",headers:{"Content-Type":"application/json"}})}(a).then((function(e){0===e.data.code&&(u.a.success("提交成功"),l())})).finally((function(){return E(!1)}))}))},onCancel:i,maskClosable:!1,confirmLoading:h,wrapClassName:"ai-ability-modal"},r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18},autoComplete:"off"},r.a.createElement(c.a.Item,{label:"能力名称"},y("aiName",{initialValue:f.aiName,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入能力名称",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入能力名称"}))),r.a.createElement(c.a.Item,{label:"接口地址"},y("aiUrl",{initialValue:f.aiUrl,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入接口地址",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入接口地址"}))),r.a.createElement(c.a.Item,{label:"描述"},y("aiDesc",{initialValue:f.aiDesc,rules:[{required:!0,message:"请输入备注",whitespace:!0}]})(r.a.createElement(M,{maxLength:100,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(c.a.Item,{label:"输入"},r.a.createElement(s.a,{type:"dashed",onClick:function(){return e=g("queryParams").concat({}),void t.setFieldsValue({queryParams:e});var e}},r.a.createElement(x.a,{type:"plus"})," 新  增")),j,r.a.createElement("div",{className:"divider"}),r.a.createElement(c.a.Item,{label:"输出",style:{marginTop:"15px"}},r.a.createElement(s.a,{type:"dashed",onClick:function(){return e=g("outParams").concat({}),void t.setFieldsValue({outParams:e});var e}},r.a.createElement(x.a,{type:"plus"})," 新  增")),L))}));function W(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function X(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?W(Object(a),!0).forEach((function(t){Y(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):W(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function Y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ee(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ee(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var te=p.a.Option,ae=d.a.confirm,ne=[{title:"编辑",icon:"edit",status:0,key:1,type:"edit"},{title:"删除",icon:"delete",status:0,key:2,type:"delete"}],re=["场景产品列表","条件类型列表","条件字典列表","AI能力列表"];var ie=c.a.create()((function(e){var t=e.form,a=t.getFieldDecorator,i=(t.getFieldsValue,Z(Object(n.useState)({pageIndex:1,pageRows:10,paged:!0}),2)),d=i[0],f=i[1],P=Z(Object(n.useState)(0),2),k=P[0],w=P[1],q=Z(Object(n.useState)([{}]),2),N=q[0],j=q[1],x=Z(Object(n.useState)(!1),2),T=x[0],L=x[1],S=Z(Object(n.useState)("1"),2),V=S[0],A=S[1],D=Z(Object(n.useState)(!1),2),B=D[0],R=D[1],U=Z(Object(n.useState)({}),2),Q=U[0],z=U[1],J=Z(Object(n.useState)(!1),2),M=J[0],_=J[1],K=Z(Object(n.useState)({}),2),G=K[0],W=K[1],Y=Z(Object(n.useState)([]),2),ee=Y[0],ie=Y[1],le=Z(Object(n.useState)([]),2),ce=le[0],oe=le[1],ue=Z(Object(n.useState)(!1),2),me=ue[0],se=ue[1],de=Z(Object(n.useState)({}),2),pe=de[0],fe=de[1],ye=Z(Object(n.useState)(!1),2),ge=ye[0],ve=ye[1],be=Z(Object(n.useState)({}),2),he=be[0],Ee=be[1],Ie={1:[{title:"产品名称",dataIndex:"deviceTypeName",key:"deviceTypeName"},{title:"产品ID",dataIndex:"defaultProductId",key:"defaultProductId"},{title:"大类",dataIndex:"judge",key:"judge",render:function(e,t){return 2===t.level?r.a.createElement("span",null,t.parent.deviceTypeName):3===t.level?r.a.createElement("span",null,t.grand.deviceTypeName):void 0}},{title:"小类",dataIndex:"judge2",key:"judge2",render:function(e,t){return 2===t.level?r.a.createElement("span",null,t.deviceTypeName):3===t.level?r.a.createElement("span",null,t.parent.deviceTypeName):void 0}},{title:"状态查询",dataIndex:"statusQueryCount",key:"statusQueryCount"},{title:"功能控制",dataIndex:"deviceFunctionCount",key:"deviceFunctionCount"},{title:"输入输出",dataIndex:"inoutType",key:"inoutType",render:function(e,t){return e&&e.inoutTypeName&&r.a.createElement("span",null,e.inoutTypeName)}},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"100px",render:function(e,t){return r.a.createElement("div",null,r.a.createElement(m.a,{placement:"top",title:"查看"},r.a.createElement(s.a,{shape:"circle",size:"small",icon:"info",onClick:function(){return Oe(t)}})))}}],2:[{title:"条件类型名称",dataIndex:"conditionOptionName",key:"conditionOptionName"},{title:"备注",dataIndex:"comments",key:"comments"},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"10%",render:function(e,t){return r.a.createElement("div",null,ne.map((function(e,a){return r.a.createElement(m.a,{key:a,placement:"top",title:e.title},r.a.createElement(s.a,{style:{marginLeft:1===a?"10px":""},shape:"circle",size:"small",icon:e.icon,key:t.conditionOptionId,onClick:function(){return Pe(e,t)}}))})))}}],3:[{title:"条件字典名称",dataIndex:"conditionName",key:"conditionName"},{title:"条件类型",dataIndex:"conditionOptionName",key:"conditionOptionName"},{title:"类型",dataIndex:"paramStyleName",key:"paramStyleName"},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"10%",render:function(e,t){return r.a.createElement("div",null,ne.map((function(e,a){return r.a.createElement(m.a,{key:a,placement:"top",title:e.title},r.a.createElement(s.a,{style:{marginLeft:1===a?"10px":""},shape:"circle",size:"small",icon:e.icon,key:t.conditionId,onClick:function(){return Pe(e,t)}}))})))}}],4:[{title:"能力名称",dataIndex:"aiName",key:"aiName"},{title:"接口地址",dataIndex:"aiUrl",key:"aiUrl"},{title:"输入",dataIndex:"aiInParamList",key:"aiInParamList",render:function(e,t){return e&&e.map((function(e,t){var a="";if(2==e.type&&(a=r.a.createElement("span",{title:"范围：".concat(e.range.min,"~").concat(e.range.max),key:t},"范围：".concat(e.range.min,"~").concat(e.range.max),",   ")),1==e.type){var n="";n+=e.enums.map((function(e){return"".concat(e.name,":").concat(e.value)})),a=r.a.createElement("span",{title:"枚举：".concat(n),key:t},"枚举：".concat(n),"   ")}return a}))}},{title:"输出",dataIndex:"aiOutParamList",key:"aiOutParamList",render:function(e,t){return e&&e.map((function(e,t){var a="";if(2==e.type&&(a=r.a.createElement("span",{title:"范围：".concat(e.range.min,"~").concat(e.range.max),key:t},"范围：".concat(e.range.min,"~").concat(e.range.max),",   ")),1==e.type){var n="";n+=e.enums.map((function(e){return"".concat(e.name,":").concat(e.value)})),a=r.a.createElement("span",{title:"枚举：".concat(n),key:t},"枚举：".concat(n),"   ")}return a}))}},{title:"描述",dataIndex:"aiDesc",key:"aiDesc",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"10%",render:function(e,t){return r.a.createElement("div",null,ne.map((function(e,a){return r.a.createElement(m.a,{key:a,placement:"top",title:e.title},r.a.createElement(s.a,{style:{marginLeft:1===a?"10px":""},shape:"circle",size:"small",icon:e.icon,key:t.key,onClick:function(){return Pe(e,t)}}))})))}}]},Oe=function(e){se(!0),fe(e)},Pe=function(e,t){"delete"===e.type?ae({content:"是否确定删除本条数据？",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){ke(t)},onCancel:function(){}}):"edit"===e.type&&we(t)},ke=function(e){var t;"2"===V?(t={conditionOptionId:e.conditionOptionId},b.c.request({url:"/expert/scene/condition/option/delete",params:t,method:"get"})).then((function(e){0===e.data.code&&(u.a.success("删除成功"),qe())})):"3"===V?function(e){return b.c.request({url:"/expert/scene/condition/delete",params:e,method:"get"})}({conditionId:e.conditionId}).then((function(e){0===e.data.code&&(u.a.success("删除成功"),qe())})):"4"===V&&function(e){return b.c.request({url:"/expert/scene/ai/deleteById/v2.0",params:e,method:"get"})}({aiId:e.aiId}).then((function(e){0===e.data.code&&(u.a.success("删除成功"),qe())}))},we=function(e){var t;"2"===V?(R(!0),z({}),(t={conditionOptionId:e.conditionOptionId},b.c.request({url:"/expert/scene/condition/option/getOneOption",params:t,method:"get"})).then((function(e){0===e.data.code&&z(e.data.data)}))):"3"===V?(_(!0),W({}),function(e){return b.c.request({url:"/expert/scene/condition/getOneCondition",params:e,method:"get"})}({conditionId:e.conditionId}).then((function(e){0===e.data.code&&W(e.data.data)}))):"4"===V&&(ve(!0),Ee({}),function(e){return b.c.request({url:"/expert/scene/ai/getAiAbility/v2.0",params:e,method:"get"})}({aiId:e.aiId}).then((function(e){0===e.data.code&&Ee(e.data.data)})))},qe=function(){var e={1:I,2:h,3:E,4:O},a=X(X({},t.getFieldsValue()),d);L(!0),e[V](a).then((function(e){0===e.data.code&&(j(e.data.data.list),w(e.data.data.pager.totalRows))})).finally((function(){L(!1)}))};Object(n.useEffect)((function(){qe()}),[d.pageRows,d.pageIndex,V]);var Ne=function(){var e;(e={pageIndex:1,pageRows:999999},b.c.request({url:"/expert/scene/condition/option/getList",params:e,method:"get"})).then((function(e){0===e.data.code&&ie(e.data.data)}))},Ce=function(){var e;(e={paged:!1},b.c.request({url:"/expert/deviceType/unit/list",params:e,method:"get"})).then((function(e){0===e.data.code&&oe(e.data.data)}))};Object(n.useEffect)((function(){Ne(),Ce()}),[]);var je=function(){1===d.pageIndex?qe():f((function(e){var t=y()(e);return Object.assign(t,{pageIndex:1,pageRows:10})}))};return r.a.createElement("div",null,r.a.createElement("div",{className:"scene-lib-page"},r.a.createElement(g.a,{title:"场景库管理",className:"title-box"},r.a.createElement("div",{className:"select-box"},r.a.createElement(p.a,{defaultValue:"1",style:{width:150},onChange:function(e){return A(e)}},re.map((function(e,t){return r.a.createElement(te,{key:e,value:t+1+""},e)})))),r.a.createElement(c.a,{layout:"inline",className:"scene-form",autoComplete:"off"},r.a.createElement("div",null,"1"===V&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"产品名称"},a("deviceTypeName",{})(r.a.createElement(o.a,{placeholder:"请输入产品名称",style:{width:240}}))),r.a.createElement(c.a.Item,{label:"产品ID"},a("defaultProductId",{})(r.a.createElement(o.a,{placeholder:"请输入产品ID",style:{width:240}})))),"2"===V&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"条件类型名称"},a("conditionOptionName",{})(r.a.createElement(o.a,{placeholder:"请输入条件类型名称",style:{width:240}})))),"3"===V&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"条件字典名称"},a("conditionName",{})(r.a.createElement(o.a,{placeholder:"请输入条件字典名称",style:{width:240}}))),r.a.createElement(c.a.Item,{label:"条件类型"},a("conditionTypeId",{})(r.a.createElement(p.a,{placeholder:"请选择条件类型",style:{width:240}},ee&&ee.map((function(e){return r.a.createElement(te,{key:e.conditionTypeId,value:e.conditionTypeId+""},e.conditionOptionName)})))))),"4"===V&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"能力名称"},a("aiName",{})(r.a.createElement(o.a,{placeholder:"请输入能力名称",style:{width:240}})))),r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{type:"primary",onClick:function(){return je()}},"查询")),r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{type:"default",onClick:function(){return t.resetFields(),void je()}},"重置"))),"1"!==V&&r.a.createElement("div",null,r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{type:"primary",onClick:function(){({2:function(){R(!0),z({})},3:function(){_(!0),W({})},4:function(){ve(!0),Ee({})}})[V]()}},"新增"))))),r.a.createElement(l.a,{className:"ModuleManagerListTable",style:{marginTop:10}},r.a.createElement(v.a,{rowKey:{1:"deviceTypeId",2:"conditionTypeId",3:"conditionId",4:"aiId"}[V],bordered:!0,columns:Ie[V],dataSource:N,loading:T,pagination:{defaultCurrent:1,current:d.pageIndex,onChange:function(e,t){f((function(a){var n=y()(a);return Object.assign(n,{pageIndex:t===d.pageRows?e:1,pageRows:t})}))},pageSize:d.pageRows,total:k,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return r.a.createElement("span",null,"共 ",r.a.createElement("a",null,k)," 条")}}})),B&&r.a.createElement(C,{visible:B,conditionTypeDetailData:Q,handleOk:function(){R(!1),qe()},handleCancel:function(){return R(!1)}}),M&&r.a.createElement(F,{visible:M,dicConditionType:ee,unitList:ce,conditionDicDetailData:G,handleOk:function(){_(!1),qe()},handleCancel:function(){return _(!1)}}),me&&r.a.createElement($,{visible:me,sceneProductDetail:pe,handleOk:function(){se(!1)},handleCancel:function(){return se(!1)}}),ge&&r.a.createElement(H,{visible:ge,aiAbilityDetail:he,handleCancel:function(){return ve(!1)},handleOk:function(){ve(!1),qe()}})))}));t.default=function(e){var t=e.match;return r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"".concat(t.url,"/list"),component:ie}),r.a.createElement(i.a,{from:"".concat(t.url,"/"),to:"".concat(t.url,"/list")}))}}}]);