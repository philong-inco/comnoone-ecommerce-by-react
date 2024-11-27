import{r as o,a as Pe,b as we,x as Ee,c as j,j as e,G as A,d as G,f as g,I,h as ee,T as N,i as q,D as Oe,k as $e,B as y,A as Be}from"./index-C3AKKGhn.js";import{d as Le}from"./ArrowBack-BSWCBiuW.js";import{c as Ae,a as P,d as te}from"./index.esm-CJWcpH6S.js";import{u as qe,B as f,d as Fe}from"./bignumber-Cbt48CFM.js";import{d as We}from"./AttachMoney-YUlJ-oxG.js";import{g as Re,a as ae}from"./dotGiamGiaService-CxhqTxP5.js";import{R as He,a as re}from"./RadioGroup-xFXKg28N.js";import{F as ie}from"./FormControlLabel-iLD34csT.js";import{T as ne,a as se,b as oe,c as b,d as le}from"./TableRow-B_CqS-KR.js";import{T as n}from"./TableCell-H1HogFdd.js";import{C as ce}from"./Checkbox-DHgRZZm7.js";import{P as Me}from"./Pagination-CcmEuIBv.js";import{F as Ke}from"./Fab-B8uBxqEe.js";import{T as ze,a as Ve}from"./Tabs-C-VfpYyS.js";import{S as _e}from"./Snackbar-Dfcu8d7G.js";import{D as Xe,a as Qe,b as Ue,c as Je}from"./DialogTitle--OzXCsew.js";import{D as Ye}from"./DialogContentText-ByK0d3GZ.js";import"./SwitchBase-BbMjoehg.js";import"./LastPage-BFOqoU3v.js";import"./KeyboardArrowRight-CMlb_Nei.js";function yt(){const[F,W]=o.useState({}),[w,R]=o.useState([]),[p,H]=o.useState([]),[M,K]=o.useState({}),[he,z]=o.useState(!1),[V,de]=o.useState(0),{id:T}=Pe(),_=we(),X=Ee(),[S,m]=o.useState({open:!1,message:"",severity:"success"}),[Ze,E]=o.useState(!1),[d,Q]=o.useState(!1),[u,O]=o.useState("%"),[C,ue]=o.useState(1),[ge,pe]=o.useState(1),[$,Ie]=o.useState(5),[me,U]=o.useState(!1);o.useEffect(()=>{J(C,$)},[C,$]),o.useEffect(()=>{X.pathname.includes("/dotgiamgia/cauhinhdotgiamgia/view")?Q(!0):Q(!1)},[X,T]),o.useEffect(()=>{const t=async()=>{debugger;try{const a=await Promise.all(p.map(async r=>{const s=await ae(r);return{sanPhamId:r,productDetails:s.data.data}}));W(r=>{const s={...r};return a.forEach(({sanPhamId:l,productDetails:x})=>{s[l]=x}),s})}catch{m({open:!0,message:"không thể tìm được sản phẩm chi tiết",severity:"error"})}};p.length>0&&t()},[p]),o.useEffect(()=>{Ce(),J(C,$)},[T]);const J=async(t,a)=>{z(!0);try{const r=await Re(t-1,a);R(r.data||[]),pe(r.totalPage||1)}catch(r){console.error("Lỗi khi tải dữ liệu sản phẩm:",r),m({open:!0,message:"Lỗi khi tải dữ liệu sản phẩm",severity:"error"})}finally{z(!1)}},xe=(t,a)=>{ue(a)},fe=()=>{_("/dotgiamgia/danhsachdotgiamgia")},Te=async t=>{debugger;H(a=>{const r=a.includes(t)?a.filter(s=>s!==t):[...a,t];return F[t]||(async()=>{try{const l=(await ae(t)).data.data;W(x=>({...x,[t]:l}))}catch{m({open:!0,message:"Lỗi khi tải sản phẩm chi tiết",severity:"error"})}})(),r})},je=(t,a)=>{debugger;K(r=>{const s=r[t]||[];return s.includes(a.id)?{...r,[t]:s.filter(l=>l!==a.id)}:{...r,[t]:[...s,a.id]}})},ye=(t,a)=>{de(a)};function Y(t){return t?t.length===16?`${t}:00`:(t.length===19,t):""}const i=qe({initialValues:{tenPhieu:"",giaTri:"",giaTriToiDa:"",tuNgay:"",denNgay:"",loaiChietKhau:"1",moTa:""},validationSchema:Ae({tenPhieu:P().required("Tên đợt giảm giá là bắt buộc"),moTa:P().max(256,"Mô tả không được vượt quá 256 ký tự"),giaTri:P().required("Giá trị là bắt buộc").test("is-valid-value",(t,a)=>{if(!t)return a.createError({message:"Giá trị là bắt buộc"});const r=new f(t.replace(/\./g,""));if(u==="%"){if(!r.isGreaterThan(0))return a.createError({message:"Giá trị phải lớn hơn 0%"});if(!r.isLessThanOrEqualTo(100))return a.createError({message:"Giá trị không được vượt quá 100%"});if(!r.isLessThanOrEqualTo(2e6))return a.createError({message:"Giá trị không được vượt quá 2,000,000"})}else if(u==="$"){if(!r.isGreaterThan(0))return a.createError({message:"Giá trị phải lớn hơn 0$"});if(!r.isLessThanOrEqualTo(2e6))return a.createError({message:"Giá trị không được vượt quá 2,000,000"})}else return a.createError({message:"Loại phiếu không hợp lệ"});return!0}),giaTriToiDa:P().required("Giá trị tối đa không được để trống").test("is-correct-value","Giá trị tối đa không hợp lệ",function(t){const{giaTri:a}=this.parent,r=new f(a.replace(/\./g,"")),s=t?new f(t.replace(/\./g,"")):null;return u==="$"&&(!s||!s.isEqualTo(r))?this.createError({message:"Giá trị tối đa phải bằng với giá trị giảm giá khi loại chiết khấu là tiền."}):!0}),tuNgay:te().required("Ngày bắt đầu là bắt buộc").min(new Date,"Ngày bắt đầu phải từ hiện tại trở đi"),denNgay:te().required("Ngày kết thúc là bắt buộc").when("tuNgay",(t,a)=>a.min(t,"Ngày kết thúc phải sau ngày bắt đầu"))}),onSubmit:async(t,{setErrors:a,validateForm:r})=>{const s=await r();if(Object.keys(s).length>0){a(s);return}try{E(!0);const l=Object.values(M).flat(),x=new f(String(t.giaTri).replace(/\./g,"")),c=t.giaTriToiDa===""?new f(0):new f(String(t.giaTriToiDa).replace(/\./g,""));if(u==="$"&&!c.isEqualTo(x)){a({giaTriToiDa:"Giá trị tối đa phải bằng với giá trị giảm giá khi loại chiết khấu là tiền."});return}if(u==="%"&&!c.isLessThanOrEqualTo(2e6)){a({giaTriToiDa:"Giá trị giảm không được vượt quá 2,000,000"});return}const h={ten:t.tenPhieu,moTa:t.moTa,giaTriGiam:t.giaTri,giamToiDa:t.giaTriToiDa===""?null:new f(String(t.giaTriToiDa).replace(/\./g,"")).toFixed(),loaiChietKhau:u==="%"?1:2,thoiGianBatDau:Y(t.tuNgay),thoiGianKetThuc:Y(t.denNgay),listSanPhamChiTiet:l};let v;T?(v=await j.put(`http://localhost:8080/api/v1/discounts/update/${T}`,h),m({open:!0,message:"Đợt giảm giá đã được cập nhật thành công!",severity:"success"})):(v=await j.post("http://localhost:8080/api/v1/discounts/add",h),m({open:!0,message:"Đợt giảm giá đã được tạo thành công!",severity:"success"})),setTimeout(()=>{_("/dotgiamgia/danhsachdotgiamgia")},3e3)}catch(l){l.response&&l.response.data&&l.response.data.errors?a(l.response.data.errors):(console.log(l),m({open:!0,message:"Đã xảy ra lỗi!",severity:"error"}))}finally{E(!1)}}}),B=t=>{U(!1),t&&i.handleSubmit()},Z=()=>{m({...S,open:!1}),E(!1)},be=()=>{U(!0)};function Se(t){return String(t||"").replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".")}const Ce=async()=>{try{debugger;const a=(await j.get(`http://localhost:8080/api/v1/discounts/${T}`)).data;i.setValues({stat:a.trangThai,maPhieu:a.ma,tenPhieu:a.ten,moTa:a.moTa,giaTri:a.giaTriGiam,tuNgay:a.thoiGianBatDau,denNgay:a.thoiGianKetthuc,giaTriToiDa:a.giamToiDa}),O(a.loaiChietKhau===1?"%":"$");const r=a.spctDotGiamGias||[],s=await Promise.all(r.map(async c=>(await j.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-productdetail-id?idProductDetail=${c}`)).data.data)),l=s.map(c=>parseInt(c.sanPhamId)).filter((c,h,v)=>!isNaN(c)&&v.indexOf(c)===h),x=s.reduce((c,h)=>(c[h.sanPhamId]||(c[h.sanPhamId]=[]),c[h.sanPhamId].push(h.id),c),{});H(l),K(x)}catch(t){console.error("Error fetching DGG detail:",t)}},[L,ke]=o.useState("0"),De=t=>{const a=t.target.value.toString().trim();L==="0"?D(r=>({...r,tenSanPham:a,ma:""})):L==="1"&&D(r=>({...r,ma:a,tenSanPham:""}))},ve=t=>{const a=t.target.value;ke(a),a==="0"?D(r=>({...r,tenSanPham:k.ma,ma:""})):a==="1"&&D(r=>({...r,ma:k.tenSanPham,tenSanPham:""}))};o.useState(0);const Ge="http://localhost:8080/api/san-pham/find/filter-id?",[k,D]=o.useState({page:0,size:"5",tenSanPham:"",ma:"",trangThai:1});o.useEffect(()=>{Ne()},[k]);const Ne=async()=>{const t=Object.entries(k).filter(([s,l])=>l!=="").map(([s,l])=>`${s}=${l}`).join("&"),a=Ge+t,r=await j.get(a);R(r.data.data),setTotalElement(parseInt(r.data.totalElement))};return e.jsxs(A,{container:!0,spacing:2,children:[e.jsx(A,{item:!0,xs:4,children:e.jsx(G,{style:{padding:"16px",height:"100%"},children:e.jsxs("form",{onSubmit:i.handleSubmit,children:[e.jsx(g,{label:"Mã Đợt Giảm Giá",name:"maPhieu",fullWidth:!0,margin:"normal",value:i.values.maPhieu,onChange:i.handleChange,InputProps:{readOnly:!0},InputLabelProps:{shrink:!0}}),e.jsx(g,{label:"Tên Đợt Giảm Giá",name:"tenPhieu",fullWidth:!0,margin:"normal",value:i.values.tenPhieu,onChange:i.handleChange,error:i.touched.tenPhieu&&!!i.errors.tenPhieu,helperText:i.touched.tenPhieu&&i.errors.tenPhieu}),e.jsx(g,{label:"Giá trị phiếu",name:"giaTri",fullWidth:!0,margin:"normal",value:i.values.giaTri,onChange:i.handleChange,error:i.touched.giaTri&&!!i.errors.giaTri,helperText:i.touched.giaTri&&i.errors.giaTri,InputProps:{readOnly:d,endAdornment:e.jsxs(I,{position:"end",children:[e.jsx(ee,{onClick:()=>!d&&O("%"),color:u==="%"?"primary":"default",children:e.jsx(Fe,{})}),e.jsx(ee,{onClick:()=>!d&&O("$"),color:u==="$"?"primary":"default",children:e.jsx(We,{})})]})}}),e.jsx(g,{label:" Giá trị giảm giá tối đa",name:"giaTriToiDa",fullWidth:!0,margin:"normal",value:Se(i.values.giaTriToiDa),onChange:i.handleChange,error:i.touched.giaTriToiDa&&!!i.errors.giaTriToiDa,helperText:i.touched.giaTriToiDa&&i.errors.giaTriToiDa,InputProps:{readOnly:d,endAdornment:e.jsx(I,{position:"end",children:e.jsx(N,{sx:{color:"orange",fontWeight:"bold"},children:"₫"})})}}),e.jsx(g,{label:"Từ ngày",name:"tuNgay",type:"datetime-local",fullWidth:!0,margin:"normal",InputProps:{readOnly:d},value:i.values.tuNgay,onChange:i.handleChange,InputLabelProps:{shrink:!0},error:i.touched.tuNgay&&!!i.errors.tuNgay,helperText:i.touched.tuNgay&&i.errors.tuNgay}),e.jsx(g,{label:"Đến ngày",name:"denNgay",type:"datetime-local",fullWidth:!0,margin:"normal",InputProps:{readOnly:d},value:i.values.denNgay,onChange:i.handleChange,InputLabelProps:{shrink:!0},error:i.touched.denNgay&&!!i.errors.denNgay,helperText:i.touched.denNgay&&i.errors.denNgay}),e.jsx(g,{label:"Mô tả đợt giảm giá",name:"moTa",fullWidth:!0,margin:"normal",value:i.values.moTa,InputLabelProps:{shrink:!0},onChange:i.handleChange,error:i.touched.moTa&&!!i.errors.moTa,helperText:i.touched.moTa&&i.errors.moTa,sx:{fontFamily:"Arial, sans-serif"}}),!d&&e.jsx(q,{fullWidth:!0,variant:"contained",sx:{mt:2},onClick:be,children:"Lưu"})]})})}),e.jsxs(A,{item:!0,xs:8,children:[e.jsxs(G,{style:{padding:"16px",height:"100%"},children:[e.jsx(N,{variant:"h6",children:"Danh sách sản phẩm"}),e.jsx(Oe,{}),e.jsxs("div",{style:{display:"flex",padding:10,paddingTop:20},children:[e.jsx(g,{sx:{maxHeight:"10px"},color:"secondary",onChange:De,id:"outlined-basic",label:"Nhập từ khóa",variant:"outlined"}),e.jsx("div",{style:{marginLeft:10,display:"flex",alignItems:"center"},children:e.jsx($e,{children:e.jsxs(He,{"aria-labelledby":"demo-controlled-radio-buttons-group",name:"controlled-radio-buttons-group",value:L,row:!0,onChange:ve,children:[e.jsx(ie,{value:"0",control:e.jsx(re,{color:"secondary",size:"small"}),label:"Tên"}),e.jsx(ie,{value:"1",control:e.jsx(re,{color:"secondary",size:"small"}),label:"Mã"})]})})})]}),he?e.jsx(N,{children:"Đang tải dữ liệu..."}):e.jsx(ne,{component:G,style:{marginTop:"16px"},children:e.jsxs(se,{children:[e.jsx(oe,{children:e.jsxs(b,{children:[e.jsx(n,{sx:{textAlign:"center"},children:"Mã sản phẩm"}),e.jsx(n,{sx:{textAlign:"center"},children:"Tên sản phẩm"}),e.jsx(n,{sx:{textAlign:"center"},children:"Trạng Thái"}),e.jsx(n,{sx:{textAlign:"center"},children:"Chọn"})]})}),e.jsx(le,{children:w.length>0?w.map(t=>e.jsxs(b,{children:[e.jsx(n,{sx:{textAlign:"center"},children:t.ma}),e.jsx(n,{sx:{textAlign:"center"},children:t.ten}),e.jsx(n,{sx:{textAlign:"center"},children:e.jsx(y,{sx:{backgroundColor:t.trangThai===1?"#4caf50":"#f44336",color:"#ffffff",padding:"6px 12px",borderRadius:"12px",textAlign:"center",fontWeight:"bold"},children:t.trangThai===1?"Hoạt động":"Đã tắt"})}),e.jsx(n,{sx:{textAlign:"center"},children:e.jsx(ce,{checked:p.includes(t.id),onChange:()=>Te(t.id),disabled:d})})]},t.id)):e.jsx(b,{children:e.jsx(n,{colSpan:4,children:e.jsx(N,{variant:"body2",color:"textSecondary",align:"center",children:"Không có sản phẩm nào"})})})})]})}),e.jsx(y,{display:"fixed",justifyContent:"center",alignItems:"center",marginTop:2,children:e.jsx(Me,{count:ge,page:C,onChange:xe,color:"primary"})})]}),e.jsxs(Ke,{color:"primary","aria-label":"back",sx:{position:"fixed",bottom:16,right:16},onClick:fe,children:[e.jsx(Le,{})," "]})]}),e.jsxs(y,{sx:{marginTop:4},children:[e.jsx(ze,{value:V,onChange:ye,children:p.map(t=>{const a=w.find(r=>r.id===t);return e.jsx(Ve,{label:a?`${a.ten}`:`Sản phẩm ${t}`},t)})}),p.map(t=>{var a;return V===p.indexOf(t)&&e.jsx(y,{sx:{marginTop:2},children:e.jsx(ne,{component:G,children:e.jsxs(se,{children:[e.jsx(oe,{children:e.jsxs(b,{children:[e.jsx(n,{children:"Chọn"}),e.jsx(n,{children:"Giá bán"}),e.jsx(n,{children:"Bàn phím"}),e.jsx(n,{children:"CPU"}),e.jsx(n,{children:"Hệ điều hành"}),e.jsx(n,{children:"Màn hình"}),e.jsx(n,{children:"Màu sắc"}),e.jsx(n,{children:"RAM"}),e.jsx(n,{children:"VGA"}),e.jsx(n,{children:"Webcam"}),e.jsx(n,{children:"Trạng thái"})]})}),e.jsx(le,{children:(a=F[t])==null?void 0:a.map(r=>{var s;return e.jsxs(b,{children:[e.jsx(n,{children:e.jsx(ce,{checked:((s=M[t])==null?void 0:s.includes(r.id))||!1,onChange:()=>je(t,r),disabled:d})}),e.jsx(n,{children:r.giaBan}),e.jsx(n,{children:r.banPhim}),e.jsx(n,{children:r.cpu}),e.jsx(n,{children:r.heDieuHanh}),e.jsx(n,{children:r.manHinh}),e.jsx(n,{children:r.mauSac}),e.jsx(n,{children:r.ram}),e.jsx(n,{children:r.vga}),e.jsx(n,{children:r.webcam}),e.jsxs(n,{children:[" ",e.jsx(y,{sx:{display:"inline-block",padding:"4px 8px",borderRadius:"8px",backgroundColor:r.trangThai===0?"error.light":"success.light",color:r.trangThai===0?"error.dark":"success.dark",fontWeight:"bold"},children:r.trangThai===0?"Không hoạt động":"Hoạt động"})]})]},r.id)})})]})})},t)})]}),e.jsx(_e,{open:S.open,autoHideDuration:6e3,onClose:Z,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(Be,{onClose:Z,severity:S.severity,sx:{width:"100%"},children:S.message})}),e.jsxs(Xe,{open:me,onClose:()=>B(!1),children:[e.jsx(Qe,{children:"Xác nhận"}),e.jsx(Ue,{children:e.jsx(Ye,{children:"Bạn có chắc chắn muốn lưu thông tin phiếu giảm giá này?"})}),e.jsxs(Je,{children:[e.jsx(q,{onClick:()=>B(!1),color:"primary",children:"Hủy"}),e.jsx(q,{onClick:()=>B(!0),color:"primary",autoFocus:!0,children:"Xác nhận"})]})]})]})}export{yt as default};
