(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1352:function(e,t,n){"use strict";n(46),n(47),n(22),n(20),n(35),n(36),n(28),n(30),n(31);var a=n(0),r=n.n(a);n(1353);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(s,r.a.Component);var t,n,a,o=function(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,a=u(e);if(t()){var r=u(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return l(this,n)}}(s);function s(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),o.apply(this,arguments)}return t=s,(n=[{key:"render",value:function(){var e=this.props,t=e.children,n=e.title;return r.a.createElement("div",{className:"title-tab"},r.a.createElement("div",{className:"title-tab-option"},r.a.createElement("span",{className:"title-tab-title"},n)),r.a.createElement("div",{className:"title-tab-option"},t))}}])&&i(t.prototype,n),a&&i(t,a),s}();s.Option=function(e){var t=e.children,n=e.label,a=e.align,o=void 0===a?"left":a;return r.a.createElement("div",{className:"".concat("left"===o?"title-tab-item":"title-tab-item-right")},r.a.createElement("span",{className:n?"title-table-label":"title-table-label-non"},n?n+":":""),t)},t.a=s},1353:function(e,t,n){},1368:function(e,t,n){},1448:function(e,t,n){"use strict";n.r(t);n(46),n(153);var a=n(38),r=(n(73),n(21)),o=(n(133),n(65)),i=(n(187),n(74)),c=(n(62),n(34),n(47),n(22),n(20),n(35),n(36),n(28),n(30),n(31),n(0)),l=n.n(c),u=n(29),s=n(1352),f=n(97),p=n(4),d=(n(1368),n(242),n(120)),m=(n(435),n(168));n(33),n(41),n(32),n(42);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach(function(t){h(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(a=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var g=a.a.Item,E={labelCol:{span:6},wrapperCol:{span:14}},w={1:"顺丰",2:"其他"};var O=a.a.create()(function(e){var t=e.id,n=e.status,r=e.form,i=r.getFieldDecorator,u=r.validateFields,s=r.resetFields,f=e.closeDetail,y=e.getList,h=v(Object(c.useState)({}),2),O=h[0],S=h[1];Object(c.useEffect)(function(){t&&p.b.Post("manage-open/moduleApplyVerify/getModuleApply",{id:t},{},{headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.data,n=(void 0===t?{}:t).data||{};S(b({},n))})},[t]),O.productName,O.schemeType,O.moduleName;var j=O.type,N=O.num,x=O.account,P=O.tel,C=O.address,I=O.mailType,T=O.expressNum,k=O.userId,_="",L="";return 1==n?(L="审核",_=l.a.createElement(l.a.Fragment,null,l.a.createElement(g,{label:"邮寄通道"},i("mailType",{initialValue:1,rules:[{required:!0,message:"请选择邮寄通道"}]})(l.a.createElement(m.a.Group,null,l.a.createElement(m.a,{value:1},"顺丰"),l.a.createElement(m.a,{value:2},"其他")))),l.a.createElement(g,{label:"快递单号"},i("expressNum",{rules:[{required:!0,message:"快递单号"}]})(l.a.createElement(o.a,{maxLength:50,placeholder:"请输入快递单号"}))),l.a.createElement(g,{label:"审核"},i("status",{rules:[{required:!0,message:"请审核是否通过"}]})(l.a.createElement(m.a.Group,null,l.a.createElement(m.a,{value:2},"不通过"),l.a.createElement(m.a,{value:3},"通过")))))):(L="查看",_=l.a.createElement(l.a.Fragment,null,l.a.createElement(g,{label:"邮寄通道"}," ",I&&w[I]," "),l.a.createElement(g,{label:"快递单号"}," ",T," "),l.a.createElement(g,{label:"状态"}," ",{2:"不通过",3:"通过"}[n]," "))),l.a.createElement(d.a,{visible:!!t,width:600,title:L,onCancel:f,onOk:1==n?function(){u(function(e,n){if(!e){var a=b(b({},n),{},{id:t});p.b.Post("manage-open/moduleApplyVerify/flowCheckModuleApply",a,{},{headers:{"Content-Type":"application/json"}}).then(function(e){console.log(1111,e),f(),y()})}})}:f,wrapClassName:"apply-modul-auditing-infomod",afterClose:s},l.a.createElement(a.a,E,l.a.createElement(g,{label:"提交账号"}," ",k," "),l.a.createElement(g,{label:"类型"}," ",{1:"免费",2:"采购"}[j]," "),l.a.createElement(g,{label:"数量"}," ",N," "),l.a.createElement(g,{label:"收件人"}," ",x," "),l.a.createElement(g,{label:"收件人电话"}," ",P," "),l.a.createElement(g,{label:"收件地址"}," ",C," "),_))});function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(a=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var j=a.a.Item;var N=function(e){var t=e.productId,n=e.closeFirmware,r=S(Object(c.useState)([]),2),o=r[0],i=r[1];return Object(c.useEffect)(function(){t&&p.b.Post("manage-open/product/show/firmware/config",{productId:t},{},{headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.data,n=(void 0===t?{}:t).data||{};i(n.firmwareModuleList||[])})},[t]),l.a.createElement(d.a,{visible:!!t,width:600,title:"固件信息",onCancel:n,onOk:n,afterClose:function(){i([])}},l.a.createElement(a.a,{labelCol:{span:10},wrapperCol:{span:10}},o.map(function(e,t){return e.firmwareFuncList&&e.firmwareFuncList.map(function(e,n){return l.a.createElement("div",{key:t+"_"+n},"int"===e.dataType.type&&l.a.createElement(j,{key:e.funcName+t+"int"+n,label:e.funcName},e.dataType.specs.defaultValue),"enum"===e.dataType.type&&l.a.createElement(j,{key:e.funcName+t+"enum"+n,label:e.funcName},e.dataType.specs.defaultValue[0].k))})})))};function x(e){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e,t){return!t||"object"!==x(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var k=i.a.Option,_={0:"开发中",1:"已发布",2:"审核中"},L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(m,c["Component"]);var t,n,a,d=function(e){function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}return function(){var n,a=T(e);if(t()){var r=T(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return I(this,n)}}(m);function m(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,m),(t=d.call(this,e)).componentDidMount=function(){t.getList()},t.onReset=function(){t.setState({searchName:void 0,searchType:"undefined"},function(){t.getList()})},t.changeSearch=function(e,n){var a,r,o;t.setState((o=n,(r=e)in(a={})?Object.defineProperty(a,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[r]=o,a))},t.getList=function(e){e&&t.setState({pageIndex:e});var n=t.state,a=n.searchName,r=n.searchType,o=n.pageIndex,i={pageIndex:e||o,pageRows:10,productName:a,mode:"undefined"==r?void 0:r};p.b.Post("manage-open/moduleApplyVerify/getModuleApplyListByPage",i,{},{loading:!0,headers:{"Content-Type":"application/json"}}).then(function(e){var n=e.data,a=(void 0===n?{}:n).data||{},r=a.list,o=void 0===r?[]:r,i=a.pager,c=void 0===i?{}:i;t.setState({list:o,pager:c})})},t.openModal=function(e){t.setState({visible:!0,editData:e})},t.handleCancel=function(){t.setState({visible:!1})},t.state={searchName:void 0,searchType:"undefined",pageIndex:1,list:[],pager:{},id:void 0,productId:void 0,status:1},t.column=[{title:"提交账号",dataIndex:"userId",ellipsis:!0},{title:"提交时间",dataIndex:"createTime",width:"160px",render:function(e){return l.a.createElement("span",null,e&&u.b.utcToDev(e)||"--")}},{title:"归属产品",dataIndex:"productName",ellipsis:!0},{title:"类型",dataIndex:"type",width:"60px",render:function(e){return l.a.createElement("span",null,{1:"免费",2:"采购"}[e])}},{title:"方案",dataIndex:"schemeType",width:"90px",render:function(e){return l.a.createElement("span",null,{1:"免开发",2:"MCU方案",3:"Soc方案"}[e])}},{title:"模组名称",dataIndex:"moduleName"},{title:"数量",dataIndex:"num",width:"50px"},{title:"固件名称",dataIndex:"firmwareName",render:function(e,n){var a=n.schemeType,r=n.productId;return e=e||"--",1==a?l.a.createElement("a",{onClick:function(){t.setState({productId:r})}},e):l.a.createElement("span",null,e)}},{title:"状态",dataIndex:"status",width:"76px",render:function(e){return l.a.createElement("span",null,{1:"待审核",2:"未通过",3:"通过"}[e])}},{title:"操作",key:"id",width:"60px",render:function(e,n){var a=n.status,r=n.id;return l.a.createElement("a",{onClick:function(){return t.setState({id:r,status:a})}},1==a?"审核":"查看")}}],t}return t=m,(n=[{key:"render",value:function(){var e=this,t=this.state,n=t.searchName,a=t.searchType,c=t.list,u=t.pager,p=t.id,d=t.status,m=t.productId;return l.a.createElement("div",{className:"apply-modul-auditing"},l.a.createElement(s.a,{title:"申请&采购模组申请"},l.a.createElement("div",{className:"comm-title-search-box"},l.a.createElement("span",{className:"labeknam"},"产品名称："),l.a.createElement(o.a,{value:n,placeholder:"输入产品名称查询",maxLength:10,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchName",t.target.value||void 0)}}),l.a.createElement("span",{className:"labeknam"},"产品状态："),l.a.createElement(i.a,{className:"select",placeholder:"请选择状态",value:a,onChange:function(t){e.changeSearch("searchType",t)}},l.a.createElement(k,{key:"undefined",value:"undefined"}," 全部 "),Object.keys(_).map(function(e,t){return l.a.createElement(k,{key:t,value:+e}," ",_[e]," ")})),l.a.createElement(r.a,{className:"btn",type:"primary",onClick:function(){e.getList()}},"查询"),l.a.createElement(r.a,{className:"btn",onClick:this.onReset},"重置"))),l.a.createElement("div",{className:"comm-contont-card"},l.a.createElement(f.a,{rowKey:"id",columns:this.column,dataSource:c,pager:u,onPageChange:this.getList})),l.a.createElement(O,{id:p,status:d,closeDetail:function(){e.setState({id:void 0})},getList:this.getList}),l.a.createElement(N,{productId:m,closeFirmware:function(){e.setState({productId:void 0})}}))}}])&&P(t.prototype,n),a&&P(t,a),m}();t.default=a.a.create()(L)}}]);