import{a as Pe,r as i,b as Le,c as j,j as t,B as M,T as Ee,G as r,f as C,k as L,F as Ae,o as se,p as O,m as B,i as H,A as Ie}from"./index-lZI9Axgt.js";import{u as We,C as m,o as $e}from"./yup-DgubAHHa.js";import{c as Ne,a as D,d as qe,b as Me}from"./index.esm-geAfmb5E.js";import{d as Oe}from"./ArrowBack-pRIo-mOp.js";import{C as re}from"./CircularProgress-D5JedJ_d.js";import{L as Be,A as He}from"./AdapterMoment-C-SfhErz.js";import{R as Ge,a as oe}from"./RadioGroup-Dd5T_W4C.js";import{F as ce}from"./FormControlLabel-BBO_n_LH.js";import{M as w}from"./MenuItem-Divc6vnu.js";import{F as Re}from"./Fab-CuekNszq.js";import{D as ze,a as Ue,b as Ve,c as Xe}from"./DialogTitle-Bl5CTXqr.js";import{D as Ye}from"./DialogContentText-BzFOanTg.js";import{S as Ke}from"./Snackbar-DKwmTxl_.js";import"./useThemeProps-2KqlgxID.js";import"./moment-G82_0lEo.js";import"./SwitchBase-I1IR-Hvy.js";const le=Ne().shape({ten:D().required("Họ và tên không được để trống").max(255,"Tên không được vượt quá 255 ký tự").typeError("Tên xảy ra lỗi !"),sdt:D().required("Số điện thoại không được để trống").matches(/^0\d{9}$/,"Số điện thoại không hợp lệ"),email:D().required("Email không được để trống").email("Email không đúng định dạng").max(255,"Email không được vượt quá 255 ký tự"),ngay_sinh:qe().required("Ngày sinh không được để trống").typeError("Ngày sinh không hợp lệ"),gioi_tinh:Me().required("Giới tính không được để trống").oneOf([0,1],"Giới tính phải là 0 hoặc 1"),hinh_anh:D().nullable(),dia_chi:D().required("Địa chỉ không được để trống").max(256,"Địa chỉ không được vượt quá 256 ký tự")});function pt(){const{id:u}=Pe(),{register:Qe,handleSubmit:he,formState:{errors:s},setValue:c,control:l}=We({resolver:$e(le)}),[G,E]=i.useState("");i.useState([]),i.useState([]);const[A,de]=i.useState([]),[R,me]=i.useState([]),[z,ue]=i.useState([]),[y,U]=i.useState(""),[v,V]=i.useState(""),[I,X]=i.useState(""),[Y,pe]=i.useState(!1),[K,h]=i.useState(null),[Q,T]=i.useState(!1),[ge,b]=i.useState(!1),[xe,p]=i.useState(""),[fe,k]=i.useState("success"),[F,je]=i.useState({}),ye=Le(),[ve,W]=i.useState(!1),be=e=>{je(e),W(!0)},J=()=>{W(!1)},_e=async()=>{console.log("Dữ liệu form:",F),W(!1),await we(F)};i.useEffect(()=>{(async()=>{try{T(!0),await ke()}catch{h("Failed to fetch initial data")}finally{T(!1)}})()},[]),i.useEffect(()=>{Y&&u&&De(u)},[Y,u]),i.useEffect(()=>{y&&Z(y)},[y]),i.useEffect(()=>{v&&Se(v)},[v]),i.useEffect(()=>{var n;const e=Object.keys(s);if(e.length>0){const a=e[0],o=((n=s[a])==null?void 0:n.message)||"Đã xảy ra lỗi";p(o),k("error"),b(!0)}},[s]);const ke=async()=>{try{const e=await j.get("https://esgoo.net/api-tinhthanh/1/0.htm");e.data.data&&Array.isArray(e.data.data)?(de(e.data.data),pe(!0)):h("Invalid or empty data received from provinces API")}catch{h("Failed to fetch provinces")}},Z=async e=>{try{const a=(await j.get(`https://esgoo.net/api-tinhthanh/2/${e}.htm`)).data.data.map(o=>({id:o.id,ten:o.name}));me(a)}catch{h("Failed to fetch districts")}},Se=async e=>{try{const a=(await j.get(`https://esgoo.net/api-tinhthanh/3/${e}.htm`)).data.data.map(o=>({id:o.id,ten:o.name}));ue(a)}catch{h("Failed to fetch wards")}};function Ce(e){return e=e.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g,"A"),e=e.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"),e=e.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/,"E"),e=e.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"),e=e.replace(/I|Í|Ì|Ĩ|Ị/g,"I"),e=e.replace(/ì|í|ị|ỉ|ĩ/g,"i"),e=e.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g,"O"),e=e.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"),e=e.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g,"U"),e=e.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"),e=e.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g,"Y"),e=e.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"),e=e.replace(/Đ/g,"D"),e=e.replace(/đ/g,"d"),e=e.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g,""),e=e.replace(/\u02C6|\u0306|\u031B/g,""),e}const De=async e=>{try{const a=(await j.get(`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/nhan_vien/${e}`)).data,o=a.gioiTinh!==void 0?a.gioiTinh.toString():"1";if(console.log("Giới tính sau khi convert: ",o),c("gioi_tinh",o),c("ten",a.ten),c("sdt",a.sdt),c("email",a.email),c("tai_khoan_ngan_hang",a.taiKhoanNganHang),c("hinh_anh",a.hinhAnh),a.hinhAnh?E(a.hinhAnh):E("https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg"),c("ngay_sinh",a.ngaySinh.split("T")[0]),a.diaChi){const g=a.diaChi.split(",").map(_=>_.trim());if(g.length>=4){const _=g[0];c("dia_chi",_);const P=g[3].trim().toLowerCase(),N=g[2].trim().toLowerCase(),ne=g[1].trim().toLowerCase();let f=A.find(d=>d.name_en.trim().toLowerCase()==Ce(P));if(!f){h(`Province not found: ${P}`);return}f&&(U(f.id),await Z(f.id));let x=[];try{x=(await j.get(`https://esgoo.net/api-tinhthanh/2/${f.id}.htm`)).data.data.map(S=>({id:S.id,ten:S.name}))}catch{h("Failed to fetch districts")}const q=x.find(d=>d.ten.trim().toLowerCase()===N);q&&V(q.id);let ae=[];try{ae=(await j.get(`https://esgoo.net/api-tinhthanh/3/${q.id}.htm`)).data.data.map(S=>({id:S.id,ten:S.name}))}catch{h("Failed to fetch wards")}const ie=ae.find(d=>d.ten.trim().toLowerCase()===ne);ie&&X(ie.id)}}}catch(n){console.log(n),h("Failed to fetch employee details")}},ee=()=>{window.cloudinary.openUploadWidget({cloudName:"daljc2ktr",uploadPreset:"ovuxjxsx",sources:["local","url","camera","google_photos","facebook","dropbox","instagram"],multiple:!1,cropping:!0,folder:"employee_images"},(e,n)=>{!e&&n&&n.event==="success"&&(E(n.info.secure_url),c("hinh_anh",n.info.secure_url))})},we=async e=>{T(!0);try{let n={};n.ten=e.ten,n.sdt=e.sdt,n.email=e.email,n.tai_khoan_ngan_hang=e.tai_khoan_ngan_hang;const a=new Date,o=new Date(e.ngay_sinh);let g=a.getFullYear()-o.getFullYear();const _=a.getMonth()-o.getMonth();if((_<0||_===0&&a.getDate()<o.getDate())&&g--,g<18){p("Tuổi phải lớn hơn hoặc bằng 18!"),k("error"),b(!0);return}n.ngay_sinh=new Date(e.ngay_sinh).toISOString(),n.gioi_tinh=e.gioi_tinh,n.hinh_anh=e.hinh_anh;const P=`${e.dia_chi}, ${I?z.find(x=>x.id===I).ten:""}, ${v?R.find(x=>x.id===v).ten:""}, ${y?A.find(x=>x.id===y).name:""}`;n.dia_chi=P,n.list_vai_tro=["STAFF"],await le.validate(n);const N=u?`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/nhan_vien/update/${u}`:"https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/nhan_vien/create",f=await j({method:u?"put":"post",url:N,data:n,headers:{"Content-Type":"application/json"}});u?(p("Cập nhật nhân viên thành công!"),k("success"),b(!0),setTimeout(()=>{$()},1e3)):(p("Thêm nhân viên thành công!"),k("success"),b(!0),setTimeout(()=>{$()},1e3)),console.log(f)}catch(n){Te(n)}finally{T(!1)}},Te=e=>{if(e.response&&e.response.data&&e.response.data.message){const a=e.response.data.error.split(":").pop().trim();p(a)}else e.response&&e.response.data&&e.response.data.error?p(e.response.data.error):e.message?p(e.message):p("Có lỗi xảy ra khi xử lý yêu cầu!");k("error"),b(!0)},te=()=>{b(!1)},$=()=>{ye("/nhanvien/danhsachnhanvien")};return Q?t.jsx(M,{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",children:t.jsx(re,{})}):t.jsxs(Be,{dateAdapter:He,children:[t.jsx(Ee,{variant:"h1",gutterBottom:!0,style:{textAlign:"center",marginBottom:"5%"},children:u?"Chỉnh sửa nhân viên":"Thêm nhân viên mới"}),t.jsxs("form",{onSubmit:he(be),children:[t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(M,{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",children:G?t.jsx("img",{src:G,alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:ee}):t.jsx("img",{src:"https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg",alt:"",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:ee})})}),t.jsx(r,{item:!0,xs:12,md:8,children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"ten",control:l,render:({field:e})=>{var n;return t.jsx(C,{fullWidth:!0,label:"Họ và tên",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!s.ten,helperText:(n=s.ten)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"sdt",control:l,render:({field:e})=>{var n;return t.jsx(C,{fullWidth:!0,label:"Số điện thoại",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!s.sdt,helperText:(n=s.sdt)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"email",control:l,render:({field:e})=>{var n;return t.jsx(C,{fullWidth:!0,label:"Email",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!s.email,helperText:(n=s.email)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"ngay_sinh",control:l,render:({field:e})=>{var n;return t.jsx(C,{type:"date",fullWidth:!0,label:"Ngày sinh",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!s.ngay_sinh,helperText:(n=s.ngay_sinh)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsxs(L,{component:"fieldset",error:!!s.gioi_tinh,children:[t.jsx(Ae,{component:"legend",children:"Giới tính *"}),t.jsx(m,{name:"gioi_tinh",control:l,render:({field:e})=>t.jsxs(Ge,{...e,value:e.value||"",onChange:n=>e.onChange(n.target.value),row:!0,children:[t.jsx(ce,{value:"1",control:t.jsx(oe,{}),label:"Nam"}),t.jsx(ce,{value:"0",control:t.jsx(oe,{}),label:"Nữ"})]})}),s.gioi_tinh&&t.jsx(se,{children:s.gioi_tinh.message})]})}),t.jsx(r,{item:!0,xs:12,children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:4,children:t.jsxs(L,{fullWidth:!0,sx:{mb:2},children:[t.jsx(O,{children:"Tỉnh/Thành Phố *"}),t.jsx(m,{name:"province",control:l,render:({field:e})=>t.jsx(B,{...e,value:y,onChange:n=>U(n.target.value),children:A.map(n=>t.jsx(w,{value:n.id,children:n.name},n.id))})})]})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsxs(L,{fullWidth:!0,sx:{mb:2},children:[t.jsx(O,{children:"Quận/Huyện *"}),t.jsx(m,{name:"district",control:l,render:({field:e})=>t.jsxs(B,{...e,value:v,onChange:n=>V(n.target.value),children:[t.jsx(w,{value:"",children:"Chọn quận/huyện"}),R.map(n=>t.jsx(w,{value:n.id,children:n.ten},n.id))]})})]})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsxs(L,{fullWidth:!0,sx:{mb:2},children:[t.jsx(O,{children:"Phường/Xã *"}),t.jsx(m,{name:"ward",control:l,render:({field:e})=>t.jsxs(B,{...e,value:I,onChange:n=>X(n.target.value),children:[t.jsx(w,{value:"",children:"Chọn phường/xã"}),z.map(n=>t.jsx(w,{value:n.id,children:n.ten},n.id))]})})]})})]})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(m,{name:"dia_chi",control:l,render:({field:e})=>{var n;return t.jsx(C,{...e,label:"Địa chỉ",multiline:!0,rows:4,fullWidth:!0,InputLabelProps:{shrink:!0},error:!!s.dia_chi,helperText:(n=s.dia_chi)==null?void 0:n.message,sx:{mb:2}})}})})]})}),t.jsxs(r,{item:!0,xs:12,children:[t.jsx(M,{display:"flex",justifyContent:"center",children:t.jsx(H,{type:"submit",variant:"contained",color:"primary",style:{width:"150px"},children:Q?t.jsx(re,{size:24}):"Lưu"})}),K&&t.jsx(se,{error:!0,children:K})]})]}),t.jsx(Re,{color:"primary","aria-label":"back",sx:{position:"fixed",bottom:16,right:16},onClick:$,children:t.jsx(Oe,{})})]}),t.jsxs(ze,{open:ve,onClose:J,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[t.jsx(Ue,{id:"alert-dialog-title",children:F.id?"Xác nhận cập nhật nhân viên":"Xác nhận thêm nhân viên"}),t.jsx(Ve,{children:t.jsx(Ye,{id:"alert-dialog-description",children:F.id?"Bạn có chắc chắn muốn cập nhật thông tin nhân viên này?":"Bạn có chắc chắn muốn thêm nhân viên này?"})}),t.jsxs(Xe,{children:[t.jsx(H,{onClick:J,color:"secondary",children:"Hủy"}),t.jsx(H,{onClick:_e,color:"primary",autoFocus:!0,children:"Xác nhận"})]})]}),t.jsx(Ke,{open:ge,autoHideDuration:6e3,onClose:te,anchorOrigin:{vertical:"top",horizontal:"right"},children:t.jsx(Ie,{onClose:te,variant:"filled",severity:fe,sx:{width:"100%"},children:xe})})]})}export{pt as default};
