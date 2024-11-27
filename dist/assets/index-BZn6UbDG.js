import{n as F,j as e,b as D,G as x,f as w,i as A,D as X,k as Y,B as N,d as J,e as L,h as Q,r,c as Z}from"./index-BNYZeP1T.js";import{g as ee,c as te}from"./billService-B4Fb4oi8.js";import{T as v}from"./Tooltip-BRa6HpAb.js";import{A as ae}from"./Add-CywnpihI.js";import{R as ne,a as I}from"./RadioGroup-DT3_IQ6w.js";import{F as P}from"./FormControlLabel-L0ky9wc-.js";import{g as le,a as oe}from"./billStatus-DlquxtQJ.js";import{d as re}from"./Visibility-CaqsFW8J.js";import{T as se,a as ie}from"./Tabs-CKck-Mbg.js";import{T as de,a as ce,b as he,c as $,d as me}from"./TableRow-WD6ivono.js";import{T as z}from"./TableCell-BaxNxya6.js";import{T as ue}from"./TablePagination-B_CkhwHZ.js";import"./request-RmJ5MMbn.js";import"./SwitchBase-BS7_TVRV.js";import"./KeyboardArrowRight-BZUhZXMz.js";import"./LastPage-ne3A1-i7.js";import"./MenuItem-BCdLiv3n.js";const ge=F(e.jsx("path",{d:"M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"}),"FileDownload"),xe=F(e.jsx("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search");function pe(f){const{handleSearch:u,handleCreateBill:k,onDateChange:T,fromDate:o,toDate:p,handleBillTypeChange:s,handlePrint:j}=f,i=D(),g=d=>{const{name:b,value:h}=d.target;T(b,h)};return e.jsxs("div",{style:{backgroundColor:"white",padding:"10px",borderRadius:"10px"},children:[e.jsxs(x,{container:!0,spacing:2,className:"mb-10",children:[e.jsx(x,{item:!0,xs:12,sm:6,children:e.jsx(w,{fullWidth:!0,placeholder:"Tìm kiếm mã hóa đơn , sdt , email",InputProps:{startAdornment:e.jsx(xe,{style:{marginRight:"8px"}})},onChange:d=>u(d.target.value),variant:"outlined",size:"small"})}),e.jsxs(x,{item:!0,xs:12,sm:6,container:!0,justifyContent:"flex-end",children:[e.jsx(v,{title:"Tải file excel",arrow:!0,placement:"top",children:e.jsx(A,{variant:"outlined",color:"primary",style:{marginLeft:"10px"},onClick:j,children:e.jsx(ge,{})})}),e.jsx(v,{title:"Tạo hóa đơn",arrow:!0,placement:"top",children:e.jsx(A,{variant:"contained",color:"primary",onClick:()=>{i("/ban-hang")},style:{marginLeft:"10px"},children:e.jsx(ae,{})})})]})]}),e.jsx(X,{style:{margin:"10px 0"}}),e.jsxs(x,{container:!0,spacing:2,children:[e.jsx(x,{item:!0,xs:6,sm:3,children:e.jsx(w,{label:"Từ ngày",type:"date",name:"tuNgay",value:o||"",onChange:g,fullWidth:!0,InputLabelProps:{shrink:!0}})}),e.jsx(x,{item:!0,xs:6,sm:3,children:e.jsx(w,{label:"Đến ngày",name:"denNgay",type:"date",value:p||"",onChange:g,fullWidth:!0,InputLabelProps:{shrink:!0}})}),e.jsx(x,{item:!0,xs:12,sm:6,container:!0,alignItems:"center",style:{display:"flex"},children:e.jsx(Y,{component:"fieldset",style:{display:"flex",flexDirection:"row",alignItems:"center"},children:e.jsxs(ne,{row:!0,defaultValue:"",onChange:s,style:{display:"flex",flexDirection:"row"},children:[e.jsx(P,{value:"",control:e.jsx(I,{}),label:"Tất cả"}),e.jsx(P,{value:"0",control:e.jsx(I,{}),label:"Tại quầy"}),e.jsx(P,{value:"1",control:e.jsx(I,{}),label:"Online"})]})})})]})]})}function ye(f){const{activeKey:u,handleTabChange:k,bills:T,page:o,pageSize:p,total:s,onPageChange:j}=f,i=D(),g=[{key:"",label:"TẤT CẢ"},{key:"DON_MOI",label:"Đơn mới"},{key:"TREO",label:"Hóa đơn chờ"},{key:"CHO_XAC_NHAN",label:"Chờ xác nhận"},{key:"CHO_GIAO",label:"Chờ giao"},{key:"DANG_GIAO",label:"Đang giao"},{key:"HOAN_THANH",label:"Hoàn thành"},{key:"HUY",label:"Hủy"}],d=a=>{console.log("Code",a),i(`/hoa-don/chi-tiet/${a}`)},b=a=>{const n=a.tongTienPhaiTra,c=a.tienShip||0;return a.tienGiamHangKhachHang,n+c},h=[{title:"STT",dataIndex:"key",key:"key"},{title:"Mã",dataIndex:"ma",key:"ma"},{title:"Tổng SP",dataIndex:"tongSanPham",key:"tongSanPham"},{title:"Tổng số tiền",dataIndex:"tongTienPhaiTra",key:"tongTien",render:(a,n)=>b(n).toLocaleString()},{title:"Tên khách hàng",dataIndex:"tenKhachHang",key:"tenKhachHang",render:a=>a??"Khách lẻ"},{title:"SDT",dataIndex:"sdt",key:"sdt"},{title:"Email",dataIndex:"email",key:"email"},{title:"Ngày tạo",dataIndex:"ngayTao",key:"ngayTao"},{title:"Loại hóa đơn",dataIndex:"loaiHoaDon",key:"loaiHoaDon",render:a=>e.jsx(v,{title:a==0?"Bán tại quầy":"Hóa đơn bán giao hang",arrow:!0,placement:"top",children:e.jsx(L,{size:"small",sx:{width:100,color:"white",fontWeight:"bold",fontSize:"0.8rem",padding:"15px 4px"},label:a==0?"Tại quầy":"Ship",color:a==0?"primary":"success"})})},{title:"Trạng thái",dataIndex:"trangThai",key:"trangThai",render:a=>e.jsx(L,{label:le(a),style:{backgroundColor:oe(a),color:"#fff"},size:"small",Chip:!0,sx:{width:"100%",color:"white",fontWeight:"bold",fontSize:"0.8rem",padding:"15px 4px"}})},{title:"Hành động",key:"action",render:(a,n)=>e.jsx(e.Fragment,{children:e.jsx(v,{title:"Xem chi tiết",children:e.jsx(Q,{onClick:()=>d(n.ma),children:e.jsx(re,{})})})})}];return e.jsxs(N,{sx:{backgroundColor:"white",marginTop:"10px",borderRadius:"10px",padding:"10px"},children:[e.jsx(se,{value:u,onChange:(a,n)=>k(n),variant:"fullWidth",scrollButtons:"auto",allowScrollButtonsMobile:!0,children:g.map(a=>e.jsx(ie,{label:a.label,value:a.key,sx:{marginLeft:"10px"}},a.key))}),g.map(a=>e.jsx(N,{hidden:u!==a.key,sx:{marginTop:"20px"},children:u===a.key&&e.jsxs(e.Fragment,{children:[e.jsx(de,{component:J,children:e.jsxs(ce,{"aria-label":"simple table",children:[e.jsx(he,{children:e.jsx($,{children:h.map(n=>e.jsx(z,{style:{fontSize:"0.75rem"},children:n.title},n.key))})}),e.jsx(me,{children:T.map((n,c)=>e.jsx($,{children:h.map(m=>e.jsx(z,{style:{fontSize:"0.75rem"},children:m.key==="key"?c+1:m.render?m.render(n[m.dataIndex],n):n[m.dataIndex]},m.key))},n.id))})]})}),e.jsx(ue,{component:"div",count:s,page:o-1,onPageChange:(n,c)=>j(c+1),rowsPerPage:p,rowsPerPageOptions:[5]})]})},a.key))]})}function $e(){D();const[f,u]=r.useState(""),[k,T]=r.useState([]),[o,p]=r.useState(null),[s,j]=r.useState(null),[i,g]=r.useState(""),[d,b]=r.useState(""),[h,a]=r.useState(""),[n,c]=r.useState(1),[m,O]=r.useState(5),[R,E]=r.useState(0),[G,H]=r.useState(!1),S=(t,l=!0)=>{if(!t)return null;const y=new Date(t);return isNaN(y.getTime())?(console.error("Lỗi : ",t),null):(l?y.setHours(0,0,0,0):y.setHours(23,59,59,999),y.getTime())},B=async()=>{if(G)return;H(!0);let t=` ( ma ~~ '${i.trim()}' or sdt ~~ '${i.trim()}' or email ~~ '${i.trim()}') `;d&&(t+=` and loaiHoaDon:${d}`),h&&(t+=` and trangThai:'${h}'`),o&&s&&(t+=` and ngayTao >: '${S(o,!0)}' and ngayTao <:'${S(s,!1)}'   `);try{const l=await ee(n-1,m,t);l.status_code===200&&(T(l.data.result),c(l.data.meta.page+1),O(l.data.meta.pageSize),E(l.data.meta.total))}catch(l){console.error("Lỗi : ",l)}finally{H(!1)}},_=async()=>{let t=` ( ma ~~ '${i.trim()}' or sdt ~~ '${i.trim()}' or email ~~ '${i.trim()}') `;d&&(t+=` and loaiHoaDon:${d}`),h&&(t+=` and trangThai:'${h}'`),o&&s&&(t+=` and ngayTao >: '${S(o,!0)}' and ngayTao <:'${S(s,!1)}'   `);try{const l=await Z({url:"http://localhost:8080/api/bills/export",method:"GET",params:{filter:t},responseType:"blob"}),y=window.URL.createObjectURL(new Blob([l.data])),C=document.createElement("a");C.href=y,C.setAttribute("download","hoadon.xlsx"),document.body.appendChild(C),C.click(),document.body.removeChild(C)}catch(l){console.error("Lỗi in hóa đơn: ",l)}},M=t=>{console.log(`PAGE ${t}`),c(t)},K=t=>{g(t),c(1)},W=t=>{b(t.target.value)},q=(t,l)=>{t==="tuNgay"&&l!==null?p(l):t==="denNgay"&&l!==null&&j(l),console.table(o,s)},U=async()=>{try{const t=await te();t.status_code===201&&(alert("Thông báo Oke : "+t.data.ma),B())}catch(t){alert("Thông báo Error : "+t.response.data.error)}};r.useEffect(()=>{B()},[o,s,i,d,h,n]);const V=t=>{c(1),a(t),u(t)};return e.jsxs(e.Fragment,{children:[e.jsx(pe,{handleSearch:K,handleCreateBill:U,onDateChange:q,fromDate:o,toDate:s,handleBillTypeChange:W,handlePrint:_}),e.jsx(ye,{activeKey:f,handleTabChange:V,bills:k,page:n,pageSize:m,total:R,onPageChange:M})]})}export{$e as default};