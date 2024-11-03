import{c as w,r as i,j as e,m as T,ax as N,ay as M,az as D,B as $,f as E,h as A,M as I,n as R,t as v,o as k}from"./index-BIssY3ES.js";import{b as C}from"./back-end-vuWvP0DO.js";import{B as g}from"./react-toastify.esm-CyyOKOyt.js";import{N as b}from"./notification-B40vY8uZ.js";import{A as B}from"./Add-BzV9-73G.js";import{E as O,S as H}from"./sweetalert2.esm.all-BU_ShcAN.js";import{M as j}from"./MenuItem-DXPtbgVP.js";import{D as P}from"./Delete-j2L8xHdX.js";import{D as z}from"./DataGrid-C3FNfPmF.js";import"./toPropertyKey-PLuKRk1e.js";import"./Autocomplete-CB6AoPGv.js";import"./Close-DqFvtwpG.js";import"./index-DL2Hym-o.js";import"./Checkbox-B6XmajkB.js";import"./CircularProgress-D2HMPZiu.js";import"./TablePagination-FwlX19aN.js";import"./KeyboardArrowRight-DCS3bnxJ.js";import"./LastPage-DAj5RLva.js";import"./TableCell-BTwc7VYq.js";import"./useThemeProps-BoGcdF9_.js";const S="mau-sac",F=async({ten:o,dungLuong:s,tocDoBus:n,trangThai:l})=>{var c;try{const a=await w.post(`${C}/${S}/add`,{ten:o,dungLuong:s,tocDoBus:n,trangThai:l});return(c=a==null?void 0:a.data)==null?void 0:c.data}catch(a){console.log("Error createNewRam",a)}},L=async({page:o,size:s})=>{try{return await w.get(`${C}/${S}/all?page=${o}&limit=${s}`)}catch(n){console.log("Error createNewRam",n)}},U=async({id:o})=>{try{return await w.delete(`${C}/${S}/delete/${o}`)}catch(s){console.log("Error deleteRam",s)}},V=async({id:o,ten:s,dungLuong:n,tocDoBus:l,trangThai:c})=>{try{return await w.put(`${C}/${S}/update/${o}`,{id:o,ten:s,dungLuong:n,tocDoBus:l,trangThai:c})}catch(a){console.log("Error updateRam",a)}},W={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function X({fetchRams:o}){const[s,n]=i.useState(!1),l=()=>n(!0),c=()=>{y(),n(!1)},[a,d]=i.useState({ten:"",trangThai:1}),[m,p]=i.useState({ten:"",trangThai:1}),f=u=>{const{value:t,name:r}=u.target;d({...a,[r]:t}),p({...m,[r]:t?"":"Trường này không được để trống"})},y=()=>{d({ten:"",trangThai:1}),p({ten:"",trangThai:1})},x=async()=>{let u=!0;const t={...m};for(const r in a)a[r]||(t[r]="Trường này không được để trống",u=!1);p(t),u&&(await F({ten:a.ten,trangThai:a.trangThai})?(g.success(b.CREATED),o(),c()):g.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(T,{endIcon:e.jsx(B,{}),onClick:l,children:"Tạo mới"}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:s,onClose:c,closeAfterTransition:!0,slots:{backdrop:M},slotProps:{backdrop:{timeout:500}},children:e.jsx(D,{in:s,children:e.jsxs($,{sx:W,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"THÊM MÀU SẮC"}),e.jsx(E,{label:"Tên Màu Sắc",style:{width:"100%"},name:"ten",error:!!m.ten,helperText:m.ten,onChange:f})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:c,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:x,children:"Xác Nhận"})]})]})})})]})}const G={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #000",p:5};function Y({fetchRams:o,info:s}){const[n,l]=i.useState(!1),c=()=>l(!0),a=()=>{x(),l(!1)},[d,m]=i.useState({ten:"",trangThai:1}),[p,f]=i.useState({ten:"",trangThai:1});i.useEffect(()=>{s&&n&&m({ten:s.ten,trangThai:1})},[s,n]);const y=t=>{const{value:r,name:h}=t.target;m({...d,[h]:r}),f({...p,[h]:r?"":"Trường này không được để trống"})},x=()=>{m({ten:"",trangThai:1}),f({ten:"",trangThai:1})},u=async()=>{let t=!0;const r={...p};for(const h in d)d[h]||(r[h]="Trường này không được để trống",t=!1);f(r),t&&(await V({id:s.id,ten:d.ten,trangThai:d.trangThai})?(g.success(b.CREATED),o(),a()):g.error(b.ERROR))};return e.jsxs("div",{children:[e.jsx(A,{color:"primary",onClick:c,children:e.jsx(O,{})}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:n,onClose:a,closeAfterTransition:!0,slots:{backdrop:M},slotProps:{backdrop:{timeout:500}},children:e.jsx(D,{in:n,children:e.jsxs($,{sx:G,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"CHỈNH SỬA"}),e.jsx(E,{label:"Tên Màu Sắc",style:{width:"100%"},name:"ten",error:!!p.ten,helperText:p.ten,onChange:y,value:d.ten})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(T,{className:"btn",onClick:a,children:"Hủy"}),e.jsx(T,{className:"btn",onClick:u,children:"Xác Nhận"})]})]})})})]})}const xe=()=>{const o=[{field:"index",headerName:"STT",width:70,flex:1},{field:"ma",headerName:"Mã",width:130,flex:1},{field:"ten",headerName:"Tên RAM",width:130,flex:1},{field:"actions",headerName:"Thao Tác",sortable:!1,width:160,flex:1,renderCell:t=>e.jsxs("div",{children:[e.jsx("div",{style:{display:"inline-block"},children:e.jsx(Y,{fetchRams:x,info:t.row})}),e.jsx(A,{color:"error",onClick:()=>u(t.id),children:e.jsx(P,{})})]})}],[s,n]=i.useState([]),[l,c]=i.useState(0),[a,d]=i.useState(1),[m,p]=i.useState(0),[f,y]=i.useState(!1);i.useEffect(()=>{x()},[l]);const x=async()=>{try{y(!0);const t=await L({page:l,size:5});y(!1),t.status===200?(n(t.data.data.map((r,h)=>({...r,index:h+l*5+1}))),p(parseInt(t.data.totalElement)),d(parseInt(t.data.totalPage))):g.error("Error loading data")}catch{g.error("Error loading data")}},u=async t=>{H.fire({title:"Are you sure?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#9c27b0",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async r=>{if(r.isConfirmed){const h=await U({id:t});h&&h.data.code===200?(g.success(b.DELETED),x()):g.error(b.ERROR)}})};return e.jsx("div",{children:e.jsxs(I,{title:"Danh sách màu sắc",children:[e.jsxs("div",{className:"mb-5 flex",style:{justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx(E,{label:"Tìm RAM",style:{width:"300px"}}),e.jsx(T,{className:"btn rounded-lg",children:"Làm mới"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(R,{fullWidth:!0,children:[e.jsx(v,{id:"status",children:"Trạng Thái"}),e.jsxs(k,{labelId:"status",id:"status",label:"Trạng Thái",className:"w-[300px]",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]}),e.jsxs(R,{fullWidth:!0,style:{width:"400px"},children:[e.jsx(v,{id:"display",children:"Hiển thị"}),e.jsxs(k,{labelId:"display",id:"display",label:"Hiển thị",children:[e.jsx(j,{value:10,children:"Ten"}),e.jsx(j,{value:20,children:"Twenty"}),e.jsx(j,{value:30,children:"Thirty"})]})]})]}),e.jsx("div",{children:e.jsx(X,{fetchRams:x})})]}),e.jsx("div",{style:{height:400,width:"100%"},children:e.jsx(z,{rows:s,columns:o,initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},pageSizeOptions:[5],onPaginationModelChange:({page:t})=>c(t),rowCount:m,paginationMode:"server",loading:f})})]})})};export{xe as default};