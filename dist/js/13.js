(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1468:function(e,t,a){},1469:function(e,t,a){},1470:function(e,t,a){},1471:function(e,t,a){},1497:function(e,t,a){"use strict";a.r(t);a(79),a(221);var n=a(0),r=a.n(n),i=a(116),l=(a(100),a(43)),c=(a(129),a(24)),o=(a(99),a(45)),u=(a(220),a(117)),m=(a(222),a(86)),s=(a(67),a(20)),d=(a(196),a(85)),p=(a(159),a(36)),f=a(106),y=a.n(f),g=(a(55),a(105),a(367),a(22),a(62),a(368),a(141),a(161),a(35),a(26),a(27),a(28),a(19),a(34),a(39),a(38),a(40),a(32),a(41),a(463)),v=a(97),h=a(4),E=function(e){return h.c.request({url:"/expert/scene/condition/option/getPage",params:e,method:"get"})},b=function(e){return h.c.request({url:"/expert/scene/condition/option/addOrUpdate",data:e,method:"post",needFormData:!0,headers:{"Content-Type":"application/x-www-form-urlencoded"}})},I=function(e){return h.c.request({url:"/expert/scene/condition/option/delete",params:e,method:"get"})},O=function(e){return h.c.request({url:"/expert/scene/condition/option/getOneOption",params:e,method:"get"})},P=function(e){return h.c.request({url:"/expert/scene/condition/getPageList",params:e,method:"get"})},k=function(e){return h.c.request({url:"/expert/scene/condition/option/getList",params:e,method:"get"})},q=function(e){return h.c.request({url:"/expert/deviceType/unit/list",params:e,method:"get"})},w=function(e){return h.c.request({url:"/expert/scene/condition/addOrUpdate",data:e,method:"post",headers:{"Content-Type":"application/json"}})},N=function(e){return h.c.request({url:"/expert/scene/condition/getOneCondition",params:e,method:"get"})},x=function(e){return h.c.request({url:"/expert/scene/condition/delete",params:e,method:"get"})},C=function(e){return h.c.request({url:"/expert/combine/deviceType/list/v2.0",params:e,method:"get"})},T=function(e){return h.c.request({url:"/expert/deviceType/delete",params:e,method:"get"})},L=function(e){return h.c.request({url:"/expert/deviceType/statusQuery/list",params:e,method:"get"})},j=function(e){return h.c.request({url:"/expert/deviceType/deviceFunction/list",params:e,method:"get"})},V=function(e){return h.c.request({url:"/expert/deviceType/deviceFunction/delete",params:e,method:"get"})},S=function(e){return h.c.request({url:"/expert/deviceType/statusQuery/delete",params:e,method:"get"})},D=function(e){return h.c.request({url:"/expert/scene/ai/getPageList/v2.0",params:e,method:"get"})},F=function(e){return h.c.request({url:"/expert/scene/ai/addOrUpdate/v2.0",data:e,method:"post",headers:{"Content-Type":"application/json"}})},A=function(e){return h.c.request({url:"/expert/scene/ai/getAiAbility/v2.0",params:e,method:"get"})},B=function(e){return h.c.request({url:"/expert/scene/ai/deleteById/v2.0",params:e,method:"get"})};a(1468);function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function Q(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var U=o.a.TextArea;var $=c.a.create()(function(e){var t=e.form,a=e.visible,i=e.handleOk,l=e.handleCancel,m=e.conditionTypeDetailData,s=void 0===m?{}:m,p=t.getFieldDecorator,f=z(Object(n.useState)(!1),2),y=f[0],g=f[1];return r.a.createElement(d.a,{title:"添加/编辑条件类型",width:800,visible:a,onOk:function(){t.validateFields(function(e,t){if(!e){g(!0);var a=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(a,!0).forEach(function(t){Q(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},t);Object.keys(s).length>0&&(a.conditionOptionId=s.conditionOptionId),b(a).then(function(e){0===e.data.code&&(u.a.success("提交成功"),i())}).finally(function(){return g(!1)})}})},onCancel:l,maskClosable:!1,confirmLoading:y,wrapClassName:"module-add-scheme"},r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18},autoComplete:"off"},r.a.createElement(c.a.Item,{label:"条件类型名称"},p("conditionOptionName",{initialValue:s.conditionOptionName,rules:[{required:!0,message:"请输入条件类型名称",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:50,placeholder:"请输入条件类型名称"}))),r.a.createElement(c.a.Item,{label:"备注"},p("comments",{initialValue:s.comments,rules:[{required:!0,message:"请输入备注",whitespace:!0}]})(r.a.createElement(U,{maxLength:100,autoSize:{minRows:5,maxRows:5}})))))}),J=(a(818),a(257)),_=(a(173),a(10));a(468),a(1469);function K(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function G(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var H=p.a.Option,W=[];var X=c.a.create()(function(e){var t=e.form,a=e.visible,i=e.handleOk,l=e.handleCancel,m=e.conditionDicDetailData1,f=void 0===m?{}:m,g=e.dicConditionType,v=void 0===g?[]:g,h=e.unitList,E=void 0===h?[]:h,b=t.getFieldDecorator,I=t.getFieldValue,O=G(Object(n.useState)(!1),2),P=O[0],k=O[1],q=G(Object(n.useState)(""),2),N=q[0],x=q[1],C=G(Object(n.useState)(y()(f)),2),T=C[0],L=C[1];Object(n.useEffect)(function(){Object.keys(f).length&&x(f.paramStyleId+"")},[Object.keys(f).length]),W=Object.keys(T).length&&"2"===N?T.queryParams.length&&-1!==T.queryParams[0].queryParamName.indexOf("[")?[]:y()(T.queryParams):[],b("queryParams",{initialValue:W});var j=I("queryParams").map(function(e,a){return r.a.createElement("div",{className:"inline-form-item2",key:a},r.a.createElement(c.a.Item,{label:"名称",labelCol:{span:6}},b("configList[".concat(a,"].queryParamName"),{initialValue:e.queryParamName,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入名称"}]})(r.a.createElement(o.a,{placeholder:"请输入名称"}))),Object.keys(T).length>0&&r.a.createElement(c.a.Item,{label:"",style:{display:"none"}},b("configList[".concat(a,"].queryParamId"),{initialValue:e.queryParamId})(r.a.createElement(o.a,{style:{display:"none"}}))),"    ",r.a.createElement(c.a.Item,{label:"数值",labelCol:{span:6}},b("configList[".concat(a,"].queryParamValue"),{initialValue:e.queryParamValue,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入数值"},{pattern:/^\d+$/,message:"请输入非负整数"}]})(r.a.createElement(o.a,{placeholder:"请输入数值"}))),r.a.createElement("div",{className:"delete-btn"},"  ",r.a.createElement(_.a,{key:a,type:"minus-circle-o",onClick:function(){return function(e){var a=I("queryParams"),n=I("configList");t.setFieldsValue({queryParams:a.filter(function(t,a){return a!==e}),configList:n.filter(function(t,a){return a!==e})})}(a)}}),"  (*非负整数)"))});return r.a.createElement(d.a,{title:"添加/编辑条件字典",width:800,visible:a,onOk:function(){t.validateFields(function(e,t){if(!e){k(!0),console.log("values",t);var a=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?K(a,!0).forEach(function(t){M(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):K(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},t);"1"===N?(a.queryParams=[{queryParamName:t.rangArr1,queryParamValue:"[".concat(Number(t.rangArr1),",").concat(Number(t.rangArr2),"]")}],delete a.rangArr1,delete a.rangArr2,Object.keys(T).length&&(T.queryParams.length>0&&(a.queryParams[0].queryParamId=T.queryParams[0].queryParamId||""),a.statusQueryId=T.statusQueryId,a.conditionId=T.conditionId)):"2"===N&&(a.queryParams=y()(t.configList),delete a.configList,Object.keys(T).length>0&&(a.statusQueryId=T.statusQueryId,a.conditionId=T.conditionId,a.queryParams=a.queryParams.map(function(e){var t={};return e.queryParamId&&(t.queryParamId=e.queryParamId),t.queryParamName=e.queryParamName,t.queryParamValue=e.queryParamValue,t}))),console.log("add-data",a),w(a).then(function(e){0===e.data.code&&(u.a.success("提交成功"),i())}).finally(function(){return k(!1)})}})},onCancel:l,maskClosable:!1,confirmLoading:P,wrapClassName:"condition-dic-modal"},r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18},autoComplete:"off"},r.a.createElement(c.a.Item,{label:"条件字典名称"},b("conditionName",{initialValue:T.conditionName,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入条件字典名称",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入条件字典名称"}))),r.a.createElement(c.a.Item,{label:"条件类型"},b("conditionOptionId",{initialValue:T.conditionOptionId?T.conditionOptionId+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择条件类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择条件类型"},v&&v.map(function(e){return r.a.createElement(H,{key:e.conditionOptionId,value:e.conditionOptionId+""},e.conditionOptionName)})))),r.a.createElement(c.a.Item,{label:"变化频率"},b("frequency",{initialValue:T.frequency||0===T.frequency?T.frequency+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入变化频率",whitespace:!0}]})(r.a.createElement(J.a,{min:0,placeholder:"请输入变化频率",style:{width:448}})),r.a.createElement("span",{className:"ant-form-text"},"小时(*非负整数)")),r.a.createElement(c.a.Item,{label:"参数单位"},b("unitId",{initialValue:T.unitId?T.unitId+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择参数单位",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择参数单位"},E&&E.map(function(e){return r.a.createElement(H,{key:e.unitId,value:e.unitId+""},e.unitName)})))),r.a.createElement(c.a.Item,{label:"条件字典key"},b("dataKey",{initialValue:T.dataKey,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入条件字典key",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:20,placeholder:"请输入条件字典key"}))),r.a.createElement(c.a.Item,{label:"类型"},b("paramStyleId",{initialValue:T.paramStyleId?T.paramStyleId+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择类型",onChange:function(e){console.log("change"),L(function(e){var t=y()(e);return t.queryParams=[],t}),x(e)}},r.a.createElement(H,{value:"1"},"范围"),r.a.createElement(H,{value:"2"},"枚举")))),"1"===N&&r.a.createElement("div",{className:"rang-style"},r.a.createElement(c.a.Item,{label:""},b("rangArr1",{initialValue:T.queryParams.length?Array.isArray(JSON.parse(T.queryParams[0].queryParamValue))?JSON.parse(T.queryParams[0].queryParamValue)[0]+"":T.queryParams[0].queryParamName:"",validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?a():a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:159,marginRight:10}}))),r.a.createElement("div",{className:"short-line"},"-"),r.a.createElement(c.a.Item,{label:""},b("rangArr2",{initialValue:T.queryParams.length?Array.isArray(JSON.parse(T.queryParams[0].queryParamValue))?JSON.parse(T.queryParams[0].queryParamValue)[1]+"":T.queryParams[0].queryParamValue:"",validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?t&&Number(I("rangArr1"))<Number(t)?a():a("填写整数且后者大于前者"):a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:196,marginRight:10}}))),r.a.createElement("div",{className:"tip"},"(*填写整数且后者大于前者)")),"2"===N&&r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"设置参数"},r.a.createElement(s.a,{type:"dashed",icon:"plus",onClick:function(){return e=I("queryParams").concat({}),void t.setFieldsValue({queryParams:e});var e},style:{width:"100%"}},"新  增")),j)))});a(1470);function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Z=d.a.confirm;var ee=function(e){var t=e.visible,a=e.handleOk,i=e.handleCancel,l=e.sceneProductDetail,o=void 0===l?{}:l,u=Y(Object(n.useState)([]),2),m=u[0],s=u[1],p=Y(Object(n.useState)([]),2),f=p[0],y=p[1];Object(n.useEffect)(function(){v(),g()},[]);var g=function(){j({deviceTypeId:o.deviceTypeId}).then(function(e){0===e.data.code&&s(e.data.data)})},v=function(){L({deviceTypeId:o.deviceTypeId}).then(function(e){0===e.data.code&&y(e.data.data)})},h=function(e,t){Z({content:"是否确定删除本条数据？",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){"func"===t&&E(e),"status"===t&&b(e)},onCancel:function(){}})},E=function(e){V({deviceFunctionId:e.deviceFunctionId}).then(function(e){0===e.data.code&&g()})},b=function(e){S({statusQueryId:e.statusQueryId}).then(function(e){0===e.data.code&&v()})};return r.a.createElement(d.a,{title:"查看详情",width:800,visible:t,onOk:a,onCancel:i,maskClosable:!1,wrapClassName:"scene-porduct-modal"},r.a.createElement("div",{className:"scene-porduct-modal-it"},r.a.createElement("div",{className:"title",style:{paddingTop:0}},"基本属性"),r.a.createElement(c.a,{labelAlign:"left"},r.a.createElement(c.a.Item,{label:"设备大类"},2===o.level?o.parent.deviceTypeName:3===o.level?o.grand.deviceTypeName:""),r.a.createElement(c.a.Item,{label:"设备小类"},2===o.level?o.deviceTypeName:3===o.level?o.parent.deviceTypeName:""),r.a.createElement(c.a.Item,{label:"输入输出类型"},o.inoutType.inoutTypeName),r.a.createElement(c.a.Item,{label:"安全级别"},o.securityLevel.securityLevelName),r.a.createElement(c.a.Item,{label:"设备场景自定义"},1===o.customizable?"是":"否")),r.a.createElement("div",{className:"title"},"扩展功能"),r.a.createElement("div",{className:"func-box"},r.a.createElement("div",{className:"func-box-title"},"状态查询："),r.a.createElement("div",{className:"func-box-cont"},f&&f.map(function(e,t){return r.a.createElement("div",{key:e.statusQueryId},r.a.createElement("div",null,"功能",t+1,"：",e.statusQueryName),r.a.createElement("div",{className:"func-params"},r.a.createElement("div",{className:"func-params-title"},"功能参数:"),r.a.createElement("div",{className:"func-params-box"},e.queryParams&&e.queryParams.map(function(e){return r.a.createElement("div",{key:e.queryParamId,className:"func-params-cont"},e.queryParamName,"：",e.queryParamValue)}),r.a.createElement("div",{className:"delete-btn",onClick:function(){return h(e,"status")}},"删除"))))}))),r.a.createElement("div",{className:"func-box"},r.a.createElement("div",{className:"func-box-title"},"功能控制："),r.a.createElement("div",{className:"func-box-cont"},m&&m.map(function(e,t){return r.a.createElement("div",{key:e.deviceFunctionId},r.a.createElement("div",null,"功能",t+1,"：",e.deviceFunctionName),r.a.createElement("div",{className:"func-params"},r.a.createElement("div",{className:"func-params-title"},"功能参数:"),r.a.createElement("div",{className:"func-params-box"},e.functionParams&&e.functionParams.map(function(e){return r.a.createElement("div",{key:e.functionParamId,className:"func-params-cont"},e.functionParamName,"：",e.functionParamValue)}),r.a.createElement("div",{className:"delete-btn",onClick:function(){return h(e,"func")}},"删除"))))})))))};a(465),a(1471);function te(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function ae(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var ne=o.a.TextArea,re=p.a.Option,ie=0,le=0;var ce=c.a.create()(function(e){var t=e.form,a=e.visible,i=e.handleCancel,l=e.handleOk,m=e.aiAbilityDetail,f=void 0===m?{}:m,y=t.getFieldDecorator,g=t.getFieldValue,v=ae(Object(n.useState)(!1),2),h=v[0],E=v[1],b=ae(Object(n.useState)([]),2),I=b[0],O=b[1],P=ae(Object(n.useState)([]),2),k=P[0],q=P[1];Object(n.useEffect)(function(){Object.keys(f).length>0&&(f.aiInParamList&&f.aiInParamList.forEach(function(e){1==e.type&&(e.enums=e.enums.map(function(e){return ie++,{name:e.name,value:e.value,uniquekey:ie}}))}),O(f.aiInParamList),f.aiOutParamList&&f.aiOutParamList.forEach(function(e){1==e.type&&(e.enums=e.enums.map(function(e){return le++,{name:e.name,value:e.value,uniquekey_2:le}}))}),q(f.aiOutParamList))},[f]);var w=function(e){return e.map(function(e){return"1"==e.type&&e.enums?(e.enums=e.enums.filter(function(e){return e}),e):e})},N=function(e,a,n){y("innerList".concat(a),{initialValue:n.enums||[]});var i=g("innerList".concat(a));return console.log("innerList",i),[i.map(function(n,i){return r.a.createElement("div",{className:"inline-form-item2",key:i},r.a.createElement(c.a.Item,{label:"名称",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey,"].name"),{initialValue:n.name,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入名称"}]})(r.a.createElement(o.a,{placeholder:"请输入名称"}))),r.a.createElement(c.a.Item,{label:"数值",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey,"].value"),{initialValue:n.value,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入数值"},{pattern:/^\d+$/,message:"请输入非负整数"}]})(r.a.createElement(o.a,{placeholder:"请输入数值"}))),r.a.createElement("div",{className:"delete-btn"},"  ",r.a.createElement(_.a,{key:i,type:"minus-circle-o",onClick:function(){return function(e,a){var n,r=g("innerList".concat(e)),i=g("aiInParamList");t.setFieldsValue((te(n={},"innerList".concat(e),r.filter(function(e,t){return e.uniquekey!==a})),te(n,"aiInParamList",i[e].enums.filter(function(e,t){return e.uniquekey!==a})),n))}(a,n.uniquekey)}}),"  (*非负整数)"))})]};y("queryParams",{initialValue:I||[]});var x=g("queryParams").map(function(e,a){return r.a.createElement("div",{className:"form-item-block",key:a},r.a.createElement(c.a.Item,{label:"输入key"},y("aiInParamList[".concat(a,"].key"),{initialValue:e.key,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入输入key"}]})(r.a.createElement(o.a,{placeholder:"请输入输入key"}))),r.a.createElement(c.a.Item,{label:"类型"},y("aiInParamList[".concat(a,"].type"),{initialValue:e.type?e.type+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择类型"},r.a.createElement(re,{value:"2"},"范围"),r.a.createElement(re,{value:"1"},"枚举")))),r.a.createElement("div",{className:"ai-del-btn",key:a,onClick:function(){return function(e){var a=g("queryParams"),n=g("aiInParamList");t.setFieldsValue({queryParams:a.filter(function(t,a){return a!==e}),aiInParamList:n.filter(function(t,a){return a!==e})})}(a)}},"删除"),"2"==g("aiInParamList[".concat(a,"].type"))&&r.a.createElement("div",{className:"rang-style"},r.a.createElement(c.a.Item,{label:""},y("aiInParamList[".concat(a,"].range.min"),{initialValue:e.range&&e.range.min,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?a():a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:159,marginRight:10}}))),r.a.createElement("div",{className:"short-line"},"-"),r.a.createElement(c.a.Item,{label:""},y("aiInParamList[".concat(a,"].range.max"),{initialValue:e.range&&e.range.max,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,n){t?/^-?[0-9]\d*$/.test(t)?t&&Number(g("aiInParamList[".concat(a,"].range.min")))<Number(t)?n():n("填写整数且后者大于前者"):n("请输入整数"):n("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:196,marginRight:10}}))),r.a.createElement("div",{className:"tip"},"(*填写整数且后者大于前者)")),"1"==g("aiInParamList[".concat(a,"].type"))&&r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"设置参数"},r.a.createElement(s.a,{type:"dashed",icon:"plus",onClick:function(){return function(e){var a=g("innerList".concat(e));ie++;var n=a.concat({uniquekey:ie});t.setFieldsValue(te({},"innerList".concat(e),n))}(a)}})),N("aiInParamList[".concat(a,"].enums"),a,e)))}),C=function(e,a,n){y("outerList".concat(a),{initialValue:n.enums||[]});var i=g("outerList".concat(a));return console.log("outerList",i),[i.map(function(n,i){return r.a.createElement("div",{className:"inline-form-item2",key:i},r.a.createElement(c.a.Item,{label:"名称",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey_2,"].name"),{initialValue:n.name,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入名称"}]})(r.a.createElement(o.a,{placeholder:"请输入名称"}))),r.a.createElement(c.a.Item,{label:"数值",labelCol:{span:6}},y("".concat(e,"[").concat(n.uniquekey_2,"].value"),{initialValue:n.value,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入数值"},{pattern:/^\d+$/,message:"请输入非负整数"}]})(r.a.createElement(o.a,{placeholder:"请输入数值"}))),r.a.createElement("div",{className:"delete-btn"},"  ",r.a.createElement(_.a,{key:i,type:"minus-circle-o",onClick:function(){return function(e,a){var n,r=g("outerList".concat(e)),i=g("aiOutParamList");t.setFieldsValue((te(n={},"outerList".concat(e),r.filter(function(e,t){return e.uniquekey_2!==a})),te(n,"aiOutParamList",i[e].enums.filter(function(e,t){return e.uniquekey_2!==a})),n))}(a,n.uniquekey_2)}}),"  (*非负整数)"))})]};y("outParams",{initialValue:k||[]});var T=g("outParams").map(function(e,a){return r.a.createElement("div",{className:"form-item-block",key:a},r.a.createElement(c.a.Item,{label:"输出key"},y("aiOutParamList[".concat(a,"].key"),{initialValue:e.key,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入输出key"}]})(r.a.createElement(o.a,{placeholder:"请输入输出key"}))),r.a.createElement(c.a.Item,{label:"类型"},y("aiOutParamList[".concat(a,"].type"),{initialValue:e.type?e.type+"":"",validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请选择类型",whitespace:!0}]})(r.a.createElement(p.a,{placeholder:"请选择类型"},r.a.createElement(re,{value:"2"},"范围"),r.a.createElement(re,{value:"1"},"枚举")))),r.a.createElement("div",{className:"ai-del-btn",key:a,onClick:function(){return function(e){var a=g("outParams"),n=g("aiOutParamList");t.setFieldsValue({outParams:a.filter(function(t,a){return a!==e}),aiOutParamList:n.filter(function(t,a){return a!==e})})}(a)}},"删除"),"2"==g("aiOutParamList[".concat(a,"].type"))&&r.a.createElement("div",{className:"rang-style"},r.a.createElement(c.a.Item,{label:""},y("aiOutParamList[".concat(a,"].range.min"),{initialValue:e.range&&e.range.min,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,a){t?/^-?[0-9]\d*$/.test(t)?a():a("请输入整数"):a("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:159,marginRight:10}}))),r.a.createElement("div",{className:"short-line"},"-"),r.a.createElement(c.a.Item,{label:""},y("aiOutParamList[".concat(a,"].range.max"),{initialValue:e.range&&e.range.max,validateTrigger:["onChange","onBlur"],rules:[{validator:function(e,t,n){t?/^-?[0-9]\d*$/.test(t)?t&&Number(g("aiOutParamList[".concat(a,"].range.min")))<Number(t)?n():n("填写整数且后者大于前者"):n("请输入整数"):n("请输入数值")}}]})(r.a.createElement(o.a,{style:{width:196,marginRight:10}}))),r.a.createElement("div",{className:"tip"},"(*填写整数且后者大于前者)")),"1"==g("aiOutParamList[".concat(a,"].type"))&&r.a.createElement("div",null,r.a.createElement(c.a.Item,{label:"设置参数"},r.a.createElement(s.a,{type:"dashed",icon:"plus",onClick:function(){return function(e){var a=g("outerList".concat(e));le++;var n=a.concat({uniquekey_2:le});t.setFieldsValue(te({},"outerList".concat(e),n))}(a)}})),C("aiOutParamList[".concat(a,"].enums"),a,e)))});return r.a.createElement(d.a,{title:"添加/编辑AI能力",width:787,visible:a,onOk:function(){t.validateFields(function(e,t){var a={aiName:t.aiName.trim(),aiUrl:t.aiUrl.trim(),aiDesc:t.aiDesc.trim()};t.aiInParamList&&(a.aiInParamList=w(t.aiInParamList)),t.aiOutParamList&&(a.aiOutParamList=w(t.aiOutParamList)),Object.keys(f).length>0&&(a.aiId=f.aiId),console.log("submit==",a),F(a).then(function(e){0===e.data.code&&(u.a.success("提交成功"),l())}).finally(function(){return E(!1)})})},onCancel:i,maskClosable:!1,confirmLoading:h,wrapClassName:"ai-ability-modal"},r.a.createElement(c.a,{labelCol:{span:4},wrapperCol:{span:18},autoComplete:"off"},r.a.createElement(c.a.Item,{label:"能力名称"},y("aiName",{initialValue:f.aiName,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入能力名称",whitespace:!0}]})(r.a.createElement(o.a,{maxLength:50,placeholder:"请输入能力名称"}))),r.a.createElement(c.a.Item,{label:"接口地址"},y("aiUrl",{initialValue:f.aiUrl,validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"请输入接口地址",whitespace:!0}]})(r.a.createElement(o.a,{placeholder:"请输入接口地址"}))),r.a.createElement(c.a.Item,{label:"描述"},y("aiDesc",{initialValue:f.aiDesc,rules:[{required:!0,message:"请输入备注",whitespace:!0}]})(r.a.createElement(ne,{maxLength:100,autoSize:{minRows:3,maxRows:3}}))),r.a.createElement(c.a.Item,{label:"输入"},r.a.createElement(s.a,{type:"dashed",icon:"plus",onClick:function(){return e=g("queryParams").concat({}),void t.setFieldsValue({queryParams:e});var e}},"新  增")),x,r.a.createElement("div",{className:"divider"}),r.a.createElement(c.a.Item,{label:"输出",style:{marginTop:"15px"}},r.a.createElement(s.a,{type:"dashed",icon:"plus",onClick:function(){return e=g("outParams").concat({}),void t.setFieldsValue({outParams:e});var e}},"新  增")),T))});function oe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function ue(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?oe(a,!0).forEach(function(t){me(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):oe(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function me(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function se(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var de=p.a.Option,pe=d.a.confirm,fe=[{title:"编辑",icon:"edit",status:0,key:1,type:"edit"},{title:"删除",icon:"delete",status:0,key:2,type:"delete"}],ye=["场景产品列表","条件类型列表","条件字典列表","AI能力列表"];var ge=c.a.create()(function(e){var t=e.form,a=t.getFieldDecorator,i=(t.getFieldsValue,se(Object(n.useState)({pageIndex:1,pageRows:10,paged:!0}),2)),d=i[0],f=i[1],h=se(Object(n.useState)(0),2),b=h[0],w=h[1],L=se(Object(n.useState)([{}]),2),j=L[0],V=L[1],S=se(Object(n.useState)(!1),2),F=S[0],R=S[1],Q=se(Object(n.useState)("1"),2),z=Q[0],U=Q[1],J=se(Object(n.useState)(!1),2),_=J[0],K=J[1],M=se(Object(n.useState)({}),2),G=M[0],H=M[1],W=se(Object(n.useState)(!1),2),Y=W[0],Z=W[1],te=se(Object(n.useState)({}),2),ae=te[0],ne=te[1],re=se(Object(n.useState)([]),2),ie=re[0],le=re[1],oe=se(Object(n.useState)([]),2),me=oe[0],ge=oe[1],ve=se(Object(n.useState)(!1),2),he=ve[0],Ee=ve[1],be=se(Object(n.useState)({}),2),Ie=be[0],Oe=be[1],Pe=se(Object(n.useState)(!1),2),ke=Pe[0],qe=Pe[1],we=se(Object(n.useState)({}),2),Ne=we[0],xe=we[1],Ce={1:[{title:"产品名称",dataIndex:"deviceTypeName",key:"deviceTypeName"},{title:"产品ID",dataIndex:"defaultProductId",key:"defaultProductId"},{title:"大类",dataIndex:"judge",key:"judge",render:function(e,t){return 2===t.level?r.a.createElement("span",null,t.parent?t.parent.deviceTypeName:""):3===t.level?r.a.createElement("span",null,t.grand?t.grand.deviceTypeName:""):void 0}},{title:"小类",dataIndex:"judge2",key:"judge2",render:function(e,t){return 2===t.level?r.a.createElement("span",null,t.deviceTypeName):3===t.level?r.a.createElement("span",null,t.parent?t.parent.deviceTypeName:""):void 0}},{title:"状态查询",dataIndex:"statusQueryCount",key:"statusQueryCount"},{title:"功能控制",dataIndex:"deviceFunctionCount",key:"deviceFunctionCount"},{title:"输入输出",dataIndex:"inoutType",key:"inoutType",render:function(e,t){return e&&e.inoutTypeName&&r.a.createElement("span",null,e.inoutTypeName)}},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"100px",render:function(e,t){return r.a.createElement("div",null,r.a.createElement(m.a,{placement:"top",title:"查看"},r.a.createElement(s.a,{shape:"circle",size:"small",icon:"info",onClick:function(){return Te(t)}})),r.a.createElement(m.a,{placement:"top",title:"删除"},r.a.createElement(s.a,{style:{marginLeft:"10px"},shape:"circle",size:"small",icon:"delete",onClick:function(){return Le({type:"delete"},t)}})))}}],2:[{title:"条件类型名称",dataIndex:"conditionOptionName",key:"conditionOptionName"},{title:"备注",dataIndex:"comments",key:"comments"},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"10%",render:function(e,t){return r.a.createElement("div",null,fe.map(function(e,a){return r.a.createElement(m.a,{key:a,placement:"top",title:e.title},r.a.createElement(s.a,{style:{marginLeft:1===a?"10px":""},shape:"circle",size:"small",icon:e.icon,key:t.conditionOptionId,onClick:function(){return Le(e,t)}}))}))}}],3:[{title:"条件字典名称",dataIndex:"conditionName",key:"conditionName"},{title:"条件类型",dataIndex:"conditionOptionName",key:"conditionOptionName"},{title:"类型",dataIndex:"paramStyleName",key:"paramStyleName"},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"10%",render:function(e,t){return r.a.createElement("div",null,fe.map(function(e,a){return r.a.createElement(m.a,{key:a,placement:"top",title:e.title},r.a.createElement(s.a,{style:{marginLeft:1===a?"10px":""},shape:"circle",size:"small",icon:e.icon,key:t.conditionId,onClick:function(){return Le(e,t)}}))}))}}],4:[{title:"能力名称",dataIndex:"aiName",key:"aiName"},{title:"接口地址",dataIndex:"aiUrl",key:"aiUrl"},{title:"输入",dataIndex:"aiInParamList",key:"aiInParamList",render:function(e,t){return e&&e.map(function(e,t){var a="";if(2==e.type&&(a=r.a.createElement("span",{title:"范围：".concat(e.range.min,"~").concat(e.range.max),key:t},"范围：".concat(e.range.min,"~").concat(e.range.max),",   ")),1==e.type){var n="";n+=e.enums.map(function(e){return"".concat(e.name,":").concat(e.value)}),a=r.a.createElement("span",{title:"枚举：".concat(n),key:t},"枚举：".concat(n),"   ")}return a})}},{title:"输出",dataIndex:"aiOutParamList",key:"aiOutParamList",render:function(e,t){return e&&e.map(function(e,t){var a="";if(2==e.type&&(a=r.a.createElement("span",{title:"范围：".concat(e.range.min,"~").concat(e.range.max),key:t},"范围：".concat(e.range.min,"~").concat(e.range.max),",   ")),1==e.type){var n="";n+=e.enums.map(function(e){return"".concat(e.name,":").concat(e.value)}),a=r.a.createElement("span",{title:"枚举：".concat(n),key:t},"枚举：".concat(n),"   ")}return a})}},{title:"描述",dataIndex:"aiDesc",key:"aiDesc",render:function(e){return r.a.createElement("span",{title:e},e)}},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",dataIndex:"operation",key:"operation",width:"10%",render:function(e,t){return r.a.createElement("div",null,fe.map(function(e,a){return r.a.createElement(m.a,{key:a,placement:"top",title:e.title},r.a.createElement(s.a,{style:{marginLeft:1===a?"10px":""},shape:"circle",size:"small",icon:e.icon,key:t.key,onClick:function(){return Le(e,t)}}))}))}}]},Te=function(e){Ee(!0),Oe(e)},Le=function(e,t){"delete"===e.type?pe({content:"是否确定删除本条数据？",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){je(t)},onCancel:function(){}}):"edit"===e.type&&Ve(t)},je=function(e){"2"===z?I({conditionOptionId:e.conditionOptionId}).then(function(e){0===e.data.code&&(u.a.success("删除成功"),Se())}):"3"===z?x({conditionId:e.conditionId}).then(function(e){0===e.data.code&&(u.a.success("删除成功"),Se())}):"4"===z?B({aiId:e.aiId}).then(function(e){0===e.data.code&&(u.a.success("删除成功"),Se())}):"1"===z&&T({deviceTypeId:e.deviceTypeId}).then(function(e){0===e.data.code&&(u.a.success("删除成功"),Se())})},Ve=function(e){"2"===z?(K(!0),H({}),O({conditionOptionId:e.conditionOptionId}).then(function(e){0===e.data.code&&H(e.data.data)})):"3"===z?(ne({}),N({conditionId:e.conditionId}).then(function(e){0===e.data.code&&(ne(e.data.data),Z(!0))})):"4"===z&&(qe(!0),xe({}),A({aiId:e.aiId}).then(function(e){0===e.data.code&&xe(e.data.data)}))},Se=function(){var e={1:C,2:E,3:P,4:D},a=ue(ue({},t.getFieldsValue()),d);R(!0),e[z](a).then(function(e){0===e.data.code&&(V(e.data.data.list),w(e.data.data.pager.totalRows))}).finally(function(){R(!1)})};Object(n.useEffect)(function(){Se()},[d.pageRows,d.pageIndex,z]);var De=function(){k({pageIndex:1,pageRows:999999}).then(function(e){0===e.data.code&&le(e.data.data)})};Object(n.useEffect)(function(){De(),q({paged:!1}).then(function(e){0===e.data.code&&ge(e.data.data)})},[]);var Fe=function(){1===d.pageIndex?Se():f(function(e){var t=y()(e);return Object.assign(t,{pageIndex:1,pageRows:10})})};return r.a.createElement("div",null,r.a.createElement("div",{className:"scene-lib-page"},r.a.createElement(g.a,{title:"场景库管理",className:"title-box"},r.a.createElement("div",{className:"select-box"},r.a.createElement(p.a,{defaultValue:"1",style:{width:150},onChange:function(e){U(e),f(function(e){var t=y()(e);return Object.assign(t,{pageIndex:1,pageRows:10})})}},ye.map(function(e,t){return r.a.createElement(de,{key:e,value:t+1+""},e)}))),r.a.createElement(c.a,{layout:"inline",className:"scene-form",autoComplete:"off"},r.a.createElement("div",null,"1"===z&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"产品名称"},a("deviceTypeName",{})(r.a.createElement(o.a,{placeholder:"请输入产品名称",style:{width:240}}))),r.a.createElement(c.a.Item,{label:"产品ID"},a("defaultProductId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(r.a.createElement(o.a,{placeholder:"请输入产品ID",style:{width:240}})))),"2"===z&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"条件类型名称"},a("conditionOptionName",{})(r.a.createElement(o.a,{placeholder:"请输入条件类型名称",style:{width:240}})))),"3"===z&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"条件字典名称"},a("conditionName",{})(r.a.createElement(o.a,{placeholder:"请输入条件字典名称",style:{width:240}}))),r.a.createElement(c.a.Item,{label:"条件类型"},a("conditionTypeId",{})(r.a.createElement(p.a,{placeholder:"请选择条件类型",style:{width:240}},ie&&ie.map(function(e){return r.a.createElement(de,{key:e.conditionTypeId,value:e.conditionTypeId+""},e.conditionOptionName)}))))),"4"===z&&r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,{label:"能力名称"},a("aiName",{})(r.a.createElement(o.a,{placeholder:"请输入能力名称",style:{width:240}})))),r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{type:"primary",onClick:function(){return Fe()}},"查询")),r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{type:"default",onClick:function(){return t.resetFields(),void Fe()}},"重置"))),"1"!==z&&r.a.createElement("div",null,r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{type:"primary",onClick:function(){({2:function(){K(!0),H({})},3:function(){Z(!0),ne({}),De()},4:function(){qe(!0),xe({})}})[z]()}},"新增"))))),r.a.createElement(l.a,{className:"ModuleManagerListTable",style:{marginTop:10}},r.a.createElement(v.a,{rowKey:{1:"deviceTypeId",2:"conditionTypeId",3:"conditionId",4:"aiId"}[z],bordered:!0,columns:Ce[z],dataSource:j,loading:F,pagination:{defaultCurrent:1,current:d.pageIndex,onChange:function(e,t){f(function(a){var n=y()(a);return Object.assign(n,{pageIndex:t===d.pageRows?e:1,pageRows:t})})},pageSize:d.pageRows,total:b,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return r.a.createElement("span",null,"共 ",r.a.createElement("a",null,b)," 条")}}})),_&&r.a.createElement($,{visible:_,conditionTypeDetailData:G,handleOk:function(){K(!1),Se()},handleCancel:function(){return K(!1)}}),Y&&r.a.createElement(X,{visible:Y,dicConditionType:ie,unitList:me,conditionDicDetailData1:ae,handleOk:function(){Z(!1),Se()},handleCancel:function(){return Z(!1)}}),he&&r.a.createElement(ee,{visible:he,sceneProductDetail:Ie,handleOk:function(){Ee(!1)},handleCancel:function(){return Ee(!1)}}),ke&&r.a.createElement(ce,{visible:ke,aiAbilityDetail:Ne,handleCancel:function(){return qe(!1)},handleOk:function(){qe(!1),Se()}})))});t.default=function(e){var t=e.match;return r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"".concat(t.url,"/list"),component:ge}),r.a.createElement(i.a,{from:"".concat(t.url,"/"),to:"".concat(t.url,"/list")}))}}}]);