import{a as oe,r as i,j as e,B as J,G as r,T as f,f as _,m as L,d as ye,E as Se,n as re,t as le,o as he,i as xe,Z as Xe,$ as ze,h as be,b as ve}from"./index-DkjfH3Nj.js";import{d as Ye}from"./Close-BYG1h54b.js";import{d as Qe}from"./Add-Damc_Ck8.js";import{p as De,a as Ue,b as qe,d as ke,c as Ze}from"./billService-LSyzHNP3.js";import{g as Je,d as en}from"./request-DcjhHzTt.js";import{B as ce}from"./react-toastify.esm-BvxhtGjR.js";import{N as pe}from"./notification-B40vY8uZ.js";import{a as nn,g as tn,d as an,f as sn,b as je,c as fe,e as on,h as rn,C as ln,S as hn}from"./CouponDiaLog-CvRyRpZu.js";import{f as cn,e as dn}from"./customerService-DUAqXprP.js";import{D as ee,a as ne,b as te,c as un}from"./DialogTitle-AfTjaLGA.js";import{T as Pe,a as He,b as we,c as ie,d as Ne}from"./TableRow-DrBFg2V4.js";import{T as m}from"./TableCell-BUbxn9S2.js";import{P as gn}from"./Pagination-BgvdVt-w.js";import{S as de,A as ue}from"./Snackbar-BAUbN_1o.js";import{G as mn}from"./index-DPnwyd78.js";import{D as xn}from"./Delete-CGNBZUkl.js";import{M as z}from"./MenuItem-B1FZ8Sxq.js";import{B as pn}from"./ImportProduct-DAjh42MA.js";import{S as Ce}from"./Switch-BsC7r2qR.js";import{T as jn,a as Te}from"./Tabs-DFJbw4kS.js";import"./Checkbox-CJjLKa6W.js";import"./couponsService-D4rGWuAg.js";import"./LastPage-CMxtDi2C.js";import"./Close-DQEw0W5Z.js";import"./xlsx-ChUIJHMt.js";import"./sanPham-CVbMZL9v.js";import"./back-end-vuWvP0DO.js";import"./KeyboardArrowRight-BY8qYOjh.js";const fn=x=>{const{id:h}=oe(),{open:a,onClose:S,data:s,onReload:H}=x;i.useState(!0);const[p,B]=i.useState([]),[b,A]=i.useState(""),[G,M]=i.useState(""),[E,d]=i.useState(0),[u,w]=i.useState(0),[R,v]=i.useState(!1),[ae,N]=i.useState(0),[Y,D]=i.useState(!1),[V,C]=i.useState(!1),[Q,T]=i.useState(""),[U,k]=i.useState("error"),$=c=>{A(c),v(!0)};console.log("DATA PAY : ",s);const X=()=>{const g={idHTTT:b==="cash"?1:2,soTien:s.tongTienPhaiTra+(s.loaiHoaDon==1?s.tienShip:0),tienNhan:parseFloat(G),loaiThanhToan:"0",loaiHoaDon:s.loaiHoaDon,ten:s.ten,sdt:s.sdt,email:s.email};console.log("Data veef HDHTT : ",g),K(g),M(""),v(!1)},K=async c=>{console.log(h);try{(await nn(s.ma,c)).status_code===201&&(T("Giao dịch thành công"),k("success"),C(!0),n())}catch(g){if(g.response){const W=g.response.data;if(W&&W.message){const Z=W.message.map(se=>`${se.messages}`);T(Z)}else T("Đã xảy ra lỗi không xác định.")}else T("Lỗi mạng hoặc không thể kết nối đến server.");k("error"),C(!0),console.log(g)}},l=()=>{C(!1)},n=async()=>{try{const c=await tn(h);if(c.status_code===200){B(c.data);const g=c.data.filter(W=>W.loaiThanhToan===0).reduce((W,Z)=>W+(Z.tienNhan||0),0);w(g)}}catch{}finally{}},P=async c=>{try{await an(c)&&(T("Hủy giao dịch thành công"),k("success"),C(!0),n())}catch(g){console.log(g),T("Hủy giao dịch thất bại"),k("error"),C(!0)}};i.useEffect(()=>{n()},[h]),i.useEffect(()=>{const c=s.loaiHoaDon===0?s.tongTienPhaiTra:s.tongTienPhaiTra+s.tienShip,g=c-u;d(g>0?g:0);const W=u-c;N(W>0?W:0)},[u,s]);const I=()=>{console.log(s);const c={thanhToanSau:s.thanhToanSau,loaiHoaDon:s.loaiHoaDon,tienShip:s.tienShip,ten:s.tenKhachHang,sdt:s.sdt,email:s.email,diaChi:s.diaChi,tinh:s.tinh,tenTinh:s.tenTinh,huyen:s.huyen,tenHuyen:s.tenHuyen,phuong:s.phuong,tenPhuong:s.tenPhuong,ghiChu:s.ghiChu};q(c),console.log("new DATA : ",c),D(!1)},q=async c=>{try{(await De(h,c)).status_code===201&&(T("Xác nhận thanh toán thành công thành công"),k("success"),C(!0),v(!1),D(!1),H())}catch(g){console.log(g),T("Lỗi"),k("error"),C(!0)}};return e.jsxs(e.Fragment,{children:[e.jsxs(ee,{open:a,onClose:S,fullWidth:!0,maxWidth:"md",children:[e.jsx(ne,{variant:"h4",children:"Thanh toán"}),e.jsx(te,{children:e.jsx(J,{children:e.jsxs(r,{container:!0,spacing:2,sx:{marginTop:2},children:[e.jsx(r,{item:!0,xs:12,children:e.jsxs(f,{variant:"h3",color:"error",children:["Cần thanh toán : ",(s.loaiHoaDon===0?s.tongTienPhaiTra:s.tongTienPhaiTra+s.tienShip).toLocaleString()," ","VNĐ"]})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(_,{label:"Số tiền",type:"number",value:G,onChange:c=>{const g=c.target.value;(parseFloat(g)>=0||g==="")&&M(g)},fullWidth:!0})}),e.jsx(r,{item:!0,xs:6,children:e.jsx(L,{variant:b==="cash"?"contained":"outlined",onClick:()=>$("cash"),fullWidth:!0,children:"Tiền mặt"})}),e.jsx(r,{item:!0,xs:6,children:e.jsx(L,{variant:b==="transfer"?"contained":"outlined",onClick:()=>$("transfer"),fullWidth:!0,children:"Chuyển khoản"})}),e.jsx(r,{item:!0,xs:12,children:e.jsxs(f,{variant:"h4",children:["Tiền dư: ",ae.toLocaleString()," VNĐ"]})}),e.jsx(r,{item:!0,xs:12,children:e.jsxs(f,{variant:"h4",color:"error",children:["Tiền thiếu: ",E.toLocaleString()," VNĐ"]})}),e.jsx(r,{item:!0,xs:12,children:e.jsxs(f,{variant:"h4",children:["Khách thanh toán : ",u.toLocaleString()," VNĐ"]})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(Pe,{component:ye,sx:{maxHeight:400},children:e.jsxs(He,{children:[e.jsx(we,{children:e.jsxs(ie,{children:[e.jsx(m,{children:"STT"}),e.jsx(m,{children:"Ngày tạo"}),e.jsx(m,{children:"Tiền nhận"}),e.jsx(m,{children:"Phương thanh toán"}),e.jsx(m,{children:"Trạng thái"}),e.jsx(m,{children:"Người tạo"}),e.jsx(m,{children:"Hành động"})]})}),e.jsx(Ne,{children:p.map((c,g)=>e.jsxs(ie,{children:[e.jsx(m,{children:g+1}),e.jsx(m,{children:c.ngayTao}),e.jsx(m,{children:c.tienNhan?c.tienNhan.toLocaleString():""}),e.jsx(m,{children:c.phuongThanhToan===1?"Tiền mặt":"Chuyển khoản"}),e.jsx(m,{children:c.loaiThanhToan===0?"Thanh toán":"Trả Sau"}),e.jsx(m,{children:c.nguoiTao?c.nguoiTao:"Chưa xác định"}),e.jsxs(m,{children:[e.jsx(Se,{label:"Hủy bỏ giao dịch này",children:e.jsx(L,{onClick:()=>P(c.id),children:e.jsx(xn,{color:"erorr"})})})," "]})]},g))})]})})}),e.jsx(r,{item:!0,xs:12,sx:{textAlign:"right"},children:e.jsx(L,{onClick:()=>D(!0),disabled:E>0,children:"Thanh toán"})})]})})}),e.jsxs(ee,{open:R,onClose:()=>v(!1),children:[e.jsx(ne,{children:"Xác nhận"}),e.jsxs(te,{children:["Bạn có chắc chắn muốn thanh toán bằng ",b==="cash"?"Tiền mặt":"Chuyển khoản"," không?"]}),e.jsxs(r,{item:!0,xs:12,sx:{textAlign:"right"},children:[e.jsx(L,{onClick:()=>v(!1),children:"Hủy"}),e.jsx(L,{onClick:X,color:"primary",children:"OK"})]})]})]}),e.jsxs(ee,{open:Y,onClose:()=>D(!1),children:[e.jsx(ne,{children:"Xác nhận thanh toán"}),e.jsxs(te,{children:["Bạn có chắc chắn muốn thanh toán bằng hóa đơn ",e.jsxs("strong",{children:[s.ma," "]})," không?"]}),e.jsxs(r,{item:!0,xs:12,sx:{textAlign:"right"},children:[e.jsx(L,{onClick:()=>D(!1),children:"Hủy"}),e.jsx(L,{onClick:I,color:"primary",children:"OK"})]})]}),e.jsx(de,{open:V,autoHideDuration:6e3,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(ue,{onClose:l,severity:U,sx:{width:"100%"},children:Q})})]})};function Cn(x){const{id:h}=oe(),{bill:a,onLoading:S,onReload:s}=x,H=i.useRef(null),[p,B]=i.useState(!1),[b,A]=i.useState([]),[G,M]=i.useState([]),[E,d]=i.useState([]),[u,w]=i.useState(""),[R,v]=i.useState(""),[ae,N]=i.useState(""),[Y,D]=i.useState(!1),[V,C]=i.useState(""),[Q,T]=i.useState("success"),[U,k]=i.useState(!1),[$,X]=i.useState(!1),[K,l]=i.useState(!1),[n,P]=i.useState({ten:"",tenKhachHang:"",sdt:"",email:"",diaChi:"",tinh:"",tenTinh:"",huyen:"",tenHuyen:"",phuong:"",tenPhuong:"",ghiChu:"",tienShip:"",loaiHoaDon:"",thanhToanSau:""}),[I,q]=i.useState({ten:"",sdt:"",email:"",tinh:"",huyen:"",phuong:""});i.useEffect(()=>{P({...a,ten:a.tenKhachHang||"",email:a.email||"",sdt:a.sdt||"",diaChi:a.diaChi||""}),q({}),B(a.loaiHoaDon==1),c()},[h,a]);const c=async()=>{const t=await sn();if(A(t.data),a!=null&&a.tinh){const o=await je(a.tinh);M(o.data),v(""),N(""),d([])}if(a!=null&&a.huyen){const o=await fe(a.huyen);d(o.data),N("")}if(a!=null&&a.tinh){const o=b.find(j=>j.ProvinceID===parseInt(a.tinh));if(P(j=>({...j,tinh:a.tinh,tenTinh:o?o.ProvinceName:""})),a!=null&&a.huyen){const j=G.find(y=>y.DistrictID===parseInt(a.huyen));if(P(y=>({...y,huyen:a.huyen,tenHuyen:j?j.DistrictName:""})),(a==null?void 0:a.phuong)!=null){N(a.phuong);const y=E.find(F=>F.WardCode===a.phuong);P(F=>({...F,phuong:a.phuong,tenPhuong:y?y.WardName:""})),se(j,a.phuong)}}}},g=async t=>{O(t);const o=t.target.value;w(o);const j=b.find(F=>F.ProvinceID===parseInt(o));P(F=>({...F,tinh:o,tenTinh:j?j.ProvinceName:"",phuong:"",huyen:""}));const y=await je(o);M(y.data),v(""),N(""),d([])},W=async t=>{O(t);const o=t.target.value;v(o);const j=G.find(F=>F.DistrictID===parseInt(o));P(F=>({...F,huyen:o,tenHuyen:j?j.DistrictName:""}));const y=await fe(o);d(y.data),N("")},Z=t=>{O(t);const o=t.target.value;N(o);const j=E.find(y=>y.WardCode===o);P(y=>({...y,phuong:o,tenPhuong:j?j.WardName:""})),se(R,o)},se=async(t,o)=>{console.log("to_district_id",t),console.log("to_ward_code",o);const j=await on(t,o),y=await rn(t,o),Ve=new Date(j.data.leadtime*1e3).toISOString().slice(0,19).replace("T"," ");P($e=>({...$e,tienShip:y.data.total,ngayNhanHangDuKien:Ve}))},me=()=>{k(!1)},O=t=>{const{id:o,value:j}=t.target;P(y=>({...y,[o]:j}))},Be=t=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0}).format(t),Le=t=>{t.preventDefault();const j=new FormData(t.target).get("maPGG");Ae(j.trim())},Ae=async t=>{try{const o=await Ue(t,h);o.status_code===201&&o.status_code===201&&(C("Thêm phiêu giảm giá vào hóa đơn thành công"),T("success"),k(!0),S(),H.current&&(H.current.value=""))}catch(o){C(o.response.data.message),T("error"),k(!0)}},We=t=>{t.target,B(t.target.checked),c(),P({...n,loaiHoaDon:t.target.checked?1:0})},Fe=t=>{P(o=>({...o,thanhToanSau:t.target.checked?1:0}))},Ge=t=>{D(!0)},Ee=()=>{D(!1)},Re=()=>{const t={};if(p&&(n.ten?n.ten.length<5&&(t.ten="Tên phải có ít nhất 5 ký tự"):t.ten="Vui lòng nhập tên của bạn",n.sdt?/^0\d{9}$/.test(n.sdt)||(t.sdt="Số điện thoại không hợp lệ"):t.sdt="Vui lòng nhập số điện thoại",n.email?/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(n.email)||(t.email="Email không hợp lệ"):t.email="Vui lòng nhập email",n.tinh||(t.tinh="Vui lòng chọn Tỉnh/Thành Phố"),n.huyen||(t.huyen="Vui lòng chọn Quận/Huyện"),n.phuong||(t.phuong="Vui lòng chọn Phường/Xã")),console.log("Form Data Oke : ",n),q(t),Object.keys(t).length>0){C("Thông tin đơn hàng chưa cung cấp đủ"),T("error"),k(!0);return}else q({});if(a.tongSanPham===0){C("Hóa đơn chưa có sản phẩm nào"),T("error"),k(!0);return}n.thanhToanSau==0?X(!0):l(!0)},Me=()=>{const t={thanhToanSau:n.thanhToanSau,loaiHoaDon:n.loaiHoaDon,ten:n.ten,sdt:n.sdt,email:n.email,diaChi:n.diaChi,tinh:n.tinh,tenTinh:n.tenTinh,huyen:n.huyen,tenHuyen:n.tenHuyen,phuong:n.phuong,tenPhuong:n.tenPhuong,ghiChu:n.ghiChu,tienShip:n.tienShip};console.log("THANH TOÁN SAU : ",t),Ke(t)},Oe=()=>{X(!1)},Ke=async t=>{try{(await De(h,t)).status_code===201&&(C("Xác nhận đắt hàng thành công thành công"),T("success"),k(!0),P({}),l(!1),s(),S())}catch(o){console.log(o),C("Lỗi"),T("error"),k(!0)}},_e=()=>{s()};return console.log("BILL : ",a),e.jsxs(e.Fragment,{children:[e.jsxs(r,{container:!0,spacing:2,padding:2,sx:{backgroundColor:"white",marginTop:5,borderRadius:4},children:[e.jsx(r,{item:!0,xs:8,children:e.jsx(f,{variant:"h3",children:"Thông tin đơn hàng "})}),e.jsx(r,{item:!0,xs:4}),e.jsx(r,{mt:2,item:!0,xs:12,sx:{borderTop:1}}),e.jsx(r,{item:!0,xs:8,children:p&&h?e.jsxs(r,{container:!0,spacing:2,children:[e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsx(_,{label:"Tên của bạn",id:"ten",placeholder:"Nhập tên của bạn",value:n.ten||"",onChange:O,error:!!I.ten,helperText:I.ten,fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!!n.ten}})}),e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsx(_,{label:"Số điện thoại",id:"sdt",placeholder:"Nhập số điện thoại",value:n.sdt,onChange:O,error:!!I.sdt,helperText:I.sdt,fullWidth:!0,margin:"normal",type:"tel",InputLabelProps:{shrink:!!n.sdt}})}),e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsx(_,{label:"Email",id:"email",placeholder:"Nhập email",value:n.email,onChange:O,error:!!I.email,helperText:I.email,fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!!n.email}})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(_,{label:"Địa chỉ giao hàng",id:"diaChi",placeholder:"Nhập địa chỉ giao hàng",value:n.diaChi,onChange:O,fullWidth:!0,margin:"normal",multiline:!0,rows:4,InputLabelProps:{shrink:!!n.diaChi}})}),e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsxs(re,{fullWidth:!0,margin:"normal",children:[e.jsx(le,{id:"tinh-label",children:"Tỉnh/Thành Phố"}),e.jsxs(he,{labelId:"tinh-label",id:"tinh",value:n.tinh,onChange:g,error:!!I.tinh,children:[e.jsx(z,{value:"",disabled:!0,children:"Chọn Tỉnh/Thành Phố"}),b.map(t=>e.jsx(z,{value:t.ProvinceID,children:t.ProvinceName},t.ProvinceID))]}),I.tinh&&e.jsx(f,{color:"error",children:I.tinh})]})}),e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsxs(re,{fullWidth:!0,margin:"normal",children:[e.jsx(le,{id:"huyen-label",children:"Quận/Huyện"}),e.jsxs(he,{labelId:"huyen-label",id:"huyen",value:n.huyen,onChange:W,children:[e.jsx(z,{value:"",children:"Chọn Quận/Huyện"}),G.map(t=>e.jsx(z,{value:t.DistrictID,children:t.DistrictName},t.DistrictID))]}),I.huyen&&e.jsx(f,{color:"error",children:I.huyen})]})}),e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsxs(re,{fullWidth:!0,margin:"normal",children:[e.jsx(le,{id:"phuong-label",children:"Phường/Xã"}),e.jsxs(he,{labelId:"phuong-label",id:"phuong",value:n.phuong,onChange:Z,children:[e.jsx(z,{value:"",children:"Chọn Phường/Xã"}),E.map(t=>e.jsx(z,{value:t.WardCode,children:t.WardName},t.WardCode))]}),I.phuong&&e.jsx(f,{color:"error",children:I.phuong})]})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(_,{label:"Ghi chú",id:"ghiChu",placeholder:"Ghi chú",value:n.ghiChu,onChange:O,fullWidth:!0,margin:"normal",multiline:!0,rows:4,InputLabelProps:{shrink:!!n.ghiChu}})}),e.jsx(r,{item:!0,xs:12,style:{display:"flex",flexDirection:"column",alignItems:"center"},children:e.jsxs("strong",{style:{fontSize:"24px"},children:[" Phí ship : ",Be(n.tienShip)]})})]}):e.jsx(e.Fragment,{})}),e.jsxs(r,{item:!0,xs:4,children:[e.jsxs(pn,{display:"flex",alignItems:"center",sx:{flexDirection:{xs:"column",sm:"row"}},children:[e.jsx(L,{variant:"contained",color:"warning",size:"small",sx:{padding:1,borderRadius:3,mr:2},onClick:()=>{Ge()},disabled:!h,children:"Chọn Mã Giảm Giá :"}),e.jsx("form",{onSubmit:Le,children:e.jsx("input",{type:"text",placeholder:"Mã Giảm Giá",name:"maPGG",style:{width:"150%",padding:"10px",border:"1px solid #ccc",borderRadius:"4px"},ref:H})})," "]}),e.jsx(xe,{disabled:!h,control:e.jsx(Ce,{checked:p,onChange:We,color:"primary"}),label:p?"Giao hàng":"Tại quầy"}),p&&e.jsx(xe,{control:e.jsx(Ce,{checked:(n==null?void 0:n.thanhToanSau)===1,onChange:Fe,color:"primary"}),label:"Trả sau"}),e.jsxs(f,{mt:1,variant:"h4",children:["Tổng tiền hàng: ",h?parseFloat((n==null?void 0:n.tongTienBanDau)||0).toLocaleString()||"0":0," VNĐ"]}),e.jsxs(f,{mt:1,variant:"h4",children:["Phiếu giảm giá : ",h&&(n==null?void 0:n.maPGG)||""]}),e.jsxs(f,{mt:1,variant:"h4",children:["Giảm giá: - ",h&&parseFloat((n==null?void 0:n.giaTriPhieuGiamGia)||0).toLocaleString()||"0"," VNĐ"]}),e.jsxs(f,{mt:1,variant:"h4",children:["Giảm hạng: - ",h&&parseFloat((n==null?void 0:n.tienGiamHangKhachHang)||0).toLocaleString()||"0"," VNĐ"]}),e.jsxs(f,{mt:1,variant:"h4",fontWeight:"bold",color:"error",children:["Tiền sau giảm giá: ",h&&parseFloat((n==null?void 0:n.tongTienPhaiTra)||0).toLocaleString()||"0"," VNĐ"]}),p&&e.jsxs(f,{mt:1,variant:"h4",children:["Tiền ship: + ",h&&parseFloat((n==null?void 0:n.tienShip)||0).toLocaleString()||"0"," VNĐ"]}),e.jsxs(f,{mt:1,variant:"h4",fontWeight:"bold",color:"error",children:["Khách cần trả:"," ",h&&parseFloat((n==null?void 0:n.tongTienPhaiTra)+(p?n.tienShip:0)||0).toLocaleString()||"0"," VNĐ"]}),e.jsx(L,{variant:"contained",color:"primary",onClick:Re,disabled:!h,children:n.thanhToanSau==1?"Xác nhận đặt hàng":"Tiến hành thanh toán"}),e.jsx(fn,{open:$,onClose:Oe,data:n,onReload:_e})]})]}),e.jsx(ln,{showDiaLogCoupon:Y,handleCloseDiaLogCoupon:Ee,bill:a,onLoading:()=>{S()}}),e.jsxs(ee,{open:K,onClose:()=>l(!1),children:[e.jsx(ne,{children:"Xác nhận thanh toán"}),e.jsxs(te,{children:["Bạn chắc chắn muốn thanh toán hóa đơn ",e.jsxs("strong",{children:[a.ma," "]})," trả sau không?"]}),e.jsxs(r,{item:!0,xs:12,sx:{textAlign:"right"},children:[e.jsx(L,{onClick:()=>l(!1),children:"Hủy"}),e.jsx(L,{onClick:Me,color:"primary",children:"OK"})]})]}),e.jsx(de,{open:U,autoHideDuration:2e3,onClose:me,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(ue,{onClose:me,severity:Q,sx:{width:"100%"},children:V})})]})}var ge={},Tn=ze;Object.defineProperty(ge,"__esModule",{value:!0});var Ie=ge.default=void 0,yn=Tn(Xe()),Sn=e;Ie=ge.default=(0,yn.default)((0,Sn.jsx)("path",{d:"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"}),"ShoppingCart");const bn=async()=>{try{return await Je("sell/bill-codes")}catch(x){throw console.error("Error fetching sell get bill codes:",x),x}},vn=async x=>{try{return await en(`sell/delete/${x}`)}catch(h){throw console.error("Error delete bill by code:",h),h}};function Dn(x){const{id:h}=oe(),{bill:a,onLoading:S}=x,[s,H]=i.useState([]),[p,B]=i.useState(!1),[b,A]=i.useState(1),[G,M]=i.useState(0),[E,d]=i.useState(""),[u,w]=i.useState({ten:"",sdt:"",email:"",diaChi:""}),[R,v]=i.useState(""),[ae,N]=i.useState("success"),[Y,D]=i.useState(!1),V=()=>{D(!1)};i.useEffect(()=>{w(h?{ten:a.tenKhachHang,sdt:a.sdt||"",email:a.email,diaChi:a.diaChi}:{ten:"",sdt:"",email:"",diaChi:""})},[h,a]),console.log("bill",a),console.log("setCustomer ",u);const C=async l=>{try{const n=await cn(E,l-1);n&&(H(n.content),M(n.totalPages))}catch{v("Api khách hàng lỗi"),N("error"),D(!0)}},Q=l=>{const{value:n}=l.target;d(n.trim()),C(b)},T=async l=>{try{const n=await qe(l,h);n.status_code&&(v("Thêm khách hàng thành công"),N("success"),D(!0),console.log("DATA IN CUSMTOM  :",n.data),w({ten:n.data.tenKhachHang,sdt:n.data.sdt,email:n.data.email,diaChi:n.data.diaChi}),S(),K())}catch{v("Thêm khách hàng thất bại"),N("error"),D(!0)}},U=async l=>{try{const n=await dn(l);n?(v("Thêm khách hàng thành công"),N("success"),D(!0),T(n.data.id,h),w({ten:n.data.ten,sdt:n.data.sdt,email:n.data.email})):(v("Khoong thể thêm"),N("error"),D(!0))}catch(n){console.log(n),v(n.response.data.message),N("error"),D(!0)}},k=l=>{l.preventDefault();const P=new FormData(l.target).get("sdt");U(P.trim())},$=l=>{A(l),C(l)},X=l=>{B(!0),C(b)},K=()=>{B(!1),H([])};return e.jsxs(e.Fragment,{children:[e.jsxs(r,{container:!0,spacing:2,padding:2,sx:{backgroundColor:"white",marginTop:5,borderRadius:4},children:[e.jsxs(r,{container:!0,justifyContent:"space-between",alignItems:"center",children:[e.jsx(f,{variant:"h3",children:"Khách hàng"}),e.jsx(L,{variant:"contained",color:"primary",onClick:()=>{X()},disabled:!h,children:"Chọn khách hàng"})]}),e.jsxs(r,{container:!0,spacing:2,paddingY:2,borderBottom:1,borderColor:"grey.300",children:[e.jsx(r,{item:!0,xs:6,children:e.jsxs(f,{variant:"subtitle1",children:["Tên khách hàng : ",u.ten]})}),e.jsx(r,{item:!0,xs:6,children:e.jsxs(f,{variant:"subtitle1",children:["Email : ",u.email]})})]}),e.jsxs(r,{container:!0,spacing:2,paddingY:2,children:[e.jsx(r,{item:!0,xs:6,children:e.jsxs(f,{variant:"subtitle1",sx:{display:"flex",alignItems:"center"},children:["Số điện thoại :",e.jsx("form",{onSubmit:k,style:{width:"70%",marginLeft:"5px"},children:e.jsx(_,{type:"text",placeholder:"Số điện thoại",name:"sdt",value:u.sdt,variant:"outlined",label:"Số điện thoại",InputLabelProps:{shrink:!!u.sdt},onChange:l=>{w({...u,sdt:l.target.value})},fullWidth:!0,margin:"normal"})})]})}),e.jsx(r,{item:!0,xs:6,children:e.jsxs(f,{variant:"subtitle1",children:["Địa chỉ : ",u.diaChi]})})]})]}),e.jsxs(ee,{open:p,onClose:K,maxWidth:"md",fullWidth:!0,children:[e.jsx(ne,{children:"Danh sách khách hàng"}),e.jsxs(te,{children:[e.jsx("input",{type:"text",name:"search",placeholder:"Tìm theo mã , tên , sđt , email",onChange:Q,style:{width:"100%",padding:"10px",border:"1px solid #ccc",borderRadius:"4px"}}),e.jsx(Pe,{component:ye,style:{maxHeight:"500px"},children:e.jsxs(He,{stickyHeader:!0,children:[e.jsx(we,{children:e.jsxs(ie,{children:[e.jsx(m,{}),e.jsx(m,{children:"Họ và tên"}),e.jsx(m,{children:"SDT"}),e.jsx(m,{children:"Email"}),e.jsx(m,{children:"Hành động"})]})}),e.jsx(Ne,{style:{maxHeight:"300px",overflowY:"auto"},children:s.map(l=>e.jsxs(ie,{children:[e.jsx(m,{}),e.jsx(m,{children:`${l.ho?l.ho:""} ${l.ten?l.ten:""}`.trim()||"N/A"}),e.jsx(m,{children:l.sdt}),e.jsx(m,{children:l.email?l.email:"N/A"}),e.jsx(m,{children:e.jsx(Se,{title:"Chọn khách hàng này",placement:"top",children:e.jsx(be,{onClick:()=>{T(l.id)},color:"primary",disabled:(a==null?void 0:a.idKhachHang)===!1||a.idKhachHang===l.id,children:e.jsx(mn,{})})})})]},l.id))})]})})]}),e.jsx(gn,{sx:{marginTop:"10px",textAlign:"center"},count:G,page:b,onChange:(l,n)=>$(n)}),e.jsx(un,{children:e.jsx(L,{onClick:K,color:"primary",children:"Đóng"})})]}),e.jsx(de,{open:Y,autoHideDuration:6e3,onClose:V,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(ue,{onClose:V,severity:ae,sx:{width:"100%"},children:R})})]})}function kn(x){const{onReload:h,exitingBill:a}=x,{id:S}=oe();ve();const[s,H]=i.useState({}),p=async()=>{try{const A=await ke(S);A.status_code===200&&H(A.data)}catch(A){console.log("Lỗi : ",A)}};i.useEffect(()=>{p()},[S]);const B=()=>{p()},b=()=>{H({}),h(),console.log("Gọi hàm nay")};return e.jsxs(e.Fragment,{children:[e.jsx(hn,{onLoading:B,bill:s,title:"Giỏ hàng"}),e.jsx(Dn,{onLoading:B,bill:s}),e.jsx(Cn,{onLoading:B,bill:s,onReload:b})]})}function nt(){const x=ve(),[h,a]=i.useState({}),[S,s]=i.useState([]),[H,p]=i.useState(null);i.useState(!1);const B=async()=>{const d=await bn();d.status_code===200&&(d.data.length>0?(s(d.data),p(0),x(`/ban-hang/hoa-don/${d.data[0]}`)):(s([]),p(null),x("/ban-hang")))};i.useEffect(()=>{B(),x("/ban-hang")},[]);const b=async d=>{try{const u=await ke(d);u.status_code===200&&(a(u.data),console.log("CAlll APi"))}catch{a({})}},A=(d,u)=>{p(u),x(`/ban-hang/hoa-don/${S[u]}`),console.log("Code : ",S[u]),S[u]&&b(S[u])},G=async d=>{if(console.log("DATA : ",d),d)try{if((await vn(d)).status_code===204){const w=S.filter(R=>R!==d);if(s(w),ce.success(pe.DELETED),w.length>0){const R=H>=w.length?w.length-1:H;p(R),x(`/ban-hang/hoa-don/${w[R]}`)}else p(null),x("/ban-hang")}}catch{ce.error("Có lỗi xảy ra khi xóa hóa đơn")}},M=async()=>{const d=await Ze();d.status_code===201&&(s(u=>[d.data.ma,...u]),p(0),x(`/ban-hang/hoa-don/${d.data.ma}`),ce.success(pe.CREATED))},E=()=>{B(),p(null),x("/ban-hang")};return e.jsx(e.Fragment,{children:e.jsxs(J,{children:[e.jsx(J,{sx:{borderBottom:1,borderColor:"divider",marginTop:2},children:e.jsxs(jn,{value:H,onChange:A,variant:"scrollable",scrollButtons:"auto",children:[S.map((d,u)=>e.jsx(Te,{label:e.jsxs(J,{sx:{display:"flex",alignItems:"center"},children:[d,e.jsx(Ie,{fontSize:"small",sx:{marginLeft:1}}),e.jsx(be,{onClick:()=>G(d),size:"small",children:e.jsx(Ye,{fontSize:"small"})})]})},d)),e.jsx(Te,{label:e.jsx(J,{sx:{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",padding:"10px",height:"30px",width:"30px",border:"2px solid #697586"},children:e.jsx(Qe,{onClick:()=>M(),sx:{fontSize:30}})})})]})})," ",e.jsx(kn,{exitingBill:h,onReload:E})]})})}export{nt as default};
