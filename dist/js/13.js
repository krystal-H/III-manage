(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1489:function(e,t,a){},1534:function(e,t,a){"use strict";a.r(t);a(19),a(37),a(22),a(38),a(29),a(31),a(32),a(199),a(221),a(257),a(75);var r=a(20),n=(a(155),a(40)),o=(a(297),a(156)),l=(a(137),a(68)),u=(a(198),a(76)),c=a(0),s=a.n(c),i=(a(1489),a(3));function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,o=[],l=!0,u=!1;try{for(a=a.call(e);!(l=(r=a.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){u=!0,n=e}finally{try{l||null==a.return||a.return()}finally{if(u)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var d=u.a.Option,y=l.a.TextArea;t.default=n.a.create()((function(e){var t=e.form,a=t.getFieldDecorator,p=m(Object(c.useState)(""),2),b=p[0],g=p[1],h=m(Object(c.useState)("open"),2),v=h[0],S=(h[1],m(Object(c.useState)(),2)),E=S[0],w=S[1];Object(c.useEffect)((function(){var e;"default-menu"===b?(w([]),(e={clientId:v,type:"default-menu"},i.c.request({url:"/manage-open/resource/getDefaultMenu",method:"post",data:e,headers:{"Content-Type":"application/json"}})).then((function(e){w(e.data.data.resource?JSON.stringify(JSON.parse(e.data.data.resource),null,2):[])}))):w("")}),[b]),Object(c.useEffect)((function(){console.log(b,"aaaaaaaaaaaaaa")}),[b]);var j={wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:7}}};return s.a.createElement("div",{className:"auth-mag-page"},s.a.createElement(n.a,{labelCol:{span:7},wrapperCol:{span:8},onSubmit:function(e){e.preventDefault(),t.validateFields((function(e,a){var r;e?console.log("err----",e):(console.log("Received values of form: ",a),"default-menu"===a.type&&(!function(e){if("string"==typeof e)try{var t=JSON.parse(e);return!("object"!=f(t)||!t)}catch(t){return console.log("error："+e+"!!!"+t),!1}console.log("It is not a string!")}(a.resource)?o.a.error("json格式有误！请仔细检查，尤其是多余的符号！"):a.resource=JSON.stringify(JSON.parse(a.resource))),console.log("submit",a),(r=a,i.c.request({url:"/manage-open/resource/modifyMenuRes",method:"post",data:r,headers:{"Content-Type":"application/json"}})).then((function(e){0===e.data.code&&(o.a.success("提交成功"),t.resetFields(),w([]),g(""))})))}))}},s.a.createElement(n.a.Item,{label:"平台编码"},a("clientId",{initialValue:v,rules:[{required:!0,message:"请输入平台编码",whitespace:!0}]})(s.a.createElement(u.a,{placeholder:"请选择操作类型"},s.a.createElement(d,{value:"open"},"open")))),s.a.createElement(n.a.Item,{label:"操作类型"},a("type",{rules:[{required:!0,message:"请选择操作类型"}]})(s.a.createElement(u.a,{placeholder:"请选择操作类型",onSelect:function(e){return function(e){g(e)}(e)}},s.a.createElement(d,{value:"default-menu"},"修改平台菜单"),s.a.createElement(d,{value:"default-url"},"新增接口url")))),"default-menu"===b&&s.a.createElement(s.a.Fragment,null,s.a.createElement(n.a.Item,{label:"当前菜单json"},a("resource",{initialValue:E,rules:[{required:!0,message:"请输入当前菜单json",whitespace:!0}]})(s.a.createElement(y,{autoSize:{minRows:20,maxRows:20}})))),"default-url"===b&&s.a.createElement(s.a.Fragment,null,s.a.createElement(n.a.Item,{label:"接口url"},a("resource",{initialValue:E,rules:[{required:!0,message:"请输入接口url",whitespace:!0}]})(s.a.createElement(l.a,{placeholder:"请输入接口url"})))),s.a.createElement(n.a.Item,j,s.a.createElement(r.a,{type:"primary",htmlType:"submit",className:"submit-button"},"提交"))))}))}}]);