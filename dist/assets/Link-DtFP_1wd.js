import{i as $,k as j,b7 as y,aO as M,s as N,T as P,F as h,e as a,r as x,ag as U,c as _,b8 as z,w as W,j as E,o as H,p as O}from"./index-r6x2ypbK.js";function w(o){return j("MuiLink",o)}const I=$("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},q=o=>g[o]||o,G=({theme:o,ownerState:e})=>{const n=q(e.color),s=y(o,`palette.${n}`,!1)||e.color,r=y(o,`palette.${n}Channel`);return"vars"in o&&r?`rgba(${r} / 0.4)`:M(s,.4)},J=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],K=o=>{const{classes:e,component:n,focusVisible:s,underline:r}=o,t={root:["root",`underline${h(r)}`,n==="button"&&"button",s&&"focusVisible"]};return O(t,w,e)},Q=N(P,{name:"MuiLink",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:n}=o;return[e.root,e[`underline${h(n.underline)}`],n.component==="button"&&e.button]}})(({theme:o,ownerState:e})=>a({},e.underline==="none"&&{textDecoration:"none"},e.underline==="hover"&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},e.underline==="always"&&a({textDecoration:"underline"},e.color!=="inherit"&&{textDecorationColor:G({theme:o,ownerState:e})},{"&:hover":{textDecorationColor:"inherit"}}),e.component==="button"&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${I.focusVisible}`]:{outline:"auto"}})),X=x.forwardRef(function(e,n){const s=U({props:e,name:"MuiLink"}),{className:r,color:t="primary",component:c="a",onBlur:u,onFocus:p,TypographyClasses:C,underline:k="always",variant:d="inherit",sx:l}=s,F=_(s,J),{isFocusVisibleRef:f,onBlur:V,onFocus:L,ref:R}=z(),[v,b]=x.useState(!1),D=W(n,R),T=i=>{V(i),f.current===!1&&b(!1),u&&u(i)},A=i=>{L(i),f.current===!0&&b(!0),p&&p(i)},m=a({},s,{color:t,component:c,focusVisible:v,underline:k,variant:d}),B=K(m);return E.jsx(Q,a({color:t,className:H(B.root,r),classes:C,component:c,onBlur:T,onFocus:A,ref:D,ownerState:m,variant:d,sx:[...Object.keys(g).includes(t)?[]:[{color:t}],...Array.isArray(l)?l:[l]]},F))});export{X as L};