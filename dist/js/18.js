(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1464:function(e,t,n){},1542:function(e,t,n){"use strict";n.r(t);n(18),n(35),n(36),n(27),n(29),n(30),n(199),n(221),n(256),n(34),n(41),n(33),n(42),n(100);var a=n(40),r=(n(198),n(77)),l=(n(143),n(38)),i=(n(129),n(64)),c=(n(223),n(83)),o=(n(74),n(20)),u=n(1393),d=n.n(u),s=(n(168),n(1406),n(21),n(67),n(469),n(98),n(170),n(66),n(37),n(0)),p=n.n(s),m=n(468),f=n(91),y=n(32),b=(n(222),n(99)),v=(n(299),n(157)),E=(n(297),n(156)),h=(n(169),n(7)),g=(n(1464),n(475)),I=n(3),w="/manage-open";function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,l=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(l.push(a.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var k=function(e){var t=e.visible,n=e.handleOk,a=e.handleCancel,r=e.productId,l=e.opeType,i=(O(Object(s.useState)({}),1)[0],O(Object(s.useState)([]),2)),c=i[0],u=i[1],m=O(Object(s.useState)([]),2),f=m[0],j=m[1],k=O(Object(s.useState)(!1),2),S=k[0],x=k[1],C=O(Object(s.useState)({}),2),N=C[0],A=C[1],D=O(Object(s.useState)(!1),2),T=D[0],P=D[1],R=O(Object(s.useState)(!1),2),F=R[0],z=R[1],V=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:100},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",width:"45%",render:function(e){return e.map((function(e,t){return p.a.createElement("span",{key:t,title:e},e,p.a.createElement("br",null))}))}},{title:"操作状态",dataIndex:"operation",key:"operation",width:80,render:function(e){return p.a.createElement("span",null,0==e?"移除":1==e?"新增":"")}}];Object(s.useEffect)((function(){var e;P(!0),Object(g.d)({productId:r}).then((function(e){A(e.data.data)})),(e={productId:r},I.c.request({url:w+"/product/getVoiceApprove",method:"post",data:e,headers:{}})).then((function(e){"detail"==l&&j(e.data.data.list),"approve"==l&&u(e.data.data.list.filter((function(e){return 0==e.status})))})).finally((function(){P(!1)}))}),[]);var L,M=p.a.createElement("div",{className:"product_title_baseinfo_list"},p.a.createElement("div",null,p.a.createElement("div",null,"品类："),p.a.createElement("div",null,N.deviceTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品ID："),p.a.createElement("div",null,N.productId)),p.a.createElement("div",null,p.a.createElement("div",null,"通讯协议："),p.a.createElement("div",null,N.bindTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品编码："),p.a.createElement("div",null,N.productIdHex)),p.a.createElement("div",null,p.a.createElement("div",null,"产品密钥："),p.a.createElement("div",null,(L=N.deviceKey,L=S?L:Object(y.m)(L,10)),p.a.createElement("span",{onClick:function(){x(!S)},style:{cursor:"pointer"}}," ",p.a.createElement(h.a,{type:S?"eye-invisible":"eye",style:{fontSize:"14px"},theme:"twoTone",twoToneColor:"#2874FF"}))))),q=function(e){z(!0),function(e){return I.c.request({url:w+"/product/approveVoice",method:"post",data:e,headers:{}})}({approveIdList:d()(c).map((function(e){return e.approveId})),status:e}).then((function(e){E.a.success("提交成功"),n()})).finally((function(){return z(!1)}))};return p.a.createElement(b.a,{title:"审核",width:1100,visible:t,onCancel:a,maskClosable:!1,wrapClassName:"add-scheme",footer:"detail"==l?null:[p.a.createElement(o.a,{key:"back",onClick:function(){return q(2)}},"审核不通过"),p.a.createElement(o.a,{key:"submit",type:"primary",loading:F,onClick:function(){return q(1)}},"审核通过")]},p.a.createElement("div",{className:"audit-detail-modal"},p.a.createElement("div",{className:"title"},"睡眠监测器",p.a.createElement("span",{className:"tag"},"免开发方案")),p.a.createElement("div",null,M),p.a.createElement("div",null,p.a.createElement(v.a,{rowKey:"approveId",loading:T,columns:V,dataSource:"approve"==l?c:f,pagination:!1,scroll:{y:340}}))))};function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,l=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(l.push(a.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var D={0:"开发中",1:"已发布",2:"审核中"};t.default=l.a.create()((function(e){var t=e.form,n=t.getFieldDecorator,u=t.getFieldsValue,b=N(Object(s.useState)({pageIndex:1,pageRows:10}),2),v=b[0],E=b[1],h=N(Object(s.useState)([]),2),g=h[0],O=h[1],j=N(Object(s.useState)(!1),2),S=j[0],C=j[1],A=N(Object(s.useState)(0),2),T=A[0],P=A[1],R=N(Object(s.useState)(!1),2),F=R[0],z=R[1],V=N(Object(s.useState)(""),2),L=V[0],M=V[1],q=N(Object(s.useState)(""),2),J=q[0],K=q[1],_=[{title:"产品名称",dataIndex:"productName",key:"productName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"产品ID",dataIndex:"productId",key:"productId",width:"10%"},{title:"所属分类",dataIndex:"allCategoryName",key:"allCategoryName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"mode",key:"mode",width:"102px",render:function(e){return p.a.createElement("span",null,D[e]||"")}},{title:"创建账号",dataIndex:"email",key:"email",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"创建时间",dataIndex:"createTime",key:"createTime",width:180,render:function(e){var t=y.b.utc2beijing(e,"yyyy-MM-dd hh:mm:ss");return p.a.createElement("span",{title:t},t)}},{title:"审核状态",dataIndex:"status",key:"status",render:function(e){return p.a.createElement("span",{style:{color:["","#0000ff",""][e]}},1===e?"已审核":2===e?"待审核":"-")}},{title:"操作",dataIndex:"operation",key:"operation",render:function(e,t){return p.a.createElement("div",null,0===t.status&&"-",1===t.status&&p.a.createElement(c.a,{placement:"top",title:"查看"},p.a.createElement(o.a,{icon:"info",shape:"circle",size:"small",onClick:function(){return U(t,"detail")}})),2===t.status&&p.a.createElement(c.a,{placement:"top",title:"审核"},p.a.createElement(o.a,{icon:"file-done",shape:"circle",size:"small",type:"primary",onClick:function(){return U(t,"approve")}})))}}],U=function(e,t){z(!0),K(t),M(e.productId)},$=function(){1===v.pageIndex?H():E({pageIndex:1,pageRows:10})},H=function(){C(!0);var e=u(),t=e.productId,n=e.mode,a=x({productId:t?Number(t):"",mode:n||""},v);(function(e){return I.c.request({url:w+"/product/getVoiceList",params:e,method:"get"})})(x({},a)).then((function(e){O(e.data.data.list),P(e.data.data.pager.totalRows)})).finally((function(){C(!1)}))};return Object(s.useEffect)((function(){H()}),[v.pageRows,v.pageIndex]),p.a.createElement("div",null,p.a.createElement(m.a,{title:"语音方案审核"},p.a.createElement(l.a,{layout:"inline"},p.a.createElement(l.a.Item,{label:"产品ID"},n("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(p.a.createElement(i.a,{placeholder:"请输入产品ID",style:{width:240}}))),p.a.createElement(l.a.Item,{label:"状态"},n("mode")(p.a.createElement(r.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(D).map((function(e,t){return p.a.createElement(r.a.Option,{key:t,value:+e},D[e])}))))),p.a.createElement(l.a.Item,null,p.a.createElement(o.a,{type:"primary",onClick:function(){return $()}},"查询")),p.a.createElement(l.a.Item,null,p.a.createElement(o.a,{onClick:function(){return t.resetFields(),void $()}},"重置")))),p.a.createElement(a.a,null,p.a.createElement(f.a,{rowKey:"productId",columns:_,dataSource:g,pager:v,loading:S,pagination:{defaultCurrent:1,current:v.pageIndex,onChange:function(e,t){E((function(n){var a=d()(n);return Object.assign(a,{pageIndex:t===v.pageRows?e:1,pageRows:t})}))},pageSize:v.pageRows,total:T,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return p.a.createElement("span",null,"共 ",p.a.createElement("a",null,T)," 条")}}})),F&&p.a.createElement(k,{opeType:J,productId:L,visible:F,handleOk:function(){z(!1),H()},handleCancel:function(){z(!1)}}))}))}}]);