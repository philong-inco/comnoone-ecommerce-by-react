import{r as a,j as e,J as pe,K as ge,ad as xe,a2 as Se,z as Ce,I as be,aa as je,ab as l,M as E,N as b}from"./index-DvRT1fKX.js";import{d as fe}from"./Add-DlYEWK5m.js";import{M as Te}from"./MenuItem-CG6DnP3x.js";import"./AlertDialogSlide-CZzbAblj.js";import"./DialogTitle-CbNFobLJ.js";import"./DialogContentText-BL53H5oW.js";const n=({list:i,setValueSelect:d,name:o,valueOld:h})=>{const[c,u]=a.useState({});a.useEffect(()=>{u(h)},[]),a.useEffect(()=>{d(c.id)},[c]);const r=s=>{u(s.target.value)};return e.jsxs(pe,{required:!0,sx:{m:1,width:"23.4%"},children:[e.jsx(ge,{id:"demo-simple-select-required-label",color:"secondary",children:o}),e.jsx(xe,{labelId:"demo-simple-select-required-label",id:"demo-simple-select-required",color:"secondary",value:c,label:o,onChange:r,sx:{minHeight:"62.9px"},renderValue:s=>Object.keys(s).length>0?e.jsx(Se,{sx:{backgroundColor:"#EDE7F6"},label:s.ten},s.id):null,endAdornment:e.jsx(Ce,{style:{marginRight:"10px"},position:"end",children:e.jsx(be,{children:e.jsx(fe,{})})}),children:i.map(s=>e.jsx(Te,{value:s,children:s.ten},s.id))})]})},ye=()=>{const{id:i}=je(),[d,o]=a.useState([]),[h,c]=a.useState([]),[u,r]=a.useState([]),[s,R]=a.useState([]),[ve,w]=a.useState([]),[V,y]=a.useState([]),[M,D]=a.useState([]),[Pe,A]=a.useState([]),[N,I]=a.useState([]),[O,B]=a.useState([]),[F,G]=a.useState([]),[m,j]=a.useState(""),[p,f]=a.useState(""),[W,q]=a.useState(""),[U,L]=a.useState(""),[$,z]=a.useState(""),[J,K]=a.useState(""),[_,Q]=a.useState(""),[X,Y]=a.useState(""),[Z,ee]=a.useState(""),[ae,te]=a.useState(""),[T,le]=a.useState(),[g,v]=a.useState([]);a.useEffect(()=>{console.log("sanPham: ",T)},[T]),a.useEffect(()=>{console.log("spct: ",g)},[g]),a.useEffect(()=>{se()},[]),a.useEffect(()=>{},[W]),a.useEffect(()=>{},[J]),a.useEffect(()=>{},[U]),a.useEffect(()=>{},[$]),a.useEffect(()=>{},[_]),a.useEffect(()=>{console.log("thuongHieuChecked: ",p)},[p]),a.useEffect(()=>{console.log("nhuCauChecked: ",m)},[m]);const se=async()=>{const t=await l.get(`http://localhost:8080/api/san-pham/detail/${i}`),x=await l.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id?idProduct=${i}`);debugger;le(t.data.data),v(x.data.data),Y(t.data.data.ten),te(t.data.data.ma),ee(t.data.data.moTa);const S=await l.get("http://localhost:8080/api/nhu-cau/all-list-active"),P=await l.get("http://localhost:8080/api/thuong-hieu/all-list-active"),ne=await l.get("http://localhost:8080/api/ram/all-list-active"),ie=await l.get("http://localhost:8080/api/mau-sac/all-list-active"),ce=await l.get("http://localhost:8080/api/cpu/all-list-active"),oe=await l.get("http://localhost:8080/api/vga/all-list-active"),de=await l.get("http://localhost:8080/api/webcam/all-list-active"),he=await l.get("http://localhost:8080/api/o-cung/all-list-active"),ue=await l.get("http://localhost:8080/api/man-hinh/all-list-active"),re=await l.get("http://localhost:8080/api/he-dieu-hanh/all-list-active"),me=await l.get("http://localhost:8080/api/ban-phim/all-list-active");o(S.data.data),c(P.data.data),r(ne.data.data),R(ie.data.data),w(ce.data.data),y(oe.data.data),D(de.data.data),A(he.data.data),I(ue.data.data),B(re.data.data),G(me.data.data),console.log("nhuCauResult.data.data: ",S.data.data);const H=S.data.data.filter(C=>C.ten==t.data.data.nhuCau),k=P.data.data.filter(C=>C.ten==t.data.data.thuongHieu);console.log("nhuCauTemp: ",H),console.log("thuongHieuTemp: ",k),j(H[0]),f(k[0])};return e.jsxs(e.Fragment,{children:[e.jsxs(E,{children:[e.jsxs("div",{children:[e.jsxs("div",{style:{padding:"10px"},children:[e.jsx("h3",{children:"Sửa sản phẩm"}),e.jsxs("div",{style:{margin:"15px 0",display:"flex",justifyContent:"space-between"},children:[e.jsx(b,{id:"nameProduct",label:"Tên sản phẩm",variant:"outlined",fullWidth:!0,color:"secondary",value:X,onChange:t=>setMota(t.target.value)}),e.jsx(b,{id:"codeProduct",label:"Mã sản phẩm",variant:"outlined",color:"secondary",value:ae,sx:{width:"30%"},placeholder:"Nhập mã hoặc mã tự sinh"})]}),e.jsx("div",{children:e.jsx(b,{id:"descriptionProduct",label:"Mô tả sản phẩm",multiline:!0,rows:4,variant:"outlined",fullWidth:!0,value:Z,color:"secondary",onChange:t=>setMota(t.target.value)})})]}),e.jsxs("div",{children:[e.jsx(n,{valueOld:p,list:h,setValueSelect:f,name:"Thương hiệu"}),e.jsx(n,{valueOld:m,list:d,setValueSelect:j,name:"Nhu cầu"}),e.jsx(n,{list:V,setValueSelect:q,name:"VGA"}),e.jsx(n,{list:M,setValueSelect:L,name:"Webcam"}),e.jsx(n,{list:N,setValueSelect:z,name:"Màn hình"}),e.jsx(n,{list:F,setValueSelect:Q,name:"Bàn phím"}),e.jsx(n,{list:O,setValueSelect:K,name:"Hệ điều hành"})]})]}),e.jsx("div",{})]}),e.jsx(E,{children:e.jsx(TableContainer,{component:Paper,children:e.jsxs(Table,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(TableHead,{children:e.jsxs(TableRow,{children:[e.jsx(TableCell,{children:"STT"}),e.jsx(TableCell,{align:"left",children:"RAM"}),e.jsx(TableCell,{align:"left",children:"CPU"}),e.jsx(TableCell,{align:"left",children:"Ổ cứng"}),e.jsx(TableCell,{align:"left",children:"Màu sắc"}),e.jsx(TableCell,{align:"left",children:"Giá bán"}),e.jsx(TableCell,{align:"left",children:"Serial"})]})}),e.jsx(TableBody,{children:g.map((t,x)=>e.jsxs(TableRow,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(TableCell,{component:"th",scope:"row",children:x+1}),e.jsx(TableCell,{align:"left",children:t.ram}),e.jsx(TableCell,{align:"left",children:t.cpu}),e.jsx(TableCell,{align:"left",children:t.ocung}),e.jsx(TableCell,{align:"left",children:t.mauSac}),e.jsxs(TableCell,{align:"left",children:[t.giaBan," đ"]}),e.jsxs(TableCell,{align:"left",children:[e.jsx(IconEye,{onClick:()=>handleViewSerial(t.id),stroke:2}),e.jsx("p",{sx:{color:"#85EA2D"},children:t.listSerialNumber!==""&&t.listSerialNumber!==null?t.listSerialNumber.split(",").length:0}),"  "]})]},t.ram))})]})})}),e.jsx(SerialNumberViewFromSPCT,{setOpen:setOpenSeri,tilte:"Danh sách serial number",open:openSeri,list:listSeri,idSP:i,idSPCT,setListSPCT:v})]})};export{ye as default};
