import{r as t,a as De,b as Pe,c as K,j as e,G as i,d as Q,T as L,e as m,f as c,I as U,h as Y,F as N,i as H,B as Z,k as ee,D as ve,m as Ge,A as Fe}from"./index-BmIX3_3w.js";import{B as u,u as Ke,d as Le}from"./bignumber-CG0NSVMW.js";import{d as Ne}from"./AttachMoney-7qOnVJkv.js";import{c as He,a as w,b as we,d as ne,e as Be}from"./index.esm-Vr9sRYg-.js";import{g as Ie,a as Ee,b as ae}from"./customerService-2CZdIr01.js";import{d as We}from"./ArrowBack-D56lEcMy.js";import{R as Ae,a as re}from"./RadioGroup-CzZcL5RC.js";import{F as ie}from"./FormControlLabel-nmLt3JMn.js";import{M as b}from"./MenuItem-ByEqL40d.js";import{F as $e}from"./Fab-DCOhgBUb.js";import{T as qe,a as Oe,b as Ve,c as te,d as Re}from"./TableRow-COUS1y_I.js";import{T as h}from"./TableCell-BAoyJBRv.js";import{C as oe}from"./Checkbox-BoigrYEl.js";import{P as Me}from"./Pagination-DPNaazyn.js";import{S as ze}from"./Snackbar-OfUUkmGu.js";import{D as _e,a as Xe,b as Je,c as Qe}from"./DialogTitle-DH_KFVlR.js";import{D as Ue}from"./DialogContentText-CMYJID_S.js";import"./request-BL6vn_vs.js";import"./SwitchBase-CzMjO0Un.js";import"./LastPage-YRoveXFG.js";function jn(){const[g,B]=t.useState("%"),[S,I]=t.useState([]),[s,j]=t.useState([]),[p,E]=t.useState(1),[se,le]=t.useState(0),[Ye,W]=t.useState(!1),{id:y}=De(),A=Pe();t.useState(null);const[T,d]=t.useState({open:!1,message:"",severity:"success"}),[he,$]=t.useState(!1),[D,ce]=t.useState(!1),[x,q]=t.useState(""),[f,ue]=t.useState(""),[ge,P]=t.useState(!1),de=He({tenPhieu:w().required("Tên phiếu giảm giá là bắt buộc"),giaTri:w().required("Giá trị là bắt buộc").test("is-valid-value",(n,r)=>{if(!n)return r.createError({message:"Giá trị là bắt buộc"});const o=new u(n.replace(/\./g,""));if(g==="%"){if(!o.isGreaterThan(0))return r.createError({message:"Giá trị phải lớn hơn 0%"});if(!o.isLessThanOrEqualTo(100))return r.createError({message:"Giá trị không được vượt quá 100%"});if(!o.isLessThanOrEqualTo(2e6))return r.createError({message:"Giá trị giảm không được vượt quá 2,000,000"})}else if(g==="$"){if(!o.isGreaterThan(0))return r.createError({message:"Giá trị phải lớn hơn 0$"});if(!o.isLessThanOrEqualTo(2e6))return r.createError({message:"Giá trị giảm không được vượt quá 2,000,000"})}else return r.createError({message:"Loại phiếu không hợp lệ"});return!0}),soLuong:we().required("Số lượng là bắt buộc").positive("Số lượng phải lớn hơn 0").integer("Số lượng phải là số nguyên"),dieuKien:w().required("Điều kiện là bắt buộc").test("is-big-decimal","Điều kiện phải lớn hơn 10",n=>n?new u(n.replace(/\./g,"")).isGreaterThan(10):!1),tuNgay:ne().min(new Date,"Từ ngày phải là ngày trong tương lai").required("Từ ngày là bắt buộc"),denNgay:ne().min(Be("tuNgay"),"Đến ngày phải sau từ ngày").required("Đến ngày là bắt buộc")});t.useEffect(()=>{debugger;me()},[p,x,f,y]);const me=async()=>{W(!0);try{let n;x&&f==""?n=await Ie(p-1,x):f!==""&&x==""?n=await Ee(p-1,f):f==""&&x==""&&(n=await ae(p-1)),I(n.content),le(n.totalPages)}catch(n){console.error(n)}finally{W(!1)}};t.useEffect(()=>{pe(),Ce()},[y]);const pe=async()=>{try{const n=await ae(p-1);I(n.content)}catch(n){console.error(n)}},xe=n=>{const r={width:"100px",textAlign:"center"};switch(n){case 0:return e.jsx(m,{label:"Đồng",color:"default",sx:{...r,backgroundColor:"#CD853F",color:"#FFFFFF"}});case 1:return e.jsx(m,{label:"Bạc",color:"default",sx:{...r,backgroundColor:"#C0C0C0",color:"#000000"}});case 2:return e.jsx(m,{label:"Vàng",color:"default",sx:{...r,backgroundColor:"#FFD700",color:"#000000"}});case 3:return e.jsx(m,{label:"Bạch Kim",color:"default",sx:{...r,backgroundColor:"#E5E4E2",color:"#000000"}});case 4:return e.jsx(m,{label:"Kim Cương",color:"default",sx:{...r,backgroundColor:"#363636",color:"#FFFFFF"}});default:return e.jsx(m,{label:"Không xác định",color:"default",sx:{...r,backgroundColor:"#FFFFFF",color:"#000000"}})}},fe=n=>{const r=n.target.value;ue(r),E(1),q("")},be=()=>{A("/phieugiamgia/danhsachphieugiamgia")};t.useEffect(()=>{console.log("Danh sách khách hàng đã chọn:",s)},[]),t.useEffect(()=>{s.length>a.values.soLuong&&(a.setFieldValue("soLuong",s.length),d({open:!0,message:`Số lượng khách hàng đã chọn (${s.length}) nhiều hơn số lượng phiếu đã nhập, số lượng phiếu đã được tự động điều chỉnh.`,severity:"info"}))},[s]);const a=Ke({initialValues:{tenPhieu:"",giaTri:"",giaTriToiDa:"",soLuong:"",dieuKien:"",tuNgay:"",denNgay:"",kieu:"1"},validationSchema:de,onSubmit:async(n,{setErrors:r,validateForm:o})=>{var _,X;const C=await o();if(Object.keys(C).length>0){r(C);return}try{if(P(!0),n.kieu==="2"&&s.length>n.soLuong){d({open:!0,message:`Số lượng khách hàng được chọn (${s.length}) nhiều hơn số lượng phiếu (${n.soLuong}). Vui lòng tăng số lượng phiếu.`,severity:"error"});return}if(n.kieu==="2"&&s.length<1){d({open:!0,message:"Vui lòng chọn khách hàng cho phiếu giảm giá.",severity:"error"});return}const G=new u(String(n.giaTri).replace(/\./g,"")),F=n.giaTriToiDa===""||n.giaTriToiDa==null?new u(0):new u(String(n.giaTriToiDa).replace(/\./g,""));if(n.giaTriToiDa==null||n.giaTriToiDa===""){r({giaTriToiDa:"Giá trị tối đa không được để trống."});return}if(g==="$"&&!F.isEqualTo(G)){r({giaTriToiDa:"Giá trị tối đa phải bằng với giá trị giảm giá khi loại chiết khấu là tiền."});return}if(g==="%"&&!F.isLessThanOrEqualTo(2e6)){r({giaTriToiDa:"Giá trị giảm không được vượt quá 2,000,000."});return}const k={ten:n.tenPhieu,giaTriDonToiThieu:new u(String(n.dieuKien).replace(/\./g,"")).toFixed(),ngayBatDau:R(n.tuNgay),ngayHetHan:R(n.denNgay),loaiGiamGia:g==="%"?1:2,giaTriGiamGia:new u(String(n.giaTri).replace(/\./g,"")).toFixed(),giamToiDa:n.giaTriToiDa===""?null:new u(String(n.giaTriToiDa).replace(/\./g,"")).toFixed(),phamViApDung:n.kieu,soLuong:n.soLuong,listKhachHang:s};let J;y?(J=await K.put(`http://localhost:8080/api/coupons/update/${y}`,k),d({open:!0,message:"Phiếu giảm giá đã được cập nhật thành công!",severity:"success"})):(J=await K.post("http://localhost:8080/api/coupons/add",k),d({open:!0,message:"Phiếu giảm giá đã được tạo thành công!",severity:"success"})),setTimeout(()=>{A("/phieugiamgia/danhsachphieugiamgia")},3e3)}catch(G){const k=(((X=(_=G.response)==null?void 0:_.data)==null?void 0:X.error)||"Đã xảy ra lỗi!").split(":")[1].split(":")[0].trim();d({open:!0,message:`Lỗi: ${k}`,severity:"error"})}finally{P(!1)}}}),O=n=>{B(n)},ye=n=>{j(r=>{const o=Array.isArray(r)&&r.includes(n)?r.filter(C=>C!==n):[...Array.isArray(r)?r:[],n];return console.log("Selected KhachHang within handler:",o),o})},V=n=>[{id:0,name:"Chưa áp dụng",color:"gray"},{id:1,name:"Đang áp dụng",color:"green"},{id:2,name:"Đã hết hạn",color:"red"},{id:3,name:"Đã hủy",color:"orange"}].find(o=>o.id===n)||{name:"Không xác định",color:"default"},je=(n,r)=>{E(r)},Te=n=>{const r={year:"numeric",month:"2-digit",day:"2-digit"};return new Date(n).toLocaleDateString("vi-VN",r)};function R(n){return n?n.length===16?`${n}:00`:(n.length===19,n):""}const M=()=>{d({...T,open:!1}),P(!1)},Ce=async()=>{try{debugger;const r=(await K.get(`http://localhost:8080/api/coupons/detail/${y}`)).data;a.setValues({stat:r.data.trangThai,maPhieu:r.data.ma,tenPhieu:r.data.ten,giaTri:r.data.giaTriGiamGia,giaTriToiDa:r.data.giamToiDa,soLuong:r.data.soLuong,dieuKien:r.data.giaTriDonToiThieu,tuNgay:r.data.ngayBatDau,denNgay:r.data.ngayHetHan,kieu:r.data.phamViApDung.toString()}),B(r.data.loaiGiamGia===1?"%":"$");const o=r.data.khachHangPhieuGiamGias||[];j(o)}catch(n){console.error("Error fetching coupon detail:",n)}},l=location.pathname.includes("/phieugiamgia/chitietphieugiamgia"),ke=()=>{$(!0)},v=n=>{$(!1),n&&a.handleSubmit()};function z(n){return String(n||"").replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".")}const Se=()=>{j(D?[]:S.map(n=>n.id)),ce(!D)};return e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:6,children:e.jsxs(Q,{style:{padding:"16px",height:"100%"},children:[l&&e.jsxs(i,{item:!0,xs:12,sx:{mb:2},children:[e.jsx(L,{variant:"h6",children:"Trạng thái phiếu:"}),e.jsx(m,{label:V(a.values.stat).name,sx:{backgroundColor:V(a.values.stat).color,color:"white",fontWeight:"bold"}})]}),e.jsxs("form",{onSubmit:a.handleSubmit,children:[e.jsx(c,{label:"Mã Phiếu Giảm Giá",name:"maPhieu",fullWidth:!1,margin:"normal",value:a.values.maPhieu,onChange:a.handleChange,error:a.touched.maPhieu&&!!a.errors.maPhieu,helperText:a.touched.maPhieu&&a.errors.maPhieu,InputProps:{readOnly:!0,inputProps:{tabIndex:-1},sx:{pointerEvents:"none",backgroundColor:"rgba(0, 0, 0, 0.04)"}},InputLabelProps:{shrink:!0},sx:{width:"200px"}}),e.jsx(c,{label:"Tên Phiếu Giảm Giá",name:"tenPhieu",fullWidth:!0,margin:"normal",InputProps:{readOnly:l},value:a.values.tenPhieu,onChange:a.handleChange,error:a.touched.tenPhieu&&!!a.errors.tenPhieu,helperText:a.touched.tenPhieu&&a.errors.tenPhieu}),e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:6,children:e.jsx(c,{label:"Giá trị giảm giá",name:"giaTri",fullWidth:!0,margin:"normal",value:a.values.giaTri,onChange:a.handleChange,error:a.touched.giaTri&&!!a.errors.giaTri,helperText:a.touched.giaTri&&a.errors.giaTri,InputProps:{readOnly:l,endAdornment:e.jsxs(U,{position:"end",children:[e.jsx(Y,{onClick:()=>{l||O("%")},color:g==="%"?"primary":"default",children:e.jsx(Le,{})}),e.jsx(Y,{onClick:()=>{l||O("$")},color:g==="$"?"primary":"default",children:e.jsx(Ne,{})})]})}})}),e.jsx(i,{item:!0,xs:6,children:e.jsx(c,{label:" Giá trị giảm giá tối đa",name:"giaTriToiDa",fullWidth:!0,margin:"normal",value:z(a.values.giaTriToiDa),onChange:a.handleChange,error:a.touched.giaTriToiDa&&!!a.errors.giaTriToiDa,helperText:a.touched.giaTriToiDa&&a.errors.giaTriToiDa,InputProps:{readOnly:l,endAdornment:e.jsx(U,{position:"end",children:e.jsx(L,{sx:{color:"orange",fontWeight:"bold"},children:"₫"})})}})})]}),e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:6,children:e.jsx(c,{label:"Số lượng",value:a.values.soLuong,onChange:a.handleChange,variant:"outlined",fullWidth:!0,margin:"normal",name:"soLuong",helperText:a.touched.soLuong&&a.errors.soLuong?a.errors.soLuong:"",error:a.touched.soLuong&&!!a.errors.soLuong})}),e.jsx(i,{item:!0,xs:6,children:e.jsx(c,{label:"Giá trị đơn tối thiểu",name:"dieuKien",fullWidth:!0,margin:"normal",InputProps:{readOnly:l},value:z(a.values.dieuKien),onChange:a.handleChange,error:a.touched.dieuKien&&!!a.errors.dieuKien,helperText:a.touched.dieuKien&&a.errors.dieuKien})})]}),e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:6,children:e.jsx(c,{label:"Từ ngày",name:"tuNgay",type:"datetime-local",fullWidth:!0,margin:"normal",InputProps:{readOnly:l},value:a.values.tuNgay,onChange:a.handleChange,InputLabelProps:{shrink:!0},error:a.touched.tuNgay&&!!a.errors.tuNgay,helperText:a.touched.tuNgay&&a.errors.tuNgay})}),e.jsx(i,{item:!0,xs:6,children:e.jsx(c,{label:"Đến ngày",name:"denNgay",type:"datetime-local",fullWidth:!0,margin:"normal",InputProps:{readOnly:l},value:a.values.denNgay,InputLabelProps:{shrink:!0},onChange:a.handleChange,error:a.touched.denNgay&&!!a.errors.denNgay,helperText:a.touched.denNgay&&a.errors.denNgay})})]}),e.jsxs(i,{container:!0,justifyContent:"flex-start",alignItems:"center",spacing:2,children:[e.jsx(i,{item:!0,children:e.jsx(N,{component:"legend",children:"Phạm vi áp dụng"})}),e.jsx(i,{item:!0,children:e.jsxs(Ae,{row:!0,"aria-label":"phạm vi áp dụng",name:"kieu",value:a.values.kieu,onChange:n=>{l||a.handleChange(n)},children:[e.jsx(ie,{value:"1",control:e.jsx(re,{}),label:"Công khai"}),e.jsx(ie,{value:"2",control:e.jsx(re,{}),label:"Cá nhân hóa"})]})})]}),!l&&e.jsx(H,{fullWidth:!0,variant:"contained",sx:{mt:2},onClick:ke,disabled:ge,children:"Lưu"})]})]})}),e.jsx(i,{item:!0,xs:6,children:e.jsxs(Q,{style:{padding:"16px",height:"100%"},children:[e.jsx(L,{variant:"h6",gutterBottom:!0,children:"Chọn khách hàng"}),e.jsx(Z,{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",mb:2,p:2,sx:{backgroundColor:"white",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",borderRadius:"8px",width:"100%"},children:e.jsxs(i,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(i,{item:!0,xs:5,children:e.jsxs(ee,{fullWidth:!0,children:[e.jsx(N,{component:"legend",sx:{mb:1,fontWeight:"bold",fontSize:"1rem",color:"text.primary"},children:"Tìm kiếm"}),e.jsx(c,{value:x,onChange:n=>q(n.target.value),variant:"outlined",placeholder:"Nhập tên khách hàng",fullWidth:!0,InputProps:{style:{borderRadius:"8px"}}})]})}),e.jsx(ve,{orientation:"vertical",flexItem:!0,sx:{mx:2}}),e.jsx(i,{item:!0,xs:5,children:e.jsxs(ee,{fullWidth:!0,children:[e.jsx(N,{component:"legend",sx:{mb:1,fontWeight:"bold",fontSize:"1rem",color:"text.primary"},children:"Hạng khách hàng"}),e.jsxs(Ge,{labelId:"hang-khach-hang-label",id:"hang-khach-hang-select",value:f,onChange:fe,displayEmpty:!0,fullWidth:!0,sx:{borderRadius:"8px",backgroundColor:"white"},children:[e.jsx(b,{value:"",children:"-- Tất cả khách hàng --"}),e.jsx(b,{value:0,children:"Đồng"}),e.jsx(b,{value:1,children:"Bạc"}),e.jsx(b,{value:2,children:"Vàng"}),e.jsx(b,{value:3,children:"Bạch Kim"}),e.jsx(b,{value:4,children:"Kim Cương"})]})]})}),e.jsx($e,{color:"primary","aria-label":"back",sx:{position:"fixed",bottom:16,right:16},onClick:be,children:e.jsx(We,{})})]})}),e.jsx(qe,{children:e.jsxs(Oe,{children:[e.jsx(Ve,{children:e.jsxs(te,{children:[e.jsx(h,{padding:"checkbox",children:e.jsx(oe,{indeterminate:s.length>0&&s.length<S.length,checked:D,onChange:Se,disabled:l||a.values.kieu==="1"})}),e.jsx(h,{children:"Tên khách hàng"}),e.jsx(h,{children:"Số điện thoại"}),e.jsx(h,{children:"Ngày sinh"}),e.jsx(h,{children:"Hạng khách hàng"})]})}),e.jsx(Re,{children:S.map(n=>e.jsxs(te,{children:[e.jsx(h,{padding:"checkbox",children:e.jsx(oe,{checked:Array.isArray(s)&&s.includes(n.id),onChange:()=>ye(n.id),disabled:l||a.values.kieu==="1"})}),e.jsx(h,{children:n.ten}),e.jsx(h,{children:n.sdt}),e.jsx(h,{children:Te(n.ngaySinh)}),e.jsx(h,{children:xe(n.hangKhachHang)})]},n.id))})]})}),e.jsx(Z,{display:"fixed",justifyContent:"center",alignItems:"center",marginTop:2,children:e.jsx(Me,{count:se,page:p,onChange:je,color:"primary"})})]})}),e.jsx(ze,{open:T.open,autoHideDuration:6e3,onClose:M,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(Fe,{onClose:M,severity:T.severity,sx:{width:"100%"},children:T.message})}),e.jsxs(_e,{open:he,onClose:()=>v(!1),children:[e.jsx(Xe,{children:"Xác nhận"}),e.jsx(Je,{children:e.jsx(Ue,{children:"Bạn có chắc chắn muốn lưu thông tin phiếu giảm giá này?"})}),e.jsxs(Qe,{children:[e.jsx(H,{onClick:()=>v(!1),color:"primary",children:"Hủy"}),e.jsx(H,{onClick:()=>v(!0),color:"primary",autoFocus:!0,children:"Xác nhận"})]})]})]})}export{jn as default};