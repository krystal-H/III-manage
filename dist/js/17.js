(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1458:function(e,t,a){},1524:function(e,t,a){"use strict";a.r(t);a(72);var n=a(22),r=(a(143),a(33)),l=(a(244),a(134)),o=(a(122),a(58)),u=(a(189),a(75)),c=(a(36),a(26),a(23),a(28),a(29),a(19),a(35),a(0)),s=a.n(c),i=(a(1458),a(4)),m=function(e){return i.c.request({url:"/manage-open/resource/getDefaultMenu",method:"post",data:e,headers:{"Content-Type":"application/json"}})},f=function(e){return i.c.request({url:"/manage-open/resource/modifyMenuRes",method:"post",data:e,headers:{"Content-Type":"application/json"}})};function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==u.return||u.return()}finally{if(r)throw l}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var y=u.a.Option,b=o.a.TextArea;t.default=r.a.create()(function(e){var t=e.form,a=t.getFieldDecorator,i=d(Object(c.useState)(""),2),g=i[0],h=i[1],E=d(Object(c.useState)("open"),2),v=E[0],S=(E[1],d(Object(c.useState)(),2)),w=S[0],j=S[1];return Object(c.useEffect)(function(){var e=t.getFieldValue("clientId");"default-menu"===g?(j([]),m({clientId:e,type:"default-menu"}).then(function(e){j(e.data.data.resource?JSON.stringify(JSON.parse(e.data.data.resource),null,2):[])})):j("")},[g]),s.a.createElement("div",{className:"auth-mag-page"},s.a.createElement(r.a,{labelCol:{span:7},wrapperCol:{span:8},onSubmit:function(e){e.preventDefault(),t.validateFields(function(e,a){if(e)console.log("err----",e);else{if("default-menu"===a.type){if(!function(e){if("string"==typeof e)try{var t=JSON.parse(e);return!("object"!=p(t)||!t)}catch(t){return console.log("error："+e+"!!!"+t),!1}console.log("It is not a string!")}(a.resource))return void l.a.error("json格式有误！请仔细检查，尤其是多余的符号！");a.resource=JSON.stringify(JSON.parse(a.resource))}console.log("submit",a),f(a).then(function(e){0===e.data.code&&(l.a.success("提交成功"),t.resetFields(),j([]),h(""))})}})}},s.a.createElement(r.a.Item,{label:"平台编码"},a("clientId",{initialValue:v,rules:[{required:!0,message:"请输入平台编码",whitespace:!0}]})(s.a.createElement(u.a,{placeholder:"请选择操作类型",onChange:function(){h(""),t.setFieldsValue({type:""})}},s.a.createElement(y,{value:"open"},"open"),s.a.createElement(y,{value:"dmp"},"dmp")))),s.a.createElement(r.a.Item,{label:"操作类型"},a("type",{rules:[{required:!0,message:"请选择操作类型"}]})(s.a.createElement(u.a,{placeholder:"请选择操作类型",onSelect:function(e){return function(e){h(e)}(e)}},s.a.createElement(y,{value:"default-menu"},"修改平台菜单"),s.a.createElement(y,{value:"default-url"},"新增接口url")))),"default-menu"===g&&s.a.createElement(s.a.Fragment,null,s.a.createElement(r.a.Item,{label:"当前菜单json"},a("resource",{initialValue:w,rules:[{required:!0,message:"请输入当前菜单json",whitespace:!0}]})(s.a.createElement(b,{autosize:!0})))),"default-url"===g&&s.a.createElement(s.a.Fragment,null,s.a.createElement(r.a.Item,{label:"接口url"},a("resource",{initialValue:w,rules:[{required:!0,message:"请输入接口url",whitespace:!0}]})(s.a.createElement(o.a,{placeholder:"请输入接口url"})))),s.a.createElement(r.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:7}}},s.a.createElement(n.a,{type:"primary",htmlType:"submit",className:"submit-button"},"提交"))))})}}]);