import{ab as w,r as o,j as e,Z as T,aq as k,ar as H,Q as I,B as D,N as R,I as M,M as $,J as S,K as v,ad as N}from"./index-COCf9D-9.js";import{b as C}from"./back-end-vuWvP0DO.js";import{B as u}from"./react-toastify.esm-CdKeP-fX.js";import{N as b}from"./notification-B40vY8uZ.js";import{A}from"./Add-DbXBUQeH.js";import{E as B,S as O}from"./sweetalert2.esm.all-2JntzzgT.js";import{M as j}from"./MenuItem-DZ1TXfcd.js";import{D as P,a as z}from"./DataGrid-aby7OZ3r.js";import"./toPropertyKey-PLuKRk1e.js";import"./Autocomplete-Yn8AE_hM.js";import"./Close-G1yeCTF0.js";import"./Checkbox-BaIBsI-F.js";import"./CircularProgress-C9L1KMTy.js";import"./TablePagination-DUKw-BOQ.js";import"./KeyboardArrowRight-DZPhPuW4.js";import"./LastPage-DEWP3WKD.js";import"./TableCell-DFzCksj9.js";import"./useThemeProps-DMDlQzC9.js";const E="he-dieu-hanh",F=async({ten:i,trangThai:a})=>{var n;try{const s=await w.post(`${C}/${E}/add`,{ten:i,trangThai:a});return(n=s==null?void 0:s.data)==null?void 0:n.data}catch(s){console.log("Error createNewRam",s)}},L=async({page:i,size:a})=>{try{return await w.get(`${C}/${E}/all?page=${i}&limit=${a}`)}catch(n){console.log("Error createNewRam",n)}},U=async({id:i})=>{try{return await w.delete(`${C}/${E}/delete/${i}`)}catch(a){console.log("Error deleteRam",a)}},V=async({id:i,ten:a,trangThai:n})=>{try{return await w.put(`${C}/${E}/update/${i}`,{id:i,ten:a,trangThai:n})}catch(s){console.log("Error updateRam",s)}},W={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function X({fetchRams:i}){const[a,n]=o.useState(!1),s=()=>n(!0),g=()=>{y(),n(!1)},[d,l]=o.useState({ten:"",trangThai:1}),[h,p]=o.useState({ten:"",trangThai:1}),f=x=>{const{value:t,name:r}=x.target;l({...d,[r]:t}),p({...h,[r]:t?"":"Trường này không được để trống"})},y=()=>{l({ten:"",trangThai:1}),p({ten:"",trangThai:1})},m=async()=>{let x=!0;const t={...h};for(const r in d)d[r]||(t[r]="Trường này không được để trống",x=!1);p(t),x&&(await F({ten:d.ten,trangThai:d.trangThai})?(u.success(b.CREATED),i(),g()):u.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(T,{endIcon:e.jsx(A,{}),onClick:s,children:"Tạo mới"}),e.jsx(k,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:a,onClose:g,closeAfterTransition:!0,slots:{backdrop:H},slotProps:{backdrop:{timeout:500}},children:e.jsx(I,{in:a,children:e.jsxs(D,{sx:W,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"THÊM HỆ ĐIỀU HÀNH"}),e.jsx(R,{label:"Tên Hệ Điều Hành",style:{width:"100%"},name:"ten",error:!!h.ten,helperText:h.ten,onChange:f})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:g,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:m,children:"Xác Nhận"})]})]})})})]})}const q={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function G({fetchRams:i,info:a}){const[n,s]=o.useState(!1),g=()=>s(!0),d=()=>{m(),s(!1)},[l,h]=o.useState({ten:"",trangThai:1}),[p,f]=o.useState({ten:"",trangThai:1});o.useEffect(()=>{a&&n&&h({ten:a.ten,trangThai:1})},[a,n]);const y=t=>{const{value:r,name:c}=t.target;h({...l,[c]:r}),f({...p,[c]:r?"":"Trường này không được để trống"})},m=()=>{h({ten:"",trangThai:1}),f({ten:"",trangThai:1})},x=async()=>{let t=!0;const r={...p};for(const c in l)l[c]||(r[c]="Trường này không được để trống",t=!1);f(r),t&&(await V({id:a.id,ten:l.ten,trangThai:l.trangThai})?(u.success(b.CREATED),i(),d()):u.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(M,{color:"primary",onClick:g,children:e.jsx(B,{})}),e.jsx(k,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:n,onClose:d,closeAfterTransition:!0,slots:{backdrop:H},slotProps:{backdrop:{timeout:500}},children:e.jsx(I,{in:n,children:e.jsxs(D,{sx:q,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"CHỈNH SỬA"}),e.jsx(R,{label:"Tên Hệ Điều Hành",style:{width:"100%"},name:"ten",error:!!p.ten,helperText:p.ten,onChange:y,value:l.ten})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:d,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:x,children:"Xác Nhận"})]})]})})})]})}const pe=()=>{const i=[{field:"index",headerName:"STT",width:70,flex:1},{field:"ma",headerName:"Mã",width:130,flex:1},{field:"ten",headerName:"Tên Hệ Điều Hành",width:130,flex:1},{field:"actions",headerName:"Thao Tác",sortable:!1,width:160,flex:1,renderCell:t=>e.jsxs("div",{children:[e.jsx("div",{style:{display:"inline-block"},children:e.jsx(G,{fetchRams:m,info:t.row})}),e.jsx(M,{color:"error",onClick:()=>x(t.id),children:e.jsx(z,{})})]})}],[a,n]=o.useState([]),[s,g]=o.useState(0),[d,l]=o.useState(1),[h,p]=o.useState(0),[f,y]=o.useState(!1);o.useEffect(()=>{m()},[s]);const m=async()=>{try{y(!0);const t=await L({page:s,size:5});y(!1),t.status===200?(n(t.data.data.map((r,c)=>({...r,index:c+s*5+1}))),p(parseInt(t.data.totalElement)),l(parseInt(t.data.totalPage))):u.error("Error loading data")}catch{u.error("Error loading data")}},x=async t=>{O.fire({title:"Are you sure?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#9c27b0",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async r=>{if(r.isConfirmed){const c=await U({id:t});c&&c.data.code===200?(u.success(b.DELETED),m()):u.error(b.ERROR)}})};return e.jsx("div",{children:e.jsxs($,{title:"Danh sách Hệ Điều Hành",children:[e.jsxs("div",{className:"mb-5 flex",style:{justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx(R,{label:"Tìm RAM",style:{width:"300px"}}),e.jsx(T,{className:"btn rounded-lg",children:"Làm mới"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(S,{fullWidth:!0,children:[e.jsx(v,{id:"status",children:"Trạng Thái"}),e.jsxs(N,{labelId:"status",id:"status",label:"Trạng Thái",className:"w-[300px]",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]}),e.jsxs(S,{fullWidth:!0,style:{width:"400px"},children:[e.jsx(v,{id:"display",children:"Hiển thị"}),e.jsxs(N,{labelId:"display",id:"display",label:"Hiển thị",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]})]}),e.jsx("div",{children:e.jsx(X,{fetchRams:m})})]}),e.jsx("div",{style:{height:400,width:"100%"},children:e.jsx(P,{rows:a,columns:i,initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},pageSizeOptions:[5],onPaginationModelChange:({page:t})=>g(t),rowCount:h,paginationMode:"server",loading:f})})]})})};export{pe as default};
