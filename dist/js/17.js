(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1401:function(e,t,n){},1515:function(e,t,n){"use strict";n.r(t);n(47),n(129);var a=n(24),r=(n(67),n(20)),o=(n(99),n(45)),c=(n(159),n(36)),l=(n(55),n(39),n(48),n(22),n(19),n(38),n(40),n(32),n(41),n(34),n(35),n(26),n(27),n(28),n(0)),i=n.n(l),u=n(33),s=n(463),p=n(97),f=n(4),d=(n(1401),n(196),n(85)),m=(n(464),n(176));function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach(function(t){h(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var g=a.a.Item,E={labelCol:{span:6},wrapperCol:{span:14}},w={1:"顺丰",2:"其他"};var O=a.a.create()(function(e){var t=e.id,n=e.status,r=e.form,c=r.getFieldDecorator,u=r.validateFields,s=r.resetFields,p=e.closeDetail,y=e.getList,h=v(Object(l.useState)({}),2),O=h[0],j=h[1];Object(l.useEffect)(function(){t&&f.c.Post("manage-open/moduleApplyVerify/getModuleApply",{id:t},{headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.data,n=(void 0===t?{}:t).data||{};j(b({},n))})},[t]),O.productName,O.schemeType,O.moduleName;var P=O.type,x=O.num,S=O.account,I=O.tel,N=O.address,C=O.mailType,T=O.expressNum,k=O.userId,D="",L="";return 1==n?(L="审核",D=i.a.createElement(i.a.Fragment,null,i.a.createElement(g,{label:"邮寄通道"},c("mailType",{initialValue:1,rules:[{required:!0,message:"请选择邮寄通道"}]})(i.a.createElement(m.a.Group,null,i.a.createElement(m.a,{value:1},"顺丰"),i.a.createElement(m.a,{value:2},"其他")))),i.a.createElement(g,{label:"快递单号"},c("expressNum",{rules:[{required:!0,message:"快递单号"}]})(i.a.createElement(o.a,{maxLength:50,placeholder:"请输入快递单号"}))),i.a.createElement(g,{label:"审核"},c("status",{rules:[{required:!0,message:"请审核是否通过"}]})(i.a.createElement(m.a.Group,null,i.a.createElement(m.a,{value:2},"不通过"),i.a.createElement(m.a,{value:3},"通过")))))):(L="查看",D=i.a.createElement(i.a.Fragment,null,i.a.createElement(g,{label:"邮寄通道"}," ",C&&w[C]," "),i.a.createElement(g,{label:"快递单号"}," ",T," "),i.a.createElement(g,{label:"状态"}," ",{2:"不通过",3:"通过"}[n]," "))),i.a.createElement(d.a,{visible:!!t,width:600,title:L,onCancel:p,onOk:1==n?function(){u(function(e,n){if(!e){var a=b(b({},n),{},{id:t});f.c.Post("manage-open/moduleApplyVerify/flowCheckModuleApply",a,{headers:{"Content-Type":"application/json"}}).then(function(e){console.log(1111,e),p(),y()})}})}:p,wrapClassName:"apply-modul-auditing-infomod",afterClose:s},i.a.createElement(a.a,E,i.a.createElement(g,{label:"提交账号"}," ",k," "),i.a.createElement(g,{label:"类型"}," ",{1:"免费",2:"采购"}[P]," "),i.a.createElement(g,{label:"数量"}," ",x," "),i.a.createElement(g,{label:"收件人"}," ",S," "),i.a.createElement(g,{label:"收件人电话"}," ",I," "),i.a.createElement(g,{label:"收件地址"}," ",N," "),D))});function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var P=a.a.Item;var x=function(e){var t=e.productId,n=e.closeFirmware,r=j(Object(l.useState)([]),2),o=r[0],c=r[1];return Object(l.useEffect)(function(){t&&f.c.Post("manage-open/product/show/firmware/config",{productId:t},{headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.data,n=(void 0===t?{}:t).data||{};c(n.firmwareModuleList||[])})},[t]),i.a.createElement(d.a,{visible:!!t,width:600,title:"固件信息",onCancel:n,onOk:n,afterClose:function(){c([])}},i.a.createElement(a.a,{labelCol:{span:10},wrapperCol:{span:10}},o.map(function(e,t){return e.firmwareFuncList&&e.firmwareFuncList.map(function(e,n){return i.a.createElement("div",{key:t+"_"+n},"int"===e.dataType.type&&i.a.createElement(P,{key:e.funcName+t+"int"+n,label:e.funcName},e.dataType.specs.defaultValue),"enum"===e.dataType.type&&i.a.createElement(P,{key:e.funcName+t+"enum"+n,label:e.funcName},e.dataType.specs.defaultValue[0].k))})})))};function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(n,!0).forEach(function(t){C(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var A=c.a.Option,F={0:"开发中",1:"已发布",2:"审核中"},R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(m,l["Component"]);var t,n,a,d=function(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,a=L(e);if(t()){var r=L(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return D(this,n)}}(m);function m(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,m),(t=d.call(this,e)).componentDidMount=function(){t.getList()},t.onReset=function(){t.setState({searchName:void 0,searchType:"undefined"},function(){t.getList()})},t.changeSearch=function(e,n){t.setState(C({},e,n))},t.getList=function(e){e&&t.setState({pageIndex:e});var n=t.state,a=n.searchName,r=n.searchType,o=n.pageIndex,c={pageIndex:e||o,pageRows:10,productName:a,mode:"undefined"==r?void 0:r};f.c.Post("manage-open/moduleApplyVerify/getModuleApplyListByPage",c,{loading:!0,headers:{"Content-Type":"application/json"}}).then(function(e){var n=e.data,a=(void 0===n?{}:n).data||{},r=a.list,o=void 0===r?[]:r,c=a.pager,l=void 0===c?{}:c;t.setState({list:o,pager:l})})},t.openModal=function(e){t.setState({visible:!0,editData:e})},t.handleCancel=function(){t.setState({visible:!1})},t.state={searchName:void 0,searchType:"undefined",pageIndex:1,list:[],pager:{},id:void 0,productId:void 0,status:1},t.column=[{title:"提交账号",dataIndex:"userId",ellipsis:!0},{title:"提交时间",dataIndex:"createTime",width:"160px",render:function(e){return i.a.createElement("span",null,e&&u.b.utcToDev(e)||"--")}},{title:"归属产品",dataIndex:"productName",ellipsis:!0},{title:"类型",dataIndex:"type",width:"60px",render:function(e){return i.a.createElement("span",null,{1:"免费",2:"采购"}[e])}},{title:"方案",dataIndex:"schemeType",width:"90px",render:function(e){return i.a.createElement("span",null,{1:"免开发",2:"MCU方案",3:"Soc方案"}[e])}},{title:"模组名称",dataIndex:"moduleName"},{title:"数量",dataIndex:"num",width:"50px"},{title:"固件名称",dataIndex:"firmwareName",render:function(e,n){var a=n.schemeType,r=n.productId;return e=e||"--",1==a?i.a.createElement("a",{onClick:function(){t.setState({productId:r})}},e):i.a.createElement("span",null,e)}},{title:"状态",dataIndex:"status",width:"76px",render:function(e){return i.a.createElement("span",null,{1:"待审核",2:"未通过",3:"通过"}[e])}},{title:"操作",key:"id",width:"60px",render:function(e,n){var a=n.status,r=n.id;return i.a.createElement("a",{onClick:function(){return t.setState({id:r,status:a})}},1==a?"审核":"查看")}}],t}return t=m,(n=[{key:"render",value:function(){var e=this,t=this.state,n=t.searchName,a=t.searchType,l=t.list,u=t.pager,f=t.id,d=t.status,m=t.productId,y=t.pageIndex;return i.a.createElement("div",{className:"apply-modul-auditing"},i.a.createElement(s.a,{title:"申请&采购模组申请"},i.a.createElement("div",{className:"comm-title-search-box"},i.a.createElement("span",{className:"labeknam"},"产品名称："),i.a.createElement(o.a,{value:n,placeholder:"输入产品名称查询",maxLength:10,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchName",t.target.value||void 0)}}),i.a.createElement("span",{className:"labeknam"},"产品状态："),i.a.createElement(c.a,{className:"select",placeholder:"请选择状态",value:a,onChange:function(t){e.changeSearch("searchType",t)}},i.a.createElement(A,{key:"undefined",value:"undefined"}," 全部 "),Object.keys(F).map(function(e,t){return i.a.createElement(A,{key:t,value:+e}," ",F[e]," ")})),i.a.createElement(r.a,{className:"btn",type:"primary",onClick:function(){e.getList()}},"查询"),i.a.createElement(r.a,{className:"btn",onClick:this.onReset},"重置"))),i.a.createElement("div",{className:"comm-contont-card"},i.a.createElement(p.a,{rowKey:"id",columns:this.column,dataSource:l,pager:N(N({},u),{},{pageIndex:y}),onPageChange:this.getList})),i.a.createElement(O,{id:f,status:d,closeDetail:function(){e.setState({id:void 0})},getList:this.getList}),i.a.createElement(x,{productId:m,closeFirmware:function(){e.setState({productId:void 0})}}))}}])&&T(t.prototype,n),a&&T(t,a),m}();t.default=a.a.create()(R)}}]);