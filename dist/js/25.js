(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1472:function(e,t,a){},1532:function(e,t,a){"use strict";a.r(t);a(100);var n=a(43),r=(a(293),a(162)),u=(a(220),a(117)),o=(a(196),a(85)),c=(a(129),a(24)),s=(a(22),a(62),a(367),a(32),a(141),a(35),a(26),a(27),a(28),a(19),a(34),a(0)),i=a.n(s),d=a(4),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return d.c.request({url:"/manage-open/manage/user/getUserList",method:"post",data:e,headers:{}})},f=function(e){return d.c.request({url:"/manage-open/manage/user/updateUserStatus",method:"post",data:e,headers:{}})},p=a(33);a(1472);function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,u=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,u=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw u}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}c.a.Item;t.default=c.a.create()(function(e){var t=e.form,a=g(Object(s.useState)({pageIndex:1,pageRows:10}),2),c=a[0],d=a[1],m=(t.getFieldDecorator,t.validateFields,t.getFieldsValue,g(Object(s.useState)(0),2)),h=m[0],y=m[1],w=g(Object(s.useState)([]),2),b=w[0],v=w[1],O=g(Object(s.useState)(!1),2),S=(O[0],O[1],g(Object(s.useState)("add"),2)),k=(S[0],S[1],g(Object(s.useState)({}),2)),I=(k[0],k[1],g(Object(s.useState)(!1),2)),x=I[0],E=I[1];Object(s.useEffect)(function(){j()},[c.pageRows,c.pageIndex]);var j=function(){E(!0),l({pager:c}).then(function(e){0==e.data.code&&(e.data.data.records.forEach(function(e,t){e.key=t+1}),v(e.data.data.records),y(e.data.data.total))}).finally(function(){E(!1)})},J=[{title:"编号",dataIndex:"key",key:"key",width:70},{title:"账户名",dataIndex:"phone",key:"phone",render:function(e){return i.a.createElement("span",{title:e},e)}},{title:"身份状态",dataIndex:"status",key:"status",render:function(e){return i.a.createElement("span",{title:1==e?"正常":"禁用"},1==e?"正常":"禁用")}},{title:"注册时间",dataIndex:"createTime",key:"createTime",render:function(e){return e&&p.b.utcToDev(e)}},{title:"操作",key:"action",width:200,render:function(e,t){return i.a.createElement("a",{onClick:function(){!function(e){var t={status:1==e.status?2:1,userId:e.userId};o.a.confirm({title:"确认",okText:"确定",cancelText:"取消",content:"是否".concat(1==e.status?"禁用账户":"解除锁定"),onOk:function(){f(t).then(function(t){0==t.data.code&&(u.a.success("".concat(1==e.status?"禁用账户":"解除锁定","成功")),j())})}})}(t)}},1==t.status?"禁用账户":"解除锁定")}}];return i.a.createElement("div",{className:"classify-page"},i.a.createElement(n.a,null,i.a.createElement(r.a,{rowKey:"userId",columns:J,dataSource:b,loading:x,bordered:!0,pagination:{defaultCurrent:1,current:c.pageIndex,onChange:function(e,t){t===c.pageRows?d(function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})}):d(function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})})},pageSize:c.pageRows,total:h,showQuickJumper:!0,showTotal:function(){return i.a.createElement("span",null,"共 ",i.a.createElement("a",null,h)," 条")}}})))})}}]);