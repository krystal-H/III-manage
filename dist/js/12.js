(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1387:function(e,t,a){"use strict";a.d(t,"d",function(){return n}),a.d(t,"f",function(){return i}),a.d(t,"e",function(){return c}),a.d(t,"c",function(){return m}),a.d(t,"b",function(){return l}),a.d(t,"a",function(){return o});var r=a(4),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.c.request({url:"/manage-open/manage/commodity/getCommodityListByPage",method:"post",data:e,headers:{}})},i=function(e){return r.c.request({url:"/manage-open/manage/commodity/publicCommodity",method:"post",data:e,headers:{}})},c=function(e){return r.c.request({url:"/manage-open/manage/commodity/onOrOffCommodity",method:"post",data:e,headers:{}})},m=function(e){return r.c.request({url:"/manage-open/manage/commodity/getPublicProductByProductId/"+e,method:"get",headers:{}})},l=function(e){return r.c.request({url:"/manage-open/manage/commodity/getCommodityByCommodityId/"+e,method:"get",headers:{}})},o=function(e){return r.c.request({url:"/manage-open/manage/commodity/updateCommodityStock",data:e,method:"post",headers:{}})}},1390:function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"e",function(){return i}),a.d(t,"c",function(){return c}),a.d(t,"b",function(){return m}),a.d(t,"d",function(){return l});var r=a(4),n=function(e){return r.c.request({url:"/manage-open/manage/commodity/getModuleListByPage",data:e,method:"post",headers:{}})},i=function(e){return r.c.request({url:"/manage-open/module/getModulelistByHetModuleTypeName",data:e,method:"post",headers:{}})},c=function(e){return r.c.request({url:"/manage-open/manage/classify/getCommodityClassifyByGrade",data:e,method:"post",headers:{}})},m=function(e){return r.c.request({url:"/manage-open/manage/classify/getClassifyList",data:e,method:"post",headers:{}})},l=function(e){return r.c.request({url:"/manage-open/manage/commodity/publicCommodity",data:e,method:"post",headers:{}})}},1393:function(e,t,a){"use strict";a.d(t,"c",function(){return n}),a.d(t,"b",function(){return i}),a.d(t,"a",function(){return c});var r=a(4),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.c.request({url:"/manage-open/manage/classify/getClassifyList",data:e,method:"post",headers:{}})},i=function(e){return r.c.request({url:"/manage-open/manage/classify/removeClassify/"+e,method:"get",headers:{}})},c=function(e){return r.c.request({url:"/manage-open/manage/classify/addClassify",method:"post",data:e,headers:{}})}},1404:function(e,t,a){},1405:function(e,t,a){"use strict";a(22),a(62),a(35),a(26),a(27),a(28),a(19),a(34);var r=a(0),n=a.n(r),i=a(1370),c=a.n(i),m=a(33);a(1406);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],r=!0,n=!1,i=void 0;try{for(var c,m=e[Symbol.iterator]();!(r=(c=m.next()).done)&&(a.push(c.value),!t||a.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==m.return||m.return()}finally{if(n)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}m.j;function o(e,t){var a=e.divId,i=l(Object(r.useState)(""),2),o=(i[0],i[1],null);return Object(r.useEffect)(function(){return(o=new c.a("#".concat(a))).config.uploadImgMaxSize=2097152,o.config.uploadImgServer=m.j,o.config.uploadImgMaxLength=1,o.config.customUploadImg=function(e,t){if(console.log(e),e[0]){var a=new window.FormData;a.append("file",e[0],"cover.jpg"),a.append("appId",31438),a.append("domainType",4),fetch(m.j,{method:"POST",body:a}).then(function(e){return e.json()}).then(function(e){0==e.code&&t(e.data.url)})}else message.info("请选择要上传的图片")},o.config.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","video","code","undo","redo"],o.config.lang={"设置标题":"Title","字号":"Size","文字颜色":"Color","设置列表":"List","有序列表":"","无序列表":"","对齐方式":"Align","靠左":"","居中":"","靠右":"","正文":"p","链接文字":"link text","链接":"link","上传图片":"Upload","网络图片":"Web","图片link":"image url","插入视频":"Video","格式如":"format","上传":"Upload","创建":"init"},o.create(),function(){o.destroy()}},[]),Object(r.useImperativeHandle)(t,function(){return{getText:function(){return o.txt.html()},renderText:function(e){return o.txt.html(e)}}},[]),n.a.createElement("div",{className:"wang-edit-img"},n.a.createElement("div",{id:a}))}t.a=o=Object(r.memo)(Object(r.forwardRef)(o))},1406:function(e,t,a){},1482:function(e,t,a){"use strict";a.r(t);a(159);var r=a(36),n=(a(67),a(20)),i=(a(99),a(45)),c=(a(220),a(117)),m=(a(129),a(24)),l=(a(79),a(470),a(32),a(160),a(174),a(38),a(55),a(39),a(468),a(197),a(161),a(22),a(295),a(1366),a(62),a(26),a(27),a(28),a(1369),a(841),a(35),a(19),a(34),a(0)),o=a.n(l),d=a(1405),s=a(1387),u=a(1393),f=a(1390),y=a(491);a(1404);function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],r=!0,n=!1,i=void 0;try{for(var c,m=e[Symbol.iterator]();!(r=(c=m.next()).done)&&(a.push(c.value),!t||a.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==m.return||m.return()}finally{if(n)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var v=m.a.Item;function g(e){var t=e.id,a=p(Object(l.useState)({}),2),r=a[0],n=a[1];Object(l.useEffect)(function(){Object(s.b)(t).then(function(e){0==e.data.code&&n(e.data.data)})},[]);var i,c=function(e){return e?e.split(",").map(function(e,t){return o.a.createElement("a",{src:e,onClick:function(){!function(e){var t=document.createElement("a"),a=e.replace(/^http:\/\//i,"https://");fetch(a).then(function(e){return e.blob()}).then(function(e){t.href=URL.createObjectURL(e),console.log(t.href),t.download="文件",document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(t.href),document.body.removeChild(t)})}(e)},key:t},e)}):""};function m(e){var t={__html:e};return o.a.createElement("div",{dangerouslySetInnerHTML:t})}return o.a.createElement("div",{className:"productInfo-content-page"},o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"平台产品ID："),o.a.createElement("div",{className:"item-text"},r.productId))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品名称："),o.a.createElement("div",{className:"item-text"},r.commodityName)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品型号："),o.a.createElement("div",{className:"item-text"},r.commodityModel)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"品牌："),o.a.createElement("div",{className:"item-text"},r.commodityBrand))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品分类："),o.a.createElement("div",{className:"item-text"},r.commodityClassifyName)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品价格："),o.a.createElement("div",{className:"item-text"},r.commodityPrice/100)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"实时价格："),o.a.createElement("div",{className:"item-text"},r.commodityRealPrice/100))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"排序值："),o.a.createElement("div",{className:"item-text"},r.commodityOrderValue)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"负责人："),o.a.createElement("div",{className:"item-text"},r.directorName))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品简述："),o.a.createElement("div",{className:"item-text"},r.commodityDescription))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品照片："),o.a.createElement("div",{className:"item-text item-img"},(i=r.commodityPicture)?i.split(",").map(function(e,t){return o.a.createElement("img",{src:e,key:t})}):""))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品详情："),o.a.createElement("div",{className:"item-text item-wang-text"},m(r.commodityDetail)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"规格参数："),o.a.createElement("div",{className:"item-text item-wang-text"},m(r.commodityStandard)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"售后政策："),o.a.createElement("div",{className:"item-text item-wang-text"},m(r.salesPolicy)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"说明书："),o.a.createElement("div",{className:"item-text item-img"},c(r.commodityInstructions)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"测试报告："),o.a.createElement("div",{className:"item-text item-img"},c(r.testReport)))))}t.default=m.a.create()(function(e){var t=e.form,a=e.history,E=Object(l.useMemo)(function(){var e={},t=a.location.search;return t&&t.slice(1).split("&&").forEach(function(t){var a=t.split("=");e[a[0]]=a[1]}),e},[]);if(E.id&&"false"===E.isEdit)return o.a.createElement(g,{id:E.id});var h=t.getFieldDecorator,N=t.validateFields,b=t.getFieldValue,x=t.setFieldsValue,w=t.getFieldsValue,O=p(Object(l.useState)([]),2),I=O[0],j=O[1],C=p(Object(l.useState)({}),2),P=C[0],q=C[1],R=Object(l.useRef)(null),S=Object(l.useRef)(null),k=Object(l.useRef)(null),L=Object(l.useRef)(null),T=Object(l.useRef)(null),F=Object(l.useRef)(null);Object(l.useEffect)(function(){M(),E.id&&V()},[]);var M=function(){Object(f.c)({classifyLevel:1}).then(function(e){var t=e.data.data.filter(function(e){return"硬件产品"===e.classifyName});if(0!==t.length){var a={parentId:t[0].id};Object(u.c)(a).then(function(e){0===e.data.code&&(e.data.data.list.forEach(function(e,t){e.key=t+1}),j(e.data.data.list))})}})},V=function(){Object(s.b)(E.id).then(function(e){if(0==e.data.code){q(e.data.data);var t={},a=["salesPolicy","commodityStandard","commodityDetail"],r=["testReport","commodityInstructions","commodityPicture"];Object.keys(w()).map(function(n){a.indexOf(n)>-1||(r.indexOf(n)>-1?e.data.data[n]&&(t[n]=e.data.data[n].split(",").map(function(e,t){return{url:e,uid:t+1,name:e}})):t[n]=e.data.data[n])}),t.commodityPrice=t.commodityPrice/100,t.commodityRealPrice=t.commodityRealPrice/100,x(t),t.commodityPicture&&R.current.setFileList(t.commodityPicture),t.commodityInstructions&&S.current.setFileList(t.commodityInstructions),t.testReport&&k.current.setFileList(t.testReport),L.current.renderText(e.data.data.commodityDetail||""),T.current.renderText(e.data.data.commodityStandard||""),F.current.renderText(e.data.data.salesPolicy||"")}})},D=function(e){(e=(e=(e=(e=e.replace(/[^\d.]/g,"")).replace(/\.{2,}/g,".")).replace(".","$#$").replace(/\./g,"").replace("$#$",".")).replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")).indexOf(".")<0&&""!=e&&(e=parseFloat(e));var t=e.toString();return t.indexOf(".")>-1&&"0.00"===t&&(e=parseFloat(e).toFixed(1)),e};return o.a.createElement("div",null,o.a.createElement("div",{className:"mall-detail-page"},o.a.createElement(m.a,null,o.a.createElement(v,{label:"平台产品ID"},h("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")},rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"}})),o.a.createElement(n.a,{type:"primary",onClick:function(){var e=b("productId");e&&Object(s.c)(e).then(function(e){0==e.data.code?x({commodityName:e.data.data.commodityName,commodityModel:e.data.data.commodityModel,commodityBrand:e.data.data.commodityBrand}):x({productId:""})})}},"搜索")),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(v,{label:"商品名称"},h("commodityName",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:100}))),o.a.createElement(v,{label:"商品型号"},h("commodityModel",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:100}))),o.a.createElement(v,{label:"品牌"},h("commodityBrand",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:100})))),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(v,{label:"商品分类"},h("commodityClassifyId",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(r.a,{style:{width:"200px"}},I.map(function(e,t){return o.a.createElement(r.a.Option,{key:e.id,value:e.id,label:e.classifyName},e.classifyName)})))),o.a.createElement(v,{label:"商品价格"},h("commodityPrice",{rules:[{required:!0,message:"请输入"}],getValueFromEvent:function(e){var t=e.target.value;return D(t)}})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(v,{label:"实时价格"},h("commodityRealPrice",{rules:[{required:!0,message:"请输入"}],getValueFromEvent:function(e){var t=e.target.value;return D(t)}})(o.a.createElement(i.a,{style:{width:"200px"}})))),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(v,{label:"排序值"},h("commodityOrderValue",{rules:[{required:!0,message:"请输入"}],getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(v,{label:"负责人"},h("directorName",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:20})))),o.a.createElement(v,{label:"商品简述"},h("commodityDescription",{})(o.a.createElement(i.a,{style:{width:"600px"}}))),o.a.createElement(v,{label:"商品照片"},h("commodityPicture",{rules:[{required:!0,message:"请上传文件"}]})(o.a.createElement(y.a,{ref:R,listType:"picture-card",maxCount:6,isNotImg:!1,maxSize:10}))),o.a.createElement(v,{label:"商品详情",className:"need-warn-wrap"},o.a.createElement(d.a,{divId:"wangedit-product-detail",ref:L})),o.a.createElement(v,{label:"规格参数",className:"need-warn-wrap"},o.a.createElement(d.a,{divId:"wangedit-product-config",ref:T})),o.a.createElement(v,{label:"售后政策",className:"need-warn-wrap"},o.a.createElement(d.a,{divId:"wangedit-product-rule",ref:F})),o.a.createElement(v,{label:"说明书"},h("commodityInstructions",{rules:[{required:!0,message:"请上传文件"}]})(o.a.createElement(y.a,{ref:S,maxCount:1,format:".pdf",isNotImg:!0,maxSize:10}))),o.a.createElement(v,{label:"测试报告"},h("testReport",{rules:[{required:!0,message:"请上传文件"}]})(o.a.createElement(y.a,{ref:k,maxCount:1,format:".xls,.xlsx",isNotImg:!0,maxSize:10})))),o.a.createElement("div",{className:"mall-info-footer"},o.a.createElement(n.a,{type:"primary",onClick:function(){var e=b("productId");e?Object(s.c)(e).then(function(e){0==e.data.code&&N().then(function(e){if(["testReport","commodityInstructions","commodityPicture"].forEach(function(t){e[t]&&e[t].length?(e[t]=e[t].reduce(function(e,t){return e+(t.url+",")},""),e[t]=e[t].slice(0,-1)):e[t]=""}),e.commodityDetail=L.current.getText(),e.commodityStandard=T.current.getText(),e.salesPolicy=F.current.getText(),e.salesPolicy&&e.commodityStandard&&e.commodityDetail){e.productId&&(e.productId=Number(e.productId)),e.commodityOrderValue&&(e.commodityOrderValue=Number(e.commodityOrderValue)),e.commodityPrice=100*e.commodityPrice,e.commodityRealPrice=100*e.commodityRealPrice,e.status=3,Object.keys(P).length&&(e.status=P.status,e.id=P.id);var t=I.find(function(t){return t.id==e.commodityClassifyId});if(!t)return x({commodityClassifyId:""}),void c.a.info("商城分类未选择");e.commodityClassifyName=t.classifyName,Object(s.f)(e).then(function(e){0==e.data.code&&(c.a.success("上传商品成功"),a.push("/mall/productMn"))})}else c.a.info("商品详情或规格参数或售后政策未输入内容")})}):c.a.info("输入产品id")}},"保存"),o.a.createElement(n.a,{onClick:function(){a.push("/mall/productMn")}},"取消"))))})}}]);