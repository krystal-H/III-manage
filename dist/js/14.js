(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1488:function(e,t,n){},1495:function(e,t,n){"use strict";n.r(t);n(137);var a=n(68),r=(n(143),n(47)),c=(n(117),n(97),n(170),n(65),n(19),n(37),n(22),n(38),n(29),n(31),n(32),n(199),n(221),n(257),n(0)),o=n.n(c),l=n(30),s=n(3);n(1488);function i(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||m(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],o=!0,l=!1;try{for(n=n.call(e);!(o=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);o=!0);}catch(e){l=!0,r=e}finally{try{o||null==n.return||n.return()}finally{if(l)throw r}}return c}(e,t)||m(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var d=location.hostname;"localhost"==d&&(d="dp.clife.net");var v=null,p=null,b=function(){v&&(v.close(),v=null),clearInterval(p)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n={type:1,message:e,receiverId:t};return JSON.stringify(n)};t.default=function(){var e=Object(c.useRef)(!1),t=Object(c.useRef)(),n=Object(c.useRef)(1),m=u(Object(c.useState)(""),2),f=m[0],h=m[1],g=u(Object(c.useState)({data:[],isscroll:!1}),2),E=g[0],w=g[1],N=u(Object(c.useState)([]),2),S=N[0],j=N[1],O=u(Object(c.useState)(void 0),2),I=O[0],x=O[1],A=u(Object(c.useState)(void 0),2),C=A[0],T=A[1],k=E.data,J=E.isscroll;Object(c.useEffect)((function(){return R(),b}),[]),Object(c.useEffect)((function(){I&&(n.current=1,M())}),[I]),Object(c.useEffect)((function(){if(k.length>0){var e=t.current.scrollHeight;J&&(e=300),t.current.scrollTop=e}}),[k,J]);var R=function(e){s.a.Post("/v5x/web/manage/support/getCustomers",{},{},{loading:!0,headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,n=(void 0===t?{}:t).data||[];j(n)}))},M=function(){s.a.Post("/v5x/web/manage/support/getHistory",{receiverId:I,pageIndex:n.current,pageRows:6},{},{headers:{"Content-Type":"application/json"}}).then((function(e){var t=e.data,a=void 0===t?{}:t,r=a.data&&a.data.list||[],c=r.length,o=n.current>1;if(c<6){if(n.current=-1,0==c)return}else n.current+=1;w((function(e){var t=e.data;return{data:[].concat(i(r.reverse()),i(t)),isscroll:o}}))}))},P=function(){f&&/[\S]/.test(f)&&(v?(v.send(y(f,I)),h("")):r.a.info({description:"连线中......"}))},H=function(t,n){v||function t(){(v=new WebSocket("wss://".concat(d,"/v5x/web/manage/tech/support/ws"))).onopen=function(){console.log("---连接成功----"),e.current=!0,clearInterval(p),p=setInterval((function(){v.send(y())}),1e4)},v.onmessage=function(e){var t=e.data,n=void 0===t?"{}":t,a=JSON.parse(n);w((function(e){var t=e.data;return{data:[].concat(i(t),[a]),isscroll:!1}}))},v.onclose=function(n){console.log("---断开连接----"),clearInterval(p),v=null,e.current&&"1006"==n.code&&setTimeout(t,5e3),e.current=!1}}(),x(t),T(n)};return o.a.createElement("div",{className:"comm-contont-cardw"},o.a.createElement("div",{className:"customer-service-box"},o.a.createElement("div",{className:"customer"},o.a.createElement("div",{className:"list"},S.map((function(e){var t=e.senderName,n=e.senderId;return o.a.createElement("div",{className:"a".concat(I==n?" cur":""),key:n,onClick:function(){H(n,t)}},o.a.createElement("span",null," ",t))})))),I&&o.a.createElement("div",{className:"customer-service"},o.a.createElement("div",{className:"tit"},C),o.a.createElement("div",{className:"content",ref:t,onScrollCapture:function(){0==t.current.scrollTop&&n.current>0&&M()}},k.map((function(e,t){var n=e.message,a=e.senderName,r=e.time;return o.a.createElement("div",{className:"onechat ".concat("客服"==a?"right":"left"),key:t+"_"+r},o.a.createElement("span",{className:"bubble"},n),o.a.createElement("span",{className:"time"},l.b.formateDate(r,"MM-dd hh:mm:ss",8)))}))),o.a.createElement("div",{className:"inputbox"},o.a.createElement("span",{className:"imgbtn"}),o.a.createElement("span",{className:"sendbtn",onClick:P},"发送"),o.a.createElement(a.a.TextArea,{className:"textarea",placeholder:"输入回复 ......",maxLength:200,value:f,onChange:function(e){h(e.target.value.replace(/[\r\n]/g,""))},onPressEnter:P})))||o.a.createElement("div",{className:"nosender"},o.a.createElement("div",null,"喝杯茶吧，让精神抖擞起来。"))))}}}]);