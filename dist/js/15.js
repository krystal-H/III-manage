(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1382:function(e,t,n){"use strict";n.d(t,"d",function(){return r}),n.d(t,"f",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return u}),n.d(t,"a",function(){return l});var a=n(4),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a.c.request({url:"/manage-open/manage/commodity/getCommodityList",method:"post",data:e,headers:{}})},o=function(e){return a.c.request({url:"/manage-open/manage/commodity/publicCommodity",method:"post",data:e,headers:{}})},c=function(e){return a.c.request({url:"/manage-open/manage/commodity/onOrOffCommodity",method:"post",data:e,headers:{}})},i=function(e){return a.c.request({url:"/manage-open/manage/commodity/getPublicProductByProductId/"+e,method:"get",headers:{}})},u=function(e){return a.c.request({url:"/manage-open/manage/commodity/getCommodityByCommodityId/"+e,method:"get",headers:{}})},l=function(e){return a.c.request({url:"/manage-open/manage/commodity/updateCommodityStock",data:e,method:"post",headers:{}})}},1383:function(e,t,n){},1471:function(e,t,n){"use strict";n.r(t);n(121);var a=n(58),r=(n(94),n(38)),o=(n(281),n(155)),c=(n(72),n(21)),i=(n(243),n(134)),u=(n(210),n(90)),l=(n(142),n(33)),d=(n(98),n(245),n(23),n(62),n(438),n(244),n(1337),n(166),n(168),n(36),n(26),n(27),n(28),n(19),n(35),n(0)),m=n.n(d),s=n(1382);n(1383);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var p=l.a.Item;t.default=l.a.create()(function(e){var t=e.form,n=(e.match,e.history),y=f(Object(d.useState)({pageIndex:1,pageRows:10}),2),g=y[0],h=y[1],E=t.getFieldDecorator,k=t.validateFields,b=(t.getFieldsValue,f(Object(d.useState)(0),2)),v=b[0],x=b[1],S=f(Object(d.useState)([]),2),I=S[0],O=S[1],w=f(Object(d.useState)(!1),2),C=w[0],N=w[1],j=f(Object(d.useState)(!1),2),R=(j[0],j[1],f(Object(d.useState)({}),2)),J=R[0],P=R[1],q=f(Object(d.useState)(!1),2),F=q[0],V=q[1],B=f(Object(d.useState)(!1),2);B[0],B[1],Object(d.useEffect)(function(){T()},[g.pageRows,g.pageIndex]);var T=function(){V(!0),Object(s.d)(g).then(function(e){0==e.data.code&&(O(e.data.data.records),x(e.data.data.total))}).finally(function(){V(!1)})},A=function(e,t){var n=1==t?"是否上架商品":"是否下架商品";u.a.confirm({title:"确认",okText:"确定",cancelText:"取消",content:n,onOk:function(){Object(s.e)({commodityId:e,status:t}).then(function(e){var n=1==t?"上架成功":"下架成功";0==e.data.code&&(i.a.success(n),T())})}})},D=[{title:"商品名称",dataIndex:"commodityName",key:"commodityName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"品牌",dataIndex:"commodityBrand",key:"commodityBrand",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"商品型号",dataIndex:"commodityModel",key:"commodityModel",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"缩略图",dataIndex:"commodityPicture",key:"commodityPicture",render:function(e){if(e){var t=e.split(",")[0];return m.a.createElement("img",{src:t,style:{width:"30px"}})}return""}},{title:"所属类别",dataIndex:"commodityClassifyName",key:"commodityClassifyName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"平台产品ID",dataIndex:"productId",key:"productId",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"产品价格",dataIndex:"commodityPrice",key:"commodityPrice",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"库存",dataIndex:"currentStock",key:"currentStock",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"已售出",dataIndex:"selledStock",key:"selledStock"},{title:"状态",dataIndex:"status",key:"status",render:function(e){return m.a.createElement("span",null,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=["下架","在售","售罄","未上架"];return t[e]}(e))}},{title:"操作",key:"action",width:300,render:function(e,t){return m.a.createElement("span",null,m.a.createElement("a",{onClick:function(){M(t)},style:{marginRight:"10px"}},"查看"),-1==[0,3].indexOf(t.status)&&m.a.createElement(m.a.Fragment,null,m.a.createElement("a",{onClick:function(){A(t.id,0)},style:{marginRight:"10px"}},"下架商品"),m.a.createElement("a",{onClick:function(){z(t)}},"补充库存")),-1!=[0,3].indexOf(t.status)&&m.a.createElement("a",{onClick:function(){A(t.id,1)}},"上架商品"))}}],M=function(e){n.push("/mall/productInfo/".concat(e.id))},z=function(e){P(e),N(!0)};return m.a.createElement("div",{className:"mall-product-page"},m.a.createElement(r.a,null,m.a.createElement("div",{className:"mall-product-top"},m.a.createElement(c.a,{type:"primary",onClick:function(){n.push("/mall/productInfo")}},"新增商品")),m.a.createElement(o.a,{rowKey:"id",columns:D,dataSource:I,loading:F,pagination:{defaultCurrent:1,current:g.pageIndex,onChange:function(e,t){t===g.pageRows?h(function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})}):h(function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})})},pageSize:g.pageRows,total:v,showQuickJumper:!0,showTotal:function(){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,v)," 条")}}})),C&&m.a.createElement(u.a,{title:"库存信息",visible:C,onOk:function(){k().then(function(e){var t={id:J.id,currentStock:Number(J.currentStock)+Number(e.classifyValue),maxStock:Number(J.currentStock)+Number(e.classifyValue)+Number(J.selledStock)};Object(s.a)(t).then(function(e){0==e.data.code&&(i.a.success("补给成功"),N(!1),T())})})},onCancel:function(){N(!1)}},m.a.createElement(l.a,{labelCol:{span:6},wrapperCol:{span:14}},m.a.createElement(p,{label:"产品名称"},m.a.createElement("div",null,m.a.createElement("span",{style:{marginRight:"30px"}},J.commodityName),m.a.createElement("span",{style:{marginRight:"10px"}},"现有库存"),m.a.createElement("span",null,J.currentStock))),m.a.createElement(p,{label:"本次补充"},E("classifyValue",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(m.a.createElement(a.a,null))))))})}}]);