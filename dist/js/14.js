(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1390:function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"e",function(){return c}),a.d(t,"c",function(){return i}),a.d(t,"b",function(){return o}),a.d(t,"d",function(){return u});var n=a(4),r=function(e){return n.c.request({url:"/manage-open/manage/commodity/getModuleListByPage",data:e,method:"post",headers:{}})},c=function(e){return n.c.request({url:"/manage-open/module/getModulelistByHetModuleTypeName",data:e,method:"post",headers:{}})},i=function(e){return n.c.request({url:"/manage-open/manage/classify/getCommodityClassifyByGrade",data:e,method:"post",headers:{}})},o=function(e){return n.c.request({url:"/manage-open/manage/classify/getClassifyList",data:e,method:"post",headers:{}})},u=function(e){return n.c.request({url:"/manage-open/manage/commodity/publicCommodity",data:e,method:"post",headers:{}})}},1393:function(e,t,a){"use strict";a.d(t,"c",function(){return r}),a.d(t,"b",function(){return c}),a.d(t,"a",function(){return i});var n=a(4),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n.c.request({url:"/manage-open/manage/classify/getClassifyList",data:e,method:"post",headers:{}})},c=function(e){return n.c.request({url:"/manage-open/manage/classify/removeClassify/"+e,method:"get",headers:{}})},i=function(e){return n.c.request({url:"/manage-open/manage/classify/addClassify",method:"post",data:e,headers:{}})}},1472:function(e,t,a){},1481:function(e,t,a){"use strict";a.r(t);a(99);var n=a(45),r=(a(100),a(43)),c=(a(293),a(162)),i=(a(67),a(20)),o=(a(220),a(117)),u=(a(196),a(85)),l=(a(175),a(71)),s=(a(159),a(36)),d=(a(129),a(24)),f=(a(38),a(22),a(62),a(367),a(32),a(141),a(55),a(79),a(161),a(35),a(26),a(27),a(28),a(19),a(34),a(39),a(40),a(41),a(0)),m=a.n(f),p=a(1393),y=a(1390),g=a(33);a(1472);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(a,!0).forEach(function(t){v(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function v(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,c=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw c}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var E=d.a.Item,j=s.a.Option,k=l.a.TabPane;t.default=d.a.create()(function(e){var t=e.form,a=w(Object(f.useState)({pageIndex:1,pageRows:10}),2),h=a[0],v=a[1],S=t.getFieldDecorator,C=t.validateFields,N=w(Object(f.useState)(0),2),x=N[0],I=N[1],P=w(Object(f.useState)([]),2),q=P[0],R=P[1],T=w(Object(f.useState)(!1),2),V=T[0],J=T[1],D=w(Object(f.useState)("add"),2),L=D[0],B=D[1],F=w(Object(f.useState)({}),2),M=F[0],A=F[1],K=w(Object(f.useState)(!1),2),z=K[0],G=K[1],H=w(Object(f.useState)("0"),2),Q=H[0],U=H[1],W=w(Object(f.useState)([]),2),X=W[0],Y=W[1];Object(f.useEffect)(function(){Object(y.c)({classifyLevel:1}).then(function(e){Y(e.data.data)})},[]),Object(f.useEffect)(function(){Z()},[h.pageRows,h.pageIndex,Q,X]);var Z=function(){G(!0);var e=[];if("0"==Q?e=X.filter(function(e){return"硬件产品"==e.classifyName}):"1"==Q&&(e=X.filter(function(e){return"通信模组"==e.classifyName})),0!==e.length){var t=O({parentId:e[0].id},h);Object(p.c)(t).then(function(e){0==e.data.code&&(e.data.data.list.forEach(function(e,t){e.key=t+1}),R(e.data.data.list),I(e.data.data.pager.totalRows))}).finally(function(){G(!1)})}},$=[{title:"编号",dataIndex:"key",key:"key"},{title:"分类名称",dataIndex:"classifyName",key:"classifyName",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"排序值",dataIndex:"classifyValue",key:"classifyValue",render:function(e){return m.a.createElement("span",{title:e},e)}},{title:"编辑时间",dataIndex:"updateTime",key:"updateTime",render:function(e){return e&&g.b.utcToDev(e)}},{title:"操作",key:"action",width:200,render:function(e,t){return m.a.createElement("span",null,m.a.createElement("a",{style:{marginRight:"10px"},onClick:function(){_(t)}},"编辑"),m.a.createElement("a",{onClick:function(){!function(e){u.a.confirm({title:"确认",okText:"确定",cancelText:"取消",content:"是否删除此数据",onOk:function(){Object(p.b)(e.id).then(function(e){0==e.data.code&&(o.a.success("删除成功"),Z())})}})}(t)}},"删除"))}}],_=function(e){B("edit"),A(e),J(!0)};return m.a.createElement("div",{className:"classify-page"},m.a.createElement(r.a,null,m.a.createElement("div",{className:"top-flex"},m.a.createElement(l.a,{activeKey:Q,onChange:function(e){return function(e){console.log(e),U(e),R([]),v({pageIndex:1,pageRows:10})}(e)}},X.length>0&&X.map(function(e,t){return m.a.createElement(k,{tab:"".concat(e.classifyName),key:t+""})})),m.a.createElement("div",{className:"classify-top"},m.a.createElement(i.a,{type:"primary",onClick:function(){B("add"),J(!0)}},"新增分类"))),m.a.createElement(c.a,{rowKey:"id",columns:$,dataSource:q,loading:z,bordered:!0,pagination:{defaultCurrent:1,current:h.pageIndex,onChange:function(e,t){t===h.pageRows?v(function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})}):v(function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})})},pageSize:h.pageRows,total:x,showQuickJumper:!0,showTotal:function(){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,x)," 条")}}})),V&&m.a.createElement(u.a,{title:"add"===L?"新增分类":"编辑分类",visible:V,onOk:function(){C().then(function(e){var t=O({},e);t.classifyLevel=2,"edit"===L&&(t.id=M.id),Object(p.a)(t).then(function(e){0==e.data.code&&(o.a.success("新增成功"),Z(),J(!1))})})},onCancel:function(){return J(!1)}},m.a.createElement(d.a,b({},{labelCol:{span:6},wrapperCol:{span:14}},{autoComplete:"off"}),m.a.createElement(E,{label:"分类类别"},S("parentId",{initialValue:"add"===L?"":M.parentId+"",rules:[{required:!0,message:"请选择分类类别"}]})(m.a.createElement(s.a,{style:{width:275}},X.length>0&&X.map(function(e){return m.a.createElement(j,{key:e.id},"".concat(e.classifyName))})))),m.a.createElement(E,{label:"分类名称"},S("classifyName",{initialValue:"add"===L?"":M.classifyName,rules:[{required:!0,message:"请输入分类名称"}]})(m.a.createElement(n.a,null))),m.a.createElement(E,{label:"排序值"},S("classifyValue",{initialValue:"add"===L?"":M.classifyValue,getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")},rules:[{required:!0,message:"请输入排序值"}]})(m.a.createElement(n.a,null))))))})}}]);