(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1379:function(e,t,a){"use strict";a.d(t,"c",function(){return r}),a.d(t,"b",function(){return i}),a.d(t,"a",function(){return c});var n=a(4),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n.c.request({url:"/manage-open/manage/classify/getClassifyList",data:e,method:"post",headers:{}})},i=function(e){return n.c.request({url:"/manage-open/manage/classify/removeClassify/"+e,method:"get",headers:{}})},c=function(e){return n.c.request({url:"/manage-open/manage/classify/addClassify",method:"post",data:e,headers:{}})}},1380:function(e,t,a){"use strict";a.d(t,"d",function(){return r}),a.d(t,"f",function(){return i}),a.d(t,"e",function(){return c}),a.d(t,"c",function(){return l}),a.d(t,"b",function(){return m}),a.d(t,"a",function(){return o});var n=a(4),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n.c.request({url:"/manage-open/manage/commodity/getCommodityList",method:"post",data:e,headers:{}})},i=function(e){return n.c.request({url:"/manage-open/manage/commodity/publicCommodity",method:"post",data:e,headers:{}})},c=function(e){return n.c.request({url:"/manage-open/manage/commodity/onOrOffCommodity",method:"post",data:e,headers:{}})},l=function(e){return n.c.request({url:"/manage-open/manage/commodity/getPublicProductByProductId/"+e,method:"get",headers:{}})},m=function(e){return n.c.request({url:"/manage-open/manage/commodity/getCommodityByCommodityId/"+e,method:"get",headers:{}})},o=function(e){return n.c.request({url:"/manage-open/manage/commodity/updateCommodityStock",data:e,method:"post",headers:{}})}},1381:function(e,t,a){},1460:function(e,t,a){},1461:function(e,t,a){},1506:function(e,t,a){"use strict";a.r(t);a(188);var n=a(75),r=(a(72),a(21)),i=(a(121),a(58)),c=(a(243),a(134)),l=(a(142),a(33)),m=(a(246),a(98),a(244),a(1337),a(168),a(64),a(36),a(26),a(23),a(27),a(28),a(19),a(35),a(0)),o=a.n(m),s=(a(62),a(1353)),d=a.n(s),u=a(31);a(1460);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var c,l=e[Symbol.iterator]();!(n=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}u.j;function p(e,t){var a=e.divId,n=f(Object(m.useState)(""),2),r=(n[0],n[1],null);return Object(m.useEffect)(function(){return(r=new d.a("#".concat(a))).config.uploadImgMaxSize=2097152,r.config.uploadImgServer=u.j,r.config.uploadImgMaxLength=1,r.config.customUploadImg=function(e,t){if(console.log(e),e[0]){var a=new window.FormData;a.append("file",e[0],"cover.jpg"),a.append("appId",31438),a.append("domainType",4),fetch(u.j,{method:"POST",body:a}).then(function(e){return e.json()}).then(function(e){0==e.code&&t(e.data.url)})}else message.info("请选择要上传的图片")},r.config.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","video","code","undo","redo"],r.config.lang={"设置标题":"Title","字号":"Size","文字颜色":"Color","设置列表":"List","有序列表":"","无序列表":"","对齐方式":"Align","靠左":"","居中":"","靠右":"","正文":"p","链接文字":"link text","链接":"link","上传图片":"Upload","网络图片":"Web","图片link":"image url","插入视频":"Video","格式如":"format","上传":"Upload","创建":"init"},r.create(),function(){r.destroy()}},[]),Object(m.useImperativeHandle)(t,function(){return{getText:function(){return r.txt.html()}}},[]),o.a.createElement("div",{className:"wang-edit-img"},o.a.createElement("div",{id:a}))}var v=p=Object(m.memo)(Object(m.forwardRef)(p)),E=a(1380),y=a(1379),g=(a(210),a(90)),N=(a(1332),a(1331)),b=(a(135),a(43));a(448),a(437),a(32),a(343),a(166),a(1461);function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function w(e,t,a,n,r,i,c){try{var l=e[i](c),m=l.value}catch(e){return void a(e)}l.done?t(m):Promise.resolve(m).then(n,r)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var c,l=e[Symbol.iterator]();!(n=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var O={action:u.j,data:function(e){return{appId:31438,domainType:4}}};function I(e,t){var a=e.maxCount,n=void 0===a?1:a,i=e.format,c=e.maxSize,l=void 0===c?.2:c,s=e.isNotImg,d=void 0!==s&&s,u=e.preferSize,f=void 0===u?"192px*192px":u,p=e.cb,v=e.value,E=e.onChange;Object(m.useEffect)(function(){v&&j(v)},[]);var y=x(Object(m.useState)([]),2),I=y[0],j=y[1],C=x(Object(m.useState)(!1),2),S=C[0],k=C[1],P=x(Object(m.useState)(""),2),R=P[0],T=P[1];Object(m.useImperativeHandle)(t,function(){return{getFileListUrl:function(){return A()},setFileList:function(e){j(e)},getFileList:function(){return I}}},[I,A]);var F=o.a.createElement("div",null,o.a.createElement("div",{className:"ant-upload-text"},"上传图片")),L=o.a.createElement(r.a,{type:"primary"},"上传附件"),M=d?L:F,V=d?"text":"picture-card",B="";B=i||(d?".doc,.docx":".gif,.jpeg,.jpg,.png");var q="";q=d?o.a.createElement("span",{className:"upload-desc"},"支持",B,"格式，不超过",l,"MB。"):o.a.createElement("span",{className:"upload-desc"},"推荐尺寸",f,"。支持",B,"格式，不超过",1e3*l,"kB。");var z=function(e){return e.size/1024/1024<l},D=function(e){if(B){var t=B.split(","),a=e.name.substring(e.name.lastIndexOf(".")).toLowerCase(),n=!1;for(var r in t)if(t[r].toLowerCase()==a){n=!0;break}return n}return!0},A=function(){var e=[];return I.forEach(function(t){var a=t.response,n=t.url;if(a){var r=a.code,i=a.data;0===r&&e.push(i.url)}else e.push(n)}),e},U=d?null:function(){var e,t=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.url||t.preview){e.next=4;break}return e.next=3,getBase64(t.originFileObj);case 3:t.preview=e.sent;case 4:k(!0),T(t.url||t.preview);case 6:case"end":return e.stop()}},e)}),function(){var t=this,a=arguments;return new Promise(function(n,r){var i=e.apply(t,a);function c(e){w(i,n,r,c,l,"next",e)}function l(e){w(i,n,r,c,l,"throw",e)}c(void 0)})});return function(e){return t.apply(this,arguments)}}();return o.a.createElement("div",{className:"upload-wrapper"},o.a.createElement("div",{className:"upload clearfix"},o.a.createElement(N.a,h({className:"upload-component"},O,{listType:V,fileList:I,data:function(){return{appId:31438,domainType:4}},onPreview:U,onChange:function(e){var t=e.file,a=e.fileList;a=a.map(function(e){if(e.response){var t=e.response,a=t.code,n=t.data;0===a&&(e.url=n.url)}return e}),z(t)&&a.length<=n&&D(t)&&(j(a),"done"===t.status&&(E(a),p&&"function"==typeof p&&p()))},beforeUpload:function(e){var t=z(e);return D(e)?t?I.length<n||(b.a.info({message:"提示",description:"文件个数最多 ".concat(n," 个!")}),!1):(b.a.info({message:"提示",description:d?"文件必须小于 ".concat(l," MB!"):"文件必须小于 ".concat(1e3*l," kB!")}),!1):(b.a.info({message:"提示",description:"不支持上传此格式文件"}),!1)},accept:B,onRemove:function(e){var t=I.indexOf(e),a=I.slice();a.splice(t,1),j(a),E(a)},showUploadList:{showDownloadIcon:!1}}),n!==I.length||d?M:null),d&&o.a.createElement("span",{className:"file-upload-desc"},"最多",n,"个"),q,S&&o.a.createElement(g.a,{visible:S,footer:null,onCancel:function(){return k(!1)}},o.a.createElement("img",{alt:"example",style:{width:"100%"},src:R}))))}var j=I=Object(m.memo)(Object(m.forwardRef)(I));a(1381);function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var c,l=e[Symbol.iterator]();!(n=(c=l.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var S=l.a.Item;t.default=l.a.create()(function(e){var t=e.form,a=e.history,s=Object(m.useMemo)(function(){var e=a.location.pathname.split("/").slice(-1);return parseInt(e)},[]);if(!isNaN(s))return o.a.createElement(k,{id:s});var d=t.getFieldDecorator,u=t.validateFields,f=t.getFieldValue,p=t.setFieldsValue,g=C(Object(m.useState)([]),2),N=g[0],b=g[1],h=Object(m.useRef)(null),w=Object(m.useRef)(null),x=Object(m.useRef)(null),O=Object(m.useRef)(null),I=Object(m.useRef)(null),P=Object(m.useRef)(null);return Object(m.useEffect)(function(){Object(y.c)({pageIndex:1,pageRows:1e3}).then(function(e){0==e.data.code&&b(e.data.data.records)})},[]),o.a.createElement("div",null,o.a.createElement("div",{className:"mall-detail-page"},o.a.createElement(l.a,null,o.a.createElement(S,{label:"平台产品ID"},d("productId",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(o.a.createElement(i.a,{style:{width:"200px"}})),o.a.createElement(r.a,{type:"primary",onClick:function(e){e.urlInfo;Object(E.c)(f("productId")).then(function(e){0==e.data.code&&p({commodityName:e.data.data.commodityName,commodityModel:e.data.data.commodityModel,commodityBrand:e.data.data.commodityBrand})})}},"搜索")),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(S,{label:"商品名称"},d("commodityName",{})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(S,{label:"商品型号"},d("commodityModel",{})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(S,{label:"品牌"},d("commodityBrand",{})(o.a.createElement(i.a,{style:{width:"200px"}})))),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(S,{label:"商品分类"},d("commodityClassifyName",{})(o.a.createElement(n.a,{style:{width:"200px"}},N.map(function(e,t){return o.a.createElement(n.a.Option,{key:e.id,value:e.id,label:e.classifyName},e.classifyName)})))),o.a.createElement(S,{label:"商品价格"},d("commodityPrice",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(S,{label:"实时价格"},d("commodityRealPrice",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(o.a.createElement(i.a,{style:{width:"200px"}})))),o.a.createElement("div",{className:"form-wrap"},o.a.createElement(S,{label:"排序值"},d("commodityOrderValue",{getValueFromEvent:function(e){return e.target.value.replace(/[^\d]/g,"")}})(o.a.createElement(i.a,{style:{width:"200px"}}))),o.a.createElement(S,{label:"负责人"},d("directorName",{})(o.a.createElement(i.a,{style:{width:"200px"}})))),o.a.createElement(S,{label:"商品简述"},d("commodityDescription",{})(o.a.createElement(i.a,{style:{width:"600px"}}))),o.a.createElement(S,{label:"商品照片"},d("commodityPicture",{})(o.a.createElement(j,{ref:h,listType:"picture-card",maxCount:6,isNotImg:!1,maxSize:10}))),o.a.createElement(S,{label:"商品详情"},o.a.createElement(v,{divId:"wangedit-product-detail",ref:O})),o.a.createElement(S,{label:"规格参数"},o.a.createElement(v,{divId:"wangedit-product-config",ref:I})),o.a.createElement(S,{label:"售后政策"},o.a.createElement(v,{divId:"wangedit-product-rule",ref:P})),o.a.createElement(S,{label:"说明书"},d("commodityInstructions",{})(o.a.createElement(j,{ref:w,maxCount:1,format:".pdf",isNotImg:!0,maxSize:10}))),o.a.createElement(S,{label:"测试报告"},d("testReport",{})(o.a.createElement(j,{ref:x,maxCount:1,format:".xls,.xlsx",isNotImg:!0,maxSize:10})))),o.a.createElement("div",{className:"mall-info-footer"},o.a.createElement(r.a,{type:"primary",onClick:function(){u().then(function(e){["testReport","commodityInstructions","commodityPicture"].forEach(function(t){e[t]&&e[t].length?e[t]=e[t].reduce(function(e,t){return e+(t.url+",")},""):e[t]=""}),e.commodityDetail=O.current.getText(),e.commodityStandard=I.current.getText(),e.salesPolicy=P.current.getText(),e.productId&&(e.productId=Number(e.productId)),e.commodityOrderValue&&(e.commodityOrderValue=Number(e.commodityOrderValue)),e.status=3,Object(E.f)(e).then(function(e){0==e.data.code&&(c.a.success("上传商品成功"),a.push("/mall/productMn"))})})}},"保存"),o.a.createElement(r.a,{onClick:function(){a.push("/mall/productMn")}},"取消"))))});function k(e){var t=e.id,a=C(Object(m.useState)({}),2),n=a[0],r=a[1];Object(m.useEffect)(function(){Object(E.b)(t).then(function(e){0==e.data.code&&r(e.data.data)})},[]);var i,c=function(e){return e?e.split(",").map(function(e,t){return o.a.createElement("a",{src:e,onClick:function(){!function(e){window.open(e)}(e)},key:t},e)}):""};function l(e){var t={__html:e};return o.a.createElement("div",{dangerouslySetInnerHTML:t})}return o.a.createElement("div",{className:"productInfo-content-page"},o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"平台产品ID："),o.a.createElement("div",{className:"item-text"},n.productId))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品名称："),o.a.createElement("div",{className:"item-text"},n.commodityName)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品型号："),o.a.createElement("div",{className:"item-text"},n.commodityModel)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"品牌："),o.a.createElement("div",{className:"item-text"},n.commodityBrand))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品分类："),o.a.createElement("div",{className:"item-text"},n.commodityClassifyName)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品价格："),o.a.createElement("div",{className:"item-text"},n.commodityPrice)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"实时价格："),o.a.createElement("div",{className:"item-text"},n.commodityRealPrice))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"排序值："),o.a.createElement("div",{className:"item-text"},n.commodityOrderValue)),o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"负责人："),o.a.createElement("div",{className:"item-text"},n.directorName))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品简述："),o.a.createElement("div",{className:"item-text"},n.commodityDescription))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品照片："),o.a.createElement("div",{className:"item-text item-img"},(i=n.commodityPicture)?i.split(",").map(function(e,t){return o.a.createElement("img",{src:e,key:t})}):""))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"商品详情："),o.a.createElement("div",{className:"item-text item-wang-text"},l(n.commodityDetail)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"规格参数："),o.a.createElement("div",{className:"item-text item-wang-text"},l(n.commodityStandard)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"售后政策："),o.a.createElement("div",{className:"item-text item-wang-text"},l(n.salesPolicy)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"说明书："),o.a.createElement("div",{className:"item-text item-img"},c(n.commodityInstructions)))),o.a.createElement("div",{className:"item-wrap"},o.a.createElement("div",{className:"item"},o.a.createElement("div",{className:"item-label"},"测试报告："),o.a.createElement("div",{className:"item-text item-img"},c(n.testReport)))))}}}]);