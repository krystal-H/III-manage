(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1471:function(e,t,a){},1573:function(e,t,a){"use strict";a.r(t);a(18),a(35),a(36),a(26),a(27),a(28),a(113),a(122),a(134),a(41),a(39),a(43),a(32),a(44),a(104);var n=a(46),r=(a(69),a(19)),l=(a(158),a(37)),o=(a(223),a(123)),c=(a(200),a(85)),u=(a(133),a(23)),i=(a(143),a(21),a(67),a(486),a(58),a(0)),d=a.n(i),s=a(485),p=a(3),f=a(97),m=(a(33),a(1471),a(510),a(353)),y=(a(103),a(48)),g=(a(227),a(307),a(189)),b=a.n(g);function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var E=u.a.Item,v=l.a.Option;y.a.Search;var O=u.a.create()((function(e){var t=e.form,a=e.addVis,n=e.handleCancel,r=e.handleOk,s=e.modelType,f=e.actionData,g=e.optionList,h=t.getFieldDecorator,O=t.validateFields,I=t.setFieldsValue,k=t.getFieldValue,j=w(Object(i.useState)({}),2),S=j[0],C=j[1],N=w(Object(i.useState)([]),2),T=N[0],x=N[1],M=w(Object(i.useState)(!1),2),A=M[0],D=M[1];Object(i.useEffect)((function(){"edit"===s&&P()}),[]);var P=function(){x([f]),C(f),I({gatewayType:f.gatewayType,productMark:f.productMark,productId:f.productId.toString()})},F={labelCol:{span:6},wrapperCol:{span:14}};function R(e){if(e){var t,a={productName:e,pageRows:999};D(!0),x([]),(t=a,p.c.request({url:"/manage-open/gatewayManage/getProductListByPage",data:t,method:"post",headers:{}})).then((function(e){0===e.data.code&&(e.data.data.list.forEach((function(e){e.productid=e.productId})),D(!1),x(e.data.data.list||[]))}))}}return R=b()(R,800),d.a.createElement("div",null,d.a.createElement(c.a,{title:"edit"===s?"编辑":"新增",visible:a,onOk:function(){O().then((function(e){var t={};t.gatewayType=e.gatewayType;var a,n=g.find((function(t){return t.value===e.gatewayType}));t.gatewayName=n.label,t.productName=S.productName,t.productCode=S.productCode,t.brandName=S.brandName,t.productId=S.productId,t.productMark=e.productMark,"edit"===s?(t={id:f.id,productMark:e.productMark},(a=t,p.c.request({url:"/manage-open/gatewayManage/modifyGatewayInfo",method:"post",data:a,headers:{}})).then((function(e){0===e.data.code&&(o.a.success("更新成功"),r())}))):function(e){return p.c.request({url:"/manage-open/gatewayManage/addGatewayInfo",method:"post",data:e,headers:{}})}(t).then((function(e){0===e.data.code&&(o.a.success("新增成功"),r())}))}))},onCancel:n,width:"700px",maskClosable:!1},d.a.createElement("div",{className:"gateWay-modal"},d.a.createElement(u.a,F,d.a.createElement(E,{label:"网关名称"},h("gatewayType",{rules:[{required:!0,message:"请选择网关"}]})(d.a.createElement(l.a,{disabled:"edit"===s},g.map((function(e,t){return d.a.createElement(l.a.Option,{key:e.value,value:e.value,label:e.label},e.label)}))))),d.a.createElement(E,{label:"网关ID"},d.a.createElement("span",null,k("gatewayType"))),d.a.createElement(E,{label:"产品名称"},h("productId",{rules:[{required:!0,message:"请输入产品名称"}]})(d.a.createElement(l.a,{disabled:"edit"===s,showSearch:!0,placeholder:"输入产品名称",notFoundContent:A?d.a.createElement(m.a,{size:"small"}):null,filterOption:!1,onSearch:R,onChange:function(e){var t=T.find((function(t){return t.productId==e}));C(t),D(!1)},style:{width:"100%"}},T.map((function(e){return d.a.createElement(v,{key:e.productId},e.productName)}))))),d.a.createElement(E,{label:"产品型号"},d.a.createElement("span",null,S.productCode)),d.a.createElement(E,{label:"品牌"},d.a.createElement("span",null,S.brandName)),d.a.createElement(E,{label:"产品ID"},d.a.createElement("span",null,S.productId)),d.a.createElement(E,{label:"产品标识"},h("productMark",{})(d.a.createElement(y.a,{style:{width:"100%"}})))))))}));function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach((function(t){j(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function j(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var N=u.a.Item,T=[{value:11133,label:"IOT路由器"},{value:7710,label:"ZigBee3.0网关"},{value:12306,label:"网关物模型测试"}];t.default=u.a.create()((function(e){var t=e.form,a=t.getFieldDecorator,m=(t.validateFields,t.getFieldsValue),y=S(Object(i.useState)({pageIndex:1,pageRows:10}),2),g=y[0],b=y[1],w=S(Object(i.useState)(0),2),h=w[0],E=w[1],v=S(Object(i.useState)([]),2),I=v[0],j=v[1],C=S(Object(i.useState)(T),2),x=C[0],M=(C[1],S(Object(i.useState)(!1),2)),A=M[0],D=M[1],P=S(Object(i.useState)({}),2),F=P[0],R=(P[1],S(Object(i.useState)(""),2)),q=R[0],J=R[1],V=S(Object(i.useState)(!1),2),G=V[0],L=V[1],B=[{title:"网关名称",dataIndex:"gatewayName",key:"gatewayName",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"网关ID",dataIndex:"gatewayType",key:"gatewayType",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"产品名称",dataIndex:"productName",key:"productName",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"产品型号",dataIndex:"productCode",key:"productCode",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"品牌",dataIndex:"brandName",key:"brandName",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"产品ID",dataIndex:"productId",key:"productId",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"产品标识",dataIndex:"productMark",key:"productMark",render:function(e){return d.a.createElement("span",{title:e},e)}},{title:"操作",key:"action",width:180,render:function(e,t){return d.a.createElement("span",null,d.a.createElement("a",{onClick:function(){z(t)}},"删除"))}}],z=function(e){c.a.confirm({title:"删除",okText:"确定",cancelText:"取消",content:"点击确定将删除此数据。",onOk:function(){(function(e){return p.c.request({url:"/manage-open/gatewayManage/deleteGatewayInfo",method:"post",data:e,headers:{}})})({id:e.id}).then((function(e){o.a.success("删除成功"),U()}))}})};Object(i.useEffect)((function(){U()}),[g.pageRows,g.pageIndex]);var U=function(){var e={};m().gatewayType&&(e.gatewayType=m().gatewayType),e=k(k({},e),g),L(!0),function(e){return p.c.request({url:"/manage-open/gatewayManage/getGatewayListByPage",data:e,method:"post",headers:{}})}(e).then((function(e){0==e.data.code&&(j(e.data.data.list),E(e.data.data.pager.totalRows))})).finally((function(){L(!1)}))},$=function(){1===g.pageIndex?U():b({pageIndex:1,pageRows:10})};return d.a.createElement("div",{className:"gatelMn-page"},d.a.createElement(s.a,{title:"网关子设备"},d.a.createElement("div",{className:"title-space"},d.a.createElement(u.a,{layout:"inline"},d.a.createElement(N,{label:"网关名称"},a("gatewayType")(d.a.createElement(l.a,{style:{width:200},allowClear:!0},x.map((function(e,t){return d.a.createElement(l.a.Option,{key:e.value,value:e.value,label:e.label},e.label)}))))),d.a.createElement(N,null,d.a.createElement(r.a,{type:"primary",onClick:function(){return $()}},"查询")),d.a.createElement(N,null,d.a.createElement(r.a,{onClick:function(){t.resetFields()}},"重置"))),d.a.createElement(r.a,{type:"primary",onClick:function(){J("add"),D(!0)}},"新增子设备"))),d.a.createElement(n.a,null,d.a.createElement(f.a,{rowKey:"id",columns:B,dataSource:I,loading:G,pagination:{defaultCurrent:1,current:g.pageIndex,onChange:function(e,t){t===g.pageRows?b((function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})})):b((function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})}))},pageSize:g.pageRows,total:h,showQuickJumper:!0,showTotal:function(){return d.a.createElement("span",null,"共 ",d.a.createElement("a",null,h)," 条")}}})),A&&d.a.createElement(O,{addVis:A,handleCancel:function(){D(!1)},handleOk:function(){$(),D(!1)},optionList:x,modelType:q,actionData:F}))}))}}]);