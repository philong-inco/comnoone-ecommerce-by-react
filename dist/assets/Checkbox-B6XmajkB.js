import{q as h,j as t,N as P,L as y,Q as B,a0 as M,a4 as g,U as l,K as n,a1 as _,r as u,W as R,_ as S,X as H,Y as U}from"./index-BIssY3ES.js";const E=h(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),L=h(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),N=h(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function O(o){return y("MuiCheckbox",o)}const x=P("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),V=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:c,color:s,size:r}=o,a={root:["root",c&&"indeterminate",`color${l(s)}`,`size${l(r)}`]},d=U(a,O,e);return n({},e,d)},W=B(M,{shouldForwardProp:o=>g(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:c}=o;return[e.root,c.indeterminate&&e.indeterminate,e[`size${l(c.size)}`],c.color!=="default"&&e[`color${l(c.color)}`]]}})(({theme:o,ownerState:e})=>n({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette[e.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:_(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${x.checked}, &.${x.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${x.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),q=t.jsx(L,{}),D=t.jsx(E,{}),K=t.jsx(N,{}),X=u.forwardRef(function(e,c){var s,r;const a=R({props:e,name:"MuiCheckbox"}),{checkedIcon:d=q,color:z="primary",icon:b=D,indeterminate:i=!1,indeterminateIcon:m=K,inputProps:I,size:p="medium",className:$}=a,j=S(a,V),C=i?m:b,k=i?m:d,v=n({},a,{color:z,indeterminate:i,size:p}),f=F(v);return t.jsx(W,n({type:"checkbox",inputProps:n({"data-indeterminate":i},I),icon:u.cloneElement(C,{fontSize:(s=C.props.fontSize)!=null?s:p}),checkedIcon:u.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:p}),ownerState:v,ref:c,className:H(f.root,$)},j,{classes:f}))});export{X as C};