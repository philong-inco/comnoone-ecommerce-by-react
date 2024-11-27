import{r as d,j as e,h as z,aq as N,ar as P,as as I,B as A,f as w,i as C,M as B,d as M,k as O,p as F,m as W,c as U}from"./index-C3AKKGhn.js";import{b as V}from"./back-end-vuWvP0DO.js";import{I as $,u as D,a as L,c as X,f as q}from"./heDieuHanh-COuqrOoT.js";import{B as v}from"./react-toastify.esm-BgZIXYS1.js";import{N as k}from"./notification-B40vY8uZ.js";import{E as K}from"./Edit-BdLQoyQM.js";import{A as G}from"./Add-CIMKSK4g.js";import{M as S}from"./MenuItem-BPROy0V0.js";import{T as J,a as Q,b as Y,c as R,d as Z}from"./TableRow-B_CqS-KR.js";import{T as j}from"./TableCell-H1HogFdd.js";import{S as H}from"./Switch-DQniZdEO.js";import{T as _}from"./TablePagination-BljFDuGW.js";import"./SwitchBase-BbMjoehg.js";import"./KeyboardArrowRight-CMlb_Nei.js";import"./LastPage-BFOqoU3v.js";const ee={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #673AB7",borderRadius:"10px",p:5};function ae({fetchRams:u,info:i}){const[g,p]=d.useState(!1),m=()=>p(!0),n=()=>{y(),p(!1)},[s,l]=d.useState({ten:"",trangThai:1}),[c,f]=d.useState({ten:"",trangThai:1});d.useEffect(()=>{i&&g&&l({ten:i.ten,trangThai:1})},[i,g]);const T=r=>{const{value:a,name:t}=r.target;l({...s,[t]:a}),f({...c,[t]:a?"":"Trường này không được để trống"})},y=()=>{l({ten:"",trangThai:1}),f({ten:"",trangThai:1})},h=async()=>{let r=!0;const a={...c};for(const x in s)s[x]||(a[x]="Trường này không được để trống",r=!1);f(a);const t=await $(s.ten,i.id);t||(r=!1,console.log("checkName: ",t),alert("Tên đã tồn tại")),r&&(await D({id:i.id,ten:s.ten,trangThai:s.trangThai})?(v.success(k.CREATED),u(),n()):v.error(k.ERROR))};return e.jsxs("div",{children:[e.jsx(z,{sx:{color:"#6C6C6C"},onClick:m,children:e.jsx(K,{})}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:g,onClose:n,closeAfterTransition:!0,slots:{backdrop:P},slotProps:{backdrop:{timeout:500}},children:e.jsx(I,{in:g,children:e.jsxs(A,{sx:ee,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"CHỈNH SỬA"}),e.jsx(w,{label:"Tên Hệ Điều Hành",style:{width:"100%"},name:"ten",error:!!c.ten,helperText:c.ten,onChange:T,value:s.ten})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{style:{marginTop:"10px",fontStyle:"italic",color:"gray"},children:[e.jsxs("p",{children:["Ngày tạo: ",i.ngayTao]}),e.jsxs("p",{children:["Người tạo: ",i.nguoiTao]}),e.jsxs("p",{children:["Ngày sửa: ",i.ngaySua]}),e.jsxs("p",{children:["Người sửa: ",i.nguoiSua]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(C,{variant:"contained",color:"secondary",onClick:n,children:"Hủy"}),e.jsx(C,{variant:"contained",color:"secondary",onClick:h,children:"Xác Nhận"})]})]})]})})})]})}const te={position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"background.paper",border:"2px solid #673AB7",borderRadius:"10px",p:5};function ne({fetchRams:u}){const[i,g]=d.useState(!1),p=()=>g(!0),m=()=>{T(),g(!1)},[n,s]=d.useState({ten:"",trangThai:1}),[l,c]=d.useState({ten:"",trangThai:1}),f=h=>{const{value:r,name:a}=h.target;s({...n,[a]:r}),c({...l,[a]:r?"":"Trường này không được để trống"})},T=()=>{s({ten:"",trangThai:1}),c({ten:"",trangThai:1})},y=async()=>{let h=!0;const r={...l};for(const t in n)n[t]||(r[t]="Trường này không được để trống",h=!1);c(r);const a=await L(n.ten);a||(h=!1,console.log("checkName: ",a),alert("Tên đã tồn tại")),h&&(await X({ten:n.ten,trangThai:n.trangThai})?(v.success(k.CREATED),u(),m()):v.error(k.ERROR))};return e.jsxs("div",{children:[e.jsx(C,{variant:"contained",color:"secondary",endIcon:e.jsx(G,{}),onClick:p,children:"Tạo mới"}),e.jsx(N,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:i,onClose:m,closeAfterTransition:!0,slots:{backdrop:P},slotProps:{backdrop:{timeout:500}},children:e.jsx(I,{in:i,children:e.jsxs(A,{sx:te,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",textAlign:"center"},children:[e.jsx("h2",{style:{fontSize:"30px"},children:"THÊM HỆ ĐIỀU HÀNH"}),e.jsx(w,{label:"Tên Hệ Điều Hành",style:{width:"100%"},name:"ten",error:!!l.ten,helperText:l.ten,onChange:f})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"end",alignItems:"end",marginTop:"20px",gap:"10px"},children:[e.jsx(C,{variant:"contained",color:"secondary",onClick:m,children:"Hủy"}),e.jsx(C,{variant:"contained",color:"secondary",onClick:y,children:"Xác Nhận"})]})]})})})]})}const Te=()=>{const u=[{id:"ma",label:"Mã",minWidth:70},{id:"ten",label:"Tên",minWidth:300},{id:"trangThai",label:"Trạng thái",minWidth:80},{id:"hanhDong",label:"Hành động",minWidth:170}],[i,g]=d.useState({pageNo:"",pageSize:"",totalPage:"",totalElement:""}),[p,m]=d.useState([]);d.useEffect(()=>{console.log("data: ",p)},[p]);const[n,s]=d.useState({page:"0",size:"5",name:"",trangThai:""});d.useEffect(()=>{console.log("filter: ",n),l()},[n]);const l=async()=>{const a=await q(n);m(a.data.data),g(t=>({...t,pageNo:a.data.pageNo,pageSize:a.data.pageSize,totalPage:a.data.totalPage,totalElement:a.data.totalElement}))},c=a=>{s(t=>({...t,page:0,size:5,name:a.target.value}))},f=a=>{s(t=>({...t,page:0,size:5,trangThai:a.target.value}))},T=(a,t)=>{console.log("newPage: ",t),s(x=>({...x,page:t}))},y=a=>{s(t=>({...t,size:a.target.value}))},h=a=>t=>{t.target.checked?r(a,1):r(a,0)},r=async(a,t)=>{let o=(await U.get(`${V}/he-dieu-hanh/detail/${a}`)).data.data;console.log("temp: ",o);let b={...o,trangThai:t};console.log("temp1: ",b),await D(b),l()};return e.jsx("div",{children:e.jsx(B,{children:e.jsxs(M,{sx:{width:"100%",overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",paddingTop:"10px"},children:[e.jsxs("div",{children:[e.jsx(w,{sx:{width:"400px"},color:"secondary",onChange:c,id:"outlined-basic",label:"Tìm theo tên",variant:"outlined"}),e.jsxs(O,{sx:{width:"200px",marginLeft:"20px"},children:[e.jsx(F,{id:"demo-simple-select-label",children:"Trạng Thái"}),e.jsxs(W,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:n.trangThai,label:"Trạng thái",onChange:f,children:[e.jsx(S,{value:"",children:"Tất cả"}),e.jsx(S,{value:1,children:"Hoạt động"}),e.jsx(S,{value:0,children:"Không hoạt động"})]})]})]}),e.jsx("div",{children:e.jsx(ne,{fetchRams:l})})]}),e.jsx(J,{sx:{maxHeight:440},children:e.jsxs(Q,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(Y,{children:e.jsxs(R,{children:[e.jsx(j,{children:"STT"}),u.map(a=>e.jsx(j,{align:a.align,style:{minWidth:a.minWidth},children:a.label},a.id))]})}),e.jsx(Z,{children:p.map((a,t)=>{const x=n.page*n.size+t+1;return e.jsxs(R,{hover:!0,role:"checkbox",tabIndex:-1,children:[e.jsx(j,{align:"left",children:x}),u.map(o=>{const b=a[o.id];if(o.id==="trangThai")return e.jsx(j,{align:o.align,children:b===1?"Hoạt động":"Đã tắt"},o.id);if(o.id==="hanhDong"){let E=a.trangThai;return e.jsx("div",{style:{display:"flex"},children:e.jsxs(j,{sx:{display:"flex"},align:o.align,children:[e.jsx(ae,{fetchRams:l,info:a}),E===1&&e.jsx(H,{defaultChecked:!0,color:"secondary",onChange:h(a.id)}),E===0&&e.jsx(H,{color:"secondary",onChange:h(a.id)})]},o.id)})}return e.jsx(j,{align:o.align,children:b},o.id)})]},a.code)})})]})}),e.jsx(_,{rowsPerPageOptions:[5,10,25,50,100],component:"div",count:i.totalElement,rowsPerPage:n.size,page:n.page,onPageChange:T,onRowsPerPageChange:y})]})})})};export{Te as default};
