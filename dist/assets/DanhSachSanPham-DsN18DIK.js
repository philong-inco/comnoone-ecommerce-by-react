import{z as Ie,E as Ne,j as t,B as Ve,b as _e,r as n,c as l,M as qe,d as X,f as Xe,k as Qe,h as Je,e as Q}from"./index-lZI9Axgt.js";import{d as Ke,B as J,M as Ye,S as d}from"./ImportProduct-BRXnupzl.js";import{d as Ze}from"./Add-BJ73JR4M.js";import{F as te}from"./Fab-CuekNszq.js";import{b as r}from"./back-end-vuWvP0DO.js";import{R as et,a as K}from"./RadioGroup-Dd5T_W4C.js";import{F as Y}from"./FormControlLabel-BBO_n_LH.js";import{U as tt}from"./Upload-BKqbPvbH.js";import{T as at,a as nt,b as st,c as Z,d as it}from"./TableRow-D7eToa8r.js";import{T as m}from"./TableCell-jiXaIEqu.js";import{S as ee}from"./Switch-CvCt3I2e.js";import{T as ot}from"./TablePagination-CE4OcBPd.js";import"./MenuItem-Divc6vnu.js";import"./xlsx-ChUIJHMt.js";import"./sanPham-Cpngb0bn.js";import"./SwitchBase-I1IR-Hvy.js";import"./KeyboardArrowRight-N4GCKU9q.js";import"./LastPage-CPU0u6Bk.js";var j={},lt=Ne;Object.defineProperty(j,"__esModule",{value:!0});var ae=j.default=void 0,rt=lt(Ie()),dt=t;ae=j.default=(0,rt.default)((0,dt.jsx)("path",{d:"m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"}),"EditOutlined");function ct({size:g,color:f,title:u,targetUrl:p}){return t.jsx(Ve,{title:u,children:t.jsx(te,{size:g,color:f,"aria-label":u,href:p,children:t.jsx(Ze,{})})})}const Rt=()=>{const g=_e(),f=e=>{g(`/sanpham/sua/${e}`)},[u,p]=n.useState("0"),ne=e=>{const a=e.target.value;p(a),a==="0"?s(i=>({...i,tenSanPham:c.ma,ma:""})):a==="1"&&s(i=>({...i,ma:c.tenSanPham,tenSanPham:""}))},[se,ie]=n.useState(0),oe=()=>{k([]),y([]),N([]),w([]),R([]),$([]),B([]),G([]),L([]),U([]),W([]),H([]),p("0"),s(e=>({...e,tenSanPham:"",ma:""})),ie(e=>e+1)},le=`${r}/san-pham/find/filter-id?`,[S,re]=n.useState([]),[c,s]=n.useState({page:0,size:"5",tenSanPham:"",ma:"",ngayTaoTruoc:"",ngayTaoSau:"",ngaySuaTruoc:"",ngaySuaSau:"",trangThai:"",idNhuCau:"",idThuongHieu:"",idRam:"",idMauSac:"",idCPU:"",idVGA:"",idWebcam:"",idOCung:"",idManHinh:"",idHeDieuHanh:"",idBanPhim:""}),[de,ce]=n.useState([]),[he,ue]=n.useState([]),[me,ge]=n.useState([]),[pe,xe]=n.useState([]),[fe,Ce]=n.useState([]),[je,Se]=n.useState([]),[be,ke]=n.useState([]),[Te,ye]=n.useState([]),[De,we]=n.useState([]),[Pe,He]=n.useState([]),[ve,Re]=n.useState([]),[Ee,ht]=n.useState([{id:1,ten:"Hoạt động"},{id:0,ten:"Đã tắt"}]),[b,k]=n.useState([]),[T,y]=n.useState([]),[D,w]=n.useState([]),[P,H]=n.useState([]),[v,R]=n.useState([]),[E,$]=n.useState([]),[F,L]=n.useState([]),[M,W]=n.useState([]),[z,B]=n.useState([]),[O,U]=n.useState([]),[A,G]=n.useState([]),[I,N]=n.useState([]);n.useEffect(()=>{x(),Me()},[]),n.useEffect(()=>{const e=I.join(",");s(a=>({...a,trangThai:e}))},[I]),n.useEffect(()=>{const e=b.join(",");s(a=>({...a,idNhuCau:e}))},[b]),n.useEffect(()=>{const e=T.join(",");s(a=>({...a,idThuongHieu:e}))},[T]),n.useEffect(()=>{const e=D.join(",");s(a=>({...a,idRam:e}))},[D]),n.useEffect(()=>{const e=v.join(",");s(a=>({...a,idCPU:e}))},[v]),n.useEffect(()=>{const e=E.join(",");s(a=>({...a,idVGA:e}))},[E]),n.useEffect(()=>{const e=A.join(",");s(a=>({...a,idBanPhim:e}))},[A]),n.useEffect(()=>{const e=z.join(",");s(a=>({...a,idManHinh:e}))},[z]),n.useEffect(()=>{const e=F.join(",");s(a=>({...a,idWebcam:e}))},[F]),n.useEffect(()=>{const e=O.join(",");s(a=>({...a,idHeDieuHanh:e}))},[O]),n.useEffect(()=>{const e=P.join(",");s(a=>({...a,idMauSac:e}))},[P]),n.useEffect(()=>{const e=M.join(",");s(a=>({...a,idOCung:e}))},[M]);const $e=e=>{const a=e.target.value.toString().trim();u==="0"?s(i=>({...i,tenSanPham:a,ma:""})):u==="1"&&s(i=>({...i,ma:a,tenSanPham:""}))},[Fe,Le]=n.useState(0);n.useEffect(()=>{x()},[c]);const x=async()=>{debugger;const e=Object.entries(c).filter(([o,h])=>h!=="").map(([o,h])=>`${o}=${h}`).join("&"),a=le+e,i=await l.get(a);re(i.data.data),Le(parseInt(i.data.totalElement))},Me=async()=>{const e=await l.get(`${r}/nhu-cau/all-list`),a=await l.get(`${r}/thuong-hieu/all-list`),i=await l.get(`${r}/ram/all-list`),o=await l.get(`${r}/mau-sac/all-list`),h=await l.get(`${r}/cpu/all-list`),C=await l.get(`${r}/vga/all-list`),Be=await l.get(`${r}/webcam/all-list`),Oe=await l.get(`${r}/o-cung/all-list`),Ue=await l.get(`${r}/man-hinh/all-list`),Ae=await l.get(`${r}/he-dieu-hanh/all-list`),Ge=await l.get(`${r}/ban-phim/all-list`);ce(e.data.data),ue(a.data.data),ge(i.data.data),xe(o.data.data),Ce(h.data.data),Se(C.data.data),ke(Be.data.data),ye(Oe.data.data),we(Ue.data.data),He(Ae.data.data),Re(Ge.data.data)},V=[{id:"ma",label:"Mã",minWidth:70},{id:"ten",label:"Tên",minWidth:350},{id:"thuongHieu",label:"Thương hiệu",minWidth:100,align:"left"},{id:"nhuCau",label:"Nhu cầu",minWidth:100,align:"left"},{id:"soLuong",label:"Số lượng",minWidth:100,align:"left"},{id:"trangThai",label:"Trạng thái",minWidth:30,align:"center",format:e=>e===1?t.jsx(Q,{label:"Hoạt động",size:"small",color:"secondary"}):t.jsx(Q,{label:"Đã tắt",size:"small",sx:{backgroundColor:"#EDE7F6"}})},{id:"hanhDong",label:"Hành động",minWidth:30,align:"center"}],_=e=>a=>{a.target.checked?q(e,1):q(e,0)},q=(e,a)=>{l.get(`${r}/san-pham/change-status?id=${e}&status=${a}`).then(i=>{x()}).catch(i=>{x()})},We=(e,a)=>{s(i=>({...i,page:a}))},ze=e=>{s(a=>({...a,size:e.target.value}))};return t.jsx(t.Fragment,{children:t.jsxs(qe,{label:"Danh sách sản phẩm",children:[t.jsx("div",{style:{marginBottom:30},children:t.jsxs(X,{children:[t.jsxs("div",{style:{display:"flex",padding:10,paddingTop:20},children:[t.jsx(Xe,{sx:{maxHeight:"10px"},color:"secondary",onChange:$e,id:"outlined-basic",label:"Nhập từ khóa",variant:"outlined"}),t.jsx("div",{style:{marginLeft:10,display:"flex",alignItems:"center"},children:t.jsx(Qe,{children:t.jsxs(et,{"aria-labelledby":"demo-controlled-radio-buttons-group",name:"controlled-radio-buttons-group",value:u,row:!0,onChange:ne,children:[t.jsx(Y,{value:"0",control:t.jsx(K,{color:"secondary",size:"small"}),label:"Tên"}),t.jsx(Y,{value:"1",control:t.jsx(K,{color:"secondary",size:"small"}),label:"Mã"})]})})}),t.jsx("div",{title:"Xóa bộ lọc",onClick:oe,style:{marginLeft:20,marginTop:10,marginRight:20},children:t.jsx(Ke,{color:"secondary",fontSize:"large"})}),t.jsxs("div",{style:{flexGrow:"1",display:"flex",justifyContent:"end"},children:[t.jsx(J,{title:"Tải lên Excel",style:{marginRight:"10px"},onClick:()=>g("/sanpham/themnhieusanpham"),children:t.jsx(te,{size:"medium",color:"secondary",children:t.jsx(tt,{})})}),t.jsx(J,{title:"Xuất Excel",style:{marginRight:"10px"},children:t.jsx(Ye,{data:S,filterCurrent:c})}),t.jsx(ct,{size:"medium",color:"secondary",title:"Thêm sản phẩm",targetUrl:"them"})]})]}),t.jsxs("div",{style:{display:"flex",flexWrap:"wrap"},children:[t.jsx(d,{list:de,setListChecked:k,nameDropDown:"Nhu cầu"}),t.jsx(d,{list:he,setListChecked:y,nameDropDown:"Thương hiệu"}),t.jsx(d,{list:Ee,setListChecked:N,nameDropDown:"Trạng thái"}),t.jsx(d,{list:me,setListChecked:w,nameDropDown:"RAM"}),t.jsx(d,{list:fe,setListChecked:R,nameDropDown:"CPU"}),t.jsx(d,{list:je,setListChecked:$,nameDropDown:"VGA"}),t.jsx(d,{list:De,setListChecked:B,nameDropDown:"Màn hình"}),t.jsx(d,{list:ve,setListChecked:G,nameDropDown:"Bàn phím"}),t.jsx(d,{list:Te,setListChecked:W,nameDropDown:"Ổ cứng"}),t.jsx(d,{list:pe,setListChecked:H,nameDropDown:"Màu sắc"}),t.jsx(d,{list:Pe,setListChecked:U,nameDropDown:"Hệ điều hành"}),t.jsx(d,{list:be,setListChecked:L,nameDropDown:"Webcam"})]})]})},se),t.jsxs(X,{sx:{width:"100%",overflow:"hidden"},children:[t.jsx(at,{sx:{maxHeight:440},children:t.jsxs(nt,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(st,{children:t.jsxs(Z,{children:[t.jsx(m,{style:{fontWeight:700},children:"STT"}),V.map(e=>t.jsx(m,{align:e.align,style:{minWidth:e.minWidth,fontWeight:700},children:e.label},e.id))]})}),t.jsx(it,{children:S.map((e,a)=>{const i=c.page*c.size+a+1;return t.jsxs(Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[t.jsx(m,{align:"center",children:i}),V.map(o=>{const h=e[o.id];if(o.id==="hanhDong"){const C=e.trangThai;return t.jsxs(m,{align:o.align,children:[t.jsx(Je,{onClick:()=>f(e.id),children:t.jsx(ae,{})}),C===1?t.jsx(ee,{defaultChecked:!0,color:"secondary",onChange:_(e.id)}):t.jsx(ee,{onChange:_(e.id)})]},o.id)}return t.jsx(m,{align:o.align,children:o.format&&typeof h=="number"?o.format(h):h},o.id)})]},e.id)})})]})}),t.jsx(ot,{rowsPerPageOptions:[5,10,25,50,100],component:"div",count:Fe,rowsPerPage:parseInt(c.size),page:c.page,onPageChange:We,onRowsPerPageChange:ze})]})]})})};export{Rt as default};