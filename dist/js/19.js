(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1464:function(e,t,n){},1516:function(e,t,n){"use strict";n.r(t);n(99);var a=n(45),r=(n(89),n(25)),c=(n(105),n(79),n(161),n(55),n(174),n(35),n(26),n(22),n(27),n(28),n(19),n(34),n(368),n(0)),i=n.n(c),o=n(33),s=n(4);n(160);function l(e){r.a.open({message:"文件上传提示",description:e,style:{width:500,marginLeft:-265}})}n(1464);function u(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{a||null==o.return||o.return()}finally{if(r)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var f=location.hostname;"localhost"==f&&(f="dp.clife.net");var m=null,v=null,p=function(){m&&(m.close(),m=null),clearInterval(v)},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n={type:1,message:e,receiverId:t};return JSON.stringify(n)};t.default=function(){var e=Object(c.useRef)(!1),t=Object(c.useRef)(),n=Object(c.useRef)(1),b=d(Object(c.useState)(""),2),h=b[0],w=b[1],E=d(Object(c.useState)({data:[],isscroll:!1}),2),y=E[0],j=E[1],N=d(Object(c.useState)([]),2),O=N[0],S=N[1],x=d(Object(c.useState)(void 0),2),I=x[0],A=x[1],C=d(Object(c.useState)(void 0),2),k=C[0],T=C[1],z=d(Object(c.useState)(""),2),_=z[0],F=z[1],J=y.data,L=y.isscroll;Object(c.useEffect)(function(){return P(),p},[]),Object(c.useEffect)(function(){console.log("---receiverId---",I),I&&(n.current=1,R())},[I]),Object(c.useEffect)(function(){if(J.length>0&&I){var e=t.current.scrollHeight;L&&(e=300),t.current.scrollTop=e}},[J,L,I]);var P=function(e){s.a.Post("/v5x/web/manage/support/getCustomers",{},{loading:!0,headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.data,n=(void 0===t?{}:t).data||[];S(n)})},R=function(){s.a.Post("/v5x/web/manage/support/getHistory",{receiverId:I,pageIndex:n.current,pageRows:6},{headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.data,a=void 0===t?{}:t,r=a.data&&a.data.list||[],c=r.length,i=n.current>1;if(c<6){if(n.current=-1,0==c)return}else n.current+=1;j(function(e){var t=e.data,n=i&&t||[];return{data:[].concat(u(r.reverse()),u(n)),isscroll:i}})})},D=function(){h&&/[\S]/.test(h)&&(m?(m.send(g(h,I)),w("")):r.a.info({description:"连线中......"}))},H=function(t,n){m||function t(){(m=new WebSocket("wss://".concat(f,"/v5x/web/manage/tech/support/ws"))).onopen=function(){console.log("---连接成功----"),e.current=!0,clearInterval(v),v=setInterval(function(){m.send(g())},1e4)},m.onmessage=function(e){var t=e.data,n=void 0===t?"{}":t,a=JSON.parse(n),c=a.senderId,i=a.senderName,o=a.code;"3002"==o?(r.a.info({description:"已在其他地方上线"}),A(void 0)):"3001"==o?r.a.info({description:"非法登录"}):A(function(e){return console.log(222,a,e),"客服"!=i&&c!=e||j(function(e){var t=e.data;return{data:[].concat(u(t),[a]),isscroll:!1}}),e})},m.onclose=function(n){console.log("---断开连接----",n),clearInterval(v),m=null,e.current&&"1006"==n.code?setTimeout(t,5e3):"1007"==n.code&&(r.a.info({description:"已在其他地方上线"}),A(void 0)),e.current=!1}}(),A(t),T(n)};return i.a.createElement("div",{className:"comm-contont-cardw"},i.a.createElement("div",{className:"customer-service-box"},i.a.createElement("div",{className:"customer"},i.a.createElement("div",{className:"list"},O.map(function(e){var t=e.senderName,n=e.senderId;return i.a.createElement("div",{className:"a".concat(I==n?" cur":""),key:n,onClick:function(){H(n,t)}},i.a.createElement("span",null," ",t))}))),I&&i.a.createElement("div",{className:"customer-service"},i.a.createElement("div",{className:"tit"},k),i.a.createElement("div",{className:"content",ref:t,onScrollCapture:function(){0==t.current.scrollTop&&n.current>0&&R()}},J.map(function(e,t){var n=e.message,a=void 0===n?"":n,r=e.senderName,c=e.time,s="";return 0==a.indexOf("_img_")&&(s=a.slice(5)),i.a.createElement("div",{className:"onechat ".concat("客服"==r?"right":"left"),key:t+"_"+c},s?i.a.createElement("img",{className:"img",src:s,onClick:function(){return F(s)}}):i.a.createElement("span",{className:"bubble"},a),i.a.createElement("span",{className:"time"},o.b.formateDate(c,"MM-dd hh:mm:ss",8)))})),i.a.createElement("div",{className:"inputbox"},i.a.createElement("label",{className:"upimgbtn",htmlFor:"up"}),i.a.createElement("input",{className:"file",id:"up",type:"file","data-format":"gif,jpeg,jpg,png","data-maxsize":1024,onChange:function(e){var t=(e=e||window.event).target,n=t.files[0];return!!n&&(!!function(e){var t=e.getAttribute("data-format"),n=e.getAttribute("data-maxsize")&&e.getAttribute("data-maxsize")-0||500,a=10485760,r=e.value;if(n){if(window.ActiveXObject&&!e.files)a=new ActiveXObject("Scripting.FileSystemObject").GetFile(r).Size;else a=e.files[0].size;if(a>1024*n)return l("文件大小不能超过"+n+"KB"),e.value="",!1}if(t){var c=t.split(","),i=r.substring(r.lastIndexOf(".")+1).toLowerCase(),o=!1;for(var s in c)if(c[s].toLowerCase()==i){o=!0;break}if(!o)return l("请选择"+t+"格式的文件"),e.value="",!1}return!0}(t)&&void function(e,t){var n={appId:31438,domainType:4,file:e};s.a.Post(o.j,n,{needFormData:!0}).then(function(e){var n=e.data,a=void 0===n?{}:n;if(0==a.code){var r=a.data.url;t(r)}else t(null)})}(n,function(e){console.log(1111,e),m?m.send(g("_img_".concat(e),I)):r.a.info({description:"连线中"})}))},accept:".gif,.jpeg,.jpg,.png"}),i.a.createElement("span",{className:"sendbtn",onClick:D},"发送"),i.a.createElement(a.a.TextArea,{className:"textarea",placeholder:"输入回复 ......",maxLength:200,value:h,onChange:function(e){w(e.target.value.replace(/[\r\n]/g,""))},onPressEnter:D})))||i.a.createElement("div",{className:"nosender"},i.a.createElement("div",null,"喝杯茶吧，让精神抖擞起来。"))),_&&i.a.createElement("div",{onClick:function(){return F("")},className:"showbigimg-maskbox",title:"点击关闭"}," ",i.a.createElement("img",{src:_})))}}}]);