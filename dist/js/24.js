(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1535:function(e,t,n){},1595:function(e,t,n){"use strict";n.r(t);n(18),n(36),n(37),n(27),n(28),n(29),n(198),n(222),n(258),n(101);var a=n(40),r=(n(301),n(158)),o=(n(259),n(138)),u=(n(223),n(93)),c=(n(146),n(34)),i=(n(22),n(65),n(471),n(33),n(170),n(0)),s=n.n(i),l=n(3),d=n(32);n(1535);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],u=!0,c=!1;try{for(n=n.call(e);!(u=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);u=!0);}catch(e){c=!0,r=e}finally{try{u||null==n.return||n.return()}finally{if(c)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}c.a.Item;t.default=c.a.create()((function(e){var t=e.form,n=f(Object(i.useState)({pageIndex:1,pageRows:10}),2),c=n[0],p=n[1],g=(t.getFieldDecorator,t.validateFields,t.getFieldsValue,f(Object(i.useState)(0),2)),m=g[0],y=g[1],h=f(Object(i.useState)([]),2),b=h[0],w=h[1],v=f(Object(i.useState)(!1),2),S=(v[0],v[1],f(Object(i.useState)("add"),2)),O=(S[0],S[1],f(Object(i.useState)({}),2)),I=(O[0],O[1],f(Object(i.useState)(!1),2)),k=I[0],j=I[1];Object(i.useEffect)((function(){x()}),[c.pageRows,c.pageIndex]);var x=function(){j(!0),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.c.request({url:"/manage-open/manage/user/getUserList",method:"post",data:e,headers:{}})}({pager:c}).then((function(e){0==e.data.code&&(e.data.data.records.forEach((function(e,t){e.key=t+1})),w(e.data.data.records),y(e.data.data.total))})).finally((function(){j(!1)}))},E=function(e){var t={status:e.status?0:1,userId:e.userId};u.a.confirm({title:"确认",okText:"确定",cancelText:"取消",content:"是否".concat(e.status?"禁用账户":"解除锁定"),onOk:function(){var n;(n=t,l.c.request({url:"/manage-open/manage/user/updateUserStatus",method:"post",data:n,headers:{}})).then((function(t){0==t.data.code&&(o.a.success("".concat(e.status?"禁用账户":"解除锁定","成功")),x())}))}})},J=[{title:"编号",dataIndex:"key",key:"key",width:70},{title:"账户名",dataIndex:"phone",key:"phone",render:function(e){return s.a.createElement("span",{title:e},e)}},{title:"身份状态",dataIndex:"status",key:"status",render:function(e){return s.a.createElement("span",{title:e?"正常":"禁用"},e?"正常":"禁用")}},{title:"注册时间",dataIndex:"createTime",key:"createTime",render:function(e){return e&&d.b.utcToDev(e)}},{title:"操作",key:"action",width:200,render:function(e,t){return s.a.createElement("a",{onClick:function(){E(t)}},t.status?"禁用账户":"解除锁定")}}];return s.a.createElement("div",{className:"classify-page"},s.a.createElement(a.a,null,s.a.createElement(r.a,{rowKey:"userId",columns:J,dataSource:b,loading:k,bordered:!0,pagination:{defaultCurrent:1,current:c.pageIndex,onChange:function(e,t){t===c.pageRows?p((function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})})):p((function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})}))},pageSize:c.pageRows,total:m,showQuickJumper:!0,showTotal:function(){return s.a.createElement("span",null,"共 ",s.a.createElement("a",null,m)," 条")}}})))}))}}]);