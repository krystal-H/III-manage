(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1423:function(e,t,n){"use strict";n(48),n(49),n(19),n(37),n(22),n(38),n(28),n(30),n(31);var r=n(0),a=n.n(r);n(1424);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var a=s(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return d(this,n)}}function d(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(d,e);var t,n,r,l=u(d);function d(){return o(this,d),l.apply(this,arguments)}return t=d,(n=[{key:"render",value:function(){var e=this.props,t=e.children,n=e.title;return a.a.createElement("div",{className:"title-tab"},a.a.createElement("div",{className:"title-tab-option"},a.a.createElement("span",{className:"title-tab-title"},n)),a.a.createElement("div",{className:"title-tab-option"},t))}}])&&i(t.prototype,n),r&&i(t,r),d}(a.a.Component);f.Option=function(e){var t=e.children,n=e.label,r=e.align,l=void 0===r?"left":r;return a.a.createElement("div",{className:"".concat("left"===l?"title-tab-item":"title-tab-item-right")},a.a.createElement("span",{className:n?"title-table-label":"title-table-label-non"},n?n+":":""),t)},t.a=f},1424:function(e,t,n){},1460:function(e,t,n){},1530:function(e,t,n){"use strict";n.r(t);n(19),n(37),n(38),n(28),n(30),n(31),n(199),n(221),n(256),n(34),n(43),n(33),n(44),n(98);var r=n(39),a=(n(198),n(76)),l=(n(155),n(40)),o=(n(137),n(69)),i=(n(222),n(83)),c=(n(75),n(20)),u=n(1389),d=n.n(u),s=(n(168),n(1406),n(22),n(66),n(467),n(97),n(170),n(65),n(35),n(0)),f=n.n(s),p=n(1423),m=n(106),y=n(32),b=(n(255),n(128)),v=(n(299),n(157)),h=(n(297),n(156)),E=(n(169),n(7)),g=(n(1460),n(471)),O=n(3),w="/manage-open";function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){i=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var S=function(e){var t=e.visible,n=e.handleOk,r=e.handleCancel,a=e.productId,l=e.opeType,o=(I(Object(s.useState)({}),1)[0],I(Object(s.useState)([]),2)),i=o[0],u=o[1],p=I(Object(s.useState)([]),2),m=p[0],j=p[1],S=I(Object(s.useState)(!1),2),k=S[0],x=S[1],C=I(Object(s.useState)({}),2),N=C[0],P=C[1],R=I(Object(s.useState)(!1),2),T=R[0],A=R[1],D=I(Object(s.useState)(!1),2),_=D[0],F=D[1],z=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:100},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){return f.a.createElement("span",{title:e},e)}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",width:"45%",render:function(e){return e.map((function(e,t){return f.a.createElement("span",{key:t,title:e},e,f.a.createElement("br",null))}))}},{title:"操作状态",dataIndex:"operation",key:"operation",width:80,render:function(e){return f.a.createElement("span",null,0==e?"移除":1==e?"新增":"")}}];Object(s.useEffect)((function(){var e;A(!0),Object(g.d)({productId:a}).then((function(e){P(e.data.data)})),(e={productId:a},O.c.request({url:w+"/product/getVoiceApprove",method:"post",data:e,headers:{}})).then((function(e){"detail"==l&&j(e.data.data.list),"approve"==l&&u(e.data.data.list.filter((function(e){return 0==e.status})))})).finally((function(){A(!1)}))}),[]);var V,L=f.a.createElement("div",{className:"product_title_baseinfo_list"},f.a.createElement("div",null,f.a.createElement("div",null,"品类："),f.a.createElement("div",null,N.deviceTypeName)),f.a.createElement("div",null,f.a.createElement("div",null,"产品ID："),f.a.createElement("div",null,N.productId)),f.a.createElement("div",null,f.a.createElement("div",null,"通讯协议："),f.a.createElement("div",null,N.bindTypeName)),f.a.createElement("div",null,f.a.createElement("div",null,"产品编码："),f.a.createElement("div",null,N.productIdHex)),f.a.createElement("div",null,f.a.createElement("div",null,"产品密钥："),f.a.createElement("div",null,(V=N.deviceKey,V=k?V:Object(y.m)(V,10)),f.a.createElement("span",{onClick:function(){x(!k)},style:{cursor:"pointer"}}," ",f.a.createElement(E.a,{type:k?"eye-invisible":"eye",style:{fontSize:"14px"},theme:"twoTone",twoToneColor:"#2874FF"}))))),M=function(e){F(!0),function(e){return O.c.request({url:w+"/product/approveVoice",method:"post",data:e,headers:{}})}({approveIdList:d()(i).map((function(e){return e.approveId})),status:e}).then((function(e){h.a.success("提交成功"),n()})).finally((function(){return F(!1)}))};return f.a.createElement(b.a,{title:"审核",width:1100,visible:t,onCancel:r,maskClosable:!1,wrapClassName:"add-scheme",footer:"detail"==l?null:[f.a.createElement(c.a,{key:"back",onClick:function(){return M(2)}},"审核不通过"),f.a.createElement(c.a,{key:"submit",type:"primary",loading:_,onClick:function(){return M(1)}},"审核通过")]},f.a.createElement("div",{className:"audit-detail-modal"},f.a.createElement("div",{className:"title"},"睡眠监测器",f.a.createElement("span",{className:"tag"},"免开发方案")),f.a.createElement("div",null,L),f.a.createElement("div",null,f.a.createElement(v.a,{rowKey:"approveId",loading:T,columns:z,dataSource:"approve"==l?i:m,pagination:!1,scroll:{y:340}}))))};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){i=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return P(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return P(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var R={0:"开发中",1:"已发布",2:"审核中"};t.default=l.a.create()((function(e){var t=e.form,n=t.getFieldDecorator,u=t.getFieldsValue,b=N(Object(s.useState)({pageIndex:1,pageRows:10}),2),v=b[0],h=b[1],E=N(Object(s.useState)([]),2),g=E[0],I=E[1],j=N(Object(s.useState)(!1),2),k=j[0],C=j[1],P=N(Object(s.useState)(0),2),T=P[0],A=P[1],D=N(Object(s.useState)(!1),2),_=D[0],F=D[1],z=N(Object(s.useState)(""),2),V=z[0],L=z[1],M=N(Object(s.useState)(""),2),q=M[0],J=M[1],K=[{title:"产品名称",dataIndex:"productName",key:"productName",width:"20%",render:function(e){return f.a.createElement("span",{title:e},e)}},{title:"产品ID",dataIndex:"productId",key:"productId",width:"10%"},{title:"所属分类",dataIndex:"allCategoryName",key:"allCategoryName",width:"20%",render:function(e){return f.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"mode",key:"mode",width:"102px",render:function(e){return f.a.createElement("span",null,R[e]||"")}},{title:"创建账号",dataIndex:"email",key:"email",render:function(e){return f.a.createElement("span",{title:e},e)}},{title:"创建时间",dataIndex:"createTime",key:"createTime",width:180,render:function(e){var t=y.b.utc2beijing(e,"yyyy-MM-dd hh:mm:ss");return f.a.createElement("span",{title:t},t)}},{title:"审核状态",dataIndex:"status",key:"status",render:function(e){return f.a.createElement("span",{style:{color:["","#0000ff",""][e]}},1===e?"已审核":2===e?"待审核":"-")}},{title:"操作",dataIndex:"operation",key:"operation",render:function(e,t){return f.a.createElement("div",null,0===t.status&&"-",1===t.status&&f.a.createElement(i.a,{placement:"top",title:"查看"},f.a.createElement(c.a,{icon:"info",shape:"circle",size:"small",onClick:function(){return B(t,"detail")}})),2===t.status&&f.a.createElement(i.a,{placement:"top",title:"审核"},f.a.createElement(c.a,{icon:"file-done",shape:"circle",size:"small",type:"primary",onClick:function(){return B(t,"approve")}})))}}],B=function(e,t){F(!0),J(t),L(e.productId)},U=function(){1===v.pageIndex?$():h({pageIndex:1,pageRows:10})},$=function(){C(!0);var e=u(),t=e.productId,n=e.mode,r=x({productId:t?Number(t):"",mode:n||""},v);(function(e){return O.c.request({url:w+"/product/getVoiceList",params:e,method:"get"})})(x({},r)).then((function(e){I(e.data.data.list),A(e.data.data.pager.totalRows)})).finally((function(){C(!1)}))};return Object(s.useEffect)((function(){$()}),[v.pageRows,v.pageIndex]),f.a.createElement("div",null,f.a.createElement(p.a,{title:"语音方案审核"},f.a.createElement(l.a,{layout:"inline"},f.a.createElement(l.a.Item,{label:"产品ID"},n("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(f.a.createElement(o.a,{placeholder:"请输入产品ID",style:{width:240}}))),f.a.createElement(l.a.Item,{label:"状态"},n("mode")(f.a.createElement(a.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(R).map((function(e,t){return f.a.createElement(a.a.Option,{key:t,value:+e},R[e])}))))),f.a.createElement(l.a.Item,null,f.a.createElement(c.a,{type:"primary",onClick:function(){return U()}},"查询")),f.a.createElement(l.a.Item,null,f.a.createElement(c.a,{onClick:function(){return t.resetFields(),void U()}},"重置")))),f.a.createElement(r.a,null,f.a.createElement(m.a,{rowKey:"productId",columns:K,dataSource:g,pager:v,loading:k,pagination:{defaultCurrent:1,current:v.pageIndex,onChange:function(e,t){h((function(n){var r=d()(n);return Object.assign(r,{pageIndex:t===v.pageRows?e:1,pageRows:t})}))},pageSize:v.pageRows,total:T,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,T)," 条")}}})),_&&f.a.createElement(S,{opeType:q,productId:V,visible:_,handleOk:function(){F(!1),$()},handleCancel:function(){F(!1)}}))}))}}]);