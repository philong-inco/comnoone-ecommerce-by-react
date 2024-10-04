import{i as Lt,k as Ut,s as Wt,e as de,r as s,am as Ft,c as Bt,j as t,o as Gt,p as Kt,an as Qe,$ as se,ao as zt,N as te,Z as he,V as $t,ab as P,u as qt,J as Oe,K as _e,ad as ke,ag as Jt,B as Xt,a2 as et,z as tt,I as nt,a4 as Yt,M as Ee,C as Zt,ap as Qt}from"./index-fYug5RY9.js";import{a as en,c as tn,b as nn,D as sn}from"./DialogTitle-DfESKbom.js";import{D as an}from"./DialogContentText-Cd7IkWVj.js";import{T as on,a as cn,b as rn,c as Je,d as ln}from"./TableRow-BYlKwEaj.js";import{T as N}from"./TableCell-D8S_yL8v.js";import{S as un}from"./Switch-ww2Ii2YT.js";import{d as st}from"./Add-Cg9FrFZF.js";import{M as Ae}from"./MenuItem-BoieQS9d.js";import{A as dn}from"./AlertDialogSlide-CK29c8_A.js";import{c as hn}from"./sanPham-Owu7SlO-.js";import{c as pn}from"./chiTietSanPham-D3UBpN_d.js";import{B as Q}from"./react-toastify.esm-BwM67r7P.js";import{N as ee}from"./notification-B40vY8uZ.js";import{A as mn}from"./Autocomplete-boWl3RSk.js";import"./back-end-vuWvP0DO.js";import"./Close-xbaa0MAg.js";function fn(e){return Lt("MuiCardMedia",e)}Ut("MuiCardMedia",["root","media","img"]);const gn=["children","className","component","image","src","style"],xn=e=>{const{classes:n,isMediaComponent:o,isImageComponent:d}=e;return Kt({root:["root",o&&"media",d&&"img"]},fn,n)},Sn=Wt("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:o}=e,{isMediaComponent:d,isImageComponent:a}=o;return[n.root,d&&n.media,a&&n.img]}})(({ownerState:e})=>de({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})),Cn=["video","audio","picture","iframe","img"],bn=["picture","img"],jn=s.forwardRef(function(n,o){const d=Ft({props:n,name:"MuiCardMedia"}),{children:a,className:r,component:l="div",image:f,src:x,style:R}=d,C=Bt(d,gn),S=Cn.indexOf(l)!==-1,b=!S&&f?de({backgroundImage:`url("${f}")`},R):R,h=de({},d,{component:l,isMediaComponent:S,isImageComponent:bn.indexOf(l)!==-1}),g=xn(h);return t.jsx(Sn,de({className:Gt(g.root,r),as:l,role:!S&&f?"img":void 0,ref:o,style:b,ownerState:h,src:S?f||x:void 0},C,{children:a}))});var yn=Qe("check","IconCheck",[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]]),vn=Qe("upload","IconUpload",[["path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",key:"svg-0"}],["path",{d:"M7 9l5 -5l5 5",key:"svg-1"}],["path",{d:"M12 4l0 12",key:"svg-2"}]]),wn={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $=s;function En(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Tn=typeof Object.is=="function"?Object.is:En,Rn=$.useState,Dn=$.useEffect,In=$.useLayoutEffect,Mn=$.useDebugValue;function Nn(e,n){var o=n(),d=Rn({inst:{value:o,getSnapshot:n}}),a=d[0].inst,r=d[1];return In(function(){a.value=o,a.getSnapshot=n,Te(a)&&r({inst:a})},[e,o,n]),Dn(function(){return Te(a)&&r({inst:a}),e(function(){Te(a)&&r({inst:a})})},[e]),Mn(o),o}function Te(e){var n=e.getSnapshot;e=e.value;try{var o=n();return!Tn(e,o)}catch{return!0}}function Pn(e,n){return n()}var Vn=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Pn:Nn;wn.useSyncExternalStore=$.useSyncExternalStore!==void 0?$.useSyncExternalStore:Vn;const U=()=>{},V=U(),Re=Object,_=e=>e===V,z=e=>typeof e=="function",pe=(e,n)=>({...e,...n}),On=e=>z(e.then),re=new WeakMap;let _n=0;const ne=e=>{const n=typeof e,o=e&&e.constructor,d=o==Date;let a,r;if(Re(e)===e&&!d&&o!=RegExp){if(a=re.get(e),a)return a;if(a=++_n+"~",re.set(e,a),o==Array){for(a="@",r=0;r<e.length;r++)a+=ne(e[r])+",";re.set(e,a)}if(o==Re){a="#";const l=Re.keys(e).sort();for(;!_(r=l.pop());)_(e[r])||(a+=r+":"+ne(e[r])+",");re.set(e,a)}}else a=d?e.toJSON():n=="symbol"?e.toString():n=="string"?JSON.stringify(e):""+e;return a},L=new WeakMap,De={},le={},at="undefined",He=typeof window!=at,Me=typeof document!=at,kn=(e,n)=>{const o=L.get(e);return[()=>!_(n)&&e.get(n)||De,d=>{if(!_(n)){const a=e.get(n);n in le||(le[n]=a),o[5](n,pe(a,d),a||De)}},o[6],()=>!_(n)&&n in le?le[n]:!_(n)&&e.get(n)||De]};let Ne=!0;const An=()=>Ne,[Pe,Ve]=He&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[U,U],Hn=()=>{const e=Me&&document.visibilityState;return _(e)||e!=="hidden"},Ln=e=>(Me&&document.addEventListener("visibilitychange",e),Pe("focus",e),()=>{Me&&document.removeEventListener("visibilitychange",e),Ve("focus",e)}),Un=e=>{const n=()=>{Ne=!0,e()},o=()=>{Ne=!1};return Pe("online",n),Pe("offline",o),()=>{Ve("online",n),Ve("offline",o)}},Wn={isOnline:An,isVisible:Hn},Fn={initFocus:Ln,initReconnect:Un};se.useId;const ot=!He||"Deno"in window,Ie=typeof navigator<"u"&&navigator.connection,Xe=!ot&&Ie&&(["slow-2g","2g"].includes(Ie.effectiveType)||Ie.saveData),it=e=>{if(z(e))try{e=e()}catch{e=""}const n=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?ne(e):"",[e,n]};let Bn=0;const Ye=()=>++Bn,Gn=0,Kn=1,zn=2;async function $n(...e){const[n,o,d,a]=e,r=pe({populateCache:!0,throwOnError:!0},typeof a=="boolean"?{revalidate:a}:a||{});let l=r.populateCache;const f=r.rollbackOnError;let x=r.optimisticData;const R=b=>typeof f=="function"?f(b):f!==!1,C=r.throwOnError;if(z(o)){const b=o,h=[],g=n.keys();for(const T of g)!/^\$(inf|sub)\$/.test(T)&&b(n.get(T)._k)&&h.push(T);return Promise.all(h.map(S))}return S(o);async function S(b){const[h]=it(b);if(!h)return;const[g,T]=kn(n,h),[q,W,J,X]=L.get(n),u=()=>{const O=q[h];return(z(r.revalidate)?r.revalidate(g().data,b):r.revalidate!==!1)&&(delete J[h],delete X[h],O&&O[0])?O[0](zn).then(()=>g().data):g().data};if(e.length<3)return u();let c=d,m;const j=Ye();W[h]=[j,0];const w=!_(x),y=g(),D=y.data,I=y._c,k=_(I)?D:I;if(w&&(x=z(x)?x(k,D):x,T({data:x,_c:k})),z(c))try{c=c(k)}catch(O){m=O}if(c&&On(c))if(c=await c.catch(O=>{m=O}),j!==W[h][0]){if(m)throw m;return c}else m&&w&&R(m)&&(l=!0,T({data:k,_c:V}));if(l&&!m)if(z(l)){const O=l(c,k);T({data:O,error:V,_c:V})}else T({data:c,error:V,_c:V});if(W[h][1]=Ye(),Promise.resolve(u()).then(()=>{T({_c:V})}),m){if(C)throw m;return}return c}}const Ze=(e,n)=>{for(const o in e)e[o][0]&&e[o][0](n)},qn=(e,n)=>{if(!L.has(e)){const o=pe(Fn,n),d={},a=$n.bind(V,e);let r=U;const l={},f=(C,S)=>{const b=l[C]||[];return l[C]=b,b.push(S),()=>b.splice(b.indexOf(S),1)},x=(C,S,b)=>{e.set(C,S);const h=l[C];if(h)for(const g of h)g(S,b)},R=()=>{if(!L.has(e)&&(L.set(e,[d,{},{},{},a,x,f]),!ot)){const C=o.initFocus(setTimeout.bind(V,Ze.bind(V,d,Gn))),S=o.initReconnect(setTimeout.bind(V,Ze.bind(V,d,Kn)));r=()=>{C&&C(),S&&S(),L.delete(e)}}};return R(),[e,a,R,r]}return[e,L.get(e)[4]]},Jn=(e,n,o,d,a)=>{const r=o.errorRetryCount,l=a.retryCount,f=~~((Math.random()+.5)*(1<<(l<8?l:8)))*o.errorRetryInterval;!_(r)&&l>r||setTimeout(d,f,a)},Xn=(e,n)=>ne(e)==ne(n),[ct,Yn]=qn(new Map);pe({onLoadingSlow:U,onSuccess:U,onError:U,onErrorRetry:Jn,onDiscarded:U,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:Xe?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:Xe?5e3:3e3,compare:Xn,isPaused:()=>!1,cache:ct,mutate:Yn,fallback:{}},Wn);s.createContext({});const Zn="$inf$",rt=He&&window.__SWR_DEVTOOLS_USE__,Qn=rt?window.__SWR_DEVTOOLS_USE__:[],es=()=>{rt&&(window.__SWR_DEVTOOLS_REACT__=se)},ts=e=>(n,o,d)=>e(n,o&&((...r)=>{const[l]=it(n),[,,,f]=L.get(ct);if(l.startsWith(Zn))return o(...r);const x=f[l];return _(x)?o(...r):(delete f[l],x)}),d);Qn.concat(ts);es();se.use;const ns=se.forwardRef(function(n,o){return t.jsx(zt,{direction:"up",ref:o,...n})});function ss({title:e,message:n,open:o,setOpen:d,serialNumbers:a,setSerialNumbers:r}){const l=()=>{d(!1),r(f)},[f,x]=s.useState({});s.useEffect(()=>{x({...a})},[a]);const R=C=>{const S=C.target.value;console.log("1Seri từ con: ",S),x(b=>({...b,value:S}))};return t.jsx(se.Fragment,{children:t.jsxs(en,{open:o,TransitionComponent:ns,keepMounted:!0,onClose:l,"aria-describedby":"alert-dialog-slide-description",sx:{minHeight:"80%",minWidth:"70%"},children:[t.jsx(tn,{children:e}),t.jsx(nn,{children:t.jsxs(an,{id:"alert-dialog-slide-description",children:[n,t.jsx("br",{}),t.jsx("br",{}),t.jsx(te,{fullWidth:!0,rows:10,value:f.value,onChange:R,id:"serial",label:"Danh sách serial number",multiline:!0,maxRows:10})]})}),t.jsx(sn,{children:t.jsx(he,{color:"secondary",onClick:l,children:"Nhập Serial"})})]})})}const as=({listKeySort:e,variantListFromParent:n,showMessage:o,setResult:d})=>{const[a,r]=s.useState([]),l=(u,c)=>{let m="";for(let j=u;j>=0;j--)m+=c[e[j]].ten;return m},f={},x={};a.forEach((u,c)=>{e.forEach((m,j)=>{const y=`${l(j,u)}`;f[y]===void 0&&(f[y]=0),f[y]++,x[y]===void 0&&(x[y]=c)})}),s.useEffect(()=>{r([]),r([...n])},[n]),s.useEffect(()=>{console.log("variantList:",a)},[a]);const R=u=>c=>{const m=c.target.value.replace(/\D/g,""),j=a.map((w,y)=>y===u?{...w,giaBan:m}:w);r(j)},C=u=>c=>{let m=0;c.target.checked&&(m=1);const j=a.map((w,y)=>y===u?{...w,trangThai:m}:w);r(j)},[S,b]=s.useState(!1),[h,g]=s.useState({index:-1,value:""});s.useEffect(()=>{console.log(h)},[h]);const T=u=>{g(c=>({index:u,value:a[u].serialNumberList.join(",")})),b(!0)},q=async u=>{const c=[];async function m(D){let I=null;try{I=await P.get(`http://localhost:8080/api/serial-number/exist-for-add?ma=${D}`)}catch(k){k.response&&(I=k.response.data)}return console.log(I.data),I.data?(c.push(D),console.log("listSerialExist: ",c),!0):!1}let j=u.value.split(",").map(D=>D.trim());j.length===1&&j[0]===""&&(j=[]);const w=[];console.log("ListValid before: ",w);for(const D of j){const I=await m(D);console.log("Kết quả hàm: ",I),I==!1&&(console.log("vào nè"),w.push(D))}console.log("ListValid after: ",w);const y=a.map((D,I)=>I===u.index?{...D,serialNumberList:w}:D);c.length>0&&o("Đã loại bỏ các serial đã tồn tại sau","Danh sách: "+c.join(",")),r(y)},W=()=>{const u=J();if(console.log("check: ",u),u.check)d(a);else{let c="";u.message!==""&&(c+="Giá không hợp lệ tại dòng "+u.message,c=c.substring(0,c.length-2)),u.isDulicateSeri&&(c+=`
 | Serial Number nhập trong danh sách bị trùng lặp.`),o(c)}},J=()=>{console.log("run validate");let u={check:!0,message:"",seriVuaNhap:[],isDulicateSeri:!1},c=[];return a.forEach((m,j)=>{(m.giaBan===""||isNaN(m.giaBan)||parseFloat(m.giaBan)<=0)&&(u.check=!1,u.message+=j+1+", "),Array.isArray(m.serialNumberList)?console.log("...item.serialNumberList: ",m.serialNumberList):console.log("k phải array"),c=[...c,...m.serialNumberList]}),console.log("seriVuaNhap ",c),new Set(c).size!=c.length&&(u.check=!1,u.isDulicateSeri=!0),u};function X(u,c="vi-VN",m="VND"){return new Intl.NumberFormat(c,{style:"decimal",currency:m}).format(u)}return t.jsxs("div",{children:[t.jsx(on,{component:$t,children:t.jsxs(cn,{children:[t.jsx(rn,{children:t.jsxs(Je,{children:[t.jsx(N,{children:"STT"}),e.map(u=>u==="RAM"&&t.jsx(N,{children:"Ram"},"ram")||u==="CPU"&&t.jsx(N,{children:"Cpu"},"cpu")||u==="oCung"&&t.jsx(N,{children:"Ổ cứng"},"oCung")||u==="mauSac"&&t.jsx(N,{children:"Màu sắc"},"mauSac")),t.jsx(N,{children:"Số lượng"}),t.jsx(N,{children:"Giá bán"}),t.jsx(N,{children:"Hành động"})]})}),t.jsx(ln,{children:a.map((u,c)=>t.jsx(t.Fragment,{children:t.jsxs(Je,{children:[t.jsx(N,{children:c+1}),e.map((m,j)=>{const y=`${l(j,u)}`;return x[y]===c?t.jsx(N,{rowSpan:f[y],children:u[e[j]].ten},m):null}),t.jsx(N,{children:u.serialNumberList.length}),t.jsx(N,{children:t.jsx(te,{value:X(u.giaBan),onChange:R(c),label:"Giá bán",variant:"standard",fullWidth:!0,color:"secondary"})}),t.jsx(N,{children:t.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[t.jsx(vn,{onClick:()=>T(c),style:{color:"#2195F2",fontSize:"20px",backgroundColor:"#bbedfc",borderRadius:"7px",padding:"5px",cursor:"pointer"}}),t.jsx(un,{onChange:C(c),defaultChecked:u.trangThai===1,color:"secondary"})]})})]},c)}))})]})}),t.jsx(he,{color:"secondary",onClick:W,children:"Xác nhận"}),t.jsx("div",{children:t.jsx(ss,{open:S,setOpen:b,title:"Nhập serial number cho biến thể",message:"Hãy phân cách các serial bằng dấu phẩy (,)",serialNumbers:h,setSerialNumbers:q})})]})},ue=({list:e,setListChecked:n,nameDropDown:o})=>{const r={PaperProps:{style:{maxHeight:224,width:150}}};function l(h,g,T){return{fontWeight:g.indexOf(h)===-1?T.typography.fontWeightRegular:T.typography.fontWeightMedium}}const f=qt();s.useState([]);const[x,R]=s.useState([]),[C,S]=s.useState([]);s.useEffect(()=>{const h=C.map(g=>g);n(h),R(C.map(g=>g.ten))},[C]);const b=h=>{const{value:g}=h.target;S(g)};return t.jsx("div",{children:t.jsxs(Oe,{sx:{width:220},children:[t.jsx(_e,{id:"demo-multiple-chip-label",color:"secondary",children:o}),t.jsx(ke,{labelId:"demo-multiple-chip-label",id:"demo-multiple-chip",color:"secondary",multiple:!0,sx:{minHeight:"62.9px"},value:C,onChange:b,input:t.jsx(Jt,{id:"select-multiple-chip",label:"Chip"}),renderValue:h=>t.jsx(Xt,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:h.map(g=>t.jsx(et,{label:g.ten,sx:{backgroundColor:"#EDE7F6"}},g.id))}),endAdornment:t.jsx(tt,{style:{marginRight:"10px"},position:"end",children:t.jsx(nt,{children:t.jsx(st,{})})}),MenuProps:r,children:e.map(h=>t.jsx(Ae,{value:h,style:l(h.ten,C.map(g=>g.ten),f),children:h.ten},h.id))})]})})},K=({list:e,setValueSelect:n,name:o})=>{const[d,a]=s.useState({});s.useEffect(()=>{n(d.id)},[d]);const r=l=>{a(l.target.value)};return t.jsxs(Oe,{required:!0,sx:{m:1,width:"23.4%"},children:[t.jsx(_e,{id:"demo-simple-select-required-label",color:"secondary",children:o}),t.jsx(ke,{labelId:"demo-simple-select-required-label",id:"demo-simple-select-required",color:"secondary",value:d,label:o,onChange:r,sx:{minHeight:"62.9px"},renderValue:l=>Object.keys(l).length>0?t.jsx(et,{sx:{backgroundColor:"#EDE7F6"},label:l.ten},l.id):null,endAdornment:t.jsx(tt,{style:{marginRight:"10px"},position:"end",children:t.jsx(nt,{children:t.jsx(st,{})})}),children:e.map(l=>t.jsx(Ae,{value:l,children:l.ten},l.id))})]})},os=({setUrlImages:e,showMessage:n})=>{const o=s.useRef(),d=s.useRef();s.useEffect(()=>{o.current=window.cloudinary,d.current=o.current.createUploadWidget({cloudName:"dse71o3zv",uploadPreset:"demo_shop"},function(r,l){if(!r&&l&&l.event==="success"){let f={colorId:0,url:l.info.secure_url};e(x=>[...x,f])}})},[e]);const a=()=>{d.current.open()};return t.jsx(he,{onClick:a,children:"Tải ảnh"})},ys=()=>{const e=Yt(),[n,o]=s.useState(!1),[d,a]=s.useState(""),[r,l]=s.useState(""),[f,x]=s.useState(["https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg","https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"]),[R,C]=s.useState([]),[S,b]=s.useState([]),[h,g]=s.useState([]),[T,q]=s.useState([]),[W,J]=s.useState([]),[X,u]=s.useState([]),[c,m]=s.useState([]),[j,w]=s.useState([]),[y,D]=s.useState([]),[I,k]=s.useState([]),[O,Le]=s.useState([]),[lt,ut]=s.useState([]),[ae,dt]=s.useState(""),[oe,ht]=s.useState(""),[Ue,pt]=s.useState([]),[F,mt]=s.useState([]),[We,ft]=s.useState([]),[Fe,gt]=s.useState([]),[me,xt]=s.useState(""),[fe,St]=s.useState(""),[ge,Ct]=s.useState(""),[xe,bt]=s.useState(""),[Se,jt]=s.useState(""),[Be,yt]=s.useState(""),[Ge,vt]=s.useState(""),[wt,Ke]=s.useState(!0);s.useEffect(()=>{Et()},[]);const Et=async()=>{const i=await P.get("http://localhost:8080/api/san-pham/all-list-active"),p=await P.get("http://localhost:8080/api/nhu-cau/all-list-active"),v=await P.get("http://localhost:8080/api/thuong-hieu/all-list-active"),E=await P.get("http://localhost:8080/api/ram/all-list-active"),M=await P.get("http://localhost:8080/api/mau-sac/all-list-active"),H=await P.get("http://localhost:8080/api/cpu/all-list-active"),Ce=await P.get("http://localhost:8080/api/vga/all-list-active"),be=await P.get("http://localhost:8080/api/webcam/all-list-active"),je=await P.get("http://localhost:8080/api/o-cung/all-list-active"),ye=await P.get("http://localhost:8080/api/man-hinh/all-list-active"),ve=await P.get("http://localhost:8080/api/he-dieu-hanh/all-list-active"),we=await P.get("http://localhost:8080/api/ban-phim/all-list-active");C(i.data.data),b(p.data.data),g(v.data.data),q(E.data.data),J(M.data.data),u(H.data.data),m(Ce.data.data),w(be.data.data),D(je.data.data),k(ye.data.data),Le(ve.data.data),ut(we.data.data)},[ie,ze]=s.useState([]),[B,Y]=s.useState({}),[A,Tt]=s.useState([]),[Z,Rt]=s.useState([]);s.useEffect(()=>{let i=!0;(me===""||Ge===""||Be===""||Se===""||xe===""||ge===""||fe===""||ae===""||oe==="")&&(i=!1,ce("Hãy nhập thông tin sản phẩm")),i==!0&&Z.length>0&&_t(),console.log("resultVariant truyền lên cha: ",Z)},[Z]),s.useEffect(()=>{if(Object.keys(B).length>0){const p=Object.keys(B);p.sort((E,M)=>B[E].length-B[M].length);const v=p.filter(E=>E!=="mauSac");v.push("mauSac"),console.log("Key sau khi đổi chỗ: ",v),Tt(v)}},[B]);const[Dt,It]=s.useState([]);s.useEffect(()=>{console.log("Giá trị selectedKey: ",A),A.length===4?($e(0,Mt),It(A)):A.length!==4&&A.length!==0&&ce("Thiếu thông tin để tạo biến thể","Vui lòng chọn đủ 4 thuộc tính Ram, Cpu, Ổ cứng, màu sắc")},[A]),s.useEffect(()=>{f.length>=F.length*3&&Ke(!1),console.log("urlImages: ",f)},[f]),s.useEffect(()=>{F.length>0&&Ke(!0)},[F]);const[Mt,G]=s.useState({giaBan:"",trangThai:1,RAM:null,CPU:null,oCung:null,mauSac:null,banPhim:null,manHinh:null,VGA:null,heDieuHanh:null,webcam:null,serialNumberList:[],anhSanPham:[]});s.useState({ten:"",moTa:"",trangThai:"",nhuCauId:"",thuongHieuId:""}),s.useEffect(()=>{G(i=>({...i,VGA:me}))},[me]),s.useEffect(()=>{G(i=>({...i,heDieuHanh:xe}))},[xe]),s.useEffect(()=>{G(i=>({...i,webcam:fe}))},[fe]),s.useEffect(()=>{G(i=>({...i,manHinh:ge}))},[ge]),s.useEffect(()=>{G(i=>({...i,banPhim:Se}))},[Se]),s.useEffect(()=>{G(i=>({...i,thuongHieu:oe}))},[oe]),s.useEffect(()=>{G(i=>({...i,nhuCau:ae}))},[ae]);const Nt=()=>{Y({}),ze([]),Ue.length>0&&Y(i=>({...i,RAM:[...Ue]})),We.length>0&&Y(i=>({...i,CPU:[...We]})),Fe.length>0&&Y(i=>({...i,oCung:[...Fe]})),F.length>0&&Y(i=>({...i,mauSac:[...F]}))},$e=(i,p)=>{if(console.log("chạy generateVariant"),i===A.length){ze(M=>[...M,p]);return}const v=A[i],E=B[v];console.log("nameKey: ",v),console.log("valueOfKey: ",E),E.forEach(M=>{const H={...p,[v]:{...M}};$e(i+1,H)})};s.useEffect(()=>{console.log("productVarriant: ",ie),console.log("selectAttribute: ",B)},[ie]);const ce=(i,p)=>{a(i),l(p),o(!0)},Pt=async({ten:i,trangThai:p,moTa:v,nhuCauId:E,thuongHieuId:M})=>{const H=await hn({ten:i,trangThai:p,moTa:v,nhuCauId:E,thuongHieuId:M});if(!H){Q.error(ee.ERROR);return}return H},Vt=async({giaBan:i,trangThai:p,banPhimId:v,cpuId:E,heDieuHanhId:M,manHinhId:H,mauSacId:Ce,ramId:be,sanPhamId:je,vgaId:ye,webcamId:ve,ocungId:we,listSerialNumber:At,listUrlAnhSanPham:Ht})=>{const qe=await pn({giaBan:i,trangThai:p,banPhimId:v,cpuId:E,heDieuHanhId:M,manHinhId:H,mauSacId:Ce,ramId:be,sanPhamId:je,vgaId:ye,webcamId:ve,ocungId:we,listSerialNumber:At,listUrlAnhSanPham:Ht});if(!qe){Q.error(ee.ERROR);return}return qe},Ot=i=>{console.log(value)},_t=async()=>{const i=await Pt({ten:Be,trangThai:1,moTa:Ge,nhuCauId:ae,thuongHieuId:oe});if(i.code===999){Q.error(ee.ERROR);return}Z.forEach(async(p,v)=>{let E={giaBan:p.giaBan,trangThai:p.trangThai,banPhimId:p.banPhim,cpuId:p.CPU.id,heDieuHanhId:p.heDieuHanh,manHinhId:p.manHinh,mauSacId:p.mauSac.id,ramId:p.RAM.id,vgaId:p.VGA,webcamId:p.webcam,ocungId:p.oCung.id,sanPhamId:i.id,listSerialNumber:"",listUrlAnhSanPham:""};p.serialNumberList.length>0&&(E.listSerialNumber=p.serialNumberList.join(",")),p.anhSanPham.length>0&&(E.listUrlAnhSanPham=p.anhSanPham.join(",")),console.log("product: ",E);const M=await Vt(E);if(!M||M.code===999){Q.error(ee.ERROR);return}v===Z.length-1&&(Q.success(ee.CREATED),e("/sanpham/danhsach"))})},kt=({title:i,options:p})=>t.jsxs(Oe,{sx:{m:1,minWidth:120,width:"90%"},children:[t.jsx(_e,{id:"demo-simple-select-helper-label",children:i}),t.jsx(ke,{labelId:"demo-simple-select-helper-label",id:"demo-simple-select-helper",label:i,onChange:Ot,children:p&&p.map(v=>t.jsx(Ae,{value:v,children:v}))})]});return t.jsxs(t.Fragment,{children:[t.jsxs(Ee,{children:[t.jsxs("div",{children:[t.jsxs("div",{style:{padding:"10px"},children:[t.jsx("h3",{children:"Nhập thông tin sản phẩm"}),t.jsxs("div",{style:{margin:"15px 0",display:"flex",justifyContent:"space-between"},children:[t.jsx(mn,{sx:{width:"68%"},id:"free-solo-demo",freeSolo:!0,options:R.map(i=>i.ten),renderInput:i=>t.jsx(te,{...i,id:"nameProduct",label:"Tên sản phẩm",variant:"outlined",color:"secondary",onChange:p=>yt(p.target.value)})}),t.jsx(te,{id:"codeProduct",label:"Mã sản phẩm",variant:"outlined",color:"secondary",sx:{width:"30%"},placeholder:"Nhập mã hoặc mã tự sinh"})]}),t.jsx("div",{children:t.jsx(te,{id:"descriptionProduct",label:"Mô tả sản phẩm",multiline:!0,rows:4,variant:"outlined",fullWidth:!0,color:"secondary",onChange:i=>vt(i.target.value)})})]}),t.jsxs("div",{children:[t.jsx(K,{list:h,setValueSelect:ht,name:"Thương hiệu"}),t.jsx(K,{list:S,setValueSelect:dt,name:"Nhu cầu"}),t.jsx(K,{list:c,setValueSelect:xt,name:"VGA"}),t.jsx(K,{list:j,setValueSelect:St,name:"Webcam"}),t.jsx(K,{list:I,setValueSelect:Ct,name:"Màn hình"}),t.jsx(K,{list:lt,setValueSelect:jt,name:"Bàn phím"}),t.jsx(K,{list:O,setValueSelect:bt,name:"Hệ điều hành"})]})]}),t.jsx("div",{children:t.jsx(dn,{title:d,message:r,open:n,setOpen:o})})]}),t.jsx(Ee,{style:{marginTop:"20px"},children:t.jsxs("div",{style:{padding:"10px"},children:[t.jsx("h3",{style:{fontSize:"20px",fontWeight:"bolder",marginBottom:"20px"},children:"Chọn các thuộc tính"}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",flexWrap:"wrap"},children:[t.jsx(ue,{list:T,setListChecked:pt,nameDropDown:"Ram"}),t.jsx(ue,{list:X,setListChecked:ft,nameDropDown:"CPU"}),t.jsx(ue,{list:y,setListChecked:gt,nameDropDown:"Ổ cứng"}),t.jsx(ue,{list:W,setListChecked:mt,nameDropDown:"Màu sắc"}),t.jsx(he,{variant:"contained",onClick:Nt,color:"secondary",sx:{height:"60px",borderRadius:"7px"},children:t.jsx(yn,{})})]})]})}),t.jsx(Ee,{style:{marginTop:"20px"},children:t.jsx("div",{style:{padding:"10px"},children:ie.length>0&&t.jsx(as,{listKeySort:Dt,variantListFromParent:ie,showMessage:ce,setResult:Rt})})}),t.jsxs("div",{style:{padding:"24px",marginTop:"20px",marginBottom:"40px",width:"100%",background:"#fff",borderRadius:"10px"},children:[t.jsxs("div",{style:{width:"100%"},children:[t.jsx("div",{style:{fontWeight:"bolder",fontSize:"20px",textAlign:"center",width:"100%",display:"flex",justifyContent:"center"},children:"Ảnh"}),t.jsx("div",{style:{margin:"10px 0",width:"100%",display:"flex",justifyContent:"center"},children:wt&&t.jsx(os,{setUrlImages:x,countMauSac:F.length*3,showMessage:ce})})]}),t.jsx("div",{style:{width:"100%",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"40px"},children:f.map(i=>t.jsxs(Zt,{sx:{width:150,border:"1px solid rgba(0, 0, 0, 0.12)",borderRadius:"12px",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",overflow:"hidden",transition:"transform 0.3s, box-shadow 0.3s","&:hover":{transform:"scale(1.05)",boxShadow:"0px 6px 16px rgba(0, 0, 0, 0.2)"}},children:[t.jsx(jn,{sx:{height:150,backgroundSize:"contain",backgroundPosition:"center",filter:"brightness(90%)",transition:"filter 0.3s","&:hover":{filter:"brightness(100%)"}},image:i}),t.jsx(Qt,{sx:{backgroundColor:"#f8f9fa",padding:"16px",textAlign:"center"},children:t.jsx(kt,{title:"Màu sắc",options:F})})]}))})]})]})};export{ys as default};