(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1417:function(e,t,a){},1499:function(e,t,a){"use strict";a.r(t);a(94);var n=a(38),r=(a(188),a(75)),l=(a(142),a(33)),i=(a(121),a(58)),c=(a(211),a(81)),o=(a(72),a(21)),u=a(1330),d=a.n(u),s=(a(166),a(1337),a(23),a(62),a(438),a(98),a(168),a(64),a(37),a(36),a(26),a(27),a(28),a(19),a(35),a(34),a(39),a(32),a(40),a(0)),p=a.n(s),m=a(436),f=a(91),y=a(31),E=(a(210),a(90)),v=(a(281),a(155)),b=(a(243),a(134)),h=(a(167),a(10)),I=(a(1417),a(444)),g=a(4),w="/manage-open",O=function(e){return g.c.request({url:w+"/product/getVoiceList",params:e,method:"get"})},k=function(e){return g.c.request({url:w+"/product/getVoiceApprove",method:"post",data:e,headers:{}})},j=function(e){return g.c.request({url:w+"/product/approveVoice",method:"post",data:e,headers:{}})};function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw l}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var S=function(e){var t=e.visible,a=e.handleOk,n=e.handleCancel,r=e.productId,l=e.opeType,i=(x(Object(s.useState)({}),1)[0],x(Object(s.useState)([]),2)),c=i[0],u=i[1],m=x(Object(s.useState)([]),2),f=m[0],g=m[1],w=x(Object(s.useState)(!1),2),O=w[0],S=w[1],C=x(Object(s.useState)({}),2),N=C[0],D=C[1],T=x(Object(s.useState)(!1),2),P=T[0],R=T[1],F=x(Object(s.useState)(!1),2),z=F[0],A=F[1],V=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:100},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",width:"45%",render:function(e){return e.map(function(e,t){return p.a.createElement("span",{key:t,title:e},e,p.a.createElement("br",null))})}},{title:"操作状态",dataIndex:"operation",key:"operation",width:80,render:function(e){return p.a.createElement("span",null,0==e?"移除":1==e?"新增":"")}}];Object(s.useEffect)(function(){R(!0),Object(I.d)({productId:r}).then(function(e){D(e.data.data)}),k({productId:r}).then(function(e){"detail"==l&&g(e.data.data.list),"approve"==l&&u(e.data.data.list.filter(function(e){return 0==e.status}))}).finally(function(){R(!1)})},[]);var L,q=p.a.createElement("div",{className:"product_title_baseinfo_list"},p.a.createElement("div",null,p.a.createElement("div",null,"品类："),p.a.createElement("div",null,N.deviceTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品ID："),p.a.createElement("div",null,N.productId)),p.a.createElement("div",null,p.a.createElement("div",null,"通讯协议："),p.a.createElement("div",null,N.bindTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品编码："),p.a.createElement("div",null,N.productIdHex)),p.a.createElement("div",null,p.a.createElement("div",null,"产品密钥："),p.a.createElement("div",null,(L=N.deviceKey,L=O?L:Object(y.m)(L,10)),p.a.createElement("span",{onClick:function(){S(!O)},style:{cursor:"pointer"}}," ",p.a.createElement(h.a,{type:O?"eye-invisible":"eye",style:{fontSize:"14px"},theme:"twoTone",twoToneColor:"#2874FF"}))))),J=function(e){A(!0);var t={approveIdList:d()(c).map(function(e){return e.approveId}),status:e};j(t).then(function(e){b.a.success("提交成功"),a()}).finally(function(){return A(!1)})};return p.a.createElement(E.a,{title:"审核",width:1100,visible:t,onCancel:n,maskClosable:!1,wrapClassName:"add-scheme",footer:"detail"==l?null:[p.a.createElement(o.a,{key:"back",onClick:function(){return J(2)}},"审核不通过"),p.a.createElement(o.a,{key:"submit",type:"primary",loading:z,onClick:function(){return J(1)}},"审核通过")]},p.a.createElement("div",{className:"audit-detail-modal"},p.a.createElement("div",{className:"title"},"睡眠监测器",p.a.createElement("span",{className:"tag"},"免开发方案")),p.a.createElement("div",null,q),p.a.createElement("div",null,p.a.createElement(v.a,{rowKey:"approveId",loading:P,columns:V,dataSource:"approve"==l?c:f,pagination:!1,scroll:{y:340}}))))};function C(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?C(a,!0).forEach(function(t){D(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):C(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw l}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var P={0:"开发中",1:"已发布",2:"审核中"};t.default=l.a.create()(function(e){var t=e.form,a=t.getFieldDecorator,u=t.getFieldsValue,E=T(Object(s.useState)({pageIndex:1,pageRows:10}),2),v=E[0],b=E[1],h=T(Object(s.useState)([]),2),I=h[0],g=h[1],w=T(Object(s.useState)(!1),2),k=w[0],j=w[1],x=T(Object(s.useState)(0),2),C=x[0],D=x[1],R=T(Object(s.useState)(!1),2),F=R[0],z=R[1],A=T(Object(s.useState)(""),2),V=A[0],L=A[1],q=T(Object(s.useState)(""),2),J=q[0],K=q[1],_=[{title:"产品名称",dataIndex:"productName",key:"productName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"产品ID",dataIndex:"productId",key:"productId",width:"10%"},{title:"所属分类",dataIndex:"allCategoryName",key:"allCategoryName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"mode",key:"mode",width:"102px",render:function(e){return p.a.createElement("span",null,P[e]||"")}},{title:"创建账号",dataIndex:"email",key:"email",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"创建时间",dataIndex:"createTime",key:"createTime",width:180,render:function(e){var t=y.b.utc2beijing(e,"yyyy-MM-dd hh:mm:ss");return p.a.createElement("span",{title:t},t)}},{title:"审核状态",dataIndex:"status",key:"status",render:function(e){return p.a.createElement("span",{style:{color:["","#0000ff",""][e]}},1===e?"已审核":2===e?"待审核":"-")}},{title:"操作",dataIndex:"operation",key:"operation",render:function(e,t){return p.a.createElement("div",null,0===t.status&&"-",1===t.status&&p.a.createElement(c.a,{placement:"top",title:"查看"},p.a.createElement(o.a,{icon:"info",shape:"circle",size:"small",onClick:function(){return M(t,"detail")}})),2===t.status&&p.a.createElement(c.a,{placement:"top",title:"审核"},p.a.createElement(o.a,{icon:"file-done",shape:"circle",size:"small",type:"primary",onClick:function(){return M(t,"approve")}})))}}],M=function(e,t){z(!0),K(t),L(e.productId)},H=function(){1===v.pageIndex?Q():b({pageIndex:1,pageRows:10})},Q=function(){j(!0);var e=u(),t=e.productId,a=e.mode,n=N({productId:t?Number(t):"",mode:a||""},v);O(N({},n)).then(function(e){g(e.data.data.list),D(e.data.data.pager.totalRows)}).finally(function(){j(!1)})};return Object(s.useEffect)(function(){Q()},[v.pageRows,v.pageIndex]),p.a.createElement("div",null,p.a.createElement(m.a,{title:"语音方案审核"},p.a.createElement(l.a,{layout:"inline"},p.a.createElement(l.a.Item,{label:"产品ID"},a("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(p.a.createElement(i.a,{placeholder:"请输入产品ID",style:{width:240}}))),p.a.createElement(l.a.Item,{label:"状态"},a("mode")(p.a.createElement(r.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(P).map(function(e,t){return p.a.createElement(r.a.Option,{key:t,value:+e},P[e])})))),p.a.createElement(l.a.Item,null,p.a.createElement(o.a,{type:"primary",onClick:function(){return H()}},"查询")),p.a.createElement(l.a.Item,null,p.a.createElement(o.a,{onClick:function(){return t.resetFields(),void H()}},"重置")))),p.a.createElement(n.a,null,p.a.createElement(f.a,{rowKey:"productId",columns:_,dataSource:I,pager:v,loading:k,pagination:{defaultCurrent:1,current:v.pageIndex,onChange:function(e,t){b(function(a){var n=d()(a);return Object.assign(n,{pageIndex:t===v.pageRows?e:1,pageRows:t})})},pageSize:v.pageRows,total:C,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return p.a.createElement("span",null,"共 ",p.a.createElement("a",null,C)," 条")}}})),F&&p.a.createElement(S,{opeType:J,productId:V,visible:F,handleOk:function(){z(!1),Q()},handleCancel:function(){z(!1)}}))})}}]);