(this.webpackJsonppomodoro=this.webpackJsonppomodoro||[]).push([[0],{57:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a(15),c=a.n(n),s=(a(57),a(14)),r=a(83),o=a(84),l=a(80),u=a(81),d=a(43),p=a.n(d),m=a(44),b=a.n(m),j=a(79),h=a(78),f=Object(h.a)({digital:{fontFamily:"Orbitron, sans-serif",fontSize:"1.5rem",color:"antiquewhite",margin:"10px 0 10px 0"},label:{fontFamily:"Roboto, sans-serif",color:"antiquewhite",marginBottom:"10px"}}),x=a(45),g=Object(x.a)({palette:{primary:{light:"#fffcf6",main:"#fffaed",dark:"#FAEBD7",contrastText:"#5a5a5a"},secondary:{light:"#E6E6E6",main:"#808080",dark:"#5a5a5a",contrastText:"#fffaed"}}}),O=a(3),v=function(e){var t=f(e);return Object(O.jsx)(o.a,{align:"center",margin:"1rem",children:Object(O.jsxs)(j.a,{theme:g,children:[Object(O.jsx)(l.a,{id:"".concat(e.id,"-label"),className:t.label,children:e.label}),Object(O.jsx)(u.a,{onClick:e.handleInc,id:"".concat(e.id,"-increment"),color:"primary",children:Object(O.jsx)(p.a,{fontSize:"large"})}),Object(O.jsx)(l.a,{id:"".concat(e.id,"-length"),className:t.digital,children:e.value}),Object(O.jsx)(u.a,{onClick:e.handleDec,id:"".concat(e.id,"-decrement"),color:"primary",children:Object(O.jsx)(b.a,{fontSize:"large"})})]})})},T=a(82),S=Object(h.a)({butt:{fontSize:"0.75rem",margin:"0 10px 0 10px"},time:{position:"relative",margin:"5px auto 15px auto",height:"2rem",width:"200px"},inactive:{display:"none"},pulser1:{position:"absolute",left:"0",right:"0",top:"-10px",marginLeft:"auto",marginRight:"auto",animation:"pulse1 1s infinite"},pulser2:{position:"absolute",left:"0",right:"0",top:"-10px",marginLeft:"auto",marginRight:"auto",animation:"pulse2 1s infinite"},pulser3:{position:"absolute",left:"0",right:"0",top:"-10px",marginLeft:"auto",marginRight:"auto",animation:"pulse3 1s infinite"},shifter:{animation:"shift 1s infinite"}}),L=function(e){var t=S(e),a=f(e);return Object(O.jsxs)(o.a,{align:"center",id:"disp",children:[Object(O.jsx)(l.a,{id:"timer-label",className:a.label,children:e.isSesh?"session":"break"}),Object(O.jsxs)(o.a,{className:t.time,children:[Object(O.jsx)(l.a,{className:"".concat(!e.isPause&&e.rawVal<=5?t.pulser1:t.inactive," ").concat(a.digital),children:e.value}),Object(O.jsx)(l.a,{className:"".concat(!e.isPause&&e.rawVal<=5?t.pulser2:t.inactive," ").concat(a.digital),children:e.value}),Object(O.jsx)(l.a,{className:"".concat(!e.isPause&&e.rawVal<=5?t.pulser3:t.inactive," ").concat(a.digital),children:e.value}),Object(O.jsx)(l.a,{className:"".concat(!e.isPause&&e.rawVal<=5?t.shifter:""," ").concat(a.digital),id:"time-left",children:e.value})]}),Object(O.jsxs)(j.a,{theme:g,children:[Object(O.jsx)(T.a,{id:"start_stop",onClick:e.handleTimerAction,variant:"contained",disableElevation:!0,className:t.butt,color:"primary",children:e.isPause?"start":"pause"}),Object(O.jsx)(T.a,{id:"reset",onClick:e.handleReset,variant:"outlined",disableElevation:!0,className:t.butt,color:"primary",children:"reset"})]})]})},w=function(){var e=Object(i.useRef)(!0);return Object(i.useEffect)((function(){e.current=!1}),[]),e.current},k=function(){var e=Object(i.useState)(25),t=Object(s.a)(e,2),a=t[0],n=t[1],c=Object(i.useState)(5),l=Object(s.a)(c,2),u=l[0],d=l[1],p=Object(i.useState)(!0),m=Object(s.a)(p,2),b=m[0],j=m[1],h=Object(i.useState)(1500),f=Object(s.a)(h,2),x=f[0],g=f[1],T=Object(i.useRef)(null),S=w(),k=Object(i.useState)({expTimeLapse:0,nextUp:1e3}),y=Object(s.a)(k,2),E=y[0],N=y[1],D=Object(i.useState)(0),I=Object(s.a)(D,2),R=I[0],B=I[1],V={handleSInc:function(){0===E.expTimeLapse&&a+1<=60&&n(a+1)},handleSDec:function(){0===E.expTimeLapse&&a-1>0&&n(a-1)},handleBInc:function(){0===E.expTimeLapse&&u+1<=60&&d(u+1)},handleBDec:function(){0===E.expTimeLapse&&u-1>0&&d(u-1)}},P=function(){var e=Date.now()-E.expTimeLapse;e>1e3&&console.log(e,1e3,"skipped time!"),g(x-1),N({expTimeLapse:E.expTimeLapse+1e3,nextUp:1e3>=e?1e3-e:0})},C=function(){N({expTimeLapse:Date.now()+1e3,nextUp:1e3})},U=function(){N({expTimeLapse:0,nextUp:1e3})};return Object(i.useEffect)((function(){S||(0===E.expTimeLapse?(clearTimeout(R),B(0)):B(setTimeout(P,E.nextUp)))}),[E]),Object(i.useEffect)((function(){S||(console.log("seshval.breakval,issesh state change triggered useeffect"),console.log("issesh ".concat(b,", seshVal ").concat(a,", breakVal ").concat(u,", curr ").concat(x)),g(b?60*a:60*u))}),[a,u]),Object(i.useEffect)((function(){if(5===x)console.log("animation");else if(0===x)T.current.currentTime=0,T.current.play();else if(x<0){var e=!b;U(),j(e),g(e?60*a:60*u),C()}}),[x]),Object(O.jsx)(o.a,{height:"100%",width:"100%",id:"bg",children:Object(O.jsxs)(r.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:0,id:"app",children:[Object(O.jsxs)(r.a,{container:!0,spacing:0,direction:"row",justify:"center",alignItems:"center",id:"ctrl",children:[Object(O.jsx)(v,{id:"session",label:"session",value:a,handleInc:V.handleSInc,handleDec:V.handleSDec}),Object(O.jsx)(v,{id:"break",label:"break",value:u,handleInc:V.handleBInc,handleDec:V.handleBDec})]}),Object(O.jsx)(L,{isSesh:b,isPause:0===E.expTimeLapse,value:function(e){var t=Math.floor(e/60).toString(),a=(e%60).toString();return(t<10?"0".concat(t):t)+":"+(a<10?"0".concat(a):a)}(x),rawVal:x,handleTimerAction:function(){0===E.expTimeLapse?C():U()},handleReset:function(){j(!0),n(25),d(5),g(1500),U(),T.current.pause(),T.current.currentTime=0}}),Object(O.jsx)("audio",{className:"alarmSound",id:"beep",ref:T,src:"https://github.com/MatchaCrisp/pomodoro/blob/main/src/alarms/chime.mp3?raw=true"})]})})};c.a.render(Object(O.jsx)(k,{}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.ea767b7b.chunk.js.map