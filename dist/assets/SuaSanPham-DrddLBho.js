import{r as t,j as a,J as mt,K as pt,ad as gt,a2 as St,z as xt,I as Ct,aa as ft,ab as e,M as vt,N as x}from"./index-fYug5RY9.js";import{d as jt}from"./Add-Cg9FrFZF.js";import{M as bt}from"./MenuItem-BoieQS9d.js";import"./AlertDialogSlide-CK29c8_A.js";import"./DialogTitle-DfESKbom.js";import"./DialogContentText-Cd7IkWVj.js";const l=({list:o,setValueSelect:i,name:u,valueOld:h})=>{const[c,d]=t.useState({});t.useEffect(()=>{d(h)},[]),t.useEffect(()=>{i(c.id)},[c]);const r=s=>{d(s.target.value)};return a.jsxs(mt,{required:!0,sx:{m:1,width:"23.4%"},children:[a.jsx(pt,{id:"demo-simple-select-required-label",color:"secondary",children:u}),a.jsx(gt,{labelId:"demo-simple-select-required-label",id:"demo-simple-select-required",color:"secondary",value:c,label:u,onChange:r,sx:{minHeight:"62.9px"},renderValue:s=>Object.keys(s).length>0?a.jsx(St,{sx:{backgroundColor:"#EDE7F6"},label:s.ten},s.id):null,endAdornment:a.jsx(xt,{style:{marginRight:"10px"},position:"end",children:a.jsx(Ct,{children:a.jsx(jt,{})})}),children:o.map(s=>a.jsx(bt,{value:s,children:s.ten},s.id))})]})},Mt=()=>{const{id:o}=ft(),[i,u]=t.useState([]),[h,c]=t.useState([]),[d,r]=t.useState([]),[s,w]=t.useState([]),[Ht,k]=t.useState([]),[E,R]=t.useState([]),[V,y]=t.useState([]),[Pt,M]=t.useState([]),[T,D]=t.useState([]),[A,I]=t.useState([]),[F,G]=t.useState([]),[m,C]=t.useState(""),[p,f]=t.useState(""),[N,O]=t.useState(""),[W,q]=t.useState(""),[B,U]=t.useState(""),[$,z]=t.useState(""),[J,K]=t.useState(""),[L,_]=t.useState(""),[Q,X]=t.useState(""),[Y,Z]=t.useState(""),[v,tt]=t.useState(),[j,at]=t.useState([]);t.useEffect(()=>{console.log("sanPham: ",v)},[v]),t.useEffect(()=>{console.log("spct: ",j)},[j]),t.useEffect(()=>{et()},[]),t.useEffect(()=>{},[N]),t.useEffect(()=>{},[$]),t.useEffect(()=>{},[W]),t.useEffect(()=>{},[B]),t.useEffect(()=>{},[J]),t.useEffect(()=>{console.log("thuongHieuChecked: ",p)},[p]),t.useEffect(()=>{console.log("nhuCauChecked: ",m)},[m]);const et=async()=>{const n=await e.get(`http://localhost:8080/api/san-pham/detail/${o}`),st=await e.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id?idProduct=${o}`);tt(n.data.data),at(st.data.data),_(n.data.data.ten),Z(n.data.data.ma),X(n.data.data.moTa);const g=await e.get("http://localhost:8080/api/nhu-cau/all-list-active"),b=await e.get("http://localhost:8080/api/thuong-hieu/all-list-active"),nt=await e.get("http://localhost:8080/api/ram/all-list-active"),lt=await e.get("http://localhost:8080/api/mau-sac/all-list-active"),ct=await e.get("http://localhost:8080/api/cpu/all-list-active"),ot=await e.get("http://localhost:8080/api/vga/all-list-active"),ut=await e.get("http://localhost:8080/api/webcam/all-list-active"),it=await e.get("http://localhost:8080/api/o-cung/all-list-active"),ht=await e.get("http://localhost:8080/api/man-hinh/all-list-active"),dt=await e.get("http://localhost:8080/api/he-dieu-hanh/all-list-active"),rt=await e.get("http://localhost:8080/api/ban-phim/all-list-active");u(g.data.data),c(b.data.data),r(nt.data.data),w(lt.data.data),k(ct.data.data),R(ot.data.data),y(ut.data.data),M(it.data.data),D(ht.data.data),I(dt.data.data),G(rt.data.data),console.log("nhuCauResult.data.data: ",g.data.data);const H=g.data.data.filter(S=>S.ten==n.data.data.nhuCau),P=b.data.data.filter(S=>S.ten==n.data.data.thuongHieu);console.log("nhuCauTemp: ",H),console.log("thuongHieuTemp: ",P),C(H[0]),f(P[0])};return a.jsx(a.Fragment,{children:a.jsxs(vt,{children:[a.jsxs("div",{children:[a.jsxs("div",{style:{padding:"10px"},children:[a.jsx("h3",{children:"Sửa sản phẩm"}),a.jsxs("div",{style:{margin:"15px 0",display:"flex",justifyContent:"space-between"},children:[a.jsx(x,{id:"nameProduct",label:"Tên sản phẩm",variant:"outlined",fullWidth:!0,color:"secondary",value:L,onChange:n=>setMota(n.target.value)}),a.jsx(x,{id:"codeProduct",label:"Mã sản phẩm",variant:"outlined",color:"secondary",value:Y,sx:{width:"30%"},placeholder:"Nhập mã hoặc mã tự sinh"})]}),a.jsx("div",{children:a.jsx(x,{id:"descriptionProduct",label:"Mô tả sản phẩm",multiline:!0,rows:4,variant:"outlined",fullWidth:!0,value:Q,color:"secondary",onChange:n=>setMota(n.target.value)})})]}),a.jsxs("div",{children:[a.jsx(l,{valueOld:p,list:h,setValueSelect:f,name:"Thương hiệu"}),a.jsx(l,{valueOld:m,list:i,setValueSelect:C,name:"Nhu cầu"}),a.jsx(l,{list:E,setValueSelect:O,name:"VGA"}),a.jsx(l,{list:V,setValueSelect:q,name:"Webcam"}),a.jsx(l,{list:T,setValueSelect:U,name:"Màn hình"}),a.jsx(l,{list:F,setValueSelect:K,name:"Bàn phím"}),a.jsx(l,{list:A,setValueSelect:z,name:"Hệ điều hành"})]})]}),a.jsx("div",{})]})})};export{Mt as default};