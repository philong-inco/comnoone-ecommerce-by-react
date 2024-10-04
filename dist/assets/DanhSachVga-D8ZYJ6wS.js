import{ab as C,r as i,j as e,Z as T,aq as N,ar as k,Q as A,B as D,N as w,I as M,M as I,J as v,K as L,ad as S}from"./index-COCf9D-9.js";import{B as f}from"./react-toastify.esm-CdKeP-fX.js";import{N as b}from"./notification-B40vY8uZ.js";import{b as E}from"./back-end-vuWvP0DO.js";import{A as $}from"./Add-DbXBUQeH.js";import{E as B,S as O}from"./sweetalert2.esm.all-2JntzzgT.js";import{M as j}from"./MenuItem-DZ1TXfcd.js";import{D as H,a as P}from"./DataGrid-aby7OZ3r.js";import"./toPropertyKey-PLuKRk1e.js";import"./Autocomplete-Yn8AE_hM.js";import"./Close-G1yeCTF0.js";import"./Checkbox-BaIBsI-F.js";import"./CircularProgress-C9L1KMTy.js";import"./TablePagination-DUKw-BOQ.js";import"./KeyboardArrowRight-DZPhPuW4.js";import"./LastPage-DEWP3WKD.js";import"./TableCell-DFzCksj9.js";import"./useThemeProps-DMDlQzC9.js";const R="vga",V=async({ten:o,dungLuong:a,tocDoBus:s,trangThai:d})=>{var c;try{const n=await C.post(`${E}/${R}/add`,{ten:o,dungLuong:a,tocDoBus:s,trangThai:d});return(c=n==null?void 0:n.data)==null?void 0:c.data}catch(n){console.log("Error createNewRam",n)}},z=async({page:o,size:a})=>{try{return await C.get(`${E}/${R}/all?page=${o}&limit=${a}`)}catch(s){console.log("Error createNewRam",s)}},F=async({id:o})=>{try{return await C.delete(`${E}/${R}/delete/${o}`)}catch(a){console.log("Error deleteRam",a)}},G=async({id:o,ten:a,dungLuong:s,tocDoBus:d,trangThai:c})=>{try{return await C.put(`${E}/${R}/update/${o}`,{id:o,ten:a,dungLuong:s,tocDoBus:d,trangThai:c})}catch(n){console.log("Error updateRam",n)}},U={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function W({fetchRams:o}){const[a,s]=i.useState(!1),d=()=>s(!0),c=()=>{y(),s(!1)},[n,l]=i.useState({ten:"",dungLuong:"",trangThai:1}),[g,u]=i.useState({ten:"",dungLuong:"",trangThai:1}),p=x=>{const{value:t,name:r}=x.target;l({...n,[r]:t}),u({...g,[r]:t?"":"Trường này không được để trống"})},y=()=>{l({ten:"",dungLuong:"",trangThai:1}),u({ten:"",dungLuong:"",trangThai:1})},m=async()=>{let x=!0;const t={...g};for(const r in n)n[r]||(t[r]="Trường này không được để trống",x=!1);u(t),x&&(await V({dungLuong:n.dungLuong,ten:n.ten,trangThai:n.trangThai})?(f.success(b.CREATED),o(),c()):f.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(T,{endIcon:e.jsx($,{}),onClick:d,children:"Tạo mới"}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:a,onClose:c,closeAfterTransition:!0,slots:{backdrop:k},slotProps:{backdrop:{timeout:500}},children:e.jsx(A,{in:a,children:e.jsxs(D,{sx:U,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"THÊM VGA"}),e.jsx(w,{label:"Tên VGA",style:{width:"100%"},name:"ten",error:!!g.ten,helperText:g.ten,onChange:p}),e.jsx(w,{label:"Dung lượng",style:{width:"100%"},name:"dungLuong",error:!!g.dungLuong,helperText:g.dungLuong,onChange:p})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:c,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:m,children:"Xác Nhận"})]})]})})})]})}const X={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function q({fetchRams:o,info:a}){const[s,d]=i.useState(!1),c=()=>d(!0),n=()=>{m(),d(!1)},[l,g]=i.useState({ten:"",dungLuong:"",trangThai:1}),[u,p]=i.useState({ten:"",dungLuong:"",trangThai:1});i.useEffect(()=>{a&&s&&g({ten:a.ten,dungLuong:a.dungLuong,trangThai:1})},[a,s]);const y=t=>{const{value:r,name:h}=t.target;g({...l,[h]:r}),p({...u,[h]:r?"":"Trường này không được để trống"})},m=()=>{g({ten:"",trangThai:1}),p({ten:"",trangThai:1})},x=async()=>{let t=!0;const r={...u};for(const h in l)l[h]||(r[h]="Trường này không được để trống",t=!1);p(r),t&&(await G({id:a.id,dungLuong:l.dungLuong,ten:l.ten,trangThai:l.trangThai})?(f.success(b.CREATED),o(),n()):f.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(M,{color:"primary",onClick:c,children:e.jsx(B,{})}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:s,onClose:n,closeAfterTransition:!0,slots:{backdrop:k},slotProps:{backdrop:{timeout:500}},children:e.jsx(A,{in:s,children:e.jsxs(D,{sx:X,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"CHỈNH SỬA"}),e.jsx(w,{label:"Tên RAM",style:{width:"100%"},name:"ten",error:!!u.ten,helperText:u.ten,onChange:y,value:l.ten}),e.jsx(w,{label:"Dung lượng",style:{width:"100%"},name:"dungLuong",error:!!u.dungLuong,helperText:u.dungLuong,onChange:y,value:l.dungLuong})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:n,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:x,children:"Xác Nhận"})]})]})})})]})}const ue=()=>{const o=[{field:"index",headerName:"STT",width:70,flex:1},{field:"ma",headerName:"Mã",width:130,flex:1},{field:"ten",headerName:"Tên VGA",width:130,flex:1},{field:"dungLuong",headerName:"Dung Lượng",flex:1},{field:"actions",headerName:"Thao Tác",sortable:!1,width:160,flex:1,renderCell:t=>e.jsxs("div",{children:[e.jsx("div",{style:{display:"inline-block"},children:e.jsx(q,{fetchRams:m,info:t.row})}),e.jsx(M,{color:"error",onClick:()=>x(t.id),children:e.jsx(P,{})})]})}],[a,s]=i.useState([]),[d,c]=i.useState(0),[n,l]=i.useState(1),[g,u]=i.useState(0),[p,y]=i.useState(!1);i.useEffect(()=>{m()},[d]);const m=async()=>{try{y(!0);const t=await z({page:d,size:5});y(!1),t.status===200?(s(t.data.data.map((r,h)=>({...r,index:h+d*5+1}))),u(parseInt(t.data.totalElement)),l(parseInt(t.data.totalPage))):f.error("Error loading data")}catch{f.error("Error loading data")}},x=async t=>{O.fire({title:"Are you sure?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#9c27b0",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async r=>{if(r.isConfirmed){const h=await F({id:t});h&&h.data.code===200?(f.success(b.DELETED),m()):f.error(b.ERROR)}})};return e.jsx("div",{children:e.jsxs(I,{title:"Danh sách VGA",children:[e.jsxs("div",{className:"mb-5 flex",style:{justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx(w,{label:"Tìm RAM",style:{width:"300px"}}),e.jsx(T,{className:"btn rounded-lg",children:"Làm mới"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(v,{fullWidth:!0,children:[e.jsx(L,{id:"status",children:"Trạng Thái"}),e.jsxs(S,{labelId:"status",id:"status",label:"Trạng Thái",className:"w-[300px]",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]}),e.jsxs(v,{fullWidth:!0,style:{width:"400px"},children:[e.jsx(L,{id:"display",children:"Hiển thị"}),e.jsxs(S,{labelId:"display",id:"display",label:"Hiển thị",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]})]}),e.jsx("div",{children:e.jsx(W,{fetchRams:m})})]}),e.jsx("div",{style:{height:400,width:"100%"},children:e.jsx(H,{rows:a,columns:o,initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},pageSizeOptions:[5],onPaginationModelChange:({page:t})=>c(t),rowCount:g,paginationMode:"server",loading:p})})]})})};export{ue as default};
