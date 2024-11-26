import{r as o,b as Y,j as e,M as V,B as l,G as d,k as w,F as S,f as $,d as q,q as O,i as X,e as i}from"./index-BmIX3_3w.js";import{c as J,g as Q,d as U,a as Z,b as ee}from"./customerService-2CZdIr01.js";import{d as ae}from"./Add-CGKpRTw5.js";import{u as x,w as ne}from"./xlsx-ChUIJHMt.js";import{d as te,I as re}from"./InsertDriveFile-C-NfAWl4.js";import{R as oe,a as se}from"./RadioGroup-CzZcL5RC.js";import{F as ie}from"./FormControlLabel-nmLt3JMn.js";import{F as C}from"./Fab-DCOhgBUb.js";import{T as le,a as ce,b as he,c as T,d as ge}from"./TableRow-COUS1y_I.js";import{T as n}from"./TableCell-BAoyJBRv.js";import{T as de}from"./TablePagination-DvJQlFJ5.js";import"./request-BL6vn_vs.js";import"./SwitchBase-CzMjO0Un.js";import"./KeyboardArrowRight-ZUvQPM7X.js";import"./LastPage-YRoveXFG.js";import"./MenuItem-ByEqL40d.js";const Ee=()=>{const[p,F]=o.useState(1),[y,H]=o.useState(0),[m,K]=o.useState([]),[c,u]=o.useState(""),[h,v]=o.useState(""),[g,E]=o.useState(""),[k,P]=o.useState(""),[s,f]=o.useState({page:0,size:5}),N=[{id:"1",name:"Nam"},{id:"0",name:"Nữ"},{id:"",name:"Tất cả"}],b=Y(),R=async()=>{try{let a;c?a=await Q(s.page,c):h!==""?a=await U(s.page,h):g!==""?a=await Z(s.page,g):a=await ee(s.page),K(a.content),H(a.totalElements)}catch(a){console.log(a)}};o.useEffect(()=>{R()},[s.page,s.size,c,h,g]),o.useEffect(()=>{D()},[]);const D=async()=>{try{const a=await J();P(a)}catch(a){console.log(a)}},I=(a,t)=>{f(r=>({...r,page:t}))},_=a=>{f({...s,size:parseInt(a.target.value,10),page:0})},A=a=>{switch(a){case 0:return"Nữ";case 1:return"Nam";default:return"Không xác định"}},G=a=>{const t={width:"100px",textAlign:"center"};switch(a){case 0:return e.jsx(i,{label:"Đồng",color:"default",sx:{...t,backgroundColor:"#CD853F",color:"#FFFFFF"}});case 1:return e.jsx(i,{label:"Bạc",color:"default",sx:{...t,backgroundColor:"#C0C0C0",color:"#000000"}});case 2:return e.jsx(i,{label:"Vàng",color:"default",sx:{...t,backgroundColor:"#FFD700",color:"#000000"}});case 3:return e.jsx(i,{label:"Bạch Kim",color:"default",sx:{...t,backgroundColor:"#E5E4E2",color:"#000000"}});case 4:return e.jsx(i,{label:"Kim Cương",color:"default",sx:{...t,backgroundColor:"#363636",color:"#FFFFFF"}});default:return e.jsx(i,{label:"Không xác định",color:"default",sx:{...t,backgroundColor:"#FFFFFF",color:"#000000"}})}},j=a=>{const t={year:"numeric",month:"2-digit",day:"2-digit"};return new Date(a).toLocaleDateString("vi-VN",t)},z=a=>{b(`/khachhang/khachhangaddress/${a}`)},W=()=>{b("/khachhang/khachhangconfiguration")},B=a=>{debugger;v(a.target.value),F(1),u(""),E("")},L=()=>{debugger;const a=x.json_to_sheet(k.map((r,M)=>({STT:M+1+(p-1)*10,"Hình Ảnh":r.hinhAnh,Mã:r.ma,Tên:r.ten,"Ngày Sinh":j(r.ngaySinh),"Số Điện Thoại":r.sdt,"Giới Tính":r.gioiTinh==1?"Nam":"Nữ",Email:r.email,"Địa Chỉ":r.diaChi}))),t=x.book_new();x.book_append_sheet(t,a,"Danh Sách Khách Hàng"),ne(t,"danh_sach_khach_hang.xlsx")};return e.jsxs(V,{style:{textAlign:"center"},children:[e.jsxs(l,{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",mb:2,p:2,sx:{backgroundColor:"white",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"8px",width:"100%"},children:[e.jsxs(d,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(d,{item:!0,xs:12,sm:4,children:e.jsx(w,{fullWidth:!0,margin:"normal",children:e.jsxs(l,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(S,{component:"legend",sx:{fontWeight:"bold",whiteSpace:"nowrap",width:"50%"},children:"Tìm kiếm"}),e.jsx($,{value:c,onChange:a=>u(a.target.value),variant:"outlined",placeholder:"Nhập tên khách hàng",fullWidth:!0})]})})}),e.jsx(d,{item:!0,xs:12,sm:4,children:e.jsx(w,{fullWidth:!0,margin:"normal",children:e.jsxs(l,{display:"flex",alignItems:"center",children:[e.jsx(S,{component:"legend",sx:{fontWeight:"bold",whiteSpace:"nowrap",width:"30%"},children:"Giới Tính"}),e.jsx(oe,{row:!0,value:h,onChange:B,sx:{display:"flex",alignItems:"center",justifyContent:"flex-start",flexGrow:1,marginLeft:"10px"},children:N.map(a=>e.jsx(ie,{value:a.id,control:e.jsx(se,{}),label:a.name,sx:{marginRight:2}},a.id))})]})})})]}),e.jsx(l,{sx:{position:"fixed",top:350,right:16,zIndex:1300},children:e.jsx(C,{color:"primary","aria-label":"add",title:"Thêm khách hàng",sx:{height:"60px",width:"60px",backgroundColor:"#007bff",color:"#fff",boxShadow:"0px 8px 15px rgba(0, 123, 255, 0.3)",transition:"all 0.3s ease","&:hover":{backgroundColor:"#0056b3",boxShadow:"0px 15px 20px rgba(0, 86, 179, 0.4)",transform:"translateY(-3px)"},"&:active":{backgroundColor:"#004080",boxShadow:"0px 5px 10px rgba(0, 64, 128, 0.2)",transform:"translateY(1px)"}},onClick:W,children:e.jsx(ae,{sx:{fontSize:"30px"}})})}),e.jsx(l,{sx:{position:"fixed",top:420,right:16,zIndex:1300},children:e.jsx(C,{color:"primary","aria-label":"export",title:"Xuất danh sách khách hàng",sx:{height:"60px",width:"60px",backgroundColor:"#28a745",color:"#fff",boxShadow:"0px 8px 15px rgba(40, 167, 69, 0.3)",transition:"all 0.3s ease","&:hover":{backgroundColor:"#218838",boxShadow:"0px 15px 20px rgba(33, 136, 56, 0.4)",transform:"translateY(-3px)"},"&:active":{backgroundColor:"#1e7e34",boxShadow:"0px 5px 10px rgba(30, 126, 52, 0.2)",transform:"translateY(1px)"}},onClick:L,children:e.jsx(te,{sx:{fontSize:"30px"}})})})]}),e.jsx(le,{component:q,children:e.jsxs(ce,{children:[e.jsx(he,{children:e.jsxs(T,{children:[e.jsx(n,{align:"center",children:"STT"}),e.jsx(n,{align:"center",children:"Hình Ảnh"}),e.jsx(n,{align:"center",children:"Mã Khách Hàng"}),e.jsx(n,{align:"center",children:"Tên Khách Hàng"}),e.jsx(n,{align:"center",children:"Ngày Sinh"}),e.jsx(n,{align:"center",children:"Email"}),e.jsx(n,{align:"center",children:"Số Điện Thoại"}),e.jsx(n,{align:"center",children:"Giới Tính"}),e.jsx(n,{align:"center",children:"Thao Tác"})]})}),e.jsx(ge,{children:m.length>0&&m.map((a,t)=>{const r=j(a.ngaySinh);return G(a.hangKhachHang),e.jsxs(T,{children:[e.jsx(n,{align:"center",children:t+1+(p-1)*5}),e.jsx(n,{align:"center",children:e.jsx(O,{alt:a.ten,src:a.hinhAnh,sx:{width:100,height:100}})}),e.jsx(n,{align:"center",children:a.ma}),e.jsx(n,{align:"center",children:a.ten}),e.jsx(n,{align:"center",children:r}),e.jsx(n,{align:"center",children:a.email}),e.jsx(n,{align:"center",children:a.sdt}),e.jsx(n,{align:"center",children:A(a.gioiTinh)}),e.jsx(n,{align:"center",children:e.jsx(X,{className:"btn btn-link",children:e.jsx(re,{stroke:2,onClick:()=>z(a.id)})})})]},a.id)})})]})}),e.jsx(de,{rowsPerPageOptions:[5],component:"div",count:y,rowsPerPage:s.size,page:s.page,onPageChange:I,onRowsPerPageChange:_})]})};export{Ee as default};