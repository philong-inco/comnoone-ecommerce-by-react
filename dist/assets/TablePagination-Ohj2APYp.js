import{r as K,c as X,m as st,I as F,j as e,e as s,k as nt,i as at,s as P,aG as lt,ad as it,ag as rt,y as Q,o as D,ar as ct,aH as ut,p as pt}from"./index-DvRT1fKX.js";import{K as dt,a as gt}from"./KeyboardArrowRight-DAqSVft9.js";import{F as bt,L as Bt}from"./LastPage-NB82S8Aw.js";import{T as z}from"./TableCell-D2O8ZgxM.js";import{M as mt}from"./MenuItem-CG6DnP3x.js";const Pt=["backIconButtonProps","count","disabled","getItemAriaLabel","nextIconButtonProps","onPageChange","page","rowsPerPage","showFirstButton","showLastButton","slots","slotProps"],ht=K.forwardRef(function(o,B){var R,h,j,k,$,M,x,u;const{backIconButtonProps:_,count:I,disabled:f=!1,getItemAriaLabel:p,nextIconButtonProps:H,onPageChange:v,page:a,rowsPerPage:g,showFirstButton:b,showLastButton:L,slots:d={},slotProps:n={}}=o,U=X(o,Pt),l=st(),E=m=>{v(m,0)},G=m=>{v(m,a-1)},T=m=>{v(m,a+1)},i=m=>{v(m,Math.max(0,Math.ceil(I/g)-1))},r=(R=d.firstButton)!=null?R:F,w=(h=d.lastButton)!=null?h:F,S=(j=d.nextButton)!=null?j:F,A=(k=d.previousButton)!=null?k:F,C=($=d.firstButtonIcon)!=null?$:bt,N=(M=d.lastButtonIcon)!=null?M:Bt,c=(x=d.nextButtonIcon)!=null?x:dt,W=(u=d.previousButtonIcon)!=null?u:gt,Y=l?w:r,Z=l?S:A,O=l?A:S,tt=l?r:w,ot=l?n.lastButton:n.firstButton,q=l?n.nextButton:n.previousButton,J=l?n.previousButton:n.nextButton,et=l?n.firstButton:n.lastButton;return e.jsxs("div",s({ref:B},U,{children:[b&&e.jsx(Y,s({onClick:E,disabled:f||a===0,"aria-label":p("first",a),title:p("first",a)},ot,{children:l?e.jsx(N,s({},n.lastButtonIcon)):e.jsx(C,s({},n.firstButtonIcon))})),e.jsx(Z,s({onClick:G,disabled:f||a===0,color:"inherit","aria-label":p("previous",a),title:p("previous",a)},q??_,{children:l?e.jsx(c,s({},n.nextButtonIcon)):e.jsx(W,s({},n.previousButtonIcon))})),e.jsx(O,s({onClick:T,disabled:f||(I!==-1?a>=Math.ceil(I/g)-1:!1),color:"inherit","aria-label":p("next",a),title:p("next",a)},J??H,{children:l?e.jsx(W,s({},n.previousButtonIcon)):e.jsx(c,s({},n.nextButtonIcon))})),L&&e.jsx(tt,s({onClick:i,disabled:f||a>=Math.ceil(I/g)-1,"aria-label":p("last",a),title:p("last",a)},et,{children:l?e.jsx(C,s({},n.firstButtonIcon)):e.jsx(N,s({},n.lastButtonIcon))}))]}))});function xt(t){return at("MuiTablePagination",t)}const y=nt("MuiTablePagination",["root","toolbar","spacer","selectLabel","selectRoot","select","selectIcon","input","menuItem","displayedRows","actions"]);var V;const It=["ActionsComponent","backIconButtonProps","className","colSpan","component","count","disabled","getItemAriaLabel","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","onPageChange","onRowsPerPageChange","page","rowsPerPage","rowsPerPageOptions","SelectProps","showFirstButton","showLastButton","slotProps","slots"],ft=P(z,{name:"MuiTablePagination",slot:"Root",overridesResolver:(t,o)=>o.root})(({theme:t})=>({overflow:"auto",color:(t.vars||t).palette.text.primary,fontSize:t.typography.pxToRem(14),"&:last-child":{padding:0}})),vt=P(lt,{name:"MuiTablePagination",slot:"Toolbar",overridesResolver:(t,o)=>s({[`& .${y.actions}`]:o.actions},o.toolbar)})(({theme:t})=>({minHeight:52,paddingRight:2,[`${t.breakpoints.up("xs")} and (orientation: landscape)`]:{minHeight:52},[t.breakpoints.up("sm")]:{minHeight:52,paddingRight:2},[`& .${y.actions}`]:{flexShrink:0,marginLeft:20}})),Rt=P("div",{name:"MuiTablePagination",slot:"Spacer",overridesResolver:(t,o)=>o.spacer})({flex:"1 1 100%"}),Lt=P("p",{name:"MuiTablePagination",slot:"SelectLabel",overridesResolver:(t,o)=>o.selectLabel})(({theme:t})=>s({},t.typography.body2,{flexShrink:0})),Tt=P(it,{name:"MuiTablePagination",slot:"Select",overridesResolver:(t,o)=>s({[`& .${y.selectIcon}`]:o.selectIcon,[`& .${y.select}`]:o.select},o.input,o.selectRoot)})({color:"inherit",fontSize:"inherit",flexShrink:0,marginRight:32,marginLeft:8,[`& .${y.select}`]:{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"}}),wt=P(mt,{name:"MuiTablePagination",slot:"MenuItem",overridesResolver:(t,o)=>o.menuItem})({}),St=P("p",{name:"MuiTablePagination",slot:"DisplayedRows",overridesResolver:(t,o)=>o.displayedRows})(({theme:t})=>s({},t.typography.body2,{flexShrink:0}));function Ct({from:t,to:o,count:B}){return`${t}–${o} of ${B!==-1?B:`more than ${o}`}`}function yt(t){return`Go to ${t} page`}const jt=t=>{const{classes:o}=t;return pt({root:["root"],toolbar:["toolbar"],spacer:["spacer"],selectLabel:["selectLabel"],select:["select"],input:["input"],selectIcon:["selectIcon"],menuItem:["menuItem"],displayedRows:["displayedRows"],actions:["actions"]},xt,o)},Nt=K.forwardRef(function(o,B){var R;const h=rt({props:o,name:"MuiTablePagination"}),{ActionsComponent:j=ht,backIconButtonProps:k,className:$,colSpan:M,component:x=z,count:u,disabled:_=!1,getItemAriaLabel:I=yt,labelDisplayedRows:f=Ct,labelRowsPerPage:p="Rows per page:",nextIconButtonProps:H,onPageChange:v,onRowsPerPageChange:a,page:g,rowsPerPage:b,rowsPerPageOptions:L=[10,25,50,100],SelectProps:d={},showFirstButton:n=!1,showLastButton:U=!1,slotProps:l={},slots:E={}}=h,G=X(h,It),T=h,i=jt(T),r=(R=l==null?void 0:l.select)!=null?R:d,w=r.native?"option":wt;let S;(x===z||x==="td")&&(S=M||1e3);const A=Q(r.id),C=Q(r.labelId),N=()=>u===-1?(g+1)*b:b===-1?u:Math.min(u,(g+1)*b);return e.jsx(ft,s({colSpan:S,ref:B,as:x,ownerState:T,className:D(i.root,$)},G,{children:e.jsxs(vt,{className:i.toolbar,children:[e.jsx(Rt,{className:i.spacer}),L.length>1&&e.jsx(Lt,{className:i.selectLabel,id:C,children:p}),L.length>1&&e.jsx(Tt,s({variant:"standard"},!r.variant&&{input:V||(V=e.jsx(ct,{}))},{value:b,onChange:a,id:A,labelId:C},r,{classes:s({},r.classes,{root:D(i.input,i.selectRoot,(r.classes||{}).root),select:D(i.select,(r.classes||{}).select),icon:D(i.selectIcon,(r.classes||{}).icon)}),disabled:_,children:L.map(c=>K.createElement(w,s({},!ut(w)&&{ownerState:T},{className:i.menuItem,key:c.label?c.label:c,value:c.value?c.value:c}),c.label?c.label:c))})),e.jsx(St,{className:i.displayedRows,children:f({from:u===0?0:g*b+1,to:N(),count:u===-1?-1:u,page:g})}),e.jsx(j,{className:i.actions,backIconButtonProps:k,count:u,nextIconButtonProps:H,onPageChange:v,page:g,rowsPerPage:b,showFirstButton:n,showLastButton:U,slotProps:l.actions,slots:E.actions,getItemAriaLabel:I,disabled:_})]})}))});export{Nt as T,y as t};