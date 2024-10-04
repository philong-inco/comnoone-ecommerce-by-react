import{aa as We,r as s,a4 as Ne,ab as p,j as t,B as H,T as Oe,G as r,N as D,J as w,a5 as Re,a6 as Me,a7 as he,a8 as de,L as me,K as A,ad as I,a2 as qe,aF as Be,Z as V}from"./index-fYug5RY9.js";import{u as He,C as m,o as Ve}from"./yup-DqmFSMQy.js";import{c as Ge,a as T,d as Ue,b as ze}from"./index.esm-DxB9Dm1u.js";import{C as ue}from"./CircularProgress-Przdu-Cf.js";import{L as Ke,A as Xe}from"./AdapterMoment-DTEphPQd.js";import{M as _}from"./MenuItem-BoieQS9d.js";import{C as Ye}from"./Checkbox-BqbNCbCc.js";import{a as Je,c as Qe,b as Ze,D as et}from"./DialogTitle-DfESKbom.js";import{D as tt}from"./DialogContentText-Cd7IkWVj.js";import{S as nt,A as at}from"./Snackbar-BAUCtsSe.js";import"./useThemeProps-CHN6Lpw-.js";import"./moment-G82_0lEo.js";import"./Close-xbaa0MAg.js";const ge=Ge().shape({ten:T().required("Họ và tên không được để trống").max(255,"Tên không được vượt quá 255 ký tự").typeError("Tên xảy ra lỗi !"),sdt:T().required("Số điện thoại không được để trống").matches(/^0\d{9}$/,"Số điện thoại không hợp lệ"),email:T().required("Email không được để trống").email("Email không đúng định dạng").max(255,"Email không được vượt quá 255 ký tự"),ngay_sinh:Ue().required("Ngày sinh không được để trống").typeError("Ngày sinh không hợp lệ"),gioi_tinh:ze().required("Giới tính không được để trống").oneOf([0,1],"Giới tính phải là 0 hoặc 1"),hinh_anh:T().nullable(),dia_chi:T().required("Địa chỉ không được để trống")});function jt(){const{id:x}=We(),{register:it,handleSubmit:pe,formState:{errors:o},setValue:u,control:c}=He({resolver:Ve(ge)}),[G,W]=s.useState(""),[U,xe]=s.useState([]),[N,z]=s.useState([]),[O,fe]=s.useState([]),[K,je]=s.useState([]),[X,ve]=s.useState([]),[v,Y]=s.useState(""),[y,J]=s.useState(""),[R,Q]=s.useState(""),[Z,ye]=s.useState(!1),[ee,l]=s.useState(null),[te,L]=s.useState(!1),[be,C]=s.useState(!1),[_e,P]=s.useState(""),[Ce,F]=s.useState("success"),[E,Se]=s.useState({}),ke=Ne(),[De,M]=s.useState(!1),we=e=>{Se(e),M(!0)},ne=()=>{M(!1)},Te=async()=>{console.log("Dữ liệu form:",E),M(!1),await Ae(E)};s.useEffect(()=>{(async()=>{try{L(!0),await Le(),await Pe()}catch{l("Failed to fetch initial data")}finally{L(!1)}})()},[]),s.useEffect(()=>{Z&&x&&$e(x)},[Z,x]),s.useEffect(()=>{v&&ae(v)},[v]),s.useEffect(()=>{y&&Fe(y)},[y]);const Le=async()=>{try{const n=(await p.get("http://localhost:8080/api/vaitro")).data.filter(i=>i.ten!=="Admin");xe(n)}catch{l("Failed to fetch roles")}};s.useEffect(()=>{var n;const e=Object.keys(o);if(e.length>0){const i=e[0],a=((n=o[i])==null?void 0:n.message)||"Đã xảy ra lỗi";P(a),F("error"),C(!0)}},[o]);const Pe=async()=>{try{const e=await p.get("https://esgoo.net/api-tinhthanh/1/0.htm");e.data.data&&Array.isArray(e.data.data)?(fe(e.data.data),ye(!0)):l("Invalid or empty data received from provinces API")}catch{l("Failed to fetch provinces")}},ae=async e=>{try{const i=(await p.get(`https://esgoo.net/api-tinhthanh/2/${e}.htm`)).data.data.map(a=>({id:a.id,ten:a.name}));je(i)}catch{l("Failed to fetch districts")}},Fe=async e=>{try{const i=(await p.get(`https://esgoo.net/api-tinhthanh/3/${e}.htm`)).data.data.map(a=>({id:a.id,ten:a.name}));ve(i)}catch{l("Failed to fetch wards")}};function Ee(e){return e=e.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g,"A"),e=e.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"),e=e.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/,"E"),e=e.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"),e=e.replace(/I|Í|Ì|Ĩ|Ị/g,"I"),e=e.replace(/ì|í|ị|ỉ|ĩ/g,"i"),e=e.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g,"O"),e=e.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"),e=e.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g,"U"),e=e.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"),e=e.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g,"Y"),e=e.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"),e=e.replace(/Đ/g,"D"),e=e.replace(/đ/g,"d"),e=e.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g,""),e=e.replace(/\u02C6|\u0306|\u031B/g,""),e}const $e=async e=>{try{debugger;const n=await p.get(`http://localhost:8080/api/nhan_vien/${e}`),i=n.data,a=await p.get(`http://localhost:8080/api/vaitro/findbynhanvien/${n.data.id}`),h=i.gioiTinh!==void 0?i.gioiTinh.toString():"1";console.log("Giới tính sau khi convert: ",h),u("gioi_tinh",h),u("ten",i.ten),u("sdt",i.sdt),u("email",i.email),u("tai_khoan_ngan_hang",i.taiKhoanNganHang),u("hinh_anh",i.hinhAnh),i.hinhAnh?W(i.hinhAnh):W("https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg");const S=a.data.map(d=>d.ten);if(z(S),u("ngay_sinh",i.ngaySinh.split("T")[0]),i.diaChi){const d=i.diaChi.split(",").map(b=>b.trim());if(d.length>=4){const b=d[0];u("dia_chi",b);const $=d[3].trim().toLowerCase(),q=d[2].trim().toLowerCase(),oe=d[1].trim().toLowerCase();let j=O.find(g=>g.name_en.trim().toLowerCase()==Ee($));if(!j){l(`Province not found: ${$}`);return}j&&(Y(j.id),await ae(j.id));let f=[];try{f=(await p.get(`https://esgoo.net/api-tinhthanh/2/${j.id}.htm`)).data.data.map(k=>({id:k.id,ten:k.name}))}catch{l("Failed to fetch districts")}const B=f.find(g=>g.ten.trim().toLowerCase()===q);B&&J(B.id);let ce=[];try{ce=(await p.get(`https://esgoo.net/api-tinhthanh/3/${B.id}.htm`)).data.data.map(k=>({id:k.id,ten:k.name}))}catch{l("Failed to fetch wards")}const le=ce.find(g=>g.ten.trim().toLowerCase()===oe);le&&Q(le.id)}}}catch(n){console.log(n),l("Failed to fetch employee details")}},ie=()=>{window.cloudinary.openUploadWidget({cloudName:"daljc2ktr",uploadPreset:"ovuxjxsx",sources:["local","url","camera","google_photos","facebook","dropbox","instagram"],multiple:!1,cropping:!0,folder:"employee_images"},(e,n)=>{!e&&n&&n.event==="success"&&(W(n.info.secure_url),u("hinh_anh",n.info.secure_url))})},Ae=async e=>{var n,i;L(!0);try{let a={};a.ten=e.ten,a.sdt=e.sdt,a.email=e.email,a.tai_khoan_ngan_hang=e.tai_khoan_ngan_hang;const h=new Date,S=new Date(e.ngay_sinh);let d=h.getFullYear()-S.getFullYear();const b=h.getMonth()-S.getMonth();if((b<0||b===0&&h.getDate()<S.getDate())&&d--,d<18){P("Tuổi phải lớn hơn hoặc bằng 18!"),F("error"),C(!0);return}a.ngay_sinh=new Date(e.ngay_sinh).toISOString(),a.gioi_tinh=e.gioi_tinh,a.hinh_anh=e.hinh_anh;const $=`${e.dia_chi}, ${R?X.find(f=>f.id===R).ten:""}, ${y?K.find(f=>f.id===y).ten:""}, ${v?O.find(f=>f.id===v).name:""}`;a.dia_chi=$,a.list_vai_tro=N,await ge.validate(a);debugger;const q=x?`http://localhost:8080/api/nhan_vien/update/${x}`:"http://localhost:8080/api/nhan_vien/create",j=await p({method:x?"put":"post",url:q,data:a,headers:{"Content-Type":"application/json"}});x?(P("Cập nhật nhân viên thành công!"),F("success"),C(!0),setTimeout(()=>{re()},1e3)):(P("Thêm nhân viên thành công!"),F("success"),C(!0),setTimeout(()=>{re()},1e3)),console.log(j)}catch(a){const h=(i=(n=a.response)==null?void 0:n.data)!=null&&i.error?translateErrorMessage(a.response.data.message):"Đã xảy ra lỗi khi xử lý yêu cầu!";setSnackbar({open:!0,message:`Lỗi: ${h}`,severity:"error"})}finally{L(!1)}},se=()=>{C(!1)},re=()=>{ke("/nhanvien/danhsachnhanvien")};return te?t.jsx(H,{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",children:t.jsx(ue,{})}):t.jsxs(Ke,{dateAdapter:Xe,children:[t.jsx(Oe,{variant:"h1",gutterBottom:!0,style:{textAlign:"center",marginBottom:"5%"},children:x?"Chỉnh sửa nhân viên":"Thêm nhân viên mới"}),t.jsx("form",{onSubmit:pe(we),children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:4,children:t.jsx(H,{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",children:G?t.jsx("img",{src:G,alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:ie}):t.jsx("img",{src:"../src/assets/images/images.jpg",alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:ie})})}),t.jsx(r,{item:!0,xs:12,md:8,children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"ten",control:c,render:({field:e})=>{var n;return t.jsx(D,{fullWidth:!0,label:"Họ và tên",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!o.ten,helperText:(n=o.ten)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"sdt",control:c,render:({field:e})=>{var n;return t.jsx(D,{fullWidth:!0,label:"Số điện thoại",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!o.sdt,helperText:(n=o.sdt)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"email",control:c,render:({field:e})=>{var n;return t.jsx(D,{fullWidth:!0,label:"Email",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!o.email,helperText:(n=o.email)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsx(m,{name:"ngay_sinh",control:c,render:({field:e})=>{var n;return t.jsx(D,{type:"date",fullWidth:!0,label:"Ngày sinh",variant:"outlined",InputLabelProps:{shrink:!0},...e,error:!!o.ngay_sinh,helperText:(n=o.ngay_sinh)==null?void 0:n.message,sx:{mb:2}})}})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsxs(w,{component:"fieldset",error:!!o.gioi_tinh,children:[t.jsx(Re,{component:"legend",children:"Giới tính *"}),t.jsx(m,{name:"gioi_tinh",control:c,render:({field:e})=>t.jsxs(Me,{...e,value:e.value||"",onChange:n=>e.onChange(n.target.value),row:!0,children:[t.jsx(he,{value:"1",control:t.jsx(de,{}),label:"Nam"}),t.jsx(he,{value:"0",control:t.jsx(de,{}),label:"Nữ"})]})}),o.gioi_tinh&&t.jsx(me,{children:o.gioi_tinh.message})]})}),t.jsx(r,{item:!0,xs:12,md:6,children:t.jsxs(w,{fullWidth:!0,sx:{mb:2},children:[t.jsx(A,{children:"Vai trò"}),t.jsx(m,{name:"list_vai_tro",control:c,render:({field:e})=>t.jsx(I,{...e,multiple:!0,value:N,onChange:n=>z(n.target.value),renderValue:n=>t.jsx("div",{children:n.map(i=>{var a;return t.jsx(qe,{label:(a=U.find(h=>h.ten===i))==null?void 0:a.ten},i)})}),children:U.map(n=>t.jsxs(_,{value:n.ten,children:[t.jsx(Ye,{checked:N.indexOf(n.ten)>-1}),t.jsx(Be,{primary:n.ten})]},n.ten))})})]})}),t.jsx(r,{item:!0,xs:12,children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,md:4,children:t.jsxs(w,{fullWidth:!0,sx:{mb:2},children:[t.jsx(A,{children:"Tỉnh/Thành Phố *"}),t.jsx(m,{name:"province",control:c,render:({field:e})=>t.jsx(I,{...e,value:v,onChange:n=>Y(n.target.value),children:O.map(n=>t.jsx(_,{value:n.id,children:n.name},n.id))})})]})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsxs(w,{fullWidth:!0,sx:{mb:2},children:[t.jsx(A,{children:"Quận/Huyện *"}),t.jsx(m,{name:"district",control:c,render:({field:e})=>t.jsxs(I,{...e,value:y,onChange:n=>J(n.target.value),children:[t.jsx(_,{value:"",children:"Chọn quận/huyện"}),K.map(n=>t.jsx(_,{value:n.id,children:n.ten},n.id))]})})]})}),t.jsx(r,{item:!0,xs:12,md:4,children:t.jsxs(w,{fullWidth:!0,sx:{mb:2},children:[t.jsx(A,{children:"Phường/Xã *"}),t.jsx(m,{name:"ward",control:c,render:({field:e})=>t.jsxs(I,{...e,value:R,onChange:n=>Q(n.target.value),children:[t.jsx(_,{value:"",children:"Chọn phường/xã"}),X.map(n=>t.jsx(_,{value:n.id,children:n.ten},n.id))]})})]})})]})}),t.jsx(r,{item:!0,xs:12,children:t.jsx(m,{name:"dia_chi",control:c,render:({field:e})=>{var n;return t.jsx(D,{...e,label:"Địa chỉ",multiline:!0,rows:4,fullWidth:!0,InputLabelProps:{shrink:!0},error:!!o.dia_chi,helperText:(n=o.dia_chi)==null?void 0:n.message,sx:{mb:2}})}})})]})}),t.jsxs(r,{item:!0,xs:12,children:[t.jsx(H,{display:"flex",justifyContent:"center",children:t.jsx(V,{type:"submit",variant:"contained",color:"primary",style:{width:"150px"},children:te?t.jsx(ue,{size:24}):"Lưu"})}),ee&&t.jsx(me,{error:!0,children:ee})]})]})}),t.jsxs(Je,{open:De,onClose:ne,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[t.jsx(Qe,{id:"alert-dialog-title",children:E.id?"Xác nhận cập nhật nhân viên":"Xác nhận thêm nhân viên"}),t.jsx(Ze,{children:t.jsx(tt,{id:"alert-dialog-description",children:E.id?"Bạn có chắc chắn muốn cập nhật thông tin nhân viên này?":"Bạn có chắc chắn muốn thêm nhân viên này?"})}),t.jsxs(et,{children:[t.jsx(V,{onClick:ne,color:"secondary",children:"Hủy"}),t.jsx(V,{onClick:Te,color:"primary",autoFocus:!0,children:"Xác nhận"})]})]}),t.jsx(nt,{open:be,autoHideDuration:6e3,onClose:se,anchorOrigin:{vertical:"top",horizontal:"center"},children:t.jsx(at,{onClose:se,variant:"filled",severity:Ce,sx:{width:"100%"},children:_e})})]})}export{jt as default};
