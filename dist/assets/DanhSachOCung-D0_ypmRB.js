import{ab as w,r as d,j as e,Z as T,aq as N,ar as k,Q as D,B as M,N as C,I,M as $,J as L,K as v,ad as S}from"./index-fYug5RY9.js";import{b as E}from"./back-end-vuWvP0DO.js";import{B as f}from"./react-toastify.esm-BwM67r7P.js";import{N as b}from"./notification-B40vY8uZ.js";import{A}from"./Add-BpRoUzsA.js";import{E as B,S as O}from"./sweetalert2.esm.all-BNa2ZHrx.js";import{M as j}from"./MenuItem-BoieQS9d.js";import{D as H,a as P}from"./DataGrid-CskfJS1_.js";import"./toPropertyKey-PLuKRk1e.js";import"./Autocomplete-boWl3RSk.js";import"./Close-xbaa0MAg.js";import"./Checkbox-BqbNCbCc.js";import"./CircularProgress-Przdu-Cf.js";import"./TablePagination-BsrYkSrA.js";import"./KeyboardArrowRight-DhUyWrK4.js";import"./LastPage-Brqnpezw.js";import"./TableCell-D8S_yL8v.js";import"./useThemeProps-CHN6Lpw-.js";const R="o-cung",z=async({ten:o,dungLuong:n,trangThai:a})=>{var l;try{const s=await w.post(`${E}/${R}/add`,{ten:o,dungLuong:n,trangThai:a});return(l=s==null?void 0:s.data)==null?void 0:l.data}catch(s){console.log("Error createNewRam",s)}},F=async({page:o,size:n})=>{try{return await w.get(`${E}/${R}/all?page=${o}&limit=${n}`)}catch(a){console.log("Error createNewRam",a)}},G=async({id:o})=>{try{return await w.delete(`${E}/${R}/delete/${o}`)}catch(n){console.log("Error deleteRam",n)}},U=async({id:o,ten:n,dungLuong:a,trangThai:l})=>{try{return await w.put(`${E}/${R}/update/${o}`,{id:o,ten:n,dungLuong:a,trangThai:l})}catch(s){console.log("Error updateRam",s)}},V={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function W({fetchRams:o}){const[n,a]=d.useState(!1),l=()=>a(!0),s=()=>{y(),a(!1)},[u,i]=d.useState({ten:"",dungLuong:"",trangThai:1}),[c,g]=d.useState({ten:"",dungLuong:"",trangThai:1}),p=x=>{const{value:t,name:r}=x.target;i({...u,[r]:t}),g({...c,[r]:t?"":"Trường này không được để trống"})},y=()=>{i({ten:"",dungLuong:"",trangThai:1}),g({ten:"",dungLuong:"",trangThai:1})},m=async()=>{let x=!0;const t={...c};for(const r in u)u[r]||(t[r]="Trường này không được để trống",x=!1);g(t),x&&(await z({dungLuong:u.dungLuong,ten:u.ten,trangThai:u.trangThai})?(f.success(b.CREATED),o(),s()):f.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(T,{endIcon:e.jsx(A,{}),onClick:l,children:"Tạo mới"}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:n,onClose:s,closeAfterTransition:!0,slots:{backdrop:k},slotProps:{backdrop:{timeout:500}},children:e.jsx(D,{in:n,children:e.jsxs(M,{sx:V,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"THÊM Ổ CỨNG"}),e.jsx(C,{label:"Tên Ổ Cứng",style:{width:"100%"},name:"ten",error:!!c.ten,helperText:c.ten,onChange:p}),e.jsx(C,{label:"Dung lượng",style:{width:"100%"},name:"dungLuong",error:!!c.dungLuong,helperText:c.dungLuong,onChange:p})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:s,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:m,children:"Xác Nhận"})]})]})})})]})}const X={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function q({fetchRams:o,info:n}){const[a,l]=d.useState(!1),s=()=>l(!0),u=()=>{m(),l(!1)},[i,c]=d.useState({ten:"",dungLuong:"",trangThai:1}),[g,p]=d.useState({ten:"",dungLuong:"",trangThai:1});d.useEffect(()=>{n&&a&&c({ten:n.ten,dungLuong:n.dungLuong,trangThai:1})},[n,a]);const y=t=>{const{value:r,name:h}=t.target;c({...i,[h]:r}),p({...g,[h]:r?"":"Trường này không được để trống"})},m=()=>{c({ten:"",trangThai:1}),p({ten:"",trangThai:1})},x=async()=>{let t=!0;const r={...g};for(const h in i)i[h]||(r[h]="Trường này không được để trống",t=!1);p(r),t&&(await U({id:n.id,dungLuong:i.dungLuong,ten:i.ten,trangThai:i.trangThai})?(f.success(b.CREATED),o(),u()):f.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(I,{color:"primary",onClick:s,children:e.jsx(B,{})}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:a,onClose:u,closeAfterTransition:!0,slots:{backdrop:k},slotProps:{backdrop:{timeout:500}},children:e.jsx(D,{in:a,children:e.jsxs(M,{sx:X,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"CHỈNH SỬA"}),e.jsx(C,{label:"Tên RAM",style:{width:"100%"},name:"ten",error:!!g.ten,helperText:g.ten,onChange:y,value:i.ten}),e.jsx(C,{label:"Dung lượng",style:{width:"100%"},name:"dungLuong",error:!!g.dungLuong,helperText:g.dungLuong,onChange:y,value:i.dungLuong})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:u,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:x,children:"Xác Nhận"})]})]})})})]})}const ue=()=>{const o=[{field:"index",headerName:"STT",width:70,flex:1},{field:"ma",headerName:"Mã",width:130,flex:1},{field:"ten",headerName:"Tên Ổ Cứng",width:130,flex:1},{field:"dungLuong",headerName:"Dung Lượng",flex:1},{field:"actions",headerName:"Thao Tác",sortable:!1,width:160,flex:1,renderCell:t=>e.jsxs("div",{children:[e.jsx("div",{style:{display:"inline-block"},children:e.jsx(q,{fetchRams:m,info:t.row})}),e.jsx(I,{color:"error",onClick:()=>x(t.id),children:e.jsx(P,{})})]})}],[n,a]=d.useState([]),[l,s]=d.useState(0),[u,i]=d.useState(1),[c,g]=d.useState(0),[p,y]=d.useState(!1);d.useEffect(()=>{m()},[l]);const m=async()=>{try{y(!0);const t=await F({page:l,size:5});y(!1),t.status===200?(a(t.data.data.map((r,h)=>({...r,index:h+l*5+1}))),g(parseInt(t.data.totalElement)),i(parseInt(t.data.totalPage))):f.error("Error loading data")}catch{f.error("Error loading data")}},x=async t=>{O.fire({title:"Are you sure?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#9c27b0",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async r=>{if(r.isConfirmed){const h=await G({id:t});h&&h.data.code===200?(f.success(b.DELETED),m()):f.error(b.ERROR)}})};return e.jsx("div",{children:e.jsxs($,{title:"Danh sách Ổ Cứng",children:[e.jsxs("div",{className:"mb-5 flex",style:{justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx(C,{label:"Tìm RAM",style:{width:"300px"}}),e.jsx(T,{className:"btn rounded-lg",children:"Làm mới"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(L,{fullWidth:!0,children:[e.jsx(v,{id:"status",children:"Trạng Thái"}),e.jsxs(S,{labelId:"status",id:"status",label:"Trạng Thái",className:"w-[300px]",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]}),e.jsxs(L,{fullWidth:!0,style:{width:"400px"},children:[e.jsx(v,{id:"display",children:"Hiển thị"}),e.jsxs(S,{labelId:"display",id:"display",label:"Hiển thị",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]})]}),e.jsx("div",{children:e.jsx(W,{fetchRams:m})})]}),e.jsx("div",{style:{height:400,width:"100%"},children:e.jsx(H,{rows:n,columns:o,initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},pageSizeOptions:[5],onPaginationModelChange:({page:t})=>s(t),rowCount:c,paginationMode:"server",loading:p})})]})})};export{ue as default};
