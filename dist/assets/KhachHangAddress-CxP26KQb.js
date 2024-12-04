import{w as Pt,z as At,E as Ft,j as e,a as Wt,b as Nt,r as a,c as h,B as o,T as r,G as u,f,k as O,F as Ht,o as Lt,i as g,d as Ae,h as Et,aq as Bt,p as ee,m as te,A as $t}from"./index-lZI9Axgt.js";import{u as Fe,C as Xt,o as We}from"./yup-DgubAHHa.js";import{c as Ee,a as S,d as qt,b as Mt}from"./index.esm-geAfmb5E.js";import{d as Ot}from"./ArrowBack-pRIo-mOp.js";import{d as Rt}from"./Add-BJ73JR4M.js";import{F as zt}from"./Fab-CuekNszq.js";import{R as Qt,a as Ne}from"./RadioGroup-Dd5T_W4C.js";import{F as ne}from"./FormControlLabel-BBO_n_LH.js";import{I as He}from"./IconDeviceFloppy-CCDAcmeZ.js";import{M as ae}from"./MenuItem-Divc6vnu.js";import{S as Ut}from"./Switch-CvCt3I2e.js";import{I as Kt}from"./IconTrash-DsoJJI-n.js";import{D as R,a as z,b as Q,c as U}from"./DialogTitle-Bl5CTXqr.js";import{D as Gt}from"./DialogContentText-BzFOanTg.js";import{S as Vt}from"./Snackbar-DKwmTxl_.js";import"./SwitchBase-I1IR-Hvy.js";var Zt=Pt("pencil","IconPencil",[["path",{d:"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",key:"svg-0"}],["path",{d:"M13.5 6.5l4 4",key:"svg-1"}]]),ie={},Yt=Ft;Object.defineProperty(ie,"__esModule",{value:!0});var Be=ie.default=void 0,Jt=Yt(At()),en=e;Be=ie.default=(0,Jt.default)((0,en.jsx)("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");const Le=Ee().shape({ten:S().max(50,"Tên không được vượt quá 50 ký tự").required("Tên không được để trống").matches(/^[a-zA-ZÀ-ỹ\s]*$/,"Tên chỉ được chứa các ký tự chữ cái và khoảng trắng"),email:S().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email không hợp lệ").required("Email không được để trống"),sdt:S().matches(/^[0-9]{10}$/,"Số điện thoại phải có 10 chữ số").required("Số điện thoại không được để trống"),ngay_sinh:qt().max(new Date,"Ngày sinh phải là quá khứ hoặc hiện tại").required("Ngày sinh không được để trống"),gioi_tinh:Mt().oneOf([0,1],"Giới tính không hợp lệ").required("Giới tính không được để trống"),hinhAnh:S().url("Hình ảnh phải là một URL hợp lệ").nullable()}),tn=Ee().shape({ten_nguoi_nhan:S().required("Tên người nhận không được để trống").min(3,"Tên người nhận phải có ít nhất 3 ký tự").max(50,"Tên người nhận không được vượt quá 50 ký tự").matches(/^[a-zA-ZÀ-ỹ\s]*$/,"Tên người nhận chỉ được chứa các ký tự chữ cái và khoảng trắng"),sdt_nguoi_nhan:S().required("Số điện thoại người nhận không được để trống").matches(/^\d{10}$/,"Số điện thoại người nhận phải bao gồm đúng 10 chữ số"),dia_chi_nhan_hang:S().required("Địa chỉ nhận hàng không được để trống").max(256,"Địa chỉ không được vượt quá 256 ký tự")});function Cn(){var ve,ke,_e,Se,De,Ce,Ie,Te;const{id:y}=Wt(),$e=Nt(),{register:A,handleSubmit:Xe,control:qe,formState:{errors:l},setValue:T}=Fe({resolver:We(Le),defaultValues:{addresses:[]}}),{register:w,handleSubmit:Me,control:nn,formState:{errors:j},setValue:b,reset:se}=Fe({resolver:We(tn),defaultValues:{ten_nguoi_nhan:"",sdt_nguoi_nhan:"",email:"",dia_chi_nhan_hang:"",province:"",district:"",ward:""}}),[K,G]=a.useState(""),[re,Oe]=a.useState([]),[oe,V]=a.useState([]),[le,Z]=a.useState([]),[D,Y]=a.useState(""),[C,F]=a.useState(""),[ce,P]=a.useState(""),[he,Re]=a.useState(!1),[ze,v]=a.useState(null),[de,W]=a.useState(!1),[an,ue]=a.useState(!1),[sn,ge]=a.useState(!1),[rn,pe]=a.useState(!1),[on,me]=a.useState(!1),[Qe,p]=a.useState(!1),[Ue,_]=a.useState(""),[Ke,k]=a.useState("success"),[Ge,Ve]=a.useState([]),[Ze,N]=a.useState(!1),[c,Ye]=a.useState(null),[Je,J]=a.useState(!1),[ln,et]=a.useState(!1);a.useState(!1),a.useState(!1);const[xe,tt]=a.useState(""),[nt,H]=a.useState(!1),[at,L]=a.useState(!1),[cn,it]=a.useState(null),[st,E]=a.useState(!1),[rt,B]=a.useState(!1),[ot,fe]=a.useState(c!=null&&c.isDefault?c.id:null),[lt,ct]=a.useState({});a.useEffect(()=>{he&&y&&ye(y)},[he,y]),a.useEffect(()=>{D?dt(D):V([])},[D]),a.useEffect(()=>{C?ut(C):Z([])},[C]),a.useEffect(()=>{(async()=>{try{W(!0),await ht()}catch{v("Failed to fetch initial data")}finally{W(!1),console.log(ze)}})()},[]),a.useEffect(()=>{var n;const t=Object.keys(l);if(t.length>0){const i=t[0],s=((n=l[i])==null?void 0:n.message)||"Đã xảy ra lỗi";_(s),k("error"),p(!0)}},[l]);const ht=async()=>{try{const t=await h.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"}});t.data.data&&Array.isArray(t.data.data)?(Oe(t.data.data),Re(!0)):v("Invalid or empty data received from provinces API")}catch{v("Failed to fetch provinces")}},dt=async t=>{try{const i=(await h.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"},params:{province_id:t}})).data.data.map(s=>({id:s.DistrictID,name:s.DistrictName}));V(i)}catch{v("Failed to fetch districts")}},ut=async t=>{try{const i=(await h.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"},params:{district_id:t}})).data.data.map(s=>({id:s.WardCode,name:s.WardName}));Z(i)}catch{v("Failed to fetch wards")}},gt=t=>{t.target.checked?E(!0):B(!0)},pt=async()=>{if(E(!1),c)try{ue(!0),await h.put(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/diachi/defaultlocation/${c.id}?idKhachHang=${y}`,null),fe(c.id),I()}catch(t){console.error("Failed to set default address",t)}finally{ue(!1)}},mt=async()=>{if(B(!1),c)try{ge(!0),await h.put(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/diachi/undefaultlocation/${c.id}?idKhachHang=${y}`,null),fe(null),I()}catch(t){console.error("Failed to unset default address",t)}finally{ge(!1)}},xt=async()=>{try{pe(!0),await h.delete(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/diachi/${xe}`)}catch(t){console.error("Lỗi khi xóa địa chỉ:",t)}finally{L(!1),I(),pe(!1)}},ft=()=>{it(xe),L(!0)},ye=async t=>{try{const i=(await h.get(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/khachhang/searchbyid/${t}`)).data;T("ten",i.ten),T("sdt",i.sdt),T("email",i.email),T("ngay_sinh",i.ngaySinh.split("T")[0]),T("gioi_tinh",i.gioiTinh.toString()),i.hinhAnh?G(i.hinhAnh):G("https://res.cloudinary.com/daljc2ktr/image/upload/v1722592745/employee_images/zbphcixipri1c8rcdeov.jpg");const x=(await h.get(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/diachi/getAllDiaChiByIdKhachHang/${t}`)).data;Ve(x);const d=new Set,$=new Set;for(const X of x)d.add(X.idTinhThanhPho),$.add(X.idQuanHuyen);await(async()=>{const X=Array.from(d).map(async q=>{try{return(await h.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"},params:{province_id:q}})).data.data.map(M=>({id:M.DistrictID,name:M.DistrictName}))}catch{return v("Failed to fetch districts"),[]}}),It=(await Promise.all(X)).flat();V(It);const Tt=Array.from($).map(async q=>{const we=q.toString().padStart(3,"0");try{return(await h.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",{headers:{token:"0292ba75-34b6-11ef-89ca-1aad91406dac"},params:{district_id:q}})).data.data.map(Pe=>({id:Pe.WardCode,name:Pe.WardName}))}catch{return v("Failed to fetch wards"),[]}}),wt=(await Promise.all(Tt)).flat();Z(wt)})()}catch{v("Failed to fetch KhachHang Info"),p("Xảy ra lỗi khi hiển thị thông tin khách hàng!."),k("error"),p(!0),setTimeout(()=>{m()},1e3)}},m=()=>{N(!1),se(),J(!1),p(!1)},je=()=>{$e("/khachhang/danhsachkhachhang")},yt=t=>{ct(t),H(!0)},jt=async()=>{H(!1),await bt(lt)},bt=async t=>{try{W(!0);let n={ten:t.ten,sdt:t.sdt,email:t.email,ngay_sinh:new Date(t.ngay_sinh).toISOString(),gioi_tinh:t.gioi_tinh,hinhAnh:K};const i=new Date,s=new Date(t.ngay_sinh);let x=i.getFullYear()-s.getFullYear();const d=i.getMonth()-s.getMonth();if((d<0||d===0&&i.getDate()<s.getDate())&&x--,x<18){_("Tuổi phải lớn hơn hoặc bằng 18!"),k("error"),p(!0),setTimeout(()=>{m()},1e3);return}await Le.validate(n);const $=`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/khachhang/update/${y}`;(await h.put($,n,{headers:{"Content-Type":"application/json"}})).status===200&&(_("Cập nhật thành công khách hàng!"),k("success"),p(!0),setTimeout(()=>{je(),m()},1e3))}catch{_("Có lỗi xảy ra khi cập nhật thông tin!"),k("error"),p(!0)}finally{W(!1),setTimeout(()=>{m()},1e3)}},I=()=>{N(!1),se(),ye(y),Y(""),F(""),P("")},vt=async t=>{try{me(!0);let n={};n.tenNguoiNhan=t.ten_nguoi_nhan,n.sdtNguoiNhan=t.sdt_nguoi_nhan,n.diaChiNhanHang=t.dia_chi_nhan_hang,n.emailNguoiNhan=t.email,n.khach_hang_id=y,n.idTinhThanhPho=t.provinces||D,n.idQuanHuyen=t.districts||C,n.idPhuongXa=t.wards||ce;try{const i=t.id_dia_chi?`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/diachi/updatelocation/${t.id_dia_chi}`:"https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/diachi/create",s=t.id_dia_chi?"PUT":"POST",x=await h({method:s,url:i,data:n,headers:{"Content-Type":"application/json"}})}catch(i){console.log(i)}t.id_dia_chi?(_("Cập nhật thành công địa chỉ!"),k("success"),p(!0),setTimeout(()=>{I(),m()},1e3)):(_("Thêm thành công địa chỉ !"),k("success"),p(!0),setTimeout(()=>{I(),m()},1e3))}catch{_("Có lỗi xảy ra khi cập nhật thông tin!"),k("error"),p(!0)}finally{me(!1),setTimeout(()=>{m()},1e3)}},kt=()=>{window.cloudinary.openUploadWidget({cloudName:"daljc2ktr",uploadPreset:"ovuxjxsx",sources:["local","url","camera","google_photos","facebook","dropbox","instagram"],multiple:!1,cropping:!0,folder:"customers_images"},(t,n)=>{!t&&n.event==="success"&&G(n.info.secure_url)})},be=async t=>{if(t.id){Ye(t),J(!0),N(!0),b("ten_nguoi_nhan",t.tenNguoiNhan),b("sdt_nguoi_nhan",t.sdtNguoiNhan),b("email",t.emailNguoiNhan),b("dia_chi_nhan_hang",t.diaChiNhanHang),b("id_dia_chi",t.id),tt(t.id),t.loaiDiaChi===1&&et(!0);try{const n=t.idTinhThanhPho.toString().padStart(2,"0"),i=t.idQuanHuyen.toString().padStart(3,"0"),s=t.idPhuongXa.toString().padStart(5,"0");Y(n),F(i),P(s)}catch(n){console.error("Failed to fetch address data",n)}}else J(!1),N(!0)},_t=async t=>{const n=t.target.value;Y(n),b("province",n),F(""),P("")},St=async t=>{const n=t.target.value;F(n),b("district",n),P("")},Dt=t=>{const n=t.target.value;P(n),b("ward",n)};return e.jsxs(o,{sx:{display:"flex",height:"100vh",overflow:"auto"},children:[e.jsx(zt,{color:"primary","aria-label":"back",sx:{position:"fixed",bottom:16,right:16},onClick:je,children:e.jsx(Ot,{})}),e.jsxs(o,{sx:{width:"33%",p:2,borderRight:"1px solid #ddd"},children:[e.jsx(r,{variant:"h4",gutterBottom:!0,sx:{marginBottom:"5%",textAlign:"center"},children:"Thông tin khách hàng"}),e.jsxs("form",{onSubmit:Xe(yt),children:[e.jsxs(u,{container:!0,spacing:2,children:[e.jsx(u,{item:!0,xs:12,children:e.jsx(o,{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",children:K?e.jsx("img",{src:K,alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",cursor:"pointer",borderRadius:"50%",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",transition:"all 0.3s ease"},onClick:kt}):e.jsx("img",{src:"../src/assets/images/images.jpg",alt:"Ảnh đại diện",style:{width:"250px",height:"250px",objectFit:"cover",borderRadius:"50%"}})})}),e.jsx(u,{item:!0,xs:12,children:e.jsx(f,{label:"Tên",fullWidth:!0,...A("ten"),InputLabelProps:{shrink:!0},error:!!l.ten,helperText:(ve=l.ten)==null?void 0:ve.message})}),e.jsx(u,{item:!0,xs:12,children:e.jsx(f,{label:"Email",fullWidth:!0,...A("email"),InputLabelProps:{shrink:!0},error:!!l.email,helperText:(ke=l.email)==null?void 0:ke.message})}),e.jsx(u,{item:!0,xs:12,children:e.jsx(f,{label:"Số điện thoại",fullWidth:!0,InputLabelProps:{shrink:!0},...A("sdt"),error:!!l.sdt,helperText:(_e=l.sdt)==null?void 0:_e.message})}),e.jsx(u,{item:!0,xs:12,children:e.jsx(f,{label:"Ngày sinh",type:"date",fullWidth:!0,InputLabelProps:{shrink:!0},...A("ngay_sinh"),error:!!l.ngay_sinh,helperText:(Se=l.ngay_sinh)==null?void 0:Se.message})}),e.jsx(u,{item:!0,xs:12,children:e.jsxs(O,{component:"fieldset",error:!!l.gioi_tinh,children:[e.jsx(Ht,{component:"legend",children:"Giới tính *"}),e.jsx(Xt,{name:"gioi_tinh",control:qe,render:({field:t})=>e.jsxs(Qt,{...t,row:!0,children:[e.jsx(ne,{value:"1",control:e.jsx(Ne,{checked:t.value==="1",onChange:t.onChange}),label:"Nam"}),e.jsx(ne,{value:"0",control:e.jsx(Ne,{checked:t.value==="0",onChange:t.onChange}),label:"Nữ"})]})}),l.gioi_tinh&&e.jsx(Lt,{children:l.gioi_tinh.message})]})})]}),e.jsx(u,{container:!0,justifyContent:"center",sx:{mt:2},children:e.jsx(g,{type:"submit",variant:"contained",startIcon:e.jsx(He,{stroke:2}),sx:{mt:2,background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",color:"white"},children:de?"Đang xử lý...":"Cập nhật"})})]})]}),e.jsx(o,{sx:{width:"65%",p:2},children:e.jsx(u,{item:!0,xs:8,children:e.jsx(Ae,{elevation:3,children:e.jsxs(o,{p:2,children:[e.jsxs(o,{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2,children:[e.jsx(r,{variant:"h4",children:"Danh sách địa chỉ"}),e.jsx(Et,{color:"primary",onClick:be,children:e.jsx(Rt,{})})]}),e.jsx(u,{container:!0,spacing:2,children:Ge.map((t,n)=>{var i,s,x;return e.jsx(u,{item:!0,xs:6,children:e.jsxs(Ae,{elevation:2,sx:{p:2,position:"relative","&:hover":{backgroundColor:"#f0f0f0",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.2)",transform:"scale(1.02)",transition:"all 0.3s ease-in-out"}},children:[e.jsxs(o,{sx:{position:"absolute",top:8,right:8,display:"flex",alignItems:"center",zIndex:1},children:[t.loaiDiaChi===1&&e.jsx(Be,{color:"warning",sx:{mr:1}}),e.jsx(Zt,{stroke:1,onClick:()=>be(t)})]}),e.jsxs(o,{sx:{mb:1,display:"flex",alignItems:"center"},children:[e.jsx(r,{variant:"body1",sx:{fontWeight:"bold",display:"inline"},children:"Tên người nhận:"}),e.jsx(r,{variant:"body1",sx:{textAlign:"center",ml:1},children:t.tenNguoiNhan})]}),e.jsxs(o,{sx:{mb:1,display:"flex",alignItems:"center"},children:[e.jsx(r,{variant:"body1",sx:{fontWeight:"bold",display:"inline"},children:"Số điện thoại:"}),e.jsx(r,{variant:"body1",sx:{textAlign:"center",ml:1},children:t.sdtNguoiNhan})]}),e.jsxs(o,{sx:{mb:1,display:"flex",alignItems:"center"},children:[e.jsx(r,{variant:"body1",sx:{fontWeight:"bold",display:"inline"},children:"Tỉnh/Thành phố:"}),e.jsx(r,{variant:"body1",sx:{textAlign:"center",ml:1},children:(i=re.find(d=>d.ProvinceID==t.idTinhThanhPho))==null?void 0:i.ProvinceName})]}),e.jsxs(o,{sx:{mb:1,display:"flex",alignItems:"center"},children:[e.jsx(r,{variant:"body1",sx:{fontWeight:"bold",display:"inline"},children:"Quận/Huyện:"}),e.jsx(r,{variant:"body1",sx:{textAlign:"center",ml:1},children:(s=oe.find(d=>d.id==t.idQuanHuyen))==null?void 0:s.name})]}),e.jsxs(o,{sx:{mb:1,display:"flex",alignItems:"center"},children:[e.jsx(r,{variant:"body1",sx:{fontWeight:"bold",display:"inline"},children:"Phường/Xã:"}),e.jsx(r,{variant:"body1",sx:{textAlign:"center",ml:1},children:(x=le.find(d=>d.id==t.idPhuongXa))==null?void 0:x.name})]}),e.jsxs(o,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(r,{variant:"body1",sx:{fontWeight:"bold",display:"inline"},children:"Địa chỉ Chi Tiết:"}),e.jsx(r,{variant:"body1",sx:{textAlign:"center",ml:1},children:t.diaChiNhanHang})]})]})},n)})})]})})})}),e.jsx(Bt,{open:Ze,onClose:I,"aria-labelledby":"modal-title","aria-describedby":"modal-description",children:e.jsxs(o,{sx:{width:"400px",bgcolor:"background.paper",p:4,mx:"auto",mt:4},children:[e.jsx(r,{variant:"h4",children:"Địa Chỉ Của Tôi"}),e.jsxs("form",{onSubmit:Me(vt),children:[e.jsx(f,{label:"ID",fullWidth:!0,margin:"normal",style:{display:"none"},...w("id_dia_chi"),InputLabelProps:{shrink:!0}}),e.jsx(f,{label:"Tên người nhận",fullWidth:!0,margin:"normal",...w("ten_nguoi_nhan"),InputLabelProps:{shrink:!0},error:!!j.ten_nguoi_nhan,helperText:(De=j.ten_nguoi_nhan)==null?void 0:De.message}),e.jsx(f,{label:"Số điện thoại người nhận",fullWidth:!0,margin:"normal",...w("sdt_nguoi_nhan"),InputLabelProps:{shrink:!0},error:!!j.sdt_nguoi_nhan,helperText:(Ce=j.sdt_nguoi_nhan)==null?void 0:Ce.message}),e.jsx(f,{label:"Email người nhận",fullWidth:!0,margin:"normal",...w("email"),InputLabelProps:{shrink:!0},error:!!j.email,helperText:(Ie=j.email)==null?void 0:Ie.message}),e.jsxs(o,{sx:{display:"flex",flexDirection:"row",gap:2,mb:2},children:[e.jsxs(O,{fullWidth:!0,margin:"normal",children:[e.jsx(ee,{id:"province-label",children:"Tỉnh/Thành phố"}),e.jsx(te,{labelId:"province-label",value:D,onChange:_t,label:"Tỉnh/Thành phố",children:re.map(t=>e.jsx(ae,{value:t.ProvinceID,children:t.ProvinceName},t.ProvinceID))})]}),e.jsxs(O,{fullWidth:!0,margin:"normal",disabled:!D,children:[e.jsx(ee,{id:"district-label",children:"Quận/Huyện"}),e.jsx(te,{labelId:"district-label",value:C,onChange:St,label:"Quận/Huyện",children:oe.map(t=>e.jsx(ae,{value:t.id,children:t.name},t.id))})]}),e.jsxs(O,{fullWidth:!0,margin:"normal",disabled:!C,children:[e.jsx(ee,{id:"ward-label",children:"Phường/Xã"}),e.jsx(te,{labelId:"ward-label",value:ce,onChange:Dt,label:"Phường/Xã",children:le.map(t=>e.jsx(ae,{value:t.id,children:t.name},t.id))})]})]}),e.jsx(f,{label:"Địa chỉ nhận hàng",fullWidth:!0,margin:"normal",...w("dia_chi_nhan_hang"),InputLabelProps:{shrink:!0},error:!!j.dia_chi_nhan_hang,helperText:(Te=j.dia_chi_nhan_hang)==null?void 0:Te.message,sx:{fontFamily:"Arial"}}),Je&&e.jsx(ne,{control:e.jsx(Ut,{checked:(c==null?void 0:c.id)===ot,onChange:gt}),label:"Địa chỉ mặc định",sx:{mt:2}}),e.jsxs(o,{display:"flex",justifyContent:"space-between",alignItems:"center",mt:2,children:[e.jsx(g,{startIcon:e.jsx(Kt,{stroke:2}),onClick:ft,children:"Xóa Địa Chỉ"}),e.jsx(g,{type:"submit",variant:"contained",color:"primary",startIcon:e.jsx(He,{stroke:2}),sx:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",color:"white","&:hover":{background:"linear-gradient(45deg, #FE6B8B 50%, #FF8E53 100%)"}},children:de?"Đang xử lý...":"Lưu"})]})]})]})}),e.jsxs(R,{open:at,onClose:()=>L(!1),children:[e.jsx(z,{children:"Xóa Địa Chỉ"}),e.jsx(Q,{children:"Bạn có chắc chắn muốn xóa địa chỉ này?"}),e.jsxs(U,{children:[e.jsx(g,{onClick:()=>L(!1),color:"primary",children:"Hủy"}),e.jsx(g,{onClick:xt,color:"secondary",children:"Xóa"})]})]}),e.jsxs(R,{open:st,onClose:()=>E(!1),children:[e.jsx(z,{children:"Xác nhận thay đổi"}),e.jsx(Q,{children:e.jsx(r,{children:"Bạn có chắc chắn muốn đặt địa chỉ này làm mặc định không?"})}),e.jsxs(U,{children:[e.jsx(g,{onClick:()=>E(!1),color:"primary",children:"Hủy"}),e.jsx(g,{onClick:pt,color:"primary",children:"Xác nhận"})]})]}),e.jsxs(R,{open:rt,onClose:()=>B(!1),children:[e.jsx(z,{children:"Xác nhận thay đổi"}),e.jsx(Q,{children:e.jsx(r,{children:"Bạn có chắc chắn muốn bỏ địa chỉ này làm mặc định không?"})}),e.jsxs(U,{children:[e.jsx(g,{onClick:()=>B(!1),color:"primary",children:"Hủy"}),e.jsx(g,{onClick:mt,color:"primary",children:"Xác nhận"})]})]}),e.jsxs(R,{open:nt,onClose:()=>H(!1),children:[e.jsx(z,{children:"Xác nhận cập nhật"}),e.jsx(Q,{children:e.jsx(Gt,{children:"Bạn có chắc chắn muốn cập nhật thông tin khách hàng này không?"})}),e.jsxs(U,{children:[e.jsx(g,{onClick:()=>H(!1),color:"primary",children:"Hủy"}),e.jsx(g,{onClick:jt,color:"primary",autoFocus:!0,children:"Xác nhận"})]})]}),e.jsx(Vt,{open:Qe,autoHideDuration:6e3,onClose:m,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx($t,{onClose:m,variant:"filled",severity:Ke,sx:{width:"100%"},children:Ue})})]})}export{Cn as default};
