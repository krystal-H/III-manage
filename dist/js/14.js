(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1499:function(e,t,n){},1548:function(e,t,n){"use strict";n.r(t);n(129);var a=n(64),r=(n(144),n(48)),o=(n(118),n(98),n(170),n(66),n(199),n(18),n(35),n(21),n(36),n(27),n(29),n(30),n(221),n(256),n(0)),c=n.n(o),i=n(32),l=n(3);n(258);function s(e){r.a.open({message:"文件上传提示",description:e,style:{width:500,marginLeft:-265}})}n(1499);function u(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw r}}return o}(e,t)||d(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var v=location.hostname;"localhost"==v&&(v="dp.clife.net");var p=null,g=null,b=function(){p&&(p.close(),p=null),clearInterval(g)},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n={type:1,message:e,receiverId:t};return JSON.stringify(n)};t.default=function(){var e=Object(o.useRef)(!1),t=Object(o.useRef)(),n=Object(o.useRef)(1),d=f(Object(o.useState)(""),2),m=d[0],y=d[1],w=f(Object(o.useState)({data:[],isscroll:!1}),2),E=w[0],j=w[1],N=f(Object(o.useState)([]),2),S=N[0],O=N[1],I=f(Object(o.useState)(void 0),2),x=I[0],A=I[1],C=f(Object(o.useState)(void 0),2),k=C[0],T=C[1],z=f(Object(o.useState)(""),2),_=z[0],F=z[1],J=E.data,L=E.isscroll;Object(o.useEffect)((function(){return P(),b}),[]),Object(o.useEffect)((function(){console.log("---receiverId---",x),x&&(n.current=1,R())}),[x]),Object(o.useEffect)((function(){if(J.length>0&&x){var e=t.current.scrollHeight;L&&(e=300),t.current.scrollTop=e}}),[J,L,x]);var P=function(e){l.a.Post("/v5x/web/manage/support/getCustomers",{},{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||[];O(n)}))},R=function(){l.a.Post("/v5x/web/manage/support/getHistory",{receiverId:x,pageIndex:n.current,pageRows:6},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,a=void 0===t?{}:t,r=a.data&&a.data.list||[],o=r.length,c=n.current>1;if(o<6){if(n.current=-1,0==o)return}else n.current+=1;j((function(e){var t=e.data,n=c&&t||[];return{data:[].concat(u(r.reverse()),u(n)),isscroll:c}}))}))},M=function(){m&&/[\S]/.test(m)&&(p?(p.send(h(m,x)),y("")):r.a.info({description:"连线中......"}))},D=function(t,n){p||function t(){(p=new WebSocket("wss://".concat(v,"/v5x/web/manage/tech/support/ws"))).onopen=function(){console.log("---连接成功----"),e.current=!0,clearInterval(g),g=setInterval((function(){p.send(h())}),1e4)},p.onmessage=function(e){var t=e.data,n=void 0===t?"{}":t,a=JSON.parse(n),o=a.senderId,c=a.senderName,i=a.code;"3002"==i?(r.a.info({description:"已在其他地方上线"}),A(void 0)):"3001"==i?r.a.info({description:"非法登录"}):A((function(e){return console.log(222,a,e),"客服"!=c&&o!=e||j((function(e){var t=e.data;return{data:[].concat(u(t),[a]),isscroll:!1}})),e}))},p.onclose=function(n){console.log("---断开连接----",n),clearInterval(g),p=null,e.current&&"1006"==n.code?setTimeout(t,5e3):"1007"==n.code&&(r.a.info({description:"已在其他地方上线"}),A(void 0)),e.current=!1}}(),A(t),T(n)};return c.a.createElement("div",{className:"comm-contont-cardw"},c.a.createElement("div",{className:"customer-service-box"},c.a.createElement("div",{className:"customer"},c.a.createElement("div",{className:"list"},S.map((function(e){var t=e.senderName,n=e.senderId;return c.a.createElement("div",{className:"a".concat(x==n?" cur":""),key:n,onClick:function(){D(n,t)}},c.a.createElement("span",null," ",t))})))),x&&c.a.createElement("div",{className:"customer-service"},c.a.createElement("div",{className:"tit"},k),c.a.createElement("div",{className:"content",ref:t,onScrollCapture:function(){0==t.current.scrollTop&&n.current>0&&R()}},J.map((function(e,t){var n=e.message,a=void 0===n?"":n,r=e.senderName,o=e.time,l="";return 0==a.indexOf("_img_")&&(l=a.slice(5)),c.a.createElement("div",{className:"onechat ".concat("客服"==r?"right":"left"),key:t+"_"+o},l?c.a.createElement("img",{className:"img",src:l,onClick:function(){return F(l)}}):c.a.createElement("span",{className:"bubble"},a),c.a.createElement("span",{className:"time"},i.b.formateDate(o,"MM-dd hh:mm:ss",8)))}))),c.a.createElement("div",{className:"inputbox"},c.a.createElement("label",{className:"upimgbtn",htmlFor:"up"}),c.a.createElement("input",{className:"file",id:"up",type:"file","data-format":"gif,jpeg,jpg,png","data-maxsize":1024,onChange:function(e){var t=(e=e||window.event).target,n=t.files[0];return!!n&&(!!function(e){var t=e.getAttribute("data-format"),n=e.getAttribute("data-maxsize")&&e.getAttribute("data-maxsize")-0||500,a=10485760,r=e.value;if(n){if(window.ActiveXObject&&!e.files)a=new ActiveXObject("Scripting.FileSystemObject").GetFile(r).Size;else a=e.files[0].size;if(a>1024*n)return s("文件大小不能超过"+n+"KB"),e.value="",!1}if(t){var o=t.split(","),c=r.substring(r.lastIndexOf(".")+1).toLowerCase(),i=!1;for(var l in o)if(o[l].toLowerCase()==c){i=!0;break}if(!i)return s("请选择"+t+"格式的文件"),e.value="",!1}return!0}(t)&&void function(e,t){var n={appId:31438,domainType:4,file:e};l.a.Post(i.j,n,{needFormData:!0}).then((function(e){var n=e.data,a=void 0===n?{}:n;if(0==a.code){var r=a.data.url;t(r)}else t(null)}))}(n,(function(e){console.log(1111,e),p?p.send(h("_img_".concat(e),x)):r.a.info({description:"连线中"})})))},accept:".gif,.jpeg,.jpg,.png"}),c.a.createElement("span",{className:"sendbtn",onClick:M},"发送"),c.a.createElement(a.a.TextArea,{className:"textarea",placeholder:"输入回复 ......",maxLength:200,value:m,onChange:function(e){y(e.target.value.replace(/[\r\n]/g,""))},onPressEnter:M})))||c.a.createElement("div",{className:"nosender"},c.a.createElement("div",null,"喝杯茶吧，让精神抖擞起来。"))),_&&c.a.createElement("div",{onClick:function(){return F("")},className:"showbigimg-maskbox",title:"点击关闭"}," ",c.a.createElement("img",{src:_})))}}}]);