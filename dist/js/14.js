(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1490:function(e,t,n){},1497:function(e,t,n){"use strict";n.r(t);n(136);var r=n(68),a=(n(142),n(47)),o=(n(117),n(97),n(170),n(65),n(19),n(37),n(22),n(38),n(29),n(32),n(31),n(198),n(220),n(257),n(0)),c=n.n(o),l=n(30),s=n(3);n(1490);function i(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],c=!0,l=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){l=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(l)throw a}}return o}(e,t)||d(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=location.hostname;"localhost"==m&&(m="dp.clife.net");var v=null,p=null,b=function(){v&&(v.close(),v=null),clearInterval(p)},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n={type:1,message:e,receiverId:t};return JSON.stringify(n)};t.default=function(){var e=Object(o.useRef)(!1),t=Object(o.useRef)(),n=Object(o.useRef)(1),d=u(Object(o.useState)(""),2),f=d[0],y=d[1],h=u(Object(o.useState)({data:[],isscroll:!1}),2),E=h[0],N=h[1],w=u(Object(o.useState)([]),2),S=w[0],j=w[1],I=u(Object(o.useState)(void 0),2),O=I[0],x=I[1],A=u(Object(o.useState)(void 0),2),C=A[0],T=A[1],k=E.data,J=E.isscroll;Object(o.useEffect)((function(){return R(),b}),[]),Object(o.useEffect)((function(){console.log("---receiverId---",O),O&&(n.current=1,M())}),[O]),Object(o.useEffect)((function(){if(k.length>0&&O){var e=t.current.scrollHeight;J&&(e=300),t.current.scrollTop=e}}),[k,J,O]);var R=function(e){s.a.Post("/v5x/web/manage/support/getCustomers",{},{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||[];j(n)}))},M=function(){s.a.Post("/v5x/web/manage/support/getHistory",{receiverId:O,pageIndex:n.current,pageRows:6},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,r=void 0===t?{}:t,a=r.data&&r.data.list||[],o=a.length,c=n.current>1;if(o<6){if(n.current=-1,0==o)return}else n.current+=1;N((function(e){var t=e.data,n=c&&t||[];return{data:[].concat(i(a.reverse()),i(n)),isscroll:c}}))}))},P=function(){f&&/[\S]/.test(f)&&(v?(v.send(g(f,O)),y("")):a.a.info({description:"连线中......"}))},H=function(t,n){v||function t(){(v=new WebSocket("wss://".concat(m,"/v5x/web/manage/tech/support/ws"))).onopen=function(){console.log("---连接成功----"),e.current=!0,clearInterval(p),p=setInterval((function(){v.send(g())}),1e4)},v.onmessage=function(e){var t=e.data,n=void 0===t?"{}":t,r=JSON.parse(n),o=r.senderId,c=r.senderName,l=r.code;"3002"==l?(a.a.info({description:"已在其他地方上线"}),x(void 0)):"3001"==l?a.a.info({description:"非法登录"}):x((function(e){return console.log(222,r,e),"客服"!=c&&o!=e||N((function(e){var t=e.data;return{data:[].concat(i(t),[r]),isscroll:!1}})),e}))},v.onclose=function(n){console.log("---断开连接----",n),clearInterval(p),v=null,e.current&&"1006"==n.code?setTimeout(t,5e3):"1007"==n.code&&(a.a.info({description:"已在其他地方上线"}),x(void 0)),e.current=!1}}(),x(t),T(n)};return c.a.createElement("div",{className:"comm-contont-cardw"},c.a.createElement("div",{className:"customer-service-box"},c.a.createElement("div",{className:"customer"},c.a.createElement("div",{className:"list"},S.map((function(e){var t=e.senderName,n=e.senderId;return c.a.createElement("div",{className:"a".concat(O==n?" cur":""),key:n,onClick:function(){H(n,t)}},c.a.createElement("span",null," ",t))})))),O&&c.a.createElement("div",{className:"customer-service"},c.a.createElement("div",{className:"tit"},C),c.a.createElement("div",{className:"content",ref:t,onScrollCapture:function(){0==t.current.scrollTop&&n.current>0&&M()}},k.map((function(e,t){var n=e.message,r=e.senderName,a=e.time;return c.a.createElement("div",{className:"onechat ".concat("客服"==r?"right":"left"),key:t+"_"+a},c.a.createElement("span",{className:"bubble"},n),c.a.createElement("span",{className:"time"},l.b.formateDate(a,"MM-dd hh:mm:ss",8)))}))),c.a.createElement("div",{className:"inputbox"},c.a.createElement("span",{className:"imgbtn"}),c.a.createElement("span",{className:"sendbtn",onClick:P},"发送"),c.a.createElement(r.a.TextArea,{className:"textarea",placeholder:"输入回复 ......",maxLength:200,value:f,onChange:function(e){y(e.target.value.replace(/[\r\n]/g,""))},onPressEnter:P})))||c.a.createElement("div",{className:"nosender"},c.a.createElement("div",null,"喝杯茶吧，让精神抖擞起来。"))))}}}]);