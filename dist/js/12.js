(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1417:function(e,t,n){"use strict";n(48),n(49),n(19),n(38),n(22),n(39),n(30),n(31),n(32);var r=n(0),a=n.n(r);n(1418);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=f(e);if(t){var a=f(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return s(this,n)}}function s(e,t){if(t&&("object"===o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(s,e);var t,n,r,o=u(s);function s(){return l(this,s),o.apply(this,arguments)}return t=s,(n=[{key:"render",value:function(){var e=this.props,t=e.children,n=e.title;return a.a.createElement("div",{className:"title-tab"},a.a.createElement("div",{className:"title-tab-option"},a.a.createElement("span",{className:"title-tab-title"},n)),a.a.createElement("div",{className:"title-tab-option"},t))}}])&&c(t.prototype,n),r&&c(t,r),s}(a.a.Component);p.Option=function(e){var t=e.children,n=e.label,r=e.align,o=void 0===r?"left":r;return a.a.createElement("div",{className:"".concat("left"===o?"title-tab-item":"title-tab-item-right")},a.a.createElement("span",{className:n?"title-table-label":"title-table-label-non"},n?n+":":""),t)},t.a=p},1418:function(e,t,n){},1433:function(e,t,n){},1520:function(e,t,n){"use strict";n.r(t);n(48),n(49),n(19),n(38),n(22),n(39),n(30),n(31),n(32),n(155);var r=n(40),a=(n(75),n(20)),o=(n(137),n(68)),l=(n(196),n(76)),c=(n(67),n(36),n(0)),i=n.n(c),u=n(29),s=n(1417),f=n(106),p=n(3),d=(n(1433),n(220),n(255),n(297),n(34),n(43),n(33),n(44),n(254),n(128)),m=(n(465),n(169));function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],l=!0,c=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var O=r.a.Item,E={labelCol:{span:6},wrapperCol:{span:14}},w={1:"顺丰",2:"其他"};var j=r.a.create()((function(e){var t=e.id,n=e.status,a=e.form,l=a.getFieldDecorator,u=a.validateFields,s=a.resetFields,f=e.closeDetail,y=v(Object(c.useState)({}),2),h=y[0],g=y[1];Object(c.useEffect)((function(){t&&p.b.Post("manage-open/moduleApplyVerify/getModuleApply",{id:t},{},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||{};g(b({},n))}))}),[t]),h.productName,h.schemeType,h.moduleName;var j=h.type,S=h.num,P=h.account,N=h.tel,x=h.address,C=h.mailType,I=h.expressNum,T=h.userId,k="",A="";return 1==n?(A="审核",k=i.a.createElement(i.a.Fragment,null,i.a.createElement(O,{label:"邮寄通道"},l("mailType",{initialValue:1,rules:[{required:!0,message:"请选择邮寄通道"}]})(i.a.createElement(m.a.Group,null,i.a.createElement(m.a,{value:1},"顺丰"),i.a.createElement(m.a,{value:2},"其他")))),i.a.createElement(O,{label:"快递单号"},l("expressNum",{rules:[{required:!0,message:"快递单号"}]})(i.a.createElement(o.a,{maxLength:50,placeholder:"请输入快递单号"}))),i.a.createElement(O,{label:"审核"},l("status",{rules:[{required:!0,message:"请审核是否通过"}]})(i.a.createElement(m.a.Group,null,i.a.createElement(m.a,{value:2},"不通过"),i.a.createElement(m.a,{value:3},"通过")))))):(A="查看",k=i.a.createElement(i.a.Fragment,null,i.a.createElement(O,{label:"邮寄通道"}," ",C&&w[C]," "),i.a.createElement(O,{label:"快递单号"}," ",I," "),i.a.createElement(O,{label:"状态"}," ",{2:"不通过",3:"通过"}[n]," "))),i.a.createElement(d.a,{visible:!!t,width:600,title:A,onCancel:f,onOk:1==n?function(){u((function(e,n){if(!e){console.log(7777,n);var r=b(b({},n),{},{id:t});p.b.Post("manage-open/moduleApplyVerify/flowCheckModuleApply",r,{},{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(1111,e),f()}))}}))}:f,wrapClassName:"apply-modul-auditing-infomod",afterClose:s},i.a.createElement(r.a,E,i.a.createElement(O,{label:"提交账号"}," ",T," "),i.a.createElement(O,{label:"类型"}," ",{1:"免费",2:"采购"}[j]," "),i.a.createElement(O,{label:"数量"}," ",S," "),i.a.createElement(O,{label:"收件人"}," ",P," "),i.a.createElement(O,{label:"收件人电话"}," ",N," "),i.a.createElement(O,{label:"收件地址"}," ",x," "),i.a.createElement(O,{label:"邮寄通道"}," ",x," "),k))}));function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],l=!0,c=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}r.a.Item;var C=function(e){var t=e.productId,n=e.closeFirmware,r=N(Object(c.useState)({}),2),a=r[0],o=r[1];return Object(c.useEffect)((function(){t&&p.b.Post("manage-open/product/show/firmware/config",{productId:t},{},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||{};o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n))}))}),[t]),a.productName,a.schemeType,a.moduleName,a.type,a.num,a.account,a.tel,a.address,a.mailType,a.expressNum,i.a.createElement(d.a,{visible:!!t,width:600,title:"固件信息",onCancel:n,onOk:n,wrapClassName:"apply-modul-auditing-firmware",afterClose:function(){o({})}},"9999999")};function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=_(e);if(t){var a=_(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return D(this,n)}}function D(e,t){if(t&&("object"===I(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var R=l.a.Option,L={0:"开发中",1:"已发布",2:"审核中"},M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(d,e);var t,n,r,c=A(d);function d(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),(t=c.call(this,e)).componentDidMount=function(){t.getList()},t.onReset=function(){t.setState({searchName:void 0,searchType:"undefined"},(function(){t.getList()}))},t.changeSearch=function(e,n){var r,a,o;t.setState((o=n,(a=e)in(r={})?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o,r))},t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=t.state,r=n.searchName,a=n.searchType,o={pageIndex:e,pageRows:10,productName:r,mode:"undefined"==a?void 0:a};p.b.Post("manage-open/moduleApplyVerify/getModuleApplyListByPage",o,{},{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var n=e.data,r=(void 0===n?{}:n).data||{},a=r.list,o=void 0===a?[]:a,l=r.pager,c=void 0===l?{}:l;t.setState({list:o,pager:c})}))},t.openModal=function(e){t.setState({visible:!0,editData:e})},t.handleCancel=function(){t.setState({visible:!1})},t.state={searchName:void 0,searchType:"undefined",list:[],pager:{},id:void 0,productId:void 0,status:1},t.column=[{title:"提交账号",dataIndex:"userId",ellipsis:!0},{title:"提交时间",dataIndex:"createTime",width:"160px",render:function(e){return i.a.createElement("span",null,e&&u.b.utcToDev(e)||"--")}},{title:"归属产品",dataIndex:"productName",ellipsis:!0},{title:"类型",dataIndex:"type",width:"60px",render:function(e){return i.a.createElement("span",null,{1:"免费",2:"采购"}[e])}},{title:"方案",dataIndex:"schemeType",width:"90px",render:function(e){return i.a.createElement("span",null,{1:"免开发",2:"MCU方案",3:"Soc方案"}[e])}},{title:"模组名称",dataIndex:"moduleName"},{title:"数量",dataIndex:"num",width:"50px"},{title:"固件名称",dataIndex:"firmwareName",render:function(e,n){var r=n.schemeType,a=n.productId;return 1==r?i.a.createElement("a",{onClick:function(){t.setState({productId:a})}},"text"):i.a.createElement("span",null,e)}},{title:"状态",dataIndex:"status",width:"76px",render:function(e){return i.a.createElement("span",null,{1:"待审核",2:"未通过",3:"通过"}[e])}},{title:"操作",key:"id",width:"60px",render:function(e,n){var r=n.status,a=n.id;return i.a.createElement("a",{onClick:function(){return t.setState({id:a,status:r})}},1==r?"审核":"查看")}}],t}return t=d,(n=[{key:"render",value:function(){var e=this,t=this.state,n=t.searchName,r=t.searchType,c=t.list,u=t.pager,p=t.id,d=t.status,m=t.productId;return i.a.createElement("div",{className:"apply-modul-auditing"},i.a.createElement(s.a,{title:"申请&采购模组申请"},i.a.createElement("div",{className:"comm-title-search-box"},i.a.createElement("span",{className:"labeknam"},"产品名称："),i.a.createElement(o.a,{value:n,placeholder:"输入产品名称查询",maxLength:10,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchName",t.target.value||void 0)}}),i.a.createElement("span",{className:"labeknam"},"产品状态："),i.a.createElement(l.a,{className:"select",placeholder:"请选择状态",value:r,onChange:function(t){e.changeSearch("searchType",t)}},i.a.createElement(R,{key:"undefined",value:"undefined"}," 全部 "),Object.keys(L).map((function(e,t){return i.a.createElement(R,{key:t,value:+e}," ",L[e]," ")}))),i.a.createElement(a.a,{className:"btn",type:"primary",onClick:function(){e.getList()}},"查询"),i.a.createElement(a.a,{className:"btn",onClick:this.onReset},"重置"))),i.a.createElement("div",{className:"comm-contont-card"},i.a.createElement(f.a,{rowKey:"id",columns:this.column,dataSource:c,pager:u,onPageChange:this.getList})),i.a.createElement(j,{id:p,status:d,closeDetail:function(){e.setState({id:void 0})},getList:this.getList}),i.a.createElement(C,{productId:m,closeFirmware:function(){e.setState({productId:void 0})}}))}}])&&T(t.prototype,n),r&&T(t,r),d}(c.Component);t.default=r.a.create()(M)}}]);