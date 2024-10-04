import{k as $,i as B,h as O,j as a,s as b,V as q,F as y,bf as W,be as D,e as i,r as h,am as T,c as j,bh as F,I as no,o as X,p as H,ax as eo,t as _,bi as U,bj as ro,u as so,n as ao,ay as io,W as lo}from"./index-COCf9D-9.js";import{C as co}from"./Close-G1yeCTF0.js";function uo(o){return B("MuiAlert",o)}const V=$("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),po=O(a.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),go=O(a.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),fo=O(a.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),vo=O(a.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),Co=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],xo=o=>{const{variant:n,color:e,severity:t,classes:l}=o,d={root:["root",`color${y(e||t)}`,`${n}${y(e||t)}`,`${n}`],icon:["icon"],message:["message"],action:["action"]};return H(d,uo,l)},mo=b(q,{name:"MuiAlert",slot:"Root",overridesResolver:(o,n)=>{const{ownerState:e}=o;return[n.root,n[e.variant],n[`${e.variant}${y(e.color||e.severity)}`]]}})(({theme:o})=>{const n=o.palette.mode==="light"?W:D,e=o.palette.mode==="light"?D:W;return i({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:n(o.palette[t].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${t}StandardBg`]:e(o.palette[t].light,.9),[`& .${V.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"outlined"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:n(o.palette[t].light,.6),border:`1px solid ${(o.vars||o).palette[t].light}`,[`& .${V.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.dark).map(([t])=>({props:{colorSeverity:t,variant:"filled"},style:i({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${t}FilledColor`],backgroundColor:o.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[t].dark:o.palette[t].main,color:o.palette.getContrastText(o.palette[t].main)})}))]})}),ho=b("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,n)=>n.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),bo=b("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,n)=>n.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),G=b("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,n)=>n.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),K={success:a.jsx(po,{fontSize:"inherit"}),warning:a.jsx(go,{fontSize:"inherit"}),error:a.jsx(fo,{fontSize:"inherit"}),info:a.jsx(vo,{fontSize:"inherit"})},$o=h.forwardRef(function(n,e){const t=T({props:n,name:"MuiAlert"}),{action:l,children:d,className:v,closeText:x="Close",color:p,components:g={},componentsProps:u={},icon:C,iconMapping:M=K,onClose:S,role:A="alert",severity:m="success",slotProps:L={},slots:r={},variant:s="standard"}=t,c=j(t,Co),f=i({},t,{color:p,severity:m,variant:s,colorSeverity:p||m}),k=xo(f),E={slots:i({closeButton:g.CloseButton,closeIcon:g.CloseIcon},r),slotProps:i({},u,L)},[w,R]=F("closeButton",{elementType:no,externalForwardedProps:E,ownerState:f}),[I,P]=F("closeIcon",{elementType:co,externalForwardedProps:E,ownerState:f});return a.jsxs(mo,i({role:A,elevation:0,ownerState:f,className:X(k.root,v),ref:e},c,{children:[C!==!1?a.jsx(ho,{ownerState:f,className:k.icon,children:C||M[m]||K[m]}):null,a.jsx(bo,{ownerState:f,className:k.message,children:d}),l!=null?a.jsx(G,{ownerState:f,className:k.action,children:l}):null,l==null&&S?a.jsx(G,{ownerState:f,className:k.action,children:a.jsx(w,i({size:"small","aria-label":x,title:x,color:"inherit",onClick:S},R,{children:a.jsx(I,i({fontSize:"small"},P))}))}):null]}))});function ko(o={}){const{autoHideDuration:n=null,disableWindowBlurListener:e=!1,onClose:t,open:l,resumeHideDuration:d}=o,v=eo();h.useEffect(()=>{if(!l)return;function r(s){s.defaultPrevented||(s.key==="Escape"||s.key==="Esc")&&(t==null||t(s,"escapeKeyDown"))}return document.addEventListener("keydown",r),()=>{document.removeEventListener("keydown",r)}},[l,t]);const x=_((r,s)=>{t==null||t(r,s)}),p=_(r=>{!t||r==null||v.start(r,()=>{x(null,"timeout")})});h.useEffect(()=>(l&&p(n),v.clear),[l,n,p,v]);const g=r=>{t==null||t(r,"clickaway")},u=v.clear,C=h.useCallback(()=>{n!=null&&p(d??n*.5)},[n,d,p]),M=r=>s=>{const c=r.onBlur;c==null||c(s),C()},S=r=>s=>{const c=r.onFocus;c==null||c(s),u()},A=r=>s=>{const c=r.onMouseEnter;c==null||c(s),u()},m=r=>s=>{const c=r.onMouseLeave;c==null||c(s),C()};return h.useEffect(()=>{if(!e&&l)return window.addEventListener("focus",C),window.addEventListener("blur",u),()=>{window.removeEventListener("focus",C),window.removeEventListener("blur",u)}},[e,l,C,u]),{getRootProps:(r={})=>{const s=i({},U(o),U(r));return i({role:"presentation"},r,s,{onBlur:M(s),onFocus:S(s),onMouseEnter:A(s),onMouseLeave:m(s)})},onClickAway:g}}function yo(o){return B("MuiSnackbarContent",o)}$("MuiSnackbarContent",["root","message","action"]);const So=["action","className","message","role"],Mo=o=>{const{classes:n}=o;return H({root:["root"],action:["action"],message:["message"]},yo,n)},Ao=b(q,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(o,n)=>n.root})(({theme:o})=>{const n=o.palette.mode==="light"?.8:.98,e=ro(o.palette.background.default,n);return i({},o.typography.body2,{color:o.vars?o.vars.palette.SnackbarContent.color:o.palette.getContrastText(e),backgroundColor:o.vars?o.vars.palette.SnackbarContent.bg:e,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(o.vars||o).shape.borderRadius,flexGrow:1,[o.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),Lo=b("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(o,n)=>n.message})({padding:"8px 0"}),wo=b("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(o,n)=>n.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),Eo=h.forwardRef(function(n,e){const t=T({props:n,name:"MuiSnackbarContent"}),{action:l,className:d,message:v,role:x="alert"}=t,p=j(t,So),g=t,u=Mo(g);return a.jsxs(Ao,i({role:x,square:!0,elevation:6,className:X(u.root,d),ownerState:g,ref:e},p,{children:[a.jsx(Lo,{className:u.message,ownerState:g,children:v}),l?a.jsx(wo,{className:u.action,ownerState:g,children:l}):null]}))});function jo(o){return B("MuiSnackbar",o)}$("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const Oo=["onEnter","onExited"],Ro=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],Io=o=>{const{classes:n,anchorOrigin:e}=o,t={root:["root",`anchorOrigin${y(e.vertical)}${y(e.horizontal)}`]};return H(t,jo,n)},Z=b("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(o,n)=>{const{ownerState:e}=o;return[n.root,n[`anchorOrigin${y(e.anchorOrigin.vertical)}${y(e.anchorOrigin.horizontal)}`]]}})(({theme:o,ownerState:n})=>{const e={left:"50%",right:"auto",transform:"translateX(-50%)"};return i({zIndex:(o.vars||o).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},n.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},n.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},n.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[o.breakpoints.up("sm")]:i({},n.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},n.anchorOrigin.horizontal==="center"&&e,n.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},n.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),Bo=h.forwardRef(function(n,e){const t=T({props:n,name:"MuiSnackbar"}),l=so(),d={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{action:v,anchorOrigin:{vertical:x,horizontal:p}={vertical:"bottom",horizontal:"left"},autoHideDuration:g=null,children:u,className:C,ClickAwayListenerProps:M,ContentProps:S,disableWindowBlurListener:A=!1,message:m,open:L,TransitionComponent:r=lo,transitionDuration:s=d,TransitionProps:{onEnter:c,onExited:f}={}}=t,k=j(t.TransitionProps,Oo),E=j(t,Ro),w=i({},t,{anchorOrigin:{vertical:x,horizontal:p},autoHideDuration:g,disableWindowBlurListener:A,TransitionComponent:r,transitionDuration:s}),R=Io(w),{getRootProps:I,onClickAway:P}=ko(i({},w)),[J,N]=h.useState(!0),Q=ao({elementType:Z,getSlotProps:I,externalForwardedProps:E,ownerState:w,additionalProps:{ref:e},className:[R.root,C]}),Y=z=>{N(!0),f&&f(z)},oo=(z,to)=>{N(!1),c&&c(z,to)};return!L&&J?null:a.jsx(io,i({onClickAway:P},M,{children:a.jsx(Z,i({},Q,{children:a.jsx(r,i({appear:!0,in:L,timeout:s,direction:x==="top"?"down":"up",onEnter:oo,onExited:Y},k,{children:u||a.jsx(Eo,i({message:m,action:v},S))}))}))}))});export{$o as A,Bo as S};
