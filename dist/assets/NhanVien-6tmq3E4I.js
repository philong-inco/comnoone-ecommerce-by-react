import{r as i,a4 as ne,j as e,M as re,B as b,G as g,a5 as y,N as te,J as I,K as oe,ad as se,a6 as ie,a7 as le,a8 as ce,a9 as $,V as he,A as de,Z as w,T as xe,a2 as S}from"./index-COCf9D-9.js";import{u as C,w as ge}from"./xlsx-ChUIJHMt.js";import{g as c,p as P}from"./request-BSxo6Ply.js";import{d as ue}from"./Add-DMKPmK9i.js";import{d as me,I as pe}from"./InsertDriveFile-CLO28EJP.js";import{M as T}from"./MenuItem-DZ1TXfcd.js";import{T as fe,a as je,b as be,c as W,d as ye}from"./TableRow-BjFi84E7.js";import{T as t}from"./TableCell-DFzCksj9.js";import{S as we}from"./Switch-CqctemQF.js";import{P as Se}from"./Pagination-p0ct8pHs.js";import{a as Ce,c as Te,b as Ne,D as ke}from"./DialogTitle-C9lArIW3.js";import"./LastPage-DEWP3WKD.js";const Ee=async n=>{try{return await c(`/nhan_vien/all?pageNo=${n}`)}catch(r){throw console.error("Error fetching Employees:",r),r}},Ve=async()=>{try{return await c("/nhan_vien/danhsachnhanvien")}catch(n){throw console.error("Error fetching Employees:",n),n}},De=async(n,r)=>{try{return await c(`/nhan_vien/search?pageNo=${n}&search=${r}`)}catch(s){throw console.error("Error fetching Employees by keyword:",s),s}},_e=async(n,r)=>{try{return await c(`/nhan_vien/searchtrangthai?pageNo=${n}&trangThai=${r}`)}catch(s){throw console.error("Error fetching Employees by status:",s),s}},ve=async(n,r)=>{try{return await c(`/nhan_vien/searchgioitinh?pageNo=${n}&gioiTinh=${r}`)}catch(s){throw console.error("Error fetching Employees by sex:",s),s}},Ae=async n=>{try{return await P(`/nhan_vien/remove/${n}`)}catch(r){throw console.error("Error deleting Employee:",r),r}},Ie=async n=>{try{return await P(`/nhan_vien/rollBackStatus/${n}`)}catch(r){throw console.error("Error rolling back Employee status:",r),r}},ze=()=>{const[n,r]=i.useState(1),[s,B]=i.useState(0),[h,u]=i.useState(""),[d,m]=i.useState(""),[F,p]=i.useState(!1),[N,k]=i.useState(null),[f,E]=i.useState(null),[V,K]=i.useState([]),[R,G]=i.useState([]),[x,j]=i.useState(""),L=[{id:"",name:"Tất Cả"},{id:"0",name:"Đã Nghỉ Việc"},{id:"1",name:"Đang Làm Việc"}],D=ne(),_=async()=>{try{let a;h?a=await De(n-1,h):d?a=await _e(n-1,d):x!==""?a=await ve(n-1,x):a=await Ee(n-1),K(a.content),B(a.totalPages)}catch(a){console.log(a)}},M=async()=>{let a;try{a=await Ve(),G(a)}catch(o){console.log(o)}};i.useEffect(()=>{_()},[n,h,d,x]),i.useEffect(()=>{M()},[]);const Y=a=>{switch(a){case 0:return e.jsx(S,{label:"Đã Nghỉ Việc",color:"default",style:{backgroundColor:"#f44336",color:"#fff"}});case 1:return e.jsx(S,{label:"Đang Làm Việc",color:"success",style:{backgroundColor:"#4caf50",color:"#fff"}});default:return e.jsx(S,{label:"Không xác định",color:"warning",style:{backgroundColor:"#ff9800",color:"#fff"}})}},H=a=>{u(a.target.value),r(1),m(""),j("")},z=a=>{m(a.target.value),r(1),u(""),j("")},O=a=>{const o=a.target.value;j(o),r(1),u(""),m("")},X=async()=>{p(!1);try{f===0?await Ae(N):await Ie(N),_()}catch(a){console.error("Error updating employee status:",a)}},v=()=>{p(!1),k(null),E(null)},A=a=>{const o={year:"numeric",month:"2-digit",day:"2-digit"};return new Date(a).toLocaleDateString("vi-VN",o)},J=(a,o)=>{r(o)},Z=(a,o)=>{k(a),E(o===1?0:1),p(!0)},q=()=>{D("/nhanvien/configuration")},Q=a=>{D(`/nhanvien/configuration/${a}`)},U=new Date().getFullYear();Array.from(new Array(101),(a,o)=>U-o);const ee=()=>{const a=C.json_to_sheet(R.map((l,ae)=>({STT:ae+1+(n-1)*10,"Hình Ảnh":l.hinhAnh,Mã:l.ma,Tên:l.ten,"Ngày Sinh":A(l.ngaySinh),"Số Điện Thoại":l.sdt,Email:l.email,"Địa Chỉ":l.diaChi,"Trạng Thái":l.trangThai===1?"Đang Làm Việc":"Đã Nghỉ Việc"}))),o=C.book_new();C.book_append_sheet(o,a,"Danh Sách Nhân Viên"),ge(o,"danh_sach_nhan_vien.xlsx")};return e.jsxs(re,{style:{textAlign:"center"},title:"Danh Sách Nhân Viên",children:[e.jsxs(b,{sx:{backgroundColor:"white",boxShadow:"0 4px 8px rgba(0.3, 0.3, 0.2, 0.3)",borderRadius:"8px",p:3,mb:3,width:"100%"},children:[e.jsxs(g,{container:!0,spacing:3,children:[e.jsxs(g,{item:!0,xs:12,sm:6,md:4,children:[e.jsx(y,{component:"legend",sx:{fontWeight:"bold",mb:1},children:"Tìm Kiếm"}),e.jsx(te,{label:"Tìm kiếm theo mã, tên, email, số điện thoại",value:h,onChange:H,variant:"outlined",fullWidth:!0})]}),e.jsxs(g,{item:!0,xs:12,sm:6,md:4,children:[e.jsx(y,{component:"legend",sx:{fontWeight:"bold",mb:1},children:"Giới Tính"}),e.jsxs(I,{fullWidth:!0,children:[e.jsx(oe,{id:"gender-select-label",children:"-- Chọn giới tính --"}),e.jsxs(se,{labelId:"gender-select-label",id:"gender-select",value:x,onChange:O,children:[e.jsx(T,{value:"",children:e.jsx("em",{children:"-- Chọn giới tính --"})}),e.jsx(T,{value:1,children:"Nam"}),e.jsx(T,{value:0,children:"Nữ"})]})]})]}),e.jsxs(g,{item:!0,xs:12,sm:12,md:4,children:[e.jsx(y,{component:"legend",sx:{fontWeight:"bold",mb:1},children:"Trạng Thái"}),e.jsx(I,{component:"fieldset",fullWidth:!0,children:e.jsx(ie,{row:!0,value:d,onChange:z,children:L.map(a=>e.jsx(le,{value:a.id,control:e.jsx(ce,{}),label:a.name},a.id))})})]})]}),e.jsxs(b,{sx:{position:"fixed",bottom:16,right:16,display:"flex",flexDirection:"column",alignItems:"center",zIndex:1300},children:[e.jsx($,{color:"primary","aria-label":"add",sx:{height:"60px",width:"60px",backgroundColor:"#007bff",color:"#fff",boxShadow:"0px 8px 15px rgba(0, 123, 255, 0.3)",transition:"all 0.3s ease",marginBottom:"10px","&:hover":{backgroundColor:"#0056b3",boxShadow:"0px 15px 20px rgba(0, 86, 179, 0.4)",transform:"translateY(-3px)"},"&:active":{backgroundColor:"#004080",boxShadow:"0px 5px 10px rgba(0, 64, 128, 0.2)",transform:"translateY(1px)"}},onClick:q,children:e.jsx(ue,{sx:{fontSize:"30px"}})}),e.jsx($,{color:"primary","aria-label":"export",sx:{height:"60px",width:"60px",backgroundColor:"#28a745",color:"#fff",boxShadow:"0px 8px 15px rgba(40, 167, 69, 0.3)",transition:"all 0.3s ease","&:hover":{backgroundColor:"#218838",boxShadow:"0px 15px 20px rgba(33, 136, 56, 0.4)",transform:"translateY(-3px)"},"&:active":{backgroundColor:"#1e7e34",boxShadow:"0px 5px 10px rgba(30, 126, 52, 0.2)",transform:"translateY(1px)"}},onClick:ee,children:e.jsx(me,{sx:{fontSize:"30px"}})})]})]}),e.jsx(fe,{component:he,children:e.jsxs(je,{children:[e.jsx(be,{children:e.jsxs(W,{children:[e.jsx(t,{children:"STT"}),e.jsx(t,{children:"Hình Ảnh"}),e.jsx(t,{children:"Mã"}),e.jsx(t,{children:"Tên"}),e.jsx(t,{children:"Ngày Sinh"}),e.jsx(t,{children:"Số Điện Thoại"}),e.jsx(t,{children:"Email"}),e.jsx(t,{children:"Địa Chỉ"}),e.jsx(t,{children:"Trạng Thái"}),e.jsx(t,{children:"Hành Động"})]})}),e.jsx(ye,{children:V.length>0&&V.map((a,o)=>{const l=A(a.ngaySinh);return e.jsxs(W,{children:[e.jsx(t,{children:o+1+(n-1)*5}),e.jsx(t,{children:e.jsx(de,{alt:a.ten,src:a.hinhAnh,sx:{width:100,height:100}})}),e.jsx(t,{children:a.ma}),e.jsx(t,{children:a.ten}),e.jsx(t,{children:l}),e.jsx(t,{children:a.sdt}),e.jsx(t,{children:a.email}),e.jsx(t,{children:a.diaChi}),e.jsx(t,{children:Y(a.trangThai)}),e.jsxs(t,{children:[e.jsx(w,{className:"btn btn-link",children:e.jsx(pe,{stroke:2,onClick:()=>Q(a.id)})}),e.jsx(we,{checked:a.trangThai===1,onChange:()=>Z(a.id,a.trangThai),color:"primary"})]})]},a.id)})})]})}),e.jsx(b,{display:"flex",justifyContent:"center",mt:2,children:e.jsx(Se,{count:s,page:n,onChange:J,color:"primary"})}),e.jsxs(Ce,{open:F,onClose:v,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(Te,{id:"alert-dialog-title",children:"Xác nhận thay đổi trạng thái"}),e.jsx(Ne,{children:e.jsxs(xe,{children:["Bạn có chắc chắn muốn ",f===0?"xóa":"khôi phục"," nhân viên này không?"]})}),e.jsxs(ke,{children:[e.jsx(w,{onClick:v,color:"primary",children:"Hủy"}),e.jsx(w,{onClick:X,color:"secondary",autoFocus:!0,children:f===0?"Xóa":"Khôi phục"})]})]})]})};export{ze as default};
