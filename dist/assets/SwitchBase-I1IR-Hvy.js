import{H,J,L as F,V,y as d,W as $,r as A,_ as D,a6 as G,ad as K,j as x,R as M,N as Q,U as T}from"./index-lZI9Axgt.js";function X(e){return H("PrivateSwitchBase",e)}J("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Y=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Z=e=>{const{classes:o,checked:i,disabled:l,edge:a}=e,r={root:["root",i&&"checked",l&&"disabled",a&&`edge${Q(a)}`],input:["input"]};return T(r,X,o)},ee=F(V)(({ownerState:e})=>d({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),se=F("input",{shouldForwardProp:$})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),oe=A.forwardRef(function(o,i){const{autoFocus:l,checked:a,checkedIcon:r,className:y,defaultChecked:h,disabled:R,disableFocusRipple:p=!1,edge:w=!1,icon:P,id:S,inputProps:I,inputRef:v,name:j,onBlur:f,onChange:g,onFocus:m,readOnly:N,required:U=!1,tabIndex:z,type:c,value:b}=o,E=D(o,Y),[k,L]=G({controlled:a,default:!!h,name:"SwitchBase",state:"checked"}),t=K(),_=s=>{m&&m(s),t&&t.onFocus&&t.onFocus(s)},q=s=>{f&&f(s),t&&t.onBlur&&t.onBlur(s)},O=s=>{if(s.nativeEvent.defaultPrevented)return;const C=s.target.checked;L(C),g&&g(s,C)};let n=R;t&&typeof n>"u"&&(n=t.disabled);const W=c==="checkbox"||c==="radio",u=d({},o,{checked:k,disabled:n,disableFocusRipple:p,edge:w}),B=Z(u);return x.jsxs(ee,d({component:"span",className:M(B.root,y),centerRipple:!0,focusRipple:!p,disabled:n,tabIndex:null,role:void 0,onFocus:_,onBlur:q,ownerState:u,ref:i},E,{children:[x.jsx(se,d({autoFocus:l,checked:a,defaultChecked:h,className:B.input,disabled:n,id:W?S:void 0,name:j,onChange:O,readOnly:N,ref:v,required:U,ownerState:u,tabIndex:z,type:c},c==="checkbox"&&b===void 0?{}:{value:b},I)),k?r:P]}))});export{oe as S};