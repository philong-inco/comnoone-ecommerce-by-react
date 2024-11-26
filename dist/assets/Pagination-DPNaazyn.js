import{J as T,H as V,_ as h,a6 as q,y as r,n as E,j as g,L as j,V as K,X as R,r as D,Q as G,a4 as Y,R as U,N as k,U as H}from"./index-BmIX3_3w.js";import{F as W,L as _}from"./LastPage-YRoveXFG.js";function Z(a){return V("MuiPagination",a)}T("MuiPagination",["root","ul","outlined","text"]);const S=["boundaryCount","componentName","count","defaultPage","disabled","hideNextButton","hidePrevButton","onChange","page","showFirstButton","showLastButton","siblingCount"];function w(a={}){const{boundaryCount:t=1,componentName:o="usePagination",count:s=1,defaultPage:v=1,disabled:b=!1,hideNextButton:x=!1,hidePrevButton:n=!1,onChange:d,page:f,showFirstButton:z=!1,showLastButton:B=!1,siblingCount:y=1}=a,l=h(a,S),[e,L]=q({controlled:f,default:v,name:o,state:"page"}),I=(i,P)=>{f||L(P),d&&d(i,P)},p=(i,P)=>{const Q=P-i+1;return Array.from({length:Q},(ua,X)=>i+X)},N=p(1,Math.min(t,s)),u=p(Math.max(s-t+1,t+1),s),O=Math.max(Math.min(e-y,s-t-y*2-1),t+2),$=Math.min(Math.max(e+y,t+y*2+2),u.length>0?u[0]-2:s-1),M=[...z?["first"]:[],...n?[]:["previous"],...N,...O>t+2?["start-ellipsis"]:t+1<s-t?[t+1]:[],...p(O,$),...$<s-t-1?["end-ellipsis"]:s-t>t?[s-t]:[],...u,...x?[]:["next"],...B?["last"]:[]],m=i=>{switch(i){case"first":return 1;case"previous":return e-1;case"next":return e+1;case"last":return s;default:return null}},C=M.map(i=>typeof i=="number"?{onClick:P=>{I(P,i)},type:"page",page:i,selected:i===e,disabled:b,"aria-current":i===e?"true":void 0}:{onClick:P=>{I(P,m(i))},type:i,page:m(i),selected:!1,disabled:b||i.indexOf("ellipsis")===-1&&(i==="next"||i==="last"?e>=s:e<=1)});return r({items:C},l)}function aa(a){return V("MuiPaginationItem",a)}const c=T("MuiPaginationItem",["root","page","sizeSmall","sizeLarge","text","textPrimary","textSecondary","outlined","outlinedPrimary","outlinedSecondary","rounded","ellipsis","firstLast","previousNext","focusVisible","disabled","selected","icon","colorPrimary","colorSecondary"]),A=E(g.jsx("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"NavigateBefore"),F=E(g.jsx("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext"),ta=["className","color","component","components","disabled","page","selected","shape","size","slots","type","variant"],J=(a,t)=>{const{ownerState:o}=a;return[t.root,t[o.variant],t[`size${k(o.size)}`],o.variant==="text"&&t[`text${k(o.color)}`],o.variant==="outlined"&&t[`outlined${k(o.color)}`],o.shape==="rounded"&&t.rounded,o.type==="page"&&t.page,(o.type==="start-ellipsis"||o.type==="end-ellipsis")&&t.ellipsis,(o.type==="previous"||o.type==="next")&&t.previousNext,(o.type==="first"||o.type==="last")&&t.firstLast]},oa=a=>{const{classes:t,color:o,disabled:s,selected:v,size:b,shape:x,type:n,variant:d}=a,f={root:["root",`size${k(b)}`,d,x,o!=="standard"&&`color${k(o)}`,o!=="standard"&&`${d}${k(o)}`,s&&"disabled",v&&"selected",{page:"page",first:"firstLast",last:"firstLast","start-ellipsis":"ellipsis","end-ellipsis":"ellipsis",previous:"previousNext",next:"previousNext"}[n]],icon:["icon"]};return H(f,aa,t)},sa=j("div",{name:"MuiPaginationItem",slot:"Root",overridesResolver:J})(({theme:a,ownerState:t})=>r({},a.typography.body2,{borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,padding:"0 6px",margin:"0 3px",color:(a.vars||a).palette.text.primary,height:"auto",[`&.${c.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity}},t.size==="small"&&{minWidth:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"},t.size==="large"&&{minWidth:40,borderRadius:40/2,padding:"0 10px",fontSize:a.typography.pxToRem(15)})),ia=j(K,{name:"MuiPaginationItem",slot:"Root",overridesResolver:J})(({theme:a,ownerState:t})=>r({},a.typography.body2,{borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,height:32,padding:"0 6px",margin:"0 3px",color:(a.vars||a).palette.text.primary,[`&.${c.focusVisible}`]:{backgroundColor:(a.vars||a).palette.action.focus},[`&.${c.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity},transition:a.transitions.create(["color","background-color"],{duration:a.transitions.duration.short}),"&:hover":{backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${c.selected}`]:{backgroundColor:(a.vars||a).palette.action.selected,"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.hoverOpacity}))`:R(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(a.vars||a).palette.action.selected}},[`&.${c.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:R(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)},[`&.${c.disabled}`]:{opacity:1,color:(a.vars||a).palette.action.disabled,backgroundColor:(a.vars||a).palette.action.selected}}},t.size==="small"&&{minWidth:26,height:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"},t.size==="large"&&{minWidth:40,height:40,borderRadius:40/2,padding:"0 10px",fontSize:a.typography.pxToRem(15)},t.shape==="rounded"&&{borderRadius:(a.vars||a).shape.borderRadius}),({theme:a,ownerState:t})=>r({},t.variant==="text"&&{[`&.${c.selected}`]:r({},t.color!=="standard"&&{color:(a.vars||a).palette[t.color].contrastText,backgroundColor:(a.vars||a).palette[t.color].main,"&:hover":{backgroundColor:(a.vars||a).palette[t.color].dark,"@media (hover: none)":{backgroundColor:(a.vars||a).palette[t.color].main}},[`&.${c.focusVisible}`]:{backgroundColor:(a.vars||a).palette[t.color].dark}},{[`&.${c.disabled}`]:{color:(a.vars||a).palette.action.disabled}})},t.variant==="outlined"&&{border:a.vars?`1px solid rgba(${a.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${a.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${c.selected}`]:r({},t.color!=="standard"&&{color:(a.vars||a).palette[t.color].main,border:`1px solid ${a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / 0.5)`:R(a.palette[t.color].main,.5)}`,backgroundColor:a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / ${a.vars.palette.action.activatedOpacity})`:R(a.palette[t.color].main,a.palette.action.activatedOpacity),"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / calc(${a.vars.palette.action.activatedOpacity} + ${a.vars.palette.action.focusOpacity}))`:R(a.palette[t.color].main,a.palette.action.activatedOpacity+a.palette.action.focusOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${c.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / calc(${a.vars.palette.action.activatedOpacity} + ${a.vars.palette.action.focusOpacity}))`:R(a.palette[t.color].main,a.palette.action.activatedOpacity+a.palette.action.focusOpacity)}},{[`&.${c.disabled}`]:{borderColor:(a.vars||a).palette.action.disabledBackground,color:(a.vars||a).palette.action.disabled}})})),ea=j("div",{name:"MuiPaginationItem",slot:"Icon",overridesResolver:(a,t)=>t.icon})(({theme:a,ownerState:t})=>r({fontSize:a.typography.pxToRem(20),margin:"0 -8px"},t.size==="small"&&{fontSize:a.typography.pxToRem(18)},t.size==="large"&&{fontSize:a.typography.pxToRem(22)})),na=D.forwardRef(function(t,o){const s=G({props:t,name:"MuiPaginationItem"}),{className:v,color:b="standard",component:x,components:n={},disabled:d=!1,page:f,selected:z=!1,shape:B="circular",size:y="medium",slots:l={},type:e="page",variant:L="text"}=s,I=h(s,ta),p=r({},s,{color:b,disabled:d,selected:z,shape:B,size:y,type:e,variant:L}),N=Y(),u=oa(p),$=(N?{previous:l.next||n.next||F,next:l.previous||n.previous||A,last:l.first||n.first||W,first:l.last||n.last||_}:{previous:l.previous||n.previous||A,next:l.next||n.next||F,first:l.first||n.first||W,last:l.last||n.last||_})[e];return e==="start-ellipsis"||e==="end-ellipsis"?g.jsx(sa,{ref:o,ownerState:p,className:U(u.root,v),children:"…"}):g.jsxs(ia,r({ref:o,ownerState:p,component:x,disabled:d,className:U(u.root,v)},I,{children:[e==="page"&&f,$?g.jsx(ea,{as:$,ownerState:p,className:u.icon}):null]}))}),ra=["boundaryCount","className","color","count","defaultPage","disabled","getItemAriaLabel","hideNextButton","hidePrevButton","onChange","page","renderItem","shape","showFirstButton","showLastButton","siblingCount","size","variant"],la=a=>{const{classes:t,variant:o}=a;return H({root:["root",o],ul:["ul"]},Z,t)},ca=j("nav",{name:"MuiPagination",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:o}=a;return[t.root,t[o.variant]]}})({}),da=j("ul",{name:"MuiPagination",slot:"Ul",overridesResolver:(a,t)=>t.ul})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"});function pa(a,t,o){return a==="page"?`${o?"":"Go to "}page ${t}`:`Go to ${a} page`}const ba=D.forwardRef(function(t,o){const s=G({props:t,name:"MuiPagination"}),{boundaryCount:v=1,className:b,color:x="standard",count:n=1,defaultPage:d=1,disabled:f=!1,getItemAriaLabel:z=pa,hideNextButton:B=!1,hidePrevButton:y=!1,renderItem:l=C=>g.jsx(na,r({},C)),shape:e="circular",showFirstButton:L=!1,showLastButton:I=!1,siblingCount:p=1,size:N="medium",variant:u="text"}=s,O=h(s,ra),{items:$}=w(r({},s,{componentName:"Pagination"})),M=r({},s,{boundaryCount:v,color:x,count:n,defaultPage:d,disabled:f,getItemAriaLabel:z,hideNextButton:B,hidePrevButton:y,renderItem:l,shape:e,showFirstButton:L,showLastButton:I,siblingCount:p,size:N,variant:u}),m=la(M);return g.jsx(ca,r({"aria-label":"pagination navigation",className:U(m.root,b),ownerState:M,ref:o},O,{children:g.jsx(da,{className:m.ul,ownerState:M,children:$.map((C,i)=>g.jsx("li",{children:l(r({},C,{color:x,"aria-label":z(C.type,C.page,C.selected),shape:e,size:N,variant:u}))},i))})}))});export{ba as P};
