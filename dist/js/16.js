(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1357:function(e,t,n){"use strict";n(46),n(47),n(22),n(20),n(35),n(36),n(27),n(29),n(30);var a=n(0),r=n.n(a);n(1358);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(d,r.a.Component);var t,n,a,l=function(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,a=u(e);if(t()){var r=u(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return c(this,n)}}(d);function d(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),l.apply(this,arguments)}return t=d,(n=[{key:"render",value:function(){var e=this.props,t=e.children,n=e.title;return r.a.createElement("div",{className:"title-tab"},r.a.createElement("div",{className:"title-tab-option"},r.a.createElement("span",{className:"title-tab-title"},n)),r.a.createElement("div",{className:"title-tab-option"},t))}}])&&i(t.prototype,n),a&&i(t,a),d}();d.Option=function(e){var t=e.children,n=e.label,a=e.align,l=void 0===a?"left":a;return r.a.createElement("div",{className:"".concat("left"===l?"title-tab-item":"title-tab-item-right")},r.a.createElement("span",{className:n?"title-table-label":"title-table-label-non"},n?n+":":""),t)},t.a=d},1358:function(e,t,n){},1394:function(e,t,n){},1466:function(e,t,n){"use strict";n.r(t);n(92);var a=n(37),r=(n(188),n(74)),l=(n(153),n(38)),i=(n(133),n(66)),o=(n(210),n(81)),c=(n(73),n(21)),u=n(1325),d=n.n(u),s=(n(166),n(1340),n(22),n(63),n(436),n(96),n(168),n(62),n(34),n(36),n(27),n(29),n(30),n(20),n(35),n(33),n(41),n(32),n(42),n(0)),p=n.n(s),f=n(1357),m=n(97),y=n(31),b=(n(242),n(120)),v=(n(281),n(155)),E=(n(279),n(154)),h=(n(167),n(10)),g=(n(1394),n(440)),w=n(4),O="/manage-open",I=function(e){return w.c.request({url:O+"/product/getVoiceList",params:e,method:"get"})},j=function(e){return w.c.request({url:O+"/product/getVoiceApprove",method:"post",data:e,headers:{}})},k=function(e){return w.c.request({url:O+"/product/approveVoice",method:"post",data:e,headers:{}})};function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,l=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{a||null==o.return||o.return()}finally{if(r)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var x=function(e){var t=e.visible,n=e.handleOk,a=e.handleCancel,r=e.productId,l=e.opeType,i=(S(Object(s.useState)({}),1)[0],S(Object(s.useState)([]),2)),o=i[0],u=i[1],f=S(Object(s.useState)([]),2),m=f[0],w=f[1],O=S(Object(s.useState)(!1),2),I=O[0],x=O[1],N=S(Object(s.useState)({}),2),C=N[0],P=N[1],R=S(Object(s.useState)(!1),2),D=R[0],T=R[1],_=S(Object(s.useState)(!1),2),F=_[0],z=_[1],A=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:100},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",width:"45%",render:function(e){return e.map(function(e,t){return p.a.createElement("span",{key:t,title:e},e,p.a.createElement("br",null))})}},{title:"操作状态",dataIndex:"operation",key:"operation",width:80,render:function(e){return p.a.createElement("span",null,0==e?"移除":1==e?"新增":"")}}];Object(s.useEffect)(function(){T(!0),Object(g.d)({productId:r}).then(function(e){P(e.data.data)}),j({productId:r}).then(function(e){"detail"==l&&w(e.data.data.list),"approve"==l&&u(e.data.data.list.filter(function(e){return 0==e.status}))}).finally(function(){T(!1)})},[]);var V,L=p.a.createElement("div",{className:"product_title_baseinfo_list"},p.a.createElement("div",null,p.a.createElement("div",null,"品类："),p.a.createElement("div",null,C.deviceTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品ID："),p.a.createElement("div",null,C.productId)),p.a.createElement("div",null,p.a.createElement("div",null,"通讯协议："),p.a.createElement("div",null,C.bindTypeName)),p.a.createElement("div",null,p.a.createElement("div",null,"产品编码："),p.a.createElement("div",null,C.productIdHex)),p.a.createElement("div",null,p.a.createElement("div",null,"产品密钥："),p.a.createElement("div",null,(V=C.deviceKey,V=I?V:Object(y.m)(V,10)),p.a.createElement("span",{onClick:function(){x(!I)},style:{cursor:"pointer"}}," ",p.a.createElement(h.a,{type:I?"eye-invisible":"eye",style:{fontSize:"14px"},theme:"twoTone",twoToneColor:"#2874FF"}))))),q=function(e){z(!0);var t={approveIdList:d()(o).map(function(e){return e.approveId}),status:e};k(t).then(function(e){E.a.success("提交成功"),n()}).finally(function(){return z(!1)})};return p.a.createElement(b.a,{title:"审核",width:1100,visible:t,onCancel:a,maskClosable:!1,wrapClassName:"add-scheme",footer:"detail"==l?null:[p.a.createElement(c.a,{key:"back",onClick:function(){return q(2)}},"审核不通过"),p.a.createElement(c.a,{key:"submit",type:"primary",loading:F,onClick:function(){return q(1)}},"审核通过")]},p.a.createElement("div",{className:"audit-detail-modal"},p.a.createElement("div",{className:"title"},"睡眠监测器",p.a.createElement("span",{className:"tag"},"免开发方案")),p.a.createElement("div",null,L),p.a.createElement("div",null,p.a.createElement(v.a,{rowKey:"approveId",loading:D,columns:A,dataSource:"approve"==l?o:m,pagination:!1,scroll:{y:340}}))))};function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach(function(t){P(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,l=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{a||null==o.return||o.return()}finally{if(r)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var D={0:"开发中",1:"已发布",2:"审核中"};t.default=l.a.create()(function(e){var t=e.form,n=t.getFieldDecorator,u=t.getFieldsValue,b=R(Object(s.useState)({pageIndex:1,pageRows:10}),2),v=b[0],E=b[1],h=R(Object(s.useState)([]),2),g=h[0],w=h[1],O=R(Object(s.useState)(!1),2),j=O[0],k=O[1],S=R(Object(s.useState)(0),2),N=S[0],P=S[1],T=R(Object(s.useState)(!1),2),_=T[0],F=T[1],z=R(Object(s.useState)(""),2),A=z[0],V=z[1],L=R(Object(s.useState)(""),2),q=L[0],J=L[1],K=[{title:"产品名称",dataIndex:"productName",key:"productName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"产品ID",dataIndex:"productId",key:"productId",width:"10%"},{title:"所属分类",dataIndex:"allCategoryName",key:"allCategoryName",width:"20%",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"状态",dataIndex:"mode",key:"mode",width:"102px",render:function(e){return p.a.createElement("span",null,D[e]||"")}},{title:"创建账号",dataIndex:"email",key:"email",render:function(e){return p.a.createElement("span",{title:e},e)}},{title:"创建时间",dataIndex:"createTime",key:"createTime",width:180,render:function(e){var t=y.b.utc2beijing(e,"yyyy-MM-dd hh:mm:ss");return p.a.createElement("span",{title:t},t)}},{title:"审核状态",dataIndex:"status",key:"status",render:function(e){return p.a.createElement("span",{style:{color:["","#0000ff",""][e]}},1===e?"已审核":2===e?"待审核":"-")}},{title:"操作",dataIndex:"operation",key:"operation",render:function(e,t){return p.a.createElement("div",null,0===t.status&&"-",1===t.status&&p.a.createElement(o.a,{placement:"top",title:"查看"},p.a.createElement(c.a,{icon:"info",shape:"circle",size:"small",onClick:function(){return M(t,"detail")}})),2===t.status&&p.a.createElement(o.a,{placement:"top",title:"审核"},p.a.createElement(c.a,{icon:"file-done",shape:"circle",size:"small",type:"primary",onClick:function(){return M(t,"approve")}})))}}],M=function(e,t){F(!0),J(t),V(e.productId)},H=function(){1===v.pageIndex?Q():E({pageIndex:1,pageRows:10})},Q=function(){k(!0);var e=u(),t=e.productId,n=e.mode,a=C({productId:t?Number(t):"",mode:n||""},v);I(C({},a)).then(function(e){w(e.data.data.list),P(e.data.data.pager.totalRows)}).finally(function(){k(!1)})};return Object(s.useEffect)(function(){Q()},[v.pageRows,v.pageIndex]),p.a.createElement("div",null,p.a.createElement(f.a,{title:"语音方案审核"},p.a.createElement(l.a,{layout:"inline"},p.a.createElement(l.a.Item,{label:"产品ID"},n("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(p.a.createElement(i.a,{placeholder:"请输入产品ID",style:{width:240}}))),p.a.createElement(l.a.Item,{label:"状态"},n("mode")(p.a.createElement(r.a,{style:{width:160},placeholder:"请选择状态"},Object.keys(D).map(function(e,t){return p.a.createElement(r.a.Option,{key:t,value:+e},D[e])})))),p.a.createElement(l.a.Item,null,p.a.createElement(c.a,{type:"primary",onClick:function(){return H()}},"查询")),p.a.createElement(l.a.Item,null,p.a.createElement(c.a,{onClick:function(){return t.resetFields(),void H()}},"重置")))),p.a.createElement(a.a,null,p.a.createElement(m.a,{rowKey:"productId",columns:K,dataSource:g,pager:v,loading:j,pagination:{defaultCurrent:1,current:v.pageIndex,onChange:function(e,t){E(function(n){var a=d()(n);return Object.assign(a,{pageIndex:t===v.pageRows?e:1,pageRows:t})})},pageSize:v.pageRows,total:N,showQuickJumper:!0,pageSizeOptions:["10"],showTotal:function(){return p.a.createElement("span",null,"共 ",p.a.createElement("a",null,N)," 条")}}})),_&&p.a.createElement(x,{opeType:q,productId:A,visible:_,handleOk:function(){F(!1),Q()},handleCancel:function(){F(!1)}}))})}}]);