(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1449:function(e,t,a){},1559:function(e,t,a){"use strict";a.r(t);a(45),a(46),a(37),a(18),a(34),a(41),a(33),a(42),a(35),a(21),a(36),a(27),a(29),a(30),a(143);var n=a(38),r=(a(74),a(20)),o=(a(129),a(64)),c=(a(198),a(77)),i=a(0),l=a.n(i),u=a(32),s=a(468),p=a(91),d=a(3),f=(a(1449),a(199),a(221),a(256),a(222),a(99)),m=(a(1394),a(1395)),y=(a(298),a(108)),h=(a(144),a(48));a(66),a(303),a(118);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var w=n.a.Item,E={labelCol:{span:6},wrapperCol:{span:14}},O={strextVer:/^[a-zA-Z0-9_\-\.]{1,30}$/,verNam:/^[a-zA-Z0-9\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{0,39}$/,mainVer:/^[0-9]*$/,url:/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/};var x=n.a.create()((function(e){var t=e.updata,a=t.productId,s=t.schemeType,p=t.hetModuleTypeName,g=void 0===p?"--":p,x=t.productName,j=void 0===x?"--":x,T=t.tel,N=void 0===T?"--":T,P=e.form,S=P.getFieldDecorator,V=P.setFieldsValue,I=P.validateFields,_=(P.resetFields,e.close),C=v(Object(i.useState)([]),2),k=C[0],L=C[1],A=v(Object(i.useState)([]),2),R=A[0],F=A[1],D=v(Object(i.useState)(),2),M=D[0],z=D[1],K=v(Object(i.useState)({}),2),U=K[0],q=K[1],Z=U.productFirmwareVersion,$=void 0===Z?0:Z,B=U.summaryVersions,J=void 0===B?[]:B;return Object(i.useEffect)((function(){a&&(d.c.Post("manage-open/firmware/productFirmware/type/get",{productId:a,schemeType:s},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,a=(void 0===t?{}:t).data||[];console.log(7777,a),L(a),F([])})),d.c.Post("manage-open/firmware/productFirmware/getLastProductVersion",{productId:a},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,a=void 0===t?{}:t;a=a.data||{},q(a)})))}),[a]),l.a.createElement(f.a,{visible:!0,width:600,title:"升级",maskClosable:!1,onCancel:_,onOk:function(){I((function(e,t){if(console.log(111,t),!e){var n=R.map((function(e){var n=k.find((function(t){return t.firmwareTypeNo==e}))||{},r=n.firmwareTypeName,o=n.deviceVersionType,c=t["extVersion_".concat(e)],i=t["totalVersion_".concat(e)],l=t["filePath_".concat(e)];return{deviceVersionName:r,deviceVersionType:o,firmwareVersionType:e,mainVersion:"",extVersion:c,totalVersion:i,filePath:l,productId:a}})),r=t.productFirmwareVersion,o=t.textTemplate,c={productId:a,extVersion:r,deviceVersionIds:J[0]&&J[0].deviceVersionId,deviceVersions:n,phone:N,hetModuleTypeName:g,textTemplate:o};d.c.Post("manage-open/firmware/device/version/add",c,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(222,e),_(),h.a.success({description:"升级成功"})}))}}))},okText:"升级通知",wrapClassName:"ota_add_firmware_dialog"},l.a.createElement(n.a,E,l.a.createElement(w,{label:"产品名称"},j),l.a.createElement(w,{label:"产品方案"},{1:"免开发",2:"MCU方案",3:"Soc方案"}[s]),l.a.createElement(w,{label:"模组型号"},g),l.a.createElement(w,{label:"产品版本号"},S("productFirmwareVersion",{rules:[{required:!0,message:"请输入产品版本号"}]})(l.a.createElement(o.a,{maxLength:10,placeholder:"请输入产品版本号"}))),l.a.createElement(w,{label:"当前产品版本号"},$),l.a.createElement(w,{label:"模块"},S("noneed",{rules:[{required:!0,message:"选择固件模块"}]})(l.a.createElement(c.a,{placeholder:"选择固件模块",onChange:function(e){F(e)},mode:"multiple",onDeselect:function(e){M==e&&z(R[0])},onSelect:function(e){var t;z(e),V((b(t={},"filePath_".concat(e),""),b(t,"extVersion_".concat(e),""),t))}},k.map((function(e,t){var a=e.firmwareTypeName,n=e.firmwareTypeNo;return l.a.createElement(c.a.Option,{key:n,value:n},a)}))))),R.length>0&&l.a.createElement(l.a.Fragment,null,l.a.createElement(y.a,{type:"card",onChange:function(e){z(e)}},R.map((function(e){var t=J.find((function(t){return t.firmwareVersionType==e}))||{},a=t.firmwareVersionTypeName,n=t.totalVersion,r=void 0===n?"":n,c=t.curExtVersion,i=void 0===c?"":c;return l.a.createElement(y.a.TabPane,{tab:a||k.find((function(t){return t.firmwareTypeNo==e})).firmwareTypeName,key:e},l.a.createElement(w,{label:"硬件版本号"},S("totalVersion_".concat(e),{initialValue:r})(l.a.createElement(o.a,{maxLength:50,placeholder:"请输入硬件版本号"}))),l.a.createElement(w,{label:"当前软件版本号"},i),l.a.createElement(w,{label:"待上传软件版本号"},S("extVersion_".concat(e),{rules:[{required:!0,message:"待上传软件版本号"}]})(l.a.createElement(o.a,{maxLength:30,placeholder:"请输入需上传的固件程序的软件版本号"}))),l.a.createElement(w,{label:"固件程序"},S("filePath_".concat(e),{rules:[{required:!0,message:"请输入URL"},{pattern:O.url,message:"请输入正确的URL"}]})(l.a.createElement(o.a,{maxLength:100,placeholder:"请输入URL或者上传一个附件自动填充"}))))}))),l.a.createElement(m.a,{className:"filepathinpt",onChange:function(e){var t=e.file;if(t.response){var a=t.response.data&&t.response.data.url||"";V(b({},"filePath_".concat(M),a))}"removed"==t.status&&V(b({},"filePath_".concat(M),""))},accept:".bin,.hex,.zip,.cyacd,.apk,.dpkg",maxCount:1,action:u.j,data:{appId:31438,domainType:4}},l.a.createElement(r.a,{type:"primary"},"上传附件"),l.a.createElement("div",null,"支持.bin,.hex,.zip,.cyacd,.apk,.dpkg格式，不超过200MB。"))),l.a.createElement(w,{label:"通知方式"},"短信通知"),l.a.createElement(w,{label:"产品联系手机号"},N),l.a.createElement(w,{label:"短信文案"},S("textTemplate",{rules:[{required:!0,message:"请输入短信文案"}],initialValue:"尊敬的客户您好：clife平台已升级通信模组 ".concat(g||"--"," ，您关联使用的产品 ").concat(j||"--","，可进行设备模组固件升级，敬请留意~")})(l.a.createElement(o.a.TextArea,{maxLength:300,autoSize:!0,placeholder:"请输入短信文案"})))))}));function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach((function(t){P(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function S(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function V(e,t){return(V=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=C(e);if(t){var r=C(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return _(this,a)}}function _(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}c.a.Option;var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&V(e,t)}(i,e);var t,a,n,c=I(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=c.call(this,e)).componentDidMount=function(){t.getList()},t.onReset=function(){t.setState({searchName:void 0,searchKey:void 0},(function(){t.getList()}))},t.changeSearch=function(e,a){t.setState(P({},e,a))},t.getList=function(e){e&&t.setState({pageIndex:e});var a=t.state,n=a.searchName,r=a.searchKey,o=a.pageIndex,c={pageIndex:e||o,pageRows:10,productName:n,hetModuleTypeName:r};d.c.Post("manage-open/product/module/search",c,{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var a=e.data,n=void 0===a?{}:a;console.log(666,n);var r=n.data||{},o=r.list,c=void 0===o?[]:o,i=r.pager,l=void 0===i?{}:i;t.setState({list:c,pager:l})}))},t.state={searchName:void 0,searchKey:void 0,pageIndex:1,list:[],pager:{},updata:{}},t.column=[{title:"模组型号",dataIndex:"hetModuleTypeName"},{title:"使用的产品名称",dataIndex:"productName"},{title:"使用的产品ID",dataIndex:"productId"},{title:"产品方案",dataIndex:"schemeType",render:function(e){return l.a.createElement("span",null,{1:"免开发",2:"MCU方案",3:"Soc方案"}[e])}},{title:"产品归属账号",dataIndex:"userName"},{title:"操作",dataIndex:"t",width:"60px",render:function(e,a){return l.a.createElement("a",{onClick:function(){return t.setState({updata:a})}},"升级")}}],t}return t=i,(a=[{key:"render",value:function(){var e=this,t=this.state,a=t.searchName,n=t.searchKey,c=t.list,i=t.pager,u=t.pageIndex,d=t.updata;return l.a.createElement("div",{className:"pro-firmware-up"},l.a.createElement(s.a,{title:"产品模组升级"},l.a.createElement("div",{className:"comm-title-search-box"},l.a.createElement("span",{className:"labeknam"},"关键字："),l.a.createElement(o.a,{value:n,placeholder:"请输入生产厂商或模组型号",maxLength:30,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchKey",t.target.value||void 0)}}),l.a.createElement("span",{className:"labeknam"},"产品名称："),l.a.createElement(o.a,{value:a,placeholder:"请输入产品名称",maxLength:30,onPressEnter:function(){e.getList()},onChange:function(t){e.changeSearch("searchName",t.target.value||void 0)}}),l.a.createElement(r.a,{className:"btn",type:"primary",onClick:function(){e.getList()}},"查询"),l.a.createElement(r.a,{className:"btn",onClick:this.onReset},"重置"))),l.a.createElement("div",{className:"comm-contont-card"},l.a.createElement(p.a,{rowKey:"productId",columns:this.column,dataSource:c,pager:N(N({},i),{},{pageIndex:u}),onPageChange:this.getList})),d.productId&&l.a.createElement(x,{updata:d,close:function(){return e.setState({updata:{}})}}))}}])&&S(t.prototype,a),n&&S(t,n),i}(i.Component);t.default=n.a.create()(k)}}]);