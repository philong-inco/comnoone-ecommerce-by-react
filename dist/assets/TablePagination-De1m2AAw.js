import{r as z,_ as J,ar as st,h as F,j as e,K as s,N as nt,L as at,Q as P,as as lt,o as it,W as rt,at as Y,X as D,au as ct,av as ut,Y as pt}from"./index-DkjfH3Nj.js";import{K as dt,a as bt}from"./KeyboardArrowRight-BY8qYOjh.js";import{F as gt,L as Bt}from"./LastPage-CMxtDi2C.js";import{T as G}from"./TableCell-BUbxn9S2.js";import{M as mt}from"./MenuItem-B1FZ8Sxq.js";const Pt=["backIconButtonProps","count","disabled","getItemAriaLabel","nextIconButtonProps","onPageChange","page","rowsPerPage","showFirstButton","showLastButton","slots","slotProps"],ht=z.forwardRef(function(o,B){var R,h,y,$,k,M,x,u;const{backIconButtonProps:_,count:I,disabled:f=!1,getItemAriaLabel:p,nextIconButtonProps:H,onPageChange:v,page:a,rowsPerPage:b,showFirstButton:g,showLastButton:L,slots:d={},slotProps:n={}}=o,K=J(o,Pt),l=st(),U=m=>{v(m,0)},E=m=>{v(m,a-1)},T=m=>{v(m,a+1)},i=m=>{v(m,Math.max(0,Math.ceil(I/b)-1))},r=(R=d.firstButton)!=null?R:F,w=(h=d.lastButton)!=null?h:F,S=(y=d.nextButton)!=null?y:F,N=($=d.previousButton)!=null?$:F,C=(k=d.firstButtonIcon)!=null?k:gt,A=(M=d.lastButtonIcon)!=null?M:Bt,c=(x=d.nextButtonIcon)!=null?x:dt,W=(u=d.previousButtonIcon)!=null?u:bt,V=l?w:r,Z=l?S:N,O=l?N:S,tt=l?r:w,ot=l?n.lastButton:n.firstButton,Q=l?n.nextButton:n.previousButton,X=l?n.previousButton:n.nextButton,et=l?n.firstButton:n.lastButton;return e.jsxs("div",s({ref:B},K,{children:[g&&e.jsx(V,s({onClick:U,disabled:f||a===0,"aria-label":p("first",a),title:p("first",a)},ot,{children:l?e.jsx(A,s({},n.lastButtonIcon)):e.jsx(C,s({},n.firstButtonIcon))})),e.jsx(Z,s({onClick:E,disabled:f||a===0,color:"inherit","aria-label":p("previous",a),title:p("previous",a)},Q??_,{children:l?e.jsx(c,s({},n.nextButtonIcon)):e.jsx(W,s({},n.previousButtonIcon))})),e.jsx(O,s({onClick:T,disabled:f||(I!==-1?a>=Math.ceil(I/b)-1:!1),color:"inherit","aria-label":p("next",a),title:p("next",a)},X??H,{children:l?e.jsx(W,s({},n.previousButtonIcon)):e.jsx(c,s({},n.nextButtonIcon))})),L&&e.jsx(tt,s({onClick:i,disabled:f||a>=Math.ceil(I/b)-1,"aria-label":p("last",a),title:p("last",a)},et,{children:l?e.jsx(C,s({},n.firstButtonIcon)):e.jsx(A,s({},n.lastButtonIcon))}))]}))});function xt(t){return at("MuiTablePagination",t)}const j=nt("MuiTablePagination",["root","toolbar","spacer","selectLabel","selectRoot","select","selectIcon","input","menuItem","displayedRows","actions"]);var q;const It=["ActionsComponent","backIconButtonProps","className","colSpan","component","count","disabled","getItemAriaLabel","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","onPageChange","onRowsPerPageChange","page","rowsPerPage","rowsPerPageOptions","SelectProps","showFirstButton","showLastButton","slotProps","slots"],ft=P(G,{name:"MuiTablePagination",slot:"Root",overridesResolver:(t,o)=>o.root})(({theme:t})=>({overflow:"auto",color:(t.vars||t).palette.text.primary,fontSize:t.typography.pxToRem(14),"&:last-child":{padding:0}})),vt=P(lt,{name:"MuiTablePagination",slot:"Toolbar",overridesResolver:(t,o)=>s({[`& .${j.actions}`]:o.actions},o.toolbar)})(({theme:t})=>({minHeight:52,paddingRight:2,[`${t.breakpoints.up("xs")} and (orientation: landscape)`]:{minHeight:52},[t.breakpoints.up("sm")]:{minHeight:52,paddingRight:2},[`& .${j.actions}`]:{flexShrink:0,marginLeft:20}})),Rt=P("div",{name:"MuiTablePagination",slot:"Spacer",overridesResolver:(t,o)=>o.spacer})({flex:"1 1 100%"}),Lt=P("p",{name:"MuiTablePagination",slot:"SelectLabel",overridesResolver:(t,o)=>o.selectLabel})(({theme:t})=>s({},t.typography.body2,{flexShrink:0})),Tt=P(it,{name:"MuiTablePagination",slot:"Select",overridesResolver:(t,o)=>s({[`& .${j.selectIcon}`]:o.selectIcon,[`& .${j.select}`]:o.select},o.input,o.selectRoot)})({color:"inherit",fontSize:"inherit",flexShrink:0,marginRight:32,marginLeft:8,[`& .${j.select}`]:{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"}}),wt=P(mt,{name:"MuiTablePagination",slot:"MenuItem",overridesResolver:(t,o)=>o.menuItem})({}),St=P("p",{name:"MuiTablePagination",slot:"DisplayedRows",overridesResolver:(t,o)=>o.displayedRows})(({theme:t})=>s({},t.typography.body2,{flexShrink:0}));function Ct({from:t,to:o,count:B}){return`${t}–${o} of ${B!==-1?B:`more than ${o}`}`}function jt(t){return`Go to ${t} page`}const yt=t=>{const{classes:o}=t;return pt({root:["root"],toolbar:["toolbar"],spacer:["spacer"],selectLabel:["selectLabel"],select:["select"],input:["input"],selectIcon:["selectIcon"],menuItem:["menuItem"],displayedRows:["displayedRows"],actions:["actions"]},xt,o)},At=z.forwardRef(function(o,B){var R;const h=rt({props:o,name:"MuiTablePagination"}),{ActionsComponent:y=ht,backIconButtonProps:$,className:k,colSpan:M,component:x=G,count:u,disabled:_=!1,getItemAriaLabel:I=jt,labelDisplayedRows:f=Ct,labelRowsPerPage:p="Rows per page:",nextIconButtonProps:H,onPageChange:v,onRowsPerPageChange:a,page:b,rowsPerPage:g,rowsPerPageOptions:L=[10,25,50,100],SelectProps:d={},showFirstButton:n=!1,showLastButton:K=!1,slotProps:l={},slots:U={}}=h,E=J(h,It),T=h,i=yt(T),r=(R=l==null?void 0:l.select)!=null?R:d,w=r.native?"option":wt;let S;(x===G||x==="td")&&(S=M||1e3);const N=Y(r.id),C=Y(r.labelId),A=()=>u===-1?(b+1)*g:g===-1?u:Math.min(u,(b+1)*g);return e.jsx(ft,s({colSpan:S,ref:B,as:x,ownerState:T,className:D(i.root,k)},E,{children:e.jsxs(vt,{className:i.toolbar,children:[e.jsx(Rt,{className:i.spacer}),L.length>1&&e.jsx(Lt,{className:i.selectLabel,id:C,children:p}),L.length>1&&e.jsx(Tt,s({variant:"standard"},!r.variant&&{input:q||(q=e.jsx(ct,{}))},{value:g,onChange:a,id:N,labelId:C},r,{classes:s({},r.classes,{root:D(i.input,i.selectRoot,(r.classes||{}).root),select:D(i.select,(r.classes||{}).select),icon:D(i.selectIcon,(r.classes||{}).icon)}),disabled:_,children:L.map(c=>z.createElement(w,s({},!ut(w)&&{ownerState:T},{className:i.menuItem,key:c.label?c.label:c,value:c.value?c.value:c}),c.label?c.label:c))})),e.jsx(St,{className:i.displayedRows,children:f({from:u===0?0:b*g+1,to:A(),count:u===-1?-1:u,page:b})}),e.jsx(y,{className:i.actions,backIconButtonProps:$,count:u,nextIconButtonProps:H,onPageChange:v,page:b,rowsPerPage:g,showFirstButton:n,showLastButton:K,slotProps:l.actions,slots:U.actions,getItemAriaLabel:I,disabled:_})]})}))});export{At as T,j as t};
