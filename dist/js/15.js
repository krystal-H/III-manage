(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1424:function(e,t,n){"use strict";n(48),n(49),n(19),n(37),n(22),n(38),n(28),n(30),n(31);var r=n(0),a=n.n(r);n(1425);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=f(e);if(t){var a=f(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return s(this,n)}}function s(e,t){if(t&&("object"===o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(s,e);var t,n,r,o=u(s);function s(){return c(this,s),o.apply(this,arguments)}return t=s,(n=[{key:"render",value:function(){var e=this.props,t=e.children,n=e.title;return a.a.createElement("div",{className:"title-tab"},a.a.createElement("div",{className:"title-tab-option"},a.a.createElement("span",{className:"title-tab-title"},n)),a.a.createElement("div",{className:"title-tab-option"},t))}}])&&i(t.prototype,n),r&&i(t,r),s}(a.a.Component);p.Option=function(e){var t=e.children,n=e.label,r=e.align,o=void 0===r?"left":r;return a.a.createElement("div",{className:"".concat("left"===o?"title-tab-item":"title-tab-item-right")},a.a.createElement("span",{className:n?"title-table-label":"title-table-label-non"},n?n+":":""),t)},t.a=p},1425:function(e,t,n){},1446:function(e,t,n){},1549:function(e,t,n){"use strict";n.r(t);n(48),n(49),n(35),n(19),n(34),n(43),n(33),n(44),n(37),n(22),n(38),n(28),n(30),n(31),n(154);var r=n(40),a=(n(75),n(20)),o=(n(136),n(69)),c=(n(197),n(76)),i=n(0),l=n.n(i),u=n(32),s=n(1424),f=n(106),p=n(3),m=(n(1446),n(198),n(220),n(256),n(255),n(127)),d=(n(1388),n(1389)),y=(n(299),n(107)),h=(n(142),n(46));n(65),n(305),n(117);function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var w=r.a.Item,E={labelCol:{span:6},wrapperCol:{span:14}},O={strextVer:/^[a-zA-Z0-9_\-\.]{1,30}$/,verNam:/^[a-zA-Z0-9\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{0,39}$/,mainVer:/^[0-9]*$/,url:/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/};var j=r.a.create()((function(e){var t=e.updata,n=t.productId,s=t.schemeType,f=t.hetModuleTypeName,g=void 0===f?"--":f,j=t.productName,x=void 0===j?"--":j,N=t.tel,P=void 0===N?"--":N,S=e.form,T=S.getFieldDecorator,_=S.setFieldsValue,V=S.validateFields,I=(S.resetFields,e.close),C=v(Object(i.useState)([]),2),k=C[0],L=C[1],R=v(Object(i.useState)([]),2),A=R[0],D=R[1],F=v(Object(i.useState)(),2),M=F[0],z=F[1],K=v(Object(i.useState)({}),2),U=K[0],q=K[1],B=U.productFirmwareVersion,Z=void 0===B?0:B,$=U.summaryVersions,J=void 0===$?[]:$;return Object(i.useEffect)((function(){n&&(p.c.Post("manage-open/firmware/productFirmware/type/get",{productId:n,schemeType:s},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||[];console.log(7777,n),L(n),D([])})),p.c.Post("manage-open/firmware/productFirmware/getLastProductVersion",{productId:n},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=void 0===t?{}:t;n=n.data||{},q(n)})))}),[n]),l.a.createElement(m.a,{visible:!0,width:600,title:"升级",maskClosable:!1,onCancel:I,onOk:function(){V((function(e,t){if(console.log(111,t),!e){var r=A.map((function(e){var r=k.find((function(t){return t.firmwareTypeNo==e}))||{},a=r.firmwareTypeName,o=r.deviceVersionType,c=t["extVersion_".concat(e)],i=t["totalVersion_".concat(e)],l=t["filePath_".concat(e)];return{deviceVersionName:a,deviceVersionType:o,firmwareVersionType:e,mainVersion:"",extVersion:c,totalVersion:i,filePath:l,productId:n}})),a=t.productFirmwareVersion,o=t.textTemplate,c={productId:n,extVersion:a,deviceVersionIds:J[0]&&J[0].deviceVersionId,deviceVersions:r,phone:P,hetModuleTypeName:g,textTemplate:o};p.c.Post("manage-open/firmware/device/version/add",c,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(222,e),I(),h.a.success({description:"升级成功"})}))}}))},okText:"升级通知",wrapClassName:"ota_add_firmware_dialog"},l.a.createElement(r.a,E,l.a.createElement(w,{label:"产品名称"},x),l.a.createElement(w,{label:"产品方案"},{1:"免开发",2:"MCU方案",3:"Soc方案"}[s]),l.a.createElement(w,{label:"模组型号"},g),l.a.createElement(w,{label:"产品版本号"},T("productFirmwareVersion",{rules:[{required:!0,message:"请输入产品版本号"}]})(l.a.createElement(o.a,{maxLength:10,placeholder:"请输入产品版本号"}))),l.a.createElement(w,{label:"当前产品版本号"},Z),l.a.createElement(w,{label:"模块"},T("noneed",{rules:[{required:!0,message:"选择固件模块"}]})(l.a.createElement(c.a,{placeholder:"选择固件模块",onChange:function(e){D(e)},mode:"multiple",onDeselect:function(e){M==e&&z(A[0])},onSelect:function(e){var t;z(e),_((b(t={},"filePath_".concat(e),""),b(t,"extVersion_".concat(e),""),t))}},k.map((function(e,t){var n=e.firmwareTypeName,r=e.firmwareTypeNo;return l.a.createElement(c.a.Option,{key:r,value:r},n)}))))),A.length>0&&l.a.createElement(l.a.Fragment,null,l.a.createElement(y.a,{type:"card",onChange:function(e){z(e)}},A.map((function(e){var t=J.find((function(t){return t.firmwareVersionType==e}))||{},n=t.firmwareVersionTypeName,r=t.totalVersion,a=void 0===r?"":r,c=t.curExtVersion,i=void 0===c?"":c;return l.a.createElement(y.a.TabPane,{tab:n||k.find((function(t){return t.firmwareTypeNo==e})).firmwareTypeName,key:e},l.a.createElement(w,{label:"硬件版本号"},T("totalVersion_".concat(e),{initialValue:a})(l.a.createElement(o.a,{maxLength:50,placeholder:"请输入硬件版本号"}))),l.a.createElement(w,{label:"当前软件版本号"},i),l.a.createElement(w,{label:"待上传软件版本号"},T("extVersion_".concat(e),{rules:[{required:!0,message:"待上传软件版本号"}]})(l.a.createElement(o.a,{maxLength:30,placeholder:"请输入需上传的固件程序的软件版本号"}))),l.a.createElement(w,{label:"固件程序"},T("filePath_".concat(e),{rules:[{required:!0,message:"请输入URL"},{pattern:O.url,message:"请输入正确的URL"}]})(l.a.createElement(o.a,{maxLength:100,placeholder:"请输入URL或者上传一个附件自动填充"}))))}))),l.a.createElement(d.a,{className:"filepathinpt",onChange:function(e){var t=e.file;if(t.response){var n=t.response.data&&t.response.data.url||"";_(b({},"filePath_".concat(M),n))}"removed"==t.status&&_(b({},"filePath_".concat(M),""))},accept:".bin,.hex,.zip,.cyacd,.apk,.dpkg",maxCount:1,action:u.j,data:{appId:31438,domainType:4}},l.a.createElement(a.a,{type:"primary"},"上传附件"),l.a.createElement("div",null,"支持.bin,.hex,.zip,.cyacd,.apk,.dpkg格式，不超过200MB。"))),l.a.createElement(w,{label:"通知方式"},"短信通知"),l.a.createElement(w,{label:"产品联系手机号"},P),l.a.createElement(w,{label:"短信文案"},T("textTemplate",{rules:[{required:!0,message:"请输入短信文案"}],initialValue:"尊敬的客户您好：clife平台已升级通信模组 ".concat(g||"--"," ，您关联使用的产品 ").concat(x||"--","，可进行设备模组固件升级，敬请留意~")})(l.a.createElement(o.a.TextArea,{maxLength:300,autoSize:!0,placeholder:"请输入短信文案"})))))}));function x(e){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){S(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function V(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=C(e);if(t){var a=C(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return I(this,n)}}function I(e,t){if(t&&("object"===x(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}c.a.Option;var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(i,e);var t,n,r,c=V(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=c.call(this,e)).componentDidMount=function(){t.getList()},t.onReset=function(){t.setState({searchName:void 0,searchKey:void 0},(function(){t.getList()}))},t.changeSearch=function(e,n){t.setState(S({},e,n))},t.getList=function(e){e&&t.setState({pageIndex:e});var n=t.state,r=n.searchName,a=n.searchKey,o=n.pageIndex,c={pageIndex:e||o,pageRows:10,productName:r,hetModuleTypeName:a};p.c.Post("manage-open/product/module/search",c,{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var n=e.data,r=void 0===n?{}:n;console.log(666,r);var a=r.data||{},o=a.list,c=void 0===o?[]:o,i=a.pager,l=void 0===i?{}:i;t.setState({list:c,pager:l})}))},t.state={searchName:void 0,searchKey:void 0,pageIndex:1,list:[],pager:{},updata:{}},t.column=[{title:"模组型号",dataIndex:"hetModuleTypeName"},{title:"使用的产品名称",dataIndex:"productName"},{title:"使用的产品ID",dataIndex:"productId"},{title:"产品方案",dataIndex:"schemeType",render:function(e){return l.a.createElement("span",null,{1:"免开发",2:"MCU方案",3:"Soc方案"}[e])}},{title:"产品归属账号",dataIndex:"userName"},{title:"操作",dataIndex:"t",width:"60px",render:function(e,n){return l.a.createElement("a",{onClick:function(){return t.setState({updata:n})}},"升级")}}],t}return t=i,(n=[{key:"render",value:function(){var e=this,t=this.state,n=t.searchName,r=t.searchKey,c=t.list,i=t.pager,u=t.pageIndex,p=t.updata;return l.a.createElement("div",{className:"pro-firmware-up"},l.a.createElement(s.a,{title:"产品模组升级"},l.a.createElement("div",{className:"comm-title-search-box"},l.a.createElement("span",{className:"labeknam"},"关键字："),l.a.createElement(o.a,{value:r,placeholder:"请输入生产厂商或模组型号",maxLength:30,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchKey",t.target.value||void 0)}}),l.a.createElement("span",{className:"labeknam"},"产品名称："),l.a.createElement(o.a,{value:n,placeholder:"请输入产品名称",maxLength:30,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchName",t.target.value||void 0)}}),l.a.createElement(a.a,{className:"btn",type:"primary",onClick:function(){e.getList()}},"查询"),l.a.createElement(a.a,{className:"btn",onClick:this.onReset},"重置"))),l.a.createElement("div",{className:"comm-contont-card"},l.a.createElement(f.a,{rowKey:"productId",columns:this.column,dataSource:c,pager:P(P({},i),{},{pageIndex:u}),onPageChange:this.getList})),p.productId&&l.a.createElement(j,{updata:p,close:function(){return e.setState({updata:{}})}}))}}])&&T(t.prototype,n),r&&T(t,r),i}(i.Component);t.default=r.a.create()(k)}}]);