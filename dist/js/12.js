(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1443:function(e,t,n){},1548:function(e,t,n){"use strict";n.r(t);n(45),n(46),n(18),n(34),n(41),n(33),n(42),n(35),n(21),n(36),n(27),n(29),n(30),n(142);var r=n(38),a=(n(74),n(20)),o=(n(128),n(64)),l=(n(197),n(77)),c=(n(66),n(37),n(0)),i=n.n(c),u=n(32),s=n(469),p=n(91),f=n(3),d=(n(1443),n(198),n(220),n(256),n(221),n(99)),m=(n(471),n(171));function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],l=!0,c=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var E=r.a.Item,w={labelCol:{span:6},wrapperCol:{span:14}},O={1:"顺丰",2:"其他"};var j=r.a.create()((function(e){var t=e.id,n=e.status,a=e.form,l=a.getFieldDecorator,u=a.validateFields,s=a.resetFields,p=e.closeDetail,y=e.getList,h=v(Object(c.useState)({}),2),g=h[0],j=h[1];Object(c.useEffect)((function(){t&&f.c.Post("manage-open/moduleApplyVerify/getModuleApply",{id:t},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||{};j(b({},n))}))}),[t]),g.productName,g.schemeType,g.moduleName;var S=g.type,I=g.num,P=g.account,x=g.tel,C=g.address,N=g.mailType,T=g.expressNum,k=g.userId,A="",D="";return 1==n?(D="审核",A=i.a.createElement(i.a.Fragment,null,i.a.createElement(E,{label:"邮寄通道"},l("mailType",{initialValue:1,rules:[{required:!0,message:"请选择邮寄通道"}]})(i.a.createElement(m.a.Group,null,i.a.createElement(m.a,{value:1},"顺丰"),i.a.createElement(m.a,{value:2},"其他")))),i.a.createElement(E,{label:"快递单号"},l("expressNum",{rules:[{required:!0,message:"快递单号"}]})(i.a.createElement(o.a,{maxLength:50,placeholder:"请输入快递单号"}))),i.a.createElement(E,{label:"审核"},l("status",{rules:[{required:!0,message:"请审核是否通过"}]})(i.a.createElement(m.a.Group,null,i.a.createElement(m.a,{value:2},"不通过"),i.a.createElement(m.a,{value:3},"通过")))))):(D="查看",A=i.a.createElement(i.a.Fragment,null,i.a.createElement(E,{label:"邮寄通道"}," ",N&&O[N]," "),i.a.createElement(E,{label:"快递单号"}," ",T," "),i.a.createElement(E,{label:"状态"}," ",{2:"不通过",3:"通过"}[n]," "))),i.a.createElement(d.a,{visible:!!t,width:600,title:D,onCancel:p,onOk:1==n?function(){u((function(e,n){if(!e){var r=b(b({},n),{},{id:t});f.c.Post("manage-open/moduleApplyVerify/flowCheckModuleApply",r,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(1111,e),p(),y()}))}}))}:p,wrapClassName:"apply-modul-auditing-infomod",afterClose:s},i.a.createElement(r.a,w,i.a.createElement(E,{label:"提交账号"}," ",k," "),i.a.createElement(E,{label:"类型"}," ",{1:"免费",2:"采购"}[S]," "),i.a.createElement(E,{label:"数量"}," ",I," "),i.a.createElement(E,{label:"收件人"}," ",P," "),i.a.createElement(E,{label:"收件人电话"}," ",x," "),i.a.createElement(E,{label:"收件地址"}," ",C," "),A))}));function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],l=!0,c=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){c=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return I(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P=r.a.Item;var x=function(e){var t=e.productId,n=e.closeFirmware,a=S(Object(c.useState)([]),2),o=a[0],l=a[1];return Object(c.useEffect)((function(){t&&f.c.Post("manage-open/product/show/firmware/config",{productId:t},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||{};l(n.firmwareModuleList||[])}))}),[t]),i.a.createElement(d.a,{visible:!!t,width:600,title:"固件信息",onCancel:n,onOk:n,afterClose:function(){l([])}},i.a.createElement(r.a,{labelCol:{span:10},wrapperCol:{span:10}},o.map((function(e,t){return e.firmwareFuncList&&e.firmwareFuncList.map((function(e,n){return i.a.createElement("div",{key:t+"_"+n},"int"===e.dataType.type&&i.a.createElement(P,{key:e.funcName+t+"int"+n,label:e.funcName},e.dataType.specs.defaultValue),"enum"===e.dataType.type&&i.a.createElement(P,{key:e.funcName+t+"enum"+n,label:e.funcName},e.dataType.specs.defaultValue[0].k))}))}))))};function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){k(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=M(e);if(t){var a=M(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return F(this,n)}}function F(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function M(e){return(M=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var R=l.a.Option,_={0:"开发中",1:"已发布",2:"审核中"},V=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(d,e);var t,n,r,c=L(d);function d(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),(t=c.call(this,e)).componentDidMount=function(){t.getList()},t.onReset=function(){t.setState({searchName:void 0,searchType:"undefined"},(function(){t.getList()}))},t.changeSearch=function(e,n){t.setState(k({},e,n))},t.getList=function(e){e&&t.setState({pageIndex:e});var n=t.state,r=n.searchName,a=n.searchType,o=n.pageIndex,l={pageIndex:e||o,pageRows:10,productName:r,mode:"undefined"==a?void 0:a};f.c.Post("manage-open/moduleApplyVerify/getModuleApplyListByPage",l,{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var n=e.data,r=(void 0===n?{}:n).data||{},a=r.list,o=void 0===a?[]:a,l=r.pager,c=void 0===l?{}:l;t.setState({list:o,pager:c})}))},t.openModal=function(e){t.setState({visible:!0,editData:e})},t.handleCancel=function(){t.setState({visible:!1})},t.state={searchName:void 0,searchType:"undefined",pageIndex:1,list:[],pager:{},id:void 0,productId:void 0,status:1},t.column=[{title:"提交账号",dataIndex:"userId",ellipsis:!0},{title:"提交时间",dataIndex:"createTime",width:"160px",render:function(e){return i.a.createElement("span",null,e&&u.b.utcToDev(e)||"--")}},{title:"归属产品",dataIndex:"productName",ellipsis:!0},{title:"类型",dataIndex:"type",width:"60px",render:function(e){return i.a.createElement("span",null,{1:"免费",2:"采购"}[e])}},{title:"方案",dataIndex:"schemeType",width:"90px",render:function(e){return i.a.createElement("span",null,{1:"免开发",2:"MCU方案",3:"Soc方案"}[e])}},{title:"模组名称",dataIndex:"moduleName"},{title:"数量",dataIndex:"num",width:"50px"},{title:"固件名称",dataIndex:"firmwareName",render:function(e,n){var r=n.schemeType,a=n.productId;return e=e||"--",1==r?i.a.createElement("a",{onClick:function(){t.setState({productId:a})}},e):i.a.createElement("span",null,e)}},{title:"状态",dataIndex:"status",width:"76px",render:function(e){return i.a.createElement("span",null,{1:"待审核",2:"未通过",3:"通过"}[e])}},{title:"操作",key:"id",width:"60px",render:function(e,n){var r=n.status,a=n.id;return i.a.createElement("a",{onClick:function(){return t.setState({id:a,status:r})}},1==r?"审核":"查看")}}],t}return t=d,(n=[{key:"render",value:function(){var e=this,t=this.state,n=t.searchName,r=t.searchType,c=t.list,u=t.pager,f=t.id,d=t.status,m=t.productId,y=t.pageIndex;return i.a.createElement("div",{className:"apply-modul-auditing"},i.a.createElement(s.a,{title:"申请&采购模组申请"},i.a.createElement("div",{className:"comm-title-search-box"},i.a.createElement("span",{className:"labeknam"},"产品名称："),i.a.createElement(o.a,{value:n,placeholder:"输入产品名称查询",maxLength:10,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchName",t.target.value||void 0)}}),i.a.createElement("span",{className:"labeknam"},"产品状态："),i.a.createElement(l.a,{className:"select",placeholder:"请选择状态",value:r,onChange:function(t){e.changeSearch("searchType",t)}},i.a.createElement(R,{key:"undefined",value:"undefined"}," 全部 "),Object.keys(_).map((function(e,t){return i.a.createElement(R,{key:t,value:+e}," ",_[e]," ")}))),i.a.createElement(a.a,{className:"btn",type:"primary",onClick:function(){e.getList()}},"查询"),i.a.createElement(a.a,{className:"btn",onClick:this.onReset},"重置"))),i.a.createElement("div",{className:"comm-contont-card"},i.a.createElement(p.a,{rowKey:"id",columns:this.column,dataSource:c,pager:T(T({},u),{},{pageIndex:y}),onPageChange:this.getList})),i.a.createElement(j,{id:f,status:d,closeDetail:function(){e.setState({id:void 0})},getList:this.getList}),i.a.createElement(x,{productId:m,closeFirmware:function(){e.setState({productId:void 0})}}))}}])&&A(t.prototype,n),r&&A(t,r),d}(c.Component);t.default=r.a.create()(V)}}]);