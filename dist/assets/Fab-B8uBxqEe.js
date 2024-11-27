import{J as z,H as F,L as R,V as k,W as y,N as n,y as i,r as w,Q as N,_ as V,j as $,R as g,U as W}from"./index-C3AKKGhn.js";function _(o){return F("MuiFab",o)}const v=z("MuiFab",["root","primary","secondary","extended","circular","focusVisible","disabled","colorInherit","sizeSmall","sizeMedium","sizeLarge","info","error","warning","success"]),I=["children","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"],M=o=>{const{color:a,variant:s,classes:r,size:l}=o,t={root:["root",s,`size${n(l)}`,a==="inherit"?"colorInherit":a]},e=W(t,_,r);return i({},r,e)},U=R(k,{name:"MuiFab",slot:"Root",shouldForwardProp:o=>y(o)||o==="classes",overridesResolver:(o,a)=>{const{ownerState:s}=o;return[a.root,a[s.variant],a[`size${n(s.size)}`],s.color==="inherit"&&a.colorInherit,a[n(s.size)],a[s.color]]}})(({theme:o,ownerState:a})=>{var s,r;return i({},o.typography.button,{minHeight:36,transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,zIndex:(o.vars||o).zIndex.fab,boxShadow:(o.vars||o).shadows[6],"&:active":{boxShadow:(o.vars||o).shadows[12]},color:o.vars?o.vars.palette.text.primary:(s=(r=o.palette).getContrastText)==null?void 0:s.call(r,o.palette.grey[300]),backgroundColor:(o.vars||o).palette.grey[300],"&:hover":{backgroundColor:(o.vars||o).palette.grey.A100,"@media (hover: none)":{backgroundColor:(o.vars||o).palette.grey[300]},textDecoration:"none"},[`&.${v.focusVisible}`]:{boxShadow:(o.vars||o).shadows[6]}},a.size==="small"&&{width:40,height:40},a.size==="medium"&&{width:48,height:48},a.variant==="extended"&&{borderRadius:48/2,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48},a.variant==="extended"&&a.size==="small"&&{width:"auto",padding:"0 8px",borderRadius:34/2,minWidth:34,height:34},a.variant==="extended"&&a.size==="medium"&&{width:"auto",padding:"0 16px",borderRadius:40/2,minWidth:40,height:40},a.color==="inherit"&&{color:"inherit"})},({theme:o,ownerState:a})=>i({},a.color!=="inherit"&&a.color!=="default"&&(o.vars||o).palette[a.color]!=null&&{color:(o.vars||o).palette[a.color].contrastText,backgroundColor:(o.vars||o).palette[a.color].main,"&:hover":{backgroundColor:(o.vars||o).palette[a.color].dark,"@media (hover: none)":{backgroundColor:(o.vars||o).palette[a.color].main}}}),({theme:o})=>({[`&.${v.disabled}`]:{color:(o.vars||o).palette.action.disabled,boxShadow:(o.vars||o).shadows[0],backgroundColor:(o.vars||o).palette.action.disabledBackground}})),P=w.forwardRef(function(a,s){const r=N({props:a,name:"MuiFab"}),{children:l,className:t,color:e="default",component:c="button",disabled:u=!1,disableFocusRipple:p=!1,focusVisibleClassName:x,size:h="large",variant:f="circular"}=r,C=V(r,I),b=i({},r,{color:e,component:c,disabled:u,disableFocusRipple:p,size:h,variant:f}),d=M(b);return $.jsx(U,i({className:g(d.root,t),component:c,disabled:u,focusRipple:!p,focusVisibleClassName:g(d.focusVisible,x),ownerState:b,ref:s},C,{classes:d,children:l}))});export{P as F};
