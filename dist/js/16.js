(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1387:function(e,t,n){"use strict";n.d(t,"d",function(){return r}),n.d(t,"f",function(){return c}),n.d(t,"e",function(){return o}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return l}),n.d(t,"a",function(){return u});var a=n(4),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a.c.request({url:"/manage-open/manage/commodity/getCommodityListByPage",method:"post",data:e,headers:{}})},c=function(e){return a.c.request({url:"/manage-open/manage/commodity/publicCommodity",method:"post",data:e,headers:{}})},o=function(e){return a.c.request({url:"/manage-open/manage/commodity/onOrOffCommodity",method:"post",data:e,headers:{}})},i=function(e){return a.c.request({url:"/manage-open/manage/commodity/getPublicProductByProductId/"+e,method:"get",headers:{}})},l=function(e){return a.c.request({url:"/manage-open/manage/commodity/getCommodityByCommodityId/"+e,method:"get",headers:{}})},u=function(e){return a.c.request({url:"/manage-open/manage/commodity/updateCommodityStock",data:e,method:"post",headers:{}})}},1404:function(e,t,n){},1532:function(e,t,n){"use strict";n.r(t);n(100);var a=n(43),r=(n(293),n(162)),c=(n(67),n(20)),o=(n(99),n(45)),i=(n(220),n(117)),l=(n(196),n(85)),u=(n(129),n(24)),d=(n(79),n(221),n(1355),n(22),n(62),n(367),n(160),n(105),n(141),n(161),n(35),n(26),n(27),n(28),n(19),n(34),n(39),n(38),n(40),n(32),n(41),n(0)),m=n.n(d),s=n(1387),p=u.a.Item,f={labelCol:{span:6},wrapperCol:{span:14}};var y=u.a.create()(function(e){var t=e.form,n=e.supplyVis,a=e.confirmSupply,r=e.cancelSupply,c=e.actionData,d=t.getFieldDecorator,y=t.validateFields;return t.getFieldsValue,m.a.createElement(l.a,{title:"库存信息",visible:n,onOk:function(){y().then(function(e){var t={id:c.id,currentStock:Number(c.currentStock)+Number(e.classifyValue),maxStock:Number(c.currentStock)+Number(e.classifyValue)+Number(c.selledStock)};Object(s.a)(t).then(function(e){0==e.data.code&&(i.a.success("补给成功"),a())})})},onCancel:r},m.a.createElement(u.a,f,m.a.createElement(p,{label:"产品名称"},m.a.createElement("div",null,m.a.createElement("span",{style:{marginRight:"30px"}},c.commodityName),m.a.createElement("span",{style:{marginRight:"10px"}},"现有库存"),m.a.createElement("span",null,c.currentStock))),m.a.createElement(p,{label:"本次补充"},d("classifyValue",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(m.a.createElement(o.a,null)))))});n(1404);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach(function(t){b(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var v=u.a.Item;t.default=u.a.create()(function(e){var t=e.form,n=(e.match,e.history),p=h(Object(d.useState)({pageIndex:1,pageRows:10}),2),f=p[0],g=p[1],b=t.getFieldDecorator,O=(t.validateFields,t.getFieldsValue),k=t.resetFields,I=h(Object(d.useState)(0),2),w=I[0],S=I[1],x=h(Object(d.useState)([]),2),j=x[0],C=x[1],N=h(Object(d.useState)(!1),2),P=N[0],R=N[1],F=h(Object(d.useState)({}),2),D=F[0],V=F[1],J=h(Object(d.useState)(!1),2),q=J[0],B=J[1];Object(d.useEffect)(function(){T()},[f.pageRows,f.pageIndex]);var T=function(){var e=O();e.productId&&(e.productId=Number(e.productId));var t=E(E({},e),f);B(!0),Object(s.d)(t).then(function(e){0===e.data.code&&(C(e.data.data.list),S(e.data.data.pager.totalRows))}).finally(function(){B(!1)})},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=["下架","在售","售罄","未上架"];return t[e]},M=function(e,t){var n=1==t?"是否上架商品":"是否下架商品";l.a.confirm({title:"确认",okText:"确定",cancelText:"取消",content:n,onOk:function(){Object(s.e)({commodityId:e,status:t}).then(function(e){var n=1==t?"上架成功":"下架成功";0==e.data.code&&(i.a.success(n),T())})}})},z=[{title:"商品名称",dataIndex:"commodityName",key:"commodityName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"品牌",dataIndex:"commodityBrand",key:"commodityBrand",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"商品型号",dataIndex:"commodityModel",key:"commodityModel",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"缩略图",dataIndex:"commodityPicture",key:"commodityPicture",render:function(e){if(e){var t=e.split(",")[0];return m.a.createElement("img",{src:t,style:{width:"30px"}})}return""}},{title:"所属类别",dataIndex:"commodityClassifyName",key:"commodityClassifyName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"平台产品ID",dataIndex:"productId",key:"productId",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"产品价格",dataIndex:"commodityRealPrice",key:"commodityRealPrice",render:function(e){return m.a.createElement("span",{title:e/100},e/100)}},{title:"库存",dataIndex:"currentStock",key:"currentStock",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"已售出",dataIndex:"selledStock",key:"selledStock"},{title:"状态",dataIndex:"status",key:"status",render:function(e){return m.a.createElement("span",{title:A(e)},A(e))}},{title:"操作",key:"action",width:300,render:function(e,t){return m.a.createElement("span",null,-1==[0,3].indexOf(t.status)&&m.a.createElement(m.a.Fragment,null,m.a.createElement("a",{onClick:function(){K(t,!1)},style:{marginRight:"10px"}},"查看"),m.a.createElement("a",{onClick:function(){M(t.id,0)},style:{marginRight:"10px"}},"下架商品"),m.a.createElement("a",{onClick:function(){L(t)}},"补充库存")),-1!=[0,3].indexOf(t.status)&&m.a.createElement(m.a.Fragment,null,m.a.createElement("a",{onClick:function(){K(t,!0)},style:{marginRight:"10px"}},"编辑"),m.a.createElement("a",{onClick:function(){M(t.id,1)}},"上架商品")))}}],K=function(e,t){n.push("/mall/productInfo?id=".concat(e.id,"&&isEdit=").concat(t))},L=function(e){V(e),R(!0)};return m.a.createElement("div",{className:"mall-product-page"},m.a.createElement(a.a,null,m.a.createElement("div",{className:"mall-product-top"},m.a.createElement(u.a,{layout:"inline"},m.a.createElement(v,{label:"产品ID"},b("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(m.a.createElement(o.a,null))),m.a.createElement(v,{label:"品牌名"},b("commodityBrand")(m.a.createElement(o.a,null))),m.a.createElement(v,{label:"分类名"},b("commodityClassifyName")(m.a.createElement(o.a,null))),m.a.createElement(v,null,m.a.createElement(c.a,{type:"primary",onClick:function(){1===f.pageIndex?T():g({pageIndex:1,pageRows:10})}},"查询")),m.a.createElement(v,null,m.a.createElement(c.a,{onClick:function(){k()}},"重置"))),m.a.createElement(c.a,{type:"primary",onClick:function(){n.push("/mall/productInfo")}},"新增商品")),m.a.createElement(r.a,{rowKey:"id",columns:z,dataSource:j,loading:q,bordered:!0,pagination:{defaultCurrent:1,current:f.pageIndex,onChange:function(e,t){t===f.pageRows?g(function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})}):g(function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})})},pageSize:f.pageRows,total:w,showQuickJumper:!0,showTotal:function(){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,w)," 条")}}})),P&&m.a.createElement(y,{cancelSupply:function(){R(!1)},confirmSupply:function(){R(!1),T()},supplyVis:P,actionData:D}))})}}]);