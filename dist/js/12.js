(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1383:function(e,t,a){"use strict";a(212);var r=a(91),n=(a(1335),a(1334)),i=(a(135),a(43)),c=(a(72),a(22)),l=(a(449),a(99),a(245),a(439),a(32),a(66),a(247),a(343),a(36),a(26),a(23),a(28),a(29),a(19),a(35),a(63),a(166),a(0)),m=a.n(l),o=a(31);a(1384);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function d(e,t,a,r,n,i,c){try{var l=e[i](c),m=l.value}catch(e){return void a(e)}l.done?t(m):Promise.resolve(m).then(r,n)}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],r=!0,n=!1,i=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var f={action:o.j,data:function(e){return{appId:31438,domainType:4}}};function p(e,t){var a=e.maxCount,o=void 0===a?1:a,p=e.format,v=e.maxSize,y=void 0===v?.2:v,E=e.isNotImg,g=void 0!==E&&E,h=e.preferSize,b=void 0===h?"192px*192px":h,N=e.cb,x=e.value,w=e.onChange;Object(l.useEffect)(function(){x&&j(x)},[]);var O=u(Object(l.useState)([]),2),I=O[0],j=O[1],C=u(Object(l.useState)(!1),2),P=C[0],R=C[1],S=u(Object(l.useState)(""),2),k=S[0],L=S[1];Object(l.useImperativeHandle)(t,function(){return{getFileListUrl:function(){return z()},setFileList:function(e){j(e)},getFileList:function(){return I}}},[I,z]);var q=m.a.createElement("div",null,m.a.createElement("div",{className:"ant-upload-text"},"上传图片")),F=m.a.createElement(c.a,{type:"primary"},"上传附件"),T=g?F:q,V=g?"text":"picture-card",D="";D=p||(g?".doc,.docx":".gif,.jpeg,.jpg,.png");var M="";M=g?m.a.createElement("span",{className:"upload-desc"},"支持",D,"格式，不超过",y,"MB。"):m.a.createElement("span",{className:"upload-desc"},"推荐尺寸",b,"。支持",D,"格式，不超过",1e3*y,"kB。");var B=function(e){return e.size/1024/1024<y},U=function(e){if(D){var t=D.split(","),a=e.name.substring(e.name.lastIndexOf(".")).toLowerCase(),r=!1;for(var n in t)if(t[n].toLowerCase()==a){r=!0;break}return r}return!0},z=function(){var e=[];return I.forEach(function(t){var a=t.response,r=t.url;if(a){var n=a.code,i=a.data;0===n&&e.push(i.url)}else e.push(r)}),e},$=g?null:function(){var e,t=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.url||t.preview){e.next=4;break}return e.next=3,getBase64(t.originFileObj);case 3:t.preview=e.sent;case 4:R(!0),L(t.url||t.preview);case 6:case"end":return e.stop()}},e)}),function(){var t=this,a=arguments;return new Promise(function(r,n){var i=e.apply(t,a);function c(e){d(i,r,n,c,l,"next",e)}function l(e){d(i,r,n,c,l,"throw",e)}c(void 0)})});return function(e){return t.apply(this,arguments)}}();return m.a.createElement("div",{className:"upload-wrapper"},m.a.createElement("div",{className:"upload clearfix"},m.a.createElement(n.a,s({className:"upload-component"},f,{listType:V,fileList:I,data:function(){return{appId:31438,domainType:4}},onPreview:$,onChange:function(e){var t=e.file,a=e.fileList;a=a.map(function(e){if(e.response){var t=e.response,a=t.code,r=t.data;0===a&&(e.url=r.url)}return e}),B(t)&&a.length<=o&&U(t)&&(j(a),"done"===t.status&&(w(a),N&&"function"==typeof N&&N()))},beforeUpload:function(e){var t=B(e);return U(e)?t?I.length<o||(i.a.info({message:"提示",description:"文件个数最多 ".concat(o," 个!")}),!1):(i.a.info({message:"提示",description:g?"文件必须小于 ".concat(y," MB!"):"文件必须小于 ".concat(1e3*y," kB!")}),!1):(i.a.info({message:"提示",description:"不支持上传此格式文件"}),!1)},accept:D,onRemove:function(e){var t=I.indexOf(e),a=I.slice();a.splice(t,1),j(a),w(a)},showUploadList:{showDownloadIcon:!1}}),o!==I.length||g?T:null),g&&m.a.createElement("span",{className:"file-upload-desc"},"最多",o,"个"),M,P&&m.a.createElement(r.a,{visible:P,footer:null,onCancel:function(){return R(!1)}},m.a.createElement("img",{alt:"example",style:{width:"100%"},src:k}))))}t.a=p=Object(l.memo)(Object(l.forwardRef)(p))},1384:function(e,t,a){},1385:function(e,t,a){"use strict";a.d(t,"c",function(){return n}),a.d(t,"b",function(){return i}),a.d(t,"a",function(){return c});var r=a(4),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.c.request({url:"/manage-open/manage/classify/getClassifyList",data:e,method:"post",headers:{}})},i=function(e){return r.c.request({url:"/manage-open/manage/classify/removeClassify/"+e,method:"get",headers:{}})},c=function(e){return r.c.request({url:"/manage-open/manage/classify/addClassify",method:"post",data:e,headers:{}})}},1386:function(e,t,a){"use strict";a.d(t,"d",function(){return n}),a.d(t,"f",function(){return i}),a.d(t,"e",function(){return c}),a.d(t,"c",function(){return l}),a.d(t,"b",function(){return m}),a.d(t,"a",function(){return o});var r=a(4),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.c.request({url:"/manage-open/manage/commodity/getCommodityList",method:"post",data:e,headers:{}})},i=function(e){return r.c.request({url:"/manage-open/manage/commodity/publicCommodity",method:"post",data:e,headers:{}})},c=function(e){return r.c.request({url:"/manage-open/manage/commodity/onOrOffCommodity",method:"post",data:e,headers:{}})},l=function(e){return r.c.request({url:"/manage-open/manage/commodity/getPublicProductByProductId/"+e,method:"get",headers:{}})},m=function(e){return r.c.request({url:"/manage-open/manage/commodity/getCommodityByCommodityId/"+e,method:"get",headers:{}})},o=function(e){return r.c.request({url:"/manage-open/manage/commodity/updateCommodityStock",data:e,method:"post",headers:{}})}},1387:function(e,t,a){},1469:function(e,t,a){},1527:function(e,t,a){"use strict";a.r(t);a(189);var r=a(75),n=(a(72),a(22)),i=(a(122),a(58)),c=(a(244),a(134)),l=(a(143),a(33)),m=(a(99),a(446),a(32),a(245),a(247),a(66),a(37),a(1340),a(285),a(168),a(23),a(283),a(1351),a(63),a(26),a(28),a(29),a(1356),a(822),a(36),a(19),a(35),a(0)),o=a.n(m),s=a(1357),d=a.n(s),u=a(31);a(1469);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],r=!0,n=!1,i=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}u.j;function p(e,t){var a=e.divId,r=f(Object(m.useState)(""),2),n=(r[0],r[1],null);return Object(m.useEffect)(function(){return(n=new d.a("#".concat(a))).config.uploadImgMaxSize=2097152,n.config.uploadImgServer=u.j,n.config.uploadImgMaxLength=1,n.config.customUploadImg=function(e,t){if(console.log(e),e[0]){var a=new window.FormData;a.append("file",e[0],"cover.jpg"),a.append("appId",31438),a.append("domainType",4),fetch(u.j,{method:"POST",body:a}).then(function(e){return e.json()}).then(function(e){0==e.code&&t(e.data.url)})}else message.info("请选择要上传的图片")},n.config.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","video","code","undo","redo"],n.config.lang={"设置标题":"Title","字号":"Size","文字颜色":"Color","设置列表":"List","有序列表":"","无序列表":"","对齐方式":"Align","靠左":"","居中":"","靠右":"","正文":"p","链接文字":"link text","链接":"link","上传图片":"Upload","网络图片":"Web","图片link":"image url","插入视频":"Video","格式如":"format","上传":"Upload","创建":"init"},n.create(),function(){n.destroy()}},[]),Object(m.useImperativeHandle)(t,function(){return{getText:function(){return n.txt.html()},renderText:function(e){return n.txt.html(e)}}},[]),o.a.createElement("div",{className:"wang-edit-img"},o.a.createElement("div",{id:a}))}var v=p=Object(m.memo)(Object(m.forwardRef)(p)),y=a(1386),E=a(1385),g=a(1383);a(1387),a(4);function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],r=!0,n=!1,i=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var b=l.a.Item;t.default=l.a.create()(function(e){var t=e.form,a=e.history,s=Object(m.useMemo)(function(){var e={},t=a.location.search;return t&&t.slice(1).split("&&").forEach(function(t){var a=t.split("=");e[a[0]]=a[1]}),e},[]);if(s.id&&"false"===s.isEdit)return o.a.createElement(N,{id:s.id});var d=t.getFieldDecorator,u=t.validateFields,f=t.getFieldValue,p=t.setFieldsValue,x=t.getFieldsValue,w=h(Object(m.useState)([]),2),O=w[0],I=w[1],j=h(Object(m.useState)({}),2),C=j[0],P=j[1],R=Object(m.useRef)(null),S=Object(m.useRef)(null),k=Object(m.useRef)(null),L=Object(m.useRef)(null),q=Object(m.useRef)(null),F=Object(m.useRef)(null);Object(m.useEffect)(function(){Object(E.c)({pageIndex:1,pageRows:1e3}).then(function(e){0==e.data.code&&I(e.data.data.records)}),s.id&&T()},[]);var T=function(){Object(y.b)(s.id).then(function(e){if(0==e.data.code){P(e.data.data);var t={},a=["salesPolicy","commodityStandard","commodityDetail"],r=["testReport","commodityInstructions","commodityPicture"];Object.keys(x()).map(function(n){a.indexOf(n)>-1||(r.indexOf(n)>-1?e.data.data[n]&&(t[n]=e.data.data[n].split(",").map(function(e,t){return{url:e,uid:t+1,name:e}})):t[n]=e.data.data[n])}),t.commodityPrice=t.commodityPrice/100,t.commodityRealPrice=t.commodityRealPrice/100,p(t),t.commodityPicture&&R.current.setFileList(t.commodityPicture),t.commodityInstructions&&S.current.setFileList(t.commodityInstructions),t.testReport&&k.current.setFileList(t.testReport),L.current.renderText(e.data.data.commodityDetail||""),q.current.renderText(e.data.data.commodityStandard||""),F.current.renderText(e.data.data.salesPolicy||"")}})},V=function(e){(e=(e=(e=(e=e.replace(/[^\d.]/g,"")).replace(/\.{2,}/g,".")).replace(".","$#$").replace(/\./g,"").replace("$#$",".")).replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3")).indexOf(".")<0&&""!=e&&(e=parseFloat(e));var t=e.toString();return t.indexOf(".")>-1&&"0.00"===t&&(e=parseFloat(e).toFixed(1)),e};return o.a.createElement("div",null,o.a.createElement("div",{className:"mall-detail-page"},o.a.createElement(l.a,null,o.a.createElement(b,{label:"平台产品ID"},d("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")},rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"}})),o.a.createElement(n.a,{type:"primary",onClick:function(){var e=f("productId");e&&Object(y.c)(e).then(function(e){0==e.data.code?p({commodityName:e.data.data.commodityName,commodityModel:e.data.data.commodityModel,commodityBrand:e.data.data.commodityBrand}):p({productId:""})})}},"搜索")),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(b,{label:"商品名称"},d("commodityName",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:100}))),o.a.createElement(b,{label:"商品型号"},d("commodityModel",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:100}))),o.a.createElement(b,{label:"品牌"},d("commodityBrand",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:100})))),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(b,{label:"商品分类"},d("commodityClassifyId",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(r.a,{style:{width:"200px"}},O.map(function(e,t){return o.a.createElement(r.a.Option,{key:e.id,value:e.id,label:e.classifyName},e.classifyName)})))),o.a.createElement(b,{label:"商品价格"},d("commodityPrice",{rules:[{required:!0,message:"请输入"}],getValueFromEvent:function(e){var t=e.target.value;return V(t)}})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(b,{label:"实时价格"},d("commodityRealPrice",{rules:[{required:!0,message:"请输入"}],getValueFromEvent:function(e){var t=e.target.value;return V(t)}})(o.a.createElement(i.a,{style:{width:"200px"}})))),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(b,{label:"排序值"},d("commodityOrderValue",{rules:[{required:!0,message:"请输入"}],getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(b,{label:"负责人"},d("directorName",{rules:[{required:!0,message:"请输入"}]})(o.a.createElement(i.a,{style:{width:"200px"},maxLength:20})))),o.a.createElement(b,{label:"商品简述"},d("commodityDescription",{})(o.a.createElement(i.a,{style:{width:"600px"}}))),o.a.createElement(b,{label:"商品照片"},d("commodityPicture",{rules:[{required:!0,message:"请上传文件"}]})(o.a.createElement(g.a,{ref:R,listType:"picture-card",maxCount:6,isNotImg:!1,maxSize:10}))),o.a.createElement(b,{label:"商品详情",className:"need-warn-wrap"},o.a.createElement(v,{divId:"wangedit-product-detail",ref:L})),o.a.createElement(b,{label:"规格参数",className:"need-warn-wrap"},o.a.createElement(v,{divId:"wangedit-product-config",ref:q})),o.a.createElement(b,{label:"售后政策",className:"need-warn-wrap"},o.a.createElement(v,{divId:"wangedit-product-rule",ref:F})),o.a.createElement(b,{label:"说明书"},d("commodityInstructions",{rules:[{required:!0,message:"请上传文件"}]})(o.a.createElement(g.a,{ref:S,maxCount:1,format:".pdf",isNotImg:!0,maxSize:10}))),o.a.createElement(b,{label:"测试报告"},d("testReport",{rules:[{required:!0,message:"请上传文件"}]})(o.a.createElement(g.a,{ref:k,maxCount:1,format:".xls,.xlsx",isNotImg:!0,maxSize:10})))),o.a.createElement("div",{className:"mall-info-footer"},o.a.createElement(n.a,{type:"primary",onClick:function(){var e=f("productId");e?Object(y.c)(e).then(function(e){0==e.data.code&&u().then(function(e){if(["testReport","commodityInstructions","commodityPicture"].forEach(function(t){e[t]&&e[t].length?(e[t]=e[t].reduce(function(e,t){return e+(t.url+",")},""),e[t]=e[t].slice(0,-1)):e[t]=""}),e.commodityDetail=L.current.getText(),e.commodityStandard=q.current.getText(),e.salesPolicy=F.current.getText(),e.salesPolicy&&e.commodityStandard&&e.commodityDetail){e.productId&&(e.productId=Number(e.productId)),e.commodityOrderValue&&(e.commodityOrderValue=Number(e.commodityOrderValue)),e.commodityPrice=100*e.commodityPrice,e.commodityRealPrice=100*e.commodityRealPrice,e.status=3,Object.keys(C).length&&(e.status=C.status,e.id=C.id);var t=O.find(function(t){return t.id==e.commodityClassifyId});if(!t)return p({commodityClassifyId:""}),void c.a.info("商城分类未选择");e.commodityClassifyName=t.classifyName,Object(y.f)(e).then(function(e){0==e.data.code&&(c.a.success("上传商品成功"),a.push("/mall/productMn"))})}else c.a.info("商品详情或规格参数或售后政策未输入内容")})}):c.a.info("输入产品id")}},"保存"),o.a.createElement(n.a,{onClick:function(){a.push("/mall/productMn")}},"取消"))))});function N(e){var t=e.id,a=h(Object(m.useState)({}),2),r=a[0],n=a[1];Object(m.useEffect)(function(){Object(y.b)(t).then(function(e){0==e.data.code&&n(e.data.data)})},[]);var i,c=function(e){return e?e.split(",").map(function(e,t){return o.a.createElement("a",{src:e,onClick:function(){!function(e){var t=document.createElement("a"),a=e.replace("http","https");fetch(a).then(function(e){return e.blob()}).then(function(e){t.href=URL.createObjectURL(e),console.log(t.href),t.download="文件",document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(t.href),document.body.removeChild(t)})}(e)},key:t},e)}):""};function l(e){var t={__html:e};return o.a.createElement("div",{dangerouslySetInnerHTML:t})}return o.a.createElement("div",{className:"productInfo-content-page"},o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"平台产品ID："),o.a.createElement("div",{className:"item-text"},r.productId))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品名称："),o.a.createElement("div",{className:"item-text"},r.commodityName)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品型号："),o.a.createElement("div",{className:"item-text"},r.commodityModel)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"品牌："),o.a.createElement("div",{className:"item-text"},r.commodityBrand))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品分类："),o.a.createElement("div",{className:"item-text"},r.commodityClassifyName)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品价格："),o.a.createElement("div",{className:"item-text"},r.commodityPrice/100)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"实时价格："),o.a.createElement("div",{className:"item-text"},r.commodityRealPrice/100))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"排序值："),o.a.createElement("div",{className:"item-text"},r.commodityOrderValue)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"负责人："),o.a.createElement("div",{className:"item-text"},r.directorName))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品简述："),o.a.createElement("div",{className:"item-text"},r.commodityDescription))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品照片："),o.a.createElement("div",{className:"item-text item-img"},(i=r.commodityPicture)?i.split(",").map(function(e,t){return o.a.createElement("img",{src:e,key:t})}):""))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品详情："),o.a.createElement("div",{className:"item-text item-wang-text"},l(r.commodityDetail)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"规格参数："),o.a.createElement("div",{className:"item-text item-wang-text"},l(r.commodityStandard)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"售后政策："),o.a.createElement("div",{className:"item-text item-wang-text"},l(r.salesPolicy)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"说明书："),o.a.createElement("div",{className:"item-text item-img"},c(r.commodityInstructions)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"测试报告："),o.a.createElement("div",{className:"item-text item-img"},c(r.testReport)))))}}}]);