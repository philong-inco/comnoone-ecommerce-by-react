import{b as he,r as a,c as v,j as e,T as de,G as n,B as q,f as p,k,F as ue,o as H,p as _,m as T,i as P,A as me}from"./index-C3AKKGhn.js";import{u as ge,C as c,o as pe}from"./yup-M5TWCxAM.js";import{c as xe,a as x,d as fe,b as je}from"./index.esm-CJWcpH6S.js";import{d as be}from"./ArrowBack-BSWCBiuW.js";import{L as ye,A as ve}from"./AdapterMoment-DCsWP2Qn.js";import{F as ke}from"./Fab-B8uBxqEe.js";import{R as Se,a as M}from"./RadioGroup-xFXKg28N.js";import{F as $}from"./FormControlLabel-iLD34csT.js";import{M as f}from"./MenuItem-BPROy0V0.js";import{C as De}from"./CircularProgress-B4W2MYSl.js";import{S as Ce}from"./Snackbar-Dfcu8d7G.js";import{D as we,a as _e,b as Te,c as Pe}from"./DialogTitle--OzXCsew.js";import{D as Ee}from"./DialogContentText-ByK0d3GZ.js";import"./useThemeProps-DrBApQ8I.js";import"./moment-G82_0lEo.js";import"./SwitchBase-BbMjoehg.js";const B=xe().shape({ten:x().max(50,"Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),email:x().email("Email không hợp lệ").required("Email không được để trống"),sdt:x().matches(/^\+?[0-9. ()-]{7,25}$/,"Số điện thoại không hợp lệ").required("Số điện thoại không được để trống"),ngay_sinh:fe().required("Ngày sinh không được để trống").max(new Date,"Ngày sinh phải là quá khứ hoặc hiện tại").test("age","Khách hàng phải từ 10 tuổi trở lên",j=>{if(!j)return!1;const h=new Date,d=new Date(j);let i=h.getFullYear()-d.getFullYear();const s=h.getMonth()-d.getMonth();return(s<0||s===0&&h.getDate()<d.getDate())&&i--,i>=10}),gioi_tinh:je().required("Giới tính không được để trống"),hinhAnh:x(),dia_chi:x().required("Địa chỉ chi tiết không được để trống !").max(256,"Địa chỉ không được vượt quá 256 ký tự")});function Ue(){const j=he(),{register:h,handleSubmit:d,control:i,formState:{errors:s}}=ge({resolver:pe(B)}),[S,O]=a.useState(""),[R,G]=a.useState([]),[K,z]=a.useState([]),[U,X]=a.useState([]),[u,Q]=a.useState(""),[m,Y]=a.useState(""),[E,J]=a.useState(""),[V,b]=a.useState(""),[F,Z]=a.useState(null),[ee,y]=a.useState(!1),[te,D]=a.useState(""),[re,C]=a.useState("success");a.useState(!1),a.useEffect(()=>{(async()=>{try{b(!0),await se()}catch{Z("Failed to fetch initial data")}finally{b(!1)}})()},[]),a.useEffect(()=>{u&&ae(u)},[u]),a.useEffect(()=>{m&&ne(m)},[m]),a.useEffect(()=>{var t;const r=Object.keys(s);if(r.length>0){const o=r[0],g=((t=s[o])==null?void 0:t.message)||"Đã xảy ra lỗi";D(g),C("error"),y(!0)}},[s]);const se=async()=>{try{const r=await v.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"}});G(r.data.data)}catch(r){throw console.error("Error fetching provinces:",r),r}},ae=async r=>{try{const t=await v.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"},params:{province_id:r}});z(t.data.data)}catch(t){throw console.error("Error fetching districts:",t),t}},ne=async r=>{try{const t=await v.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"},params:{district_id:r}});X(t.data.data)}catch(t){throw console.error("Error fetching wards:",t),t}},W=()=>{window.cloudinary.openUploadWidget({cloudName:"daljc2ktr",uploadPreset:"ovuxjxsx",sources:["local","url","camera","google_photos","facebook","dropbox","instagram"],multiple:!1,cropping:!0,folder:"customers_images"},(r,t)=>{!r&&t.event==="success"&&O(t.info.secure_url)})},I=()=>{y(!1)},N=()=>{j("/khachhang/danhsachkhachhang")},[ie,A]=a.useState(!1),[l,oe]=a.useState(null),ce=r=>{debugger;oe(r),A(!0)},w=async r=>{if(A(!1),r&&l){b(!0);try{let t={ten:l.ten,email:l.email,sdt:l.sdt,ngay_sinh:new Date(l.ngay_sinh).toISOString(),gioi_tinh:l.gioi_tinh,hinhAnh:S,idPhuongXa:E,idQuanHuyen:m,idTinhThanhPho:u,diaChiNhanHang:l.dia_chi};if(console.log(t),await B.validate(l),(await v.post("http://localhost:8080/api/khachhang/create",t,{headers:{"Content-Type":"application/json"}})).status===200)D("Dữ liệu khách hàng được thêm thành công!"),C("success"),y(!0),setTimeout(N,3e3);else throw new Error("Unexpected response status")}catch(t){le(t)}finally{b(!1)}}},le=r=>{debugger;let t="Có lỗi xảy ra khi xử lý yêu cầu!";if(r.response&&r.response.data){const o=r.response.data;if(o.message&&(t=o.message),o.error){const g=o.error.split(":").pop().trim();t=`${t}: ${g}`}if(o.errors&&Array.isArray(o.errors)){const g=o.errors.map(L=>L.message||L).join("; ");t=`${t}. Chi tiết: ${g}`}}else r.message&&(t=r.message);D(t),C("error"),y(!0)};return e.jsxs(ye,{dateAdapter:ve,children:[e.jsx(ke,{color:"primary","aria-label":"back",sx:{position:"fixed",bottom:16,right:16},onClick:N,children:e.jsx(be,{})}),e.jsx(de,{variant:"h1",gutterBottom:!0,style:{textAlign:"center",marginBottom:"5%"},children:"Thêm Khách Hàng"}),e.jsx("form",{onSubmit:d(ce),children:e.jsxs(n,{container:!0,spacing:3,children:[e.jsx(n,{item:!0,xs:12,md:4,children:e.jsx(q,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",children:S?e.jsx("img",{src:S,alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:W}):e.jsx("img",{src:"https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg",alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:W})})}),e.jsx(n,{item:!0,xs:12,md:8,children:e.jsxs(n,{container:!0,spacing:3,children:[e.jsx(n,{item:!0,xs:12,md:6,children:e.jsx(c,{name:"ten",control:i,render:({field:r})=>{var t;return e.jsx(p,{fullWidth:!0,label:"Họ và tên",variant:"outlined",InputLabelProps:{shrink:!0},...r,error:!!s.ten,helperText:(t=s.ten)==null?void 0:t.message,sx:{mb:2}})}})}),e.jsx(n,{item:!0,xs:12,md:6,children:e.jsx(c,{name:"sdt",control:i,render:({field:r})=>{var t;return e.jsx(p,{fullWidth:!0,label:"Số điện thoại",variant:"outlined",InputLabelProps:{shrink:!0},...h("sdt"),error:!!s.sdt,helperText:(t=s.sdt)==null?void 0:t.message,sx:{mb:2}})}})}),e.jsx(n,{item:!0,xs:12,md:6,children:e.jsx(c,{name:"email",control:i,render:({field:r})=>{var t;return e.jsx(p,{fullWidth:!0,label:"Email",variant:"outlined",InputLabelProps:{shrink:!0},...h("email"),error:!!s.email,helperText:(t=s.email)==null?void 0:t.message,sx:{mb:2}})}})}),e.jsx(n,{item:!0,xs:12,md:6,children:e.jsx(c,{name:"ngay_sinh",control:i,render:({field:r})=>{var t;return e.jsx(p,{type:"date",fullWidth:!0,label:"Ngày sinh",variant:"outlined",InputLabelProps:{shrink:!0},...r,error:!!s.ngay_sinh,helperText:(t=s.ngay_sinh)==null?void 0:t.message,sx:{mb:2}})}})}),e.jsx(n,{item:!0,xs:12,children:e.jsxs(k,{component:"fieldset",error:!!s.gioi_tinh,children:[e.jsx(ue,{component:"legend",children:"Giới tính *"}),e.jsx(c,{name:"gioi_tinh",control:i,render:({field:r})=>e.jsxs(Se,{...r,row:!0,children:[e.jsx($,{value:"1",control:e.jsx(M,{}),label:"Nam"}),e.jsx($,{value:"0",control:e.jsx(M,{}),label:"Nữ"})]})}),s.gioi_tinh&&e.jsx(H,{children:s.gioi_tinh.message})]})}),e.jsx(n,{item:!0,xs:12,md:4,children:e.jsxs(k,{fullWidth:!0,sx:{mb:2},children:[e.jsx(_,{children:"Tỉnh/Thành Phố *"}),e.jsx(c,{name:"idTinhThanhPho",control:i,render:({field:r})=>e.jsx(T,{...r,value:u,onChange:t=>Q(t.target.value),children:R.map(t=>e.jsx(f,{value:t.ProvinceID,children:t.ProvinceName},t.ProvinceID))})})]})}),e.jsx(n,{item:!0,xs:12,md:4,children:e.jsxs(k,{fullWidth:!0,sx:{mb:2},children:[e.jsx(_,{children:"Quận/Huyện *"}),e.jsx(c,{name:"district",control:i,render:({field:r})=>e.jsxs(T,{...r,value:m,onChange:t=>Y(t.target.value),children:[e.jsx(f,{value:"",children:"Chọn quận/huyện"}),K.map(t=>e.jsx(f,{value:t.DistrictID,children:t.DistrictName},t.DistrictID))]})})]})}),e.jsx(n,{item:!0,xs:12,md:4,children:e.jsxs(k,{fullWidth:!0,sx:{mb:2},children:[e.jsx(_,{children:"Phường/Xã *"}),e.jsx(c,{name:"ward",control:i,render:({field:r})=>e.jsxs(T,{...r,value:E,onChange:t=>J(t.target.value),children:[e.jsx(f,{value:"",children:"Chọn phường/xã"}),U.map(t=>e.jsx(f,{value:t.WardCode,children:t.WardName},t.WardCode))]})})]})}),e.jsx(n,{item:!0,xs:12,children:e.jsx(c,{name:"dia_chi",control:i,render:({field:r})=>{var t;return e.jsx(p,{...r,label:"Địa chỉ Nhận Hàng",multiline:!0,rows:4,style:{marginBottom:"30px"},fullWidth:!0,InputLabelProps:{shrink:!0},error:!!s.dia_chi,helperText:(t=s.dia_chi)==null?void 0:t.message})}})}),e.jsxs(n,{item:!0,xs:12,children:[e.jsx(q,{display:"flex",justifyContent:"center",children:e.jsx(P,{type:"submit",variant:"contained",color:"primary",style:{width:"150px"},children:V?e.jsx(De,{size:24}):"Lưu"})}),F&&e.jsx(H,{error:!0,children:F})]})]})})]})}),e.jsx(Ce,{open:ee,autoHideDuration:6e3,onClose:I,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(me,{onClose:I,variant:"filled",severity:re,sx:{width:"100%"},children:te})}),e.jsxs(we,{open:ie,onClose:()=>w(!1),children:[e.jsx(_e,{children:"Xác nhận lưu"}),e.jsx(Te,{children:e.jsx(Ee,{children:"Bạn có chắc chắn muốn lưu thông tin này không?"})}),e.jsxs(Pe,{children:[e.jsx(P,{onClick:()=>w(!1),color:"primary",children:"Hủy"}),e.jsx(P,{onClick:()=>w(!0),color:"primary",autoFocus:!0,children:"Xác nhận"})]})]})]})}export{Ue as default};
