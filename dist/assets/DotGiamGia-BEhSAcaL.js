import{Z as ce,$ as de,j as e,r as n,b as he,B as T,G as i,n as h,f as v,I as ge,t as ue,o as xe,h as g,p as me,d as je,E as D,m as u}from"./index-BIssY3ES.js";import{d as pe}from"./Add-CSRCs860.js";import{d as fe}from"./Visibility-CfVsX825.js";import{d as Ce,a as be,b as Se}from"./DeleteSweep-_VCGk6Tu.js";import{l as ye,d as Te,s as ve,b as De}from"./dotGiamGiaService-jBadcmU4.js";import{M as x}from"./MenuItem-DXPtbgVP.js";import{T as ke,a as we,b as Pe,c as k,d as Ie}from"./TableRow-DRER82D7.js";import{T as t}from"./TableCell-BTwc7VYq.js";import{S as Ge}from"./Switch-CEN9aA3z.js";import{T as Re}from"./TablePagination-FwlX19aN.js";import{D as O,a as F,b as _,c as E}from"./DialogTitle-CNaKTOiI.js";import{D as H}from"./DialogContentText-BUcCQ4bP.js";import{S as Be,A as Me}from"./Snackbar-DXnsCQKE.js";import"./KeyboardArrowRight-DCS3bnxJ.js";import"./LastPage-DAj5RLva.js";import"./Close-DqFvtwpG.js";var w={},Oe=de;Object.defineProperty(w,"__esModule",{value:!0});var W=w.default=void 0,Fe=Oe(ce()),_e=e;W=w.default=(0,Fe.default)((0,_e.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search");function Ye(){const[m,P]=n.useState(1),[K,$]=n.useState(0),[I,A]=n.useState([]),[s,G]=n.useState({tenOrMa:"",giaTri:"",trangThai:"",ngayBatDau:"",ngayKetThuc:"",size:5}),[o,N]=n.useState(5),[z,j]=n.useState(!1),[L,l]=n.useState(""),[X,p]=n.useState("success"),[q,f]=n.useState(!1),[V,C]=n.useState(!1),[b,S]=n.useState(null),[Z,J]=n.useState(null),y=he(),c=async()=>{try{const a=await ye({...s,size:o,page:m-1});A(a.data.content),$(a.data.totalPages)}catch(a){console.error("Error fetching coupons:",a)}};n.useEffect(()=>{const a=setInterval(()=>{c()},2e3);return()=>clearInterval(a)},[]),n.useEffect(()=>{c()},[m,o,s]);const d=a=>{G({...s,[a.target.name]:a.target.value})},Q=(a,r)=>{P(r+1)},U=a=>{N(parseInt(a.target.value,10)),P(1)},Y=a=>{y(`/dotgiamgia/cauhinhdotgiamgia/view/${a}`)},ee=a=>{y(`/dotgiamgia/cauhinhdotgiamgia/edit/${a}`)},ae=a=>{S(a),f(!0)},R=()=>{f(!1)},te=()=>{y("/dotgiamgia/cauhinhdotgiamgia")},ne=async()=>{await Te(b),f(!1),c(),l("Hủy đợt giảm giá thành công"),p("success"),j(!0)},B=()=>{C(!1),S(null)},re=(a,r)=>{S(a),J(r),C(!0)},se=async()=>{const a=Z===1?1:4;try{if(a===4)if((await ve(b)).status===200)l("Phiếu giảm giá đã được bắt đầu áp dụng.");else throw new Error("Có lỗi xảy ra khi bắt đầu áp dụng phiếu giảm giá.");else if(a===1)if((await De(b)).status===200)l("Phiếu giảm giá đã được ngừng áp dụng.");else throw new Error("Có lỗi xảy ra khi ngừng áp dụng phiếu giảm giá.");p("success"),c()}catch(r){console.error(r),l(r.message||"Cập nhật trạng thái thất bại."),p("error")}finally{j(!0),C(!1)}},M=()=>{j(!1)},ie=a=>{switch(a){case 0:return"gray";case 1:return"green";case 2:return"red";case 3:return"#FFA500";case 4:return"black";default:return"blue"}},oe=a=>{switch(a){case 0:return"Sắp Diễn Ra";case 1:return"Đang Diễn Ra";case 2:return"Đã Diễn Ra";case 3:return"Đã Hủy";case 4:return"Đang tạm dừng";default:return"Không xác định"}},le=()=>{G({tenOrMa:"",ngayBatDau:"",ngayKetThuc:"",trangThai:""})};return e.jsxs("div",{children:[e.jsx(T,{sx:{backgroundColor:"#f0f0f0",p:2,borderRadius:2,marginBottom:2},children:e.jsxs(T,{sx:{backgroundColor:"white",p:2,borderRadius:2},children:[e.jsxs(i,{container:!0,spacing:3,alignItems:"center",p:2,children:[e.jsx(i,{item:!0,xs:12,sm:3,children:e.jsx(h,{fullWidth:!0,variant:"outlined",children:e.jsx(v,{name:"tenOrMa",label:"Tên hoặc Mã",value:s.tenOrMa,onChange:d,variant:"outlined",InputProps:{startAdornment:e.jsx(ge,{position:"start",children:e.jsx(W,{})})},fullWidth:!0})})}),e.jsx(i,{item:!0,xs:12,sm:2,children:e.jsx(h,{fullWidth:!0,variant:"outlined",children:e.jsx(v,{name:"ngayBatDau",type:"datetime-local",label:"Ngày Bắt Đầu",InputLabelProps:{shrink:!0},value:s.ngayBatDau,onChange:d,fullWidth:!0})})}),e.jsx(i,{item:!0,xs:12,sm:2,children:e.jsx(h,{fullWidth:!0,variant:"outlined",children:e.jsx(v,{name:"ngayKetThuc",type:"datetime-local",label:"Ngày Kết Thúc",InputLabelProps:{shrink:!0},value:s.ngayKetThuc,onChange:d,fullWidth:!0})})}),e.jsx(i,{item:!0,xs:12,sm:2,children:e.jsxs(h,{fullWidth:!0,variant:"outlined",children:[e.jsx(ue,{children:"Trạng Thái"}),e.jsxs(xe,{name:"trangThai",value:s.trangThai,onChange:d,fullWidth:!0,label:"Trạng Thái",children:[e.jsx(x,{value:"",children:"Tất cả"}),e.jsx(x,{value:"0",children:"Sắp Diễn Ra"}),e.jsx(x,{value:"1",children:"Đang Diễn Ra"}),e.jsx(x,{value:"2",children:"Đã Diễn Ra"})]})]})}),e.jsx(i,{item:!0,xs:12,sm:2,children:e.jsx(g,{onClick:le,color:"secondary",sx:{border:"1px solid",borderRadius:2,padding:1,backgroundColor:"#f5f5f5",transition:"background-color 0.3s ease, box-shadow 0.3s ease",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)","&:hover":{backgroundColor:"#e0e0e0",boxShadow:"0 6px 12px rgba(0, 0, 0, 0.15)"},"& .MuiSvgIcon-root":{transition:"transform 0.3s ease"},"&:hover .MuiSvgIcon-root":{transform:"rotate(360deg)"}},children:e.jsx(Ce,{})})})]}),e.jsx(me,{color:"primary","aria-label":"add",sx:{position:"fixed",top:340,right:16,boxShadow:3},onClick:te,children:e.jsx(pe,{})})]})}),e.jsx(ke,{component:je,children:e.jsxs(we,{children:[e.jsx(Pe,{children:e.jsxs(k,{children:[e.jsx(t,{children:"STT"}),e.jsx(t,{children:"Mã đợt giảm giá"}),e.jsx(t,{children:"Tên đợt giảm giá"}),e.jsx(t,{children:"Ngày bắt đầu"}),e.jsx(t,{children:"Ngày kết thúc"}),e.jsx(t,{children:"Trạng thái"}),e.jsx(t,{children:"Chi tiết"}),e.jsx(t,{children:"Hành động"})]})}),e.jsx(Ie,{children:I.length>0?I.map((a,r)=>e.jsxs(k,{children:[e.jsx(t,{children:r+1}),e.jsx(t,{children:a.ma}),e.jsx(t,{children:a.ten}),e.jsx(t,{children:a.thoiGianBatDau}),e.jsx(t,{children:a.thoiGianKetthuc}),e.jsx(t,{children:e.jsx(T,{sx:{backgroundColor:ie(a.trangThai),color:"white",padding:"5px 10px",borderRadius:"8px",textAlign:"center",width:"120px",fontWeight:"bold"},children:oe(a.trangThai)})}),e.jsx(t,{children:e.jsx(D,{title:"Xem chi tiết",children:e.jsx(g,{onClick:()=>Y(a.id),children:e.jsx(fe,{})})})}),e.jsxs(t,{children:[(a.trangThai===0||a.trangThai===4)&&e.jsx(e.Fragment,{children:e.jsx(g,{color:"secondary",onClick:()=>ee(a.id),children:e.jsx(D,{title:"Chỉnh sửa",children:e.jsx(be,{})})})}),(a.trangThai===0||a.trangThai===1||a.trangThai===4)&&e.jsx(e.Fragment,{children:e.jsx(D,{title:"Hủy đợt giảm giá",children:e.jsx(g,{color:"error",onClick:()=>ae(a.id),children:e.jsx(Se,{})})})}),(a.trangThai===1||a.trangThai===4)&&e.jsx(e.Fragment,{children:e.jsx(Ge,{checked:a.trangThai===1,onChange:()=>re(a.id,a.trangThai)})})]})]},a.id)):e.jsx(k,{children:e.jsx(t,{colSpan:7,align:"center",children:"Không có phiếu giảm giá nào"})})})]})}),e.jsx(Re,{rowsPerPageOptions:[5,10,25],component:"div",count:K*o,page:m-1,onPageChange:Q,rowsPerPage:o,onRowsPerPageChange:U}),e.jsxs(O,{open:q,onClose:R,children:[e.jsx(F,{children:"Xác nhận hủy phiếu"}),e.jsx(_,{children:e.jsx(H,{children:"Bạn có chắc chắn muốn hủy phiếu này? Hành động này không thể hoàn tác."})}),e.jsxs(E,{children:[e.jsx(u,{onClick:R,color:"primary",children:"Hủy bỏ"}),e.jsx(u,{onClick:ne,color:"secondary",autoFocus:!0,children:"Xác nhận"})]})]}),e.jsxs(O,{open:V,onClose:B,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(F,{id:"alert-dialog-title",children:"Xác nhận thay đổi trạng thái?"}),e.jsx(_,{children:e.jsx(H,{id:"alert-dialog-description",children:"Bạn có chắc chắn muốn thay đổi trạng thái của đợt giảm giá này không?"})}),e.jsxs(E,{children:[e.jsx(u,{onClick:B,children:"Hủy"}),e.jsx(u,{onClick:se,autoFocus:!0,children:"Đồng ý"})]})]}),e.jsx(Be,{open:z,autoHideDuration:3e3,onClose:M,anchorOrigin:{vertical:"top",horizontal:"center"},children:e.jsx(Me,{onClose:M,severity:X,variant:"filled",children:L})})]})}export{Ye as default};