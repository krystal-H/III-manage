(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1428:function(e,t,a){},1513:function(e,t,a){"use strict";a.r(t);a(100);var n=a(43),r=(a(159),a(36)),l=(a(129),a(24)),c=(a(99),a(45)),i=(a(222),a(86)),o=(a(67),a(20)),u=a(106),d=a.n(u),s=(a(141),a(468),a(22),a(62),a(368),a(79),a(161),a(55),a(39),a(35),a(26),a(27),a(28),a(19),a(34),a(38),a(40),a(32),a(41),a(0)),p=a.n(s),m=a(463),f=a(97),y=a(33),b=(a(196),a(85)),v=(a(294),a(162)),E=(a(220),a(117)),O=(a(173),a(10)),h=(a(1428),a(471)),g=a(4),w="/manage-open",I=function(e){return g.c.request({url:w+"/product/getVoiceList",params:e,method:"get"})},j=function(e){return g.c.request({url:w+"/product/getVoiceApprove",method:"post",data:e,headers:{}})},k=function(e){return g.c.request({url:w+"/product/approveVoice",method:"post",data:e,headers:{}})};function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function x(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw l}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var P={1:"免开发方案",2:"独立MCU方案",3:"SoC方案",4:"成品接入方案",5:"操作系统方案"};var D=function(e){var t=e.visible,a=e.handleOk,n=e.handleCancel,r=e.productId,l=e.opeType,c=(C(Object(s.useState)({}),1)[0],C(Object(s.useState)([]),2)),i=c[0],u=c[1],m=C(Object(s.useState)([]),2),f=m[0],g=m[1],w=C(Object(s.useState)(!1),2),I=w[0],D=w[1],N=C(Object(s.useState)({}),2),T=N[0],R=N[1],F=C(Object(s.useState)(!1),2),z=F[0],A=F[1],V=C(Object(s.useState)(!1),2),J=V[0],L=V[1],q=C(Object(s.useState)({pageIndex:1,pageRows:1e8}),2),K=q[0],M=(q[1],C(Object(s.useState)(0),2)),_=(M[0],M[1]),H=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:100},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){var t=e&&JSON.parse(e);return[p.a.createElement("div",{title:t.desc},t.desc),t.examples.map(function(e,t){return p.a.createElement("span",{key:t,title:e},e,p.a.createElement("br",null))})]}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",width:"45%",render:function(e){return e.map(function(e,t){return p.a.createElement("span",{key:t,title:e},e,p.a.createElement("br",null))})}},{title:"操作状态",dataIndex:"operation",key:"operation",width:80,render:function(e){return p.a.createElement("span",null,0==e?"移除":1==e?"新增":"")}}];Object(s.useEffect)(function(){A(!0),Object(h.d)({productId:r}).then(function(e){R(e.data.data)}),j(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(a,!0).forEach(function(t){x(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({productId:r},K)).then(function(e){"detail"==l&&g(e.data.data.list),"approve"==l&&u(e.data.data.list.filter(function(e){return 0==e.status})),_(e.data.data.pager.totalRows)}).finally(function(){A(!1)})},[]);var Q,U=p.a.createElement("div",{className:"product_title_baseinfo_list"},p.a.createElement("div",null,p.a.createElement("div",null,"品类："),p.a.createElement("div",null,T.deviceTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品ID："),p.a.createElement("div",null,T.productId)),p.a.createElement("div",null,p.a.createElement("div",null,"通讯协议："),p.a.createElement("div",null,T.bindTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品编码："),p.a.createElement("div",null,T.productIdHex)),p.a.createElement("div",null,p.a.createElement("div",null,"产品密钥："),p.a.createElement("div",null,(Q=T.deviceKey,Q=I?Q:Object(y.m)(Q,10)),p.a.createElement("span",{onClick:function(){D(!I)},style:{cursor:"pointer"}}," ",p.a.createElement(O.a,{type:I?"eye-invisible":"eye",style:{fontSize:"14px"},theme:"twoTone",twoToneColor:"#2874FF"}))))),B=function(e){L(!0);var t={approveIdList:d()(i).map(function(e){return e.approveId}),status:e};k(t).then(function(e){E.a.success("提交成功"),a()}).finally(function(){return L(!1)})};return p.a.createElement(b.a,{title:"审核",width:1100,visible:t,onCancel:n,maskClosable:!1,wrapClassName:"add-scheme",footer:"detail"==l?null:[p.a.createElement(o.a,{key:"back",onClick:function(){return B(2)}},"审核不通过"),p.a.createElement(o.a,{key:"submit",type:"primary",loading:J,onClick:function(){return B(1)}},"审核通过")]},p.a.createElement("div",{className:"audit-detail-modal"},p.a.createElement("div",{className:"title"},T.productName,p.a.createElement("span",{className:"tag"},P[T.schemeType])),p.a.createElement("div",null,U),p.a.createElement("div",null,p.a.createElement(v.a,{rowKey:"approveId",loading:z,columns:H,dataSource:"approve"==l?i:f,pagination:!1,scroll:{y:340}}))))};function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function T(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(a,!0).forEach(function(t){R(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function R(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function F(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw l}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var z={0:"开发中",1:"已发布",2:"审核中"};t.default=l.a.create()(function(e){var t=e.form,a=t.getFieldDecorator,u=t.getFieldsValue,b=F(Object(s.useState)({pageIndex:1,pageRows:10}),2),v=b[0],E=b[1],O=F(Object(s.useState)([]),2),h=O[0],g=O[1],w=F(Object(s.useState)(!1),2),j=w[0],k=w[1],S=F(Object(s.useState)(0),2),x=S[0],C=S[1],P=F(Object(s.useState)(!1),2),N=P[0],R=P[1],A=F(Object(s.useState)(""),2),V=A[0],J=A[1],L=F(Object(s.useState)(""),2),q=L[0],K=L[1],M=[{title:"产品名称",dataIndex:"productName",key:"productName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"产品ID",dataIndex:"productId",key:"productId",width:"10%"},{title:"所属分类",dataIndex:"allCategoryName",key:"allCategoryName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"mode",key:"mode",width:"102px",render:function(e){return p.a.createElement("span",null,z[e]||"")}},{title:"创建账号",dataIndex:"email",key:"email",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"创建时间",dataIndex:"createTime",key:"createTime",width:180,render:function(e){var t=y.b.utc2beijing(e,"yyyy-MM-dd hh:mm:ss");return p.a.createElement("span",{title:t},t)}},{title:"审核状态",dataIndex:"status",key:"status",render:function(e){return p.a.createElement("span",{style:{color:["","#0000ff",""][e]}},1===e?"已审核":2===e?"待审核":"-")}},{title:"操作",dataIndex:"operation",key:"operation",render:function(e,t){return p.a.createElement("div",null,0===t.status&&"-",1===t.status&&p.a.createElement(i.a,{placement:"top",title:"查看"},p.a.createElement(o.a,{icon:"info",shape:"circle",size:"small",onClick:function(){return _(t,"detail")}})),2===t.status&&p.a.createElement(i.a,{placement:"top",title:"审核"},p.a.createElement(o.a,{icon:"file-done",shape:"circle",size:"small",type:"primary",onClick:function(){return _(t,"approve")}})))}}],_=function(e,t){R(!0),K(t),J(e.productId)},H=function(){1===v.pageIndex?Q():E({pageIndex:1,pageRows:10})},Q=function(){k(!0);var e=u(),t=e.productId,a=e.mode,n=T({productId:t?Number(t):"",mode:a},v);I(T({},n)).then(function(e){g(e.data.data.list),C(e.data.data.pager.totalRows)}).finally(function(){k(!1)})};return Object(s.useEffect)(function(){Q()},[v.pageRows,v.pageIndex]),p.a.createElement("div",null,p.a.createElement(m.a,{title:"语音方案审核"},p.a.createElement(l.a,{layout:"inline",autoComplete:"off"},p.a.createElement(l.a.Item,{label:"产品ID"},a("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(p.a.createElement(c.a,{placeholder:"请输入产品ID",style:{width:240}}))),p.a.createElement(l.a.Item,{label:"状态"},a("mode")(p.a.createElement(r.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(z).map(function(e,t){return p.a.createElement(r.a.Option,{key:t,value:+e},z[e])})))),p.a.createElement(l.a.Item,null,p.a.createElement(o.a,{type:"primary",onClick:function(){return H()}},"查询")),p.a.createElement(l.a.Item,null,p.a.createElement(o.a,{onClick:function(){return t.resetFields(),void H()}},"重置")))),p.a.createElement(n.a,null,p.a.createElement(f.a,{rowKey:"productId",columns:M,dataSource:h,pager:v,loading:j,pagination:{defaultCurrent:1,current:v.pageIndex,onChange:function(e,t){E(function(a){var n=d()(a);return Object.assign(n,{pageIndex:t===v.pageRows?e:1,pageRows:t})})},pageSize:v.pageRows,total:x,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return p.a.createElement("span",null,"共 ",p.a.createElement("a",null,x)," 条")}}})),N&&p.a.createElement(D,{opeType:q,productId:V,visible:N,handleOk:function(){R(!1),Q()},handleCancel:function(){R(!1)}}))})}}]);