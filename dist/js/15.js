(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1387:function(e,t,n){"use strict";n.d(t,"d",function(){return r}),n.d(t,"f",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"b",function(){return i}),n.d(t,"a",function(){return l});var a=n(4),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a.c.request({url:"/manage-open/manage/commodity/getCommodityList",method:"post",data:e,headers:{}})},o=function(e){return a.c.request({url:"/manage-open/manage/commodity/publicCommodity",method:"post",data:e,headers:{}})},c=function(e){return a.c.request({url:"/manage-open/manage/commodity/onOrOffCommodity",method:"post",data:e,headers:{}})},u=function(e){return a.c.request({url:"/manage-open/manage/commodity/getPublicProductByProductId/"+e,method:"get",headers:{}})},i=function(e){return a.c.request({url:"/manage-open/manage/commodity/getCommodityByCommodityId/"+e,method:"get",headers:{}})},l=function(e){return a.c.request({url:"/manage-open/manage/commodity/updateCommodityStock",data:e,method:"post",headers:{}})}},1406:function(e,t,n){},1533:function(e,t,n){"use strict";n.r(t);n(100);var a=n(43),r=(n(293),n(162)),o=(n(67),n(20)),c=(n(99),n(45)),u=(n(220),n(117)),i=(n(196),n(85)),l=(n(129),n(24)),d=(n(79),n(221),n(1355),n(22),n(62),n(367),n(105),n(141),n(35),n(26),n(27),n(28),n(19),n(34),n(39),n(38),n(40),n(32),n(41),n(0)),m=n.n(d),s=n(1387),p=(n(161),l.a.Item),f={labelCol:{span:6},wrapperCol:{span:14}};var g=l.a.create()(function(e){var t=e.form,n=e.supplyVis,a=e.confirmSupply,r=e.cancelSupply,o=e.actionData,d=t.getFieldDecorator,g=t.validateFields;return t.getFieldsValue,m.a.createElement(i.a,{title:"库存信息",visible:n,onOk:function(){g().then(function(e){var t={id:o.id,currentStock:Number(o.currentStock)+Number(e.classifyValue),maxStock:Number(o.currentStock)+Number(e.classifyValue)+Number(o.selledStock)};Object(s.a)(t).then(function(e){0==e.data.code&&(u.a.success("补给成功"),a())})})},onCancel:r},m.a.createElement(l.a,f,m.a.createElement(p,{label:"产品名称"},m.a.createElement("div",null,m.a.createElement("span",{style:{marginRight:"30px"}},o.commodityName),m.a.createElement("span",{style:{marginRight:"10px"}},"现有库存"),m.a.createElement("span",null,o.currentStock))),m.a.createElement(p,{label:"本次补充"},d("classifyValue",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(m.a.createElement(c.a,null)))))});n(1406);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach(function(t){h(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(a=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==u.return||u.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var O=l.a.Item;t.default=l.a.create()(function(e){var t=e.form,n=(e.match,e.history),p=E(Object(d.useState)({pageIndex:1,pageRows:10}),2),f=p[0],y=p[1],h=t.getFieldDecorator,v=(t.validateFields,t.getFieldsValue),w=t.resetFields,k=E(Object(d.useState)(0),2),I=k[0],S=k[1],x=E(Object(d.useState)([]),2),j=x[0],N=x[1],C=E(Object(d.useState)(!1),2),P=C[0],R=C[1],F=E(Object(d.useState)({}),2),D=F[0],V=F[1],J=E(Object(d.useState)(!1),2),q=J[0],T=J[1];Object(d.useEffect)(function(){},[f.pageRows,f.pageIndex]);var A=function(){var e=v();e.productId&&(e.productId=Number(e.productId));var t=b(b({},e),f);T(!0),Object(s.d)(t).then(function(e){0===e.data.code&&(N(e.data.data.records),S(e.data.data.total))}).finally(function(){T(!1)})},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=["下架","在售","售罄","未上架"];return t[e]},L=function(e,t){var n=1==t?"是否上架商品":"是否下架商品";i.a.confirm({title:"确认",okText:"确定",cancelText:"取消",content:n,onOk:function(){Object(s.e)({commodityId:e,status:t}).then(function(e){var n=1==t?"上架成功":"下架成功";0==e.data.code&&(u.a.success(n),A())})}})},M=[{title:"模组型号",key:"hetModuleTypeName",dataIndex:"hetModuleTypeName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"模组IC型号",key:"moduleName",dataIndex:"moduleName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"尺寸",key:"ww",dataIndex:"ww",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"生产厂商",key:"brandName",dataIndex:"brandName"},{title:"使用范围",key:"brandName2",dataIndex:"brandName2"},{title:"状态",dataIndex:"status",key:"status",render:function(e){return m.a.createElement("span",{title:B(e)},B(e))}},{title:"操作",key:"action",width:300,render:function(e,t){return m.a.createElement("span",null,-1==[0,3].indexOf(t.status)&&m.a.createElement(m.a.Fragment,null,m.a.createElement("a",{onClick:function(){z(t,!1)},style:{marginRight:"10px"}},"查看"),m.a.createElement("a",{onClick:function(){L(t.id,0)},style:{marginRight:"10px"}},"下架商品"),m.a.createElement("a",{onClick:function(){K(t)}},"补充库存")),-1!=[0,3].indexOf(t.status)&&m.a.createElement(m.a.Fragment,null,m.a.createElement("a",{onClick:function(){z(t,!0)},style:{marginRight:"10px"}},"编辑"),m.a.createElement("a",{onClick:function(){L(t.id,1)}},"上架商品")))}}],z=function(e,t){n.push("/mall/moduleOnlineInfo?id=".concat(e.id,"&&isEdit=").concat(t))},K=function(e){V(e),R(!0)};return m.a.createElement("div",{className:"mall-product-page"},m.a.createElement(a.a,null,m.a.createElement("div",{className:"mall-product-top"},m.a.createElement(l.a,{layout:"inline"},m.a.createElement(l.a.Item,{label:"关键字"},h("moduleName",{})(m.a.createElement(c.a,{placeholder:"请输入生产厂商或模组型号",style:{width:260},maxLength:20}))),m.a.createElement(O,null,m.a.createElement(o.a,{type:"primary",onClick:function(){1===f.pageIndex?A():y({pageIndex:1,pageRows:10})}},"查询")),m.a.createElement(O,null,m.a.createElement(o.a,{onClick:function(){w()}},"重置"))),m.a.createElement(o.a,{type:"primary",onClick:function(){n.push("/mall/moduleOnlineInfo")}},"新增模组")),m.a.createElement(r.a,{rowKey:"id",columns:M,dataSource:j,loading:q,bordered:!0,pagination:{defaultCurrent:1,current:f.pageIndex,onChange:function(e,t){t===f.pageRows?y(function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})}):y(function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})})},pageSize:f.pageRows,total:I,showQuickJumper:!0,showTotal:function(){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,I)," 条")}}})),P&&m.a.createElement(g,{cancelSupply:function(){R(!1)},confirmSupply:function(){R(!1),A()},supplyVis:P,actionData:D}))})}}]);