import{c as i,r as p,ao as x,j as a,B as y,d as b,T as d,f as g,i as j,ap as h}from"./index-lZI9Axgt.js";import{C as v}from"./CircularProgress-D5JedJ_d.js";const l="https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api",w={signUp:t=>i.post(`${l}/khachhang/create`,t,{headers:{"Content-Type":"application/json"}}),signIn:async t=>{var e;try{return(await i.post(`${l}/v1/auth/login`,t,{headers:{"Content-Type":"application/json"}})).data}catch(n){throw console.error("Sign-in error:",n),((e=n.response)==null?void 0:e.data)||"Đăng nhập thất bại."}},sendEmailForgotPassword:t=>i.get(`${l}/khachhang/sendemailforgotpassword`,{params:{email:t},headers:{"Content-Type":"application/json"}}),updatePassword:({id:t,newPassword:e})=>i.put(`${l}/khachhang/update-password/${t}`,null,{params:{newPassword:e},headers:{"Content-Type":"application/json"}})},I=()=>{const[t,e]=p.useState({email:"",password:""}),{onLogin:n}=x(),[c,r]=p.useState(!1),[k,m]=p.useState(!1),u=o=>{e({...t,[o.target.name]:o.target.value})},f=async o=>{o.preventDefault(),r(!0);try{const s=await w.signIn(t);if(s.role==="CUSTOMER"){h.error("Tài khoản không tồn tại!"),r(!1);return}if(s.trangThai===3){m(!0),r(!1);return}n(s),h.success("Đăng nhập thành công!")}catch{h.error("Có lỗi xảy ra, vui lòng thử lại")}finally{r(!1)}};return a.jsx(y,{sx:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundImage:"url('https://res.cloudinary.com/daljc2ktr/image/upload/v1731643195/rszyuca62fo0uosvnhf0.jpg')",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",padding:2},children:a.jsxs(b,{elevation:6,sx:{padding:4,width:"100%",maxWidth:420,textAlign:"center",backgroundColor:"rgba(255, 255, 255, 0.9)",backdropFilter:"blur(10px)",borderRadius:2},children:[a.jsx(d,{variant:"h4",gutterBottom:!0,color:"primary",children:"Đăng nhập"}),a.jsxs(d,{variant:"subtitle1",gutterBottom:!0,color:"textSecondary",children:["Chào mừng bạn đến với hệ thống quản lý cửa hàng"," ",a.jsx("span",{style:{color:"#800080",fontWeight:"bold"},children:"COMNOONE"})]}),a.jsxs("form",{onSubmit:f,children:[a.jsx(g,{label:"Tên đăng nhập",name:"email",value:t.email,onChange:u,variant:"outlined",fullWidth:!0,margin:"normal",color:"primary",InputLabelProps:{shrink:!0}}),a.jsx(g,{label:"Mật khẩu",name:"password",type:"password",value:t.password,onChange:u,variant:"outlined",fullWidth:!0,margin:"normal",color:"primary",InputLabelProps:{shrink:!0}}),a.jsx(j,{type:"submit",variant:"contained",color:"primary",fullWidth:!0,sx:{mt:3,py:1.5,fontWeight:"bold",fontSize:"1rem"},disabled:c,children:c?a.jsx(v,{size:24,color:"inherit"}):"Đăng nhập"})]})]})})};export{I as default};
