import{r as o,J as Ce,H as be,L as q,y as W,Q as je,_ as fe,j as e,R as ce,U as ve,n as Fe,aT as Qe,N as Be,a as ye,G as g,i as A,T as j,d as Ee,e as te,f as Pe,A as Le,b as Je}from"./index-BNYZeP1T.js";import{d as Ze}from"./ArrowBack-BDs6W833.js";import{u as et,e as tt,f as Ge,h as nt,i as at}from"./billService-B4Fb4oi8.js";import{b as st,c as ot,g as it,a as rt}from"./billStatus-DlquxtQJ.js";import{T as De}from"./Tooltip-BRa6HpAb.js";import{D as ge,a as xe,b as me,c as Me}from"./DialogTitle-Be73EMa2.js";import{T as Ue,a as ze,b as $e,c as He,d as Ke}from"./TableRow-WD6ivono.js";import{T as L}from"./TableCell-BaxNxya6.js";import{D as Re}from"./DialogContentText-B3t5_teJ.js";import{S as Se}from"./Snackbar-6sEUqhGB.js";import{f as Xe,b as Ae,c as we,e as Ve,h as Ye,g as lt,C as ct,S as ht}from"./CouponDiaLog-BT8D9Qht.js";import{B as le}from"./ImportProduct-BfKLY25y.js";import"./request-RmJ5MMbn.js";import{F as dt}from"./Fab-Br1esWDD.js";import"./RadioGroup-DT3_IQ6w.js";import"./SwitchBase-BS7_TVRV.js";import"./FormControlLabel-L0ky9wc-.js";import"./TablePagination-B_CkhwHZ.js";import"./KeyboardArrowRight-BZUhZXMz.js";import"./LastPage-ne3A1-i7.js";import"./MenuItem-BCdLiv3n.js";import"./Checkbox-DiRzef1N.js";import"./Pagination-CaP9kSWl.js";import"./IconTrash-vjDrAV3d.js";import"./couponsService-1cb7-LRV.js";import"./index-BtDF2PEn.js";import"./xlsx-ChUIJHMt.js";import"./sanPham-BNBZ7jdE.js";import"./back-end-vuWvP0DO.js";const ke=o.createContext({}),Oe=o.createContext({});function ut(n){return be("MuiStep",n)}Ce("MuiStep",["root","horizontal","vertical","alternativeLabel","completed"]);const pt=["active","children","className","component","completed","disabled","expanded","index","last"],gt=n=>{const{classes:t,orientation:a,alternativeLabel:c,completed:d}=n;return ve({root:["root",a,c&&"alternativeLabel",d&&"completed"]},ut,t)},xt=q("div",{name:"MuiStep",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.root,t[a.orientation],a.alternativeLabel&&t.alternativeLabel,a.completed&&t.completed]}})(({ownerState:n})=>W({},n.orientation==="horizontal"&&{paddingLeft:8,paddingRight:8},n.alternativeLabel&&{flex:1,position:"relative"})),mt=o.forwardRef(function(t,a){const c=je({props:t,name:"MuiStep"}),{active:d,children:x,className:y,component:u="div",completed:v,disabled:S,expanded:p=!1,index:h,last:f}=c,M=fe(c,pt),{activeStep:H,connector:D,alternativeLabel:N,orientation:k,nonLinear:w}=o.useContext(ke);let[O=!1,R=!1,F=!1]=[d,v,S];H===h?O=d!==void 0?d:!0:!w&&H>h?R=v!==void 0?v:!0:!w&&H<h&&(F=S!==void 0?S:!0);const _=o.useMemo(()=>({index:h,last:f,expanded:p,icon:h+1,active:O,completed:R,disabled:F}),[h,f,p,O,R,F]),s=W({},c,{active:O,orientation:k,alternativeLabel:N,completed:R,disabled:F,expanded:p,component:u}),T=gt(s),l=e.jsxs(xt,W({as:u,className:ce(T.root,y),ref:a,ownerState:s},M,{children:[D&&N&&h!==0?D:null,x]}));return e.jsx(Oe.Provider,{value:_,children:D&&!N&&h!==0?e.jsxs(o.Fragment,{children:[D,l]}):l})}),Ct=Fe(e.jsx("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"}),"CheckCircle"),bt=Fe(e.jsx("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");function jt(n){return be("MuiStepIcon",n)}const Ie=Ce("MuiStepIcon",["root","active","completed","error","text"]);var _e;const ft=["active","className","completed","error","icon"],vt=n=>{const{classes:t,active:a,completed:c,error:d}=n;return ve({root:["root",a&&"active",c&&"completed",d&&"error"],text:["text"]},jt,t)},We=q(Qe,{name:"MuiStepIcon",slot:"Root",overridesResolver:(n,t)=>t.root})(({theme:n})=>({display:"block",transition:n.transitions.create("color",{duration:n.transitions.duration.shortest}),color:(n.vars||n).palette.text.disabled,[`&.${Ie.completed}`]:{color:(n.vars||n).palette.primary.main},[`&.${Ie.active}`]:{color:(n.vars||n).palette.primary.main},[`&.${Ie.error}`]:{color:(n.vars||n).palette.error.main}})),yt=q("text",{name:"MuiStepIcon",slot:"Text",overridesResolver:(n,t)=>t.text})(({theme:n})=>({fill:(n.vars||n).palette.primary.contrastText,fontSize:n.typography.caption.fontSize,fontFamily:n.typography.fontFamily})),St=o.forwardRef(function(t,a){const c=je({props:t,name:"MuiStepIcon"}),{active:d=!1,className:x,completed:y=!1,error:u=!1,icon:v}=c,S=fe(c,ft),p=W({},c,{active:d,completed:y,error:u}),h=vt(p);if(typeof v=="number"||typeof v=="string"){const f=ce(x,h.root);return u?e.jsx(We,W({as:bt,className:f,ref:a,ownerState:p},S)):y?e.jsx(We,W({as:Ct,className:f,ref:a,ownerState:p},S)):e.jsxs(We,W({className:f,ref:a,ownerState:p},S,{children:[_e||(_e=e.jsx("circle",{cx:"12",cy:"12",r:"12"})),e.jsx(yt,{className:h.text,x:"12",y:"12",textAnchor:"middle",dominantBaseline:"central",ownerState:p,children:v})]}))}return v});function Nt(n){return be("MuiStepLabel",n)}const ee=Ce("MuiStepLabel",["root","horizontal","vertical","label","active","completed","error","disabled","iconContainer","alternativeLabel","labelContainer"]),Tt=["children","className","componentsProps","error","icon","optional","slotProps","StepIconComponent","StepIconProps"],Ht=n=>{const{classes:t,orientation:a,active:c,completed:d,error:x,disabled:y,alternativeLabel:u}=n;return ve({root:["root",a,x&&"error",y&&"disabled",u&&"alternativeLabel"],label:["label",c&&"active",d&&"completed",x&&"error",y&&"disabled",u&&"alternativeLabel"],iconContainer:["iconContainer",c&&"active",d&&"completed",x&&"error",y&&"disabled",u&&"alternativeLabel"],labelContainer:["labelContainer",u&&"alternativeLabel"]},Nt,t)},Lt=q("span",{name:"MuiStepLabel",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.root,t[a.orientation]]}})(({ownerState:n})=>W({display:"flex",alignItems:"center",[`&.${ee.alternativeLabel}`]:{flexDirection:"column"},[`&.${ee.disabled}`]:{cursor:"default"}},n.orientation==="vertical"&&{textAlign:"left",padding:"8px 0"})),kt=q("span",{name:"MuiStepLabel",slot:"Label",overridesResolver:(n,t)=>t.label})(({theme:n})=>W({},n.typography.body2,{display:"block",transition:n.transitions.create("color",{duration:n.transitions.duration.shortest}),[`&.${ee.active}`]:{color:(n.vars||n).palette.text.primary,fontWeight:500},[`&.${ee.completed}`]:{color:(n.vars||n).palette.text.primary,fontWeight:500},[`&.${ee.alternativeLabel}`]:{marginTop:16},[`&.${ee.error}`]:{color:(n.vars||n).palette.error.main}})),It=q("span",{name:"MuiStepLabel",slot:"IconContainer",overridesResolver:(n,t)=>t.iconContainer})(()=>({flexShrink:0,display:"flex",paddingRight:8,[`&.${ee.alternativeLabel}`]:{paddingRight:0}})),Wt=q("span",{name:"MuiStepLabel",slot:"LabelContainer",overridesResolver:(n,t)=>t.labelContainer})(({theme:n})=>({width:"100%",color:(n.vars||n).palette.text.secondary,[`&.${ee.alternativeLabel}`]:{textAlign:"center"}})),qe=o.forwardRef(function(t,a){var c;const d=je({props:t,name:"MuiStepLabel"}),{children:x,className:y,componentsProps:u={},error:v=!1,icon:S,optional:p,slotProps:h={},StepIconComponent:f,StepIconProps:M}=d,H=fe(d,Tt),{alternativeLabel:D,orientation:N}=o.useContext(ke),{active:k,disabled:w,completed:O,icon:R}=o.useContext(Oe),F=S||R;let _=f;F&&!_&&(_=St);const s=W({},d,{active:k,alternativeLabel:D,completed:O,disabled:w,error:v,orientation:N}),T=Ht(s),l=(c=h.label)!=null?c:u.label;return e.jsxs(Lt,W({className:ce(T.root,y),ref:a,ownerState:s},H,{children:[F||_?e.jsx(It,{className:T.iconContainer,ownerState:s,children:e.jsx(_,W({completed:O,active:k,error:v,icon:F},M))}):null,e.jsxs(Wt,{className:T.labelContainer,ownerState:s,children:[x?e.jsx(kt,W({ownerState:s},l,{className:ce(T.label,l==null?void 0:l.className),children:x})):null,p]})]}))});qe.muiName="StepLabel";function Dt(n){return be("MuiStepConnector",n)}Ce("MuiStepConnector",["root","horizontal","vertical","alternativeLabel","active","completed","disabled","line","lineHorizontal","lineVertical"]);const At=["className"],wt=n=>{const{classes:t,orientation:a,alternativeLabel:c,active:d,completed:x,disabled:y}=n,u={root:["root",a,c&&"alternativeLabel",d&&"active",x&&"completed",y&&"disabled"],line:["line",`line${Be(a)}`]};return ve(u,Dt,t)},Ot=q("div",{name:"MuiStepConnector",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.root,t[a.orientation],a.alternativeLabel&&t.alternativeLabel,a.completed&&t.completed]}})(({ownerState:n})=>W({flex:"1 1 auto"},n.orientation==="vertical"&&{marginLeft:12},n.alternativeLabel&&{position:"absolute",top:12,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"})),Pt=q("span",{name:"MuiStepConnector",slot:"Line",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.line,t[`line${Be(a.orientation)}`]]}})(({ownerState:n,theme:t})=>{const a=t.palette.mode==="light"?t.palette.grey[400]:t.palette.grey[600];return W({display:"block",borderColor:t.vars?t.vars.palette.StepConnector.border:a},n.orientation==="horizontal"&&{borderTopStyle:"solid",borderTopWidth:1},n.orientation==="vertical"&&{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24})}),Mt=o.forwardRef(function(t,a){const c=je({props:t,name:"MuiStepConnector"}),{className:d}=c,x=fe(c,At),{alternativeLabel:y,orientation:u="horizontal"}=o.useContext(ke),{active:v,disabled:S,completed:p}=o.useContext(Oe),h=W({},c,{alternativeLabel:y,orientation:u,active:v,completed:p,disabled:S}),f=wt(h);return e.jsx(Ot,W({className:ce(f.root,d),ref:a,ownerState:h},x,{children:e.jsx(Pt,{className:f.line,ownerState:h})}))});function Rt(n){return be("MuiStepper",n)}Ce("MuiStepper",["root","horizontal","vertical","nonLinear","alternativeLabel"]);const _t=["activeStep","alternativeLabel","children","className","component","connector","nonLinear","orientation"],Ft=n=>{const{orientation:t,nonLinear:a,alternativeLabel:c,classes:d}=n;return ve({root:["root",t,a&&"nonLinear",c&&"alternativeLabel"]},Rt,d)},Bt=q("div",{name:"MuiStepper",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:a}=n;return[t.root,t[a.orientation],a.alternativeLabel&&t.alternativeLabel,a.nonLinear&&t.nonLinear]}})(({ownerState:n})=>W({display:"flex"},n.orientation==="horizontal"&&{flexDirection:"row",alignItems:"center"},n.orientation==="vertical"&&{flexDirection:"column"},n.alternativeLabel&&{alignItems:"flex-start"})),Et=e.jsx(Mt,{}),Gt=o.forwardRef(function(t,a){const c=je({props:t,name:"MuiStepper"}),{activeStep:d=0,alternativeLabel:x=!1,children:y,className:u,component:v="div",connector:S=Et,nonLinear:p=!1,orientation:h="horizontal"}=c,f=fe(c,_t),M=W({},c,{nonLinear:p,alternativeLabel:x,orientation:h,component:v}),H=Ft(M),D=o.Children.toArray(y).filter(Boolean),N=D.map((w,O)=>o.cloneElement(w,W({index:O,last:O+1===D.length},w.props))),k=o.useMemo(()=>({activeStep:d,alternativeLabel:x,connector:S,nonLinear:p,orientation:h}),[d,x,S,p,h]);return e.jsx(ke.Provider,{value:k,children:e.jsx(Bt,W({as:v,ownerState:M,className:ce(H.root,u),ref:a},f,{children:N}))})}),Ut=n=>{switch(n){case 0:return"Tạo hóa đơn";case 1:return"Chờ thanh toán";case 2:return"Chờ xác nhận";case 3:return"Chờ lấy hàng";case 4:return"Đang giao hàng";case 6:return"Hoàn thành";case 7:return"Đã huỷ";case 9:return"Đã xác nhận";case 10:return"Đã thanh toán";case 11:return"Treo";case 12:return"Cập nhập đơn hàng";default:return""}},zt=n=>{const{data:t}=n;console.log("352 ~ OrderStep ~ data:",t);const a=o.useMemo(()=>{let d=8-t.length;return t.length>0&&(t[t.length-1].trangThai===7||t[t.length-1].trangThai===6)&&(d=0),[...t].concat(Array.from({length:d}).fill(null)).map(u=>({label:Ut(u==null?void 0:u.trangThai),description:(u==null?void 0:u.ngayTao)??""}))},[t]);return e.jsx(e.Fragment,{children:e.jsx(Gt,{activeStep:t.length-1,alternativeLabel:!0,sx:{width:"100%"},children:a.map((c,d)=>e.jsx(mt,{orientation:"horizontal",children:e.jsx(qe,{optional:e.jsx("span",{children:c.description}),children:c.label})},d))})})};function $t(n){const{id:t}=ye(),{data:a,onLoading:c,bill:d}=n;o.useState(!1);const[x,y]=o.useState(null),u=o.useRef(),v=window.innerHeight*.5,S=i=>{let C="Trạng thái chưa được định nghĩa",I="default";switch(i){case"DON_MOI":C="ĐƠN MỚI",I="primary";break;case"HUY":C="HỦY",I="error";break;case"CHO_GIAO":C="CHỜ VẬN CHUYỂN",I="warning";break;case"DANG_GIAO":C="ĐÃ VẬN CHUYỂN",I="info";break;case"TRA_HANG_HOAN_TIEN":C="TRẢ HÀNG HOÀN TIỀN",I="success";break;case"HOAN_THANH":C="HOÀN THÀNH",I="success";break;case"XAC_NHAN":C="ĐÃ XÁC NHẬN",I="primary";break;case"CHO_XAC_NHAN":C="CHỜ XÁC NHẬN",I="warning";break}return e.jsx(te,{label:C,color:I})},p=[{id:"stt",label:"STT"},{id:"ngayTao",label:"Thời gian",minWidth:100,maxWidth:250},{id:"nguoiSua",label:"Người chỉnh sửa",minWidth:100,maxWidth:150},{id:"ghiChuChoCuaHang",label:"Ghi chú của hàng",minWidth:150,maxWidth:200},{id:"ghiChuChoKhachHang",label:"Ghi chú khách hàng",minWidth:150,maxWidth:200},{id:"trangThai",label:"Trạng Thái",minWidth:120,maxWidth:150}],[h,f]=o.useState(""),[M,H]=o.useState("success"),[D,N]=o.useState(!1),[k,w]=o.useState({}),[O,R]=o.useState({ghiChuCuaHang:"",ghiChuKhachHang:""}),[F,_]=o.useState(!1),[s,T]=o.useState(!1),[l,U]=o.useState(!1),[J,V]=o.useState(""),[he,Q]=o.useState(!1),ne=()=>{N(!1)},oe=async i=>{try{(await et(t,J,i)).status_code==201&&(f("Cập nhập trạng thái hóa đơn "+t+" thành công"),H("success"),N(!0),w({}),V(""),U(!1),R({ghiChuCuaHang:"",ghiChuKhachHang:""}),c())}catch(C){if(C.response&&C.response.data){const ae=C.response.data.message.reduce((z,ue)=>z.error_code<ue.error_code?z:ue);w({[ae.field]:ae.messages})}f(C.data.message.data.message),H("error"),N(!0)}},de=async()=>{try{(await tt(t,J)).status_code==201&&(f("Cập nhập trạng thái hóa đơn "+t+" thành công"),H("success"),N(!0),T(!1),w({}),V(""),c())}catch(i){f("Cập trạng thái hóa đơn thất bại !"),H("error"),N(!0),console.log(i)}},$=i=>{const{name:C,value:I}=i.target;R(ae=>({...ae,[C]:I}))},B=i=>{oe(O)},E=i=>{de()},K=()=>{_(!0)},Y=()=>{_(!1)},X=()=>{T(!0)},ie=()=>{T(!1)},r=()=>{U(!0)},m=i=>{V(i),r()},b=i=>{V(i),X()},P=()=>{U(!1),w({}),V(""),R({ghiChuCuaHang:"",ghiChuKhachHang:""})},G=()=>{Q(!1),P()},re=()=>{Q(!0)},Ne=i=>{const C=[];return(i.trangThai==="CHO_THANH_TOAN"||i.trangThai==="CHO_XAC_NHAN"||i.trangThai==="CHO_GIAO"||i.trangThai==="XAC_NHAN"||i.trangThai==="DON_MOI"||i.trangThai==="TREO")&&C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",color:"error",onClick:()=>m("HUY"),fullWidth:!0,children:"HỦY"})},"huy-button")),(i.trangThai==="DON_MOI"||i.trangThai==="CHO_XAC_NHAN"||i.trangThai==="TREO")&&i.loaiHoaDon===1?C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>b("XAC_NHAN"),fullWidth:!0,children:"XÁC NHẬN"})},"xac-nhan-button")):i.trangThai==="TREO"&&i.loaiHoaDon===1?C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>b("XAC_NHAN"),fullWidth:!0,children:"XÁC NHẬN"})},"xac-nhan-button")):i.trangThai==="TREO"&&i.loaiHoaDon===0?C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>b("HOAN_THANH"),fullWidth:!0,children:"Hoàn thành"})},"hoan-thanh-button")):i.trangThai==="DON_MOI"&&i.loaiHoaDon===0?C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>m("HOAN_THANH"),fullWidth:!0,children:"HOÀN THÀNH"})},"hoan-thanh-button")):i.trangThai==="XAC_NHAN"&&i.loaiHoaDon===1?C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>b("CHO_GIAO"),fullWidth:!0,children:"CHỜ VẬN CHUYỂN"})},"hoan-thanh-button")):i.trangThai==="DANG_GIAO"&&i.loaiHoaDon===1&&C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>b("HOAN_THANH"),fullWidth:!0,children:"HOÀN THÀNH"})},"hoan-thanh-button")),i.trangThai==="CHO_GIAO"&&i.loaiHoaDon===1&&C.push(e.jsx(g,{item:!0,xs:3,children:e.jsx(A,{variant:"contained",onClick:()=>m("DANG_GIAO"),fullWidth:!0,children:"ĐÃ VẬN CHUYỂN"})},"dang-giao-button")),e.jsx(g,{container:!0,spacing:2,children:C})};console.log("BILL IN TIME LINE : ",d);const Te=async()=>{try{const i=await fetch(`http://localhost:8080/api/bills/order-pdf/${t}`,{method:"GET",headers:{"Content-Type":"application/pdf"}});if(i.ok){const C=await i.blob(),I=URL.createObjectURL(C);y(I),f("Xuất hóa đơn thành công"),H("success"),N(!0),setTimeout(()=>{u.current.contentWindow.print()},500)}else console.error("Failed to fetch PDF")}catch(i){console.error("Error fetching PDF:",i)}};return e.jsxs(e.Fragment,{children:[e.jsx("div",{children:e.jsxs(g,{container:!0,spacing:2,padding:2,sx:{backgroundColor:"white",borderRadius:4,mt:1,boxShadow:3},children:[e.jsx(zt,{data:a}),e.jsx(g,{item:!0,xs:12,sx:{marginTop:0},children:e.jsxs(g,{container:!0,spacing:2,sx:{justifyContent:"space-between"},children:[e.jsx(g,{item:!0,xs:8,sx:{display:"flex",justifyContent:"flex-start"},children:Ne(d)}),e.jsx(g,{item:!0,xs:2,children:e.jsx(De,{title:"Lịch sử hóa đơn",arrow:!0,placement:"top",children:e.jsx(A,{variant:"contained",color:"warning",fullWidth:!0,onClick:Te,children:"In Hóa Đơn"})})}),e.jsx(g,{item:!0,xs:2,children:e.jsx(De,{title:"Lịch sử hóa đơn",arrow:!0,placement:"top",children:e.jsx(A,{variant:"contained",color:"warning",fullWidth:!0,onClick:K,children:"Chi tiết"})})})]})})]})}),e.jsxs(ge,{open:F,onClose:Y,maxWidth:"lg",fullWidth:!0,children:[e.jsxs(xe,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(j,{variant:"h5",children:["Chi tiết lịch sử thay đổi hóa đơn : ",e.jsx("strong",{children:t})]}),e.jsx(A,{onClick:Y,children:"Đóng"})]}),e.jsx(me,{children:e.jsx(Ue,{component:Ee,style:{maxHeight:v,overflowY:"auto"},children:e.jsxs(ze,{children:[e.jsx($e,{children:e.jsx(He,{children:p.map(i=>e.jsx(L,{style:{minWidth:i.minWidth,maxWidth:i.maxWidth},children:i.label},i.id))})}),e.jsx(Ke,{children:a.map((i,C)=>e.jsxs(He,{children:[e.jsx(L,{children:C+1}),e.jsx(L,{style:{minWidth:p[0].minWidth,maxWidth:p[0].maxWidth},children:i.ngayTao}),e.jsx(L,{style:{minWidth:p[1].minWidth,maxWidth:p[1].maxWidth},children:i.nguoiSua}),e.jsx(L,{style:{minWidth:p[3].minWidth,maxWidth:p[3].maxWidth,wordWrap:"break-word",whiteSpace:"normal"},children:i.ghiChuChoCuaHang}),e.jsx(L,{style:{minWidth:p[4].minWidth,maxWidth:p[4].maxWidth,wordWrap:"break-word",whiteSpace:"normal"},children:i.ghiChuChoKhachHang}),e.jsx(L,{style:{minWidth:p[2].minWidth,maxWidth:p[2].maxWidth},children:e.jsx(te,{label:st(i.trangThai),sx:{backgroundColor:ot(i.trangThai),color:"#fff",width:"120px",borderRadius:"20px",display:"flex",justifyContent:"center",alignItems:"center"}})})]},C))})]})})})]}),e.jsxs(ge,{open:l,onClose:P,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(xe,{id:"alert-dialog-title5",children:"Xác nhận hành động"}),e.jsx(me,{children:e.jsxs("div",{children:[e.jsx(Pe,{label:"Ghi chú của cửa hàng",variant:"outlined",fullWidth:!0,multiline:!0,rows:4,name:"ghiChuCuaHang",value:O.ghiChuCuaHang,onChange:$,sx:{mb:2},required:!0,error:!!k.ghiChuCuaHang,helperText:k.ghiChuCuaHang||""}),e.jsx(Pe,{label:"Ghi chú của khách hàng",variant:"outlined",fullWidth:!0,multiline:!0,rows:4,name:"ghiChuKhachHang",value:O.ghiChuKhachHang,onChange:$,sx:{mb:2}}),e.jsx(A,{variant:"contained",color:"primary",sx:{mb:2},onClick:()=>{re()},children:"Lưu"})]})})]}),e.jsxs(ge,{open:he,onClose:G,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(xe,{id:"alert-dialog-title"}),e.jsx(me,{children:e.jsxs(Re,{id:"alert-dialog-description",children:["Bạn muốn : ","     "," ",S(J)," hóa đơn ",e.jsxs("strong",{children:[" ",t]})]})}),e.jsxs(Me,{children:[e.jsx(A,{onClick:G,color:"secondary",children:"Hủy"}),e.jsx(A,{onClick:()=>{B(),Q(!1)},color:"primary",autoFocus:!0,children:"Xác nhận"})]})]}),e.jsxs(ge,{open:s,onClose:ie,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(xe,{id:"alert-dialog-title"}),e.jsx(me,{children:e.jsx(Re,{id:"alert-dialog-description",style:{color:"black"},children:e.jsxs("strong",{children:["Bạn muốn ","chắc chắn muốn chuyển trạng thái hóa đơn ",t]})})}),e.jsxs(Me,{children:[e.jsx(A,{onClick:ie,color:"secondary",children:"Hủy"}),e.jsx(A,{onClick:()=>{E()},color:"primary",autoFocus:!0,children:"Xác nhận"})]})]}),x&&e.jsx("iframe",{ref:u,src:x,width:"0",height:"0",style:{display:"none"},title:"PDF"}),e.jsx(Se,{open:D,autoHideDuration:6e3,onClose:ne,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(Le,{onClose:ne,severity:M,sx:{width:"100%"},children:h})})]})}function Kt(n){const{onLoading:t}=n,{id:a}=ye(),[c,d]=o.useState({}),[x,y]=o.useState([]),[u,v]=o.useState([]),[S,p]=o.useState([]),[h,f]=o.useState(""),[M,H]=o.useState(""),[D,N]=o.useState(""),[k,w]=o.useState(""),[O,R]=o.useState("success"),[F,_]=o.useState(!1);o.useState({});const[s,T]=o.useState({ten:"",sdt:"",email:"",diaChi:"",tinh:"",tenTinh:"",huyen:"",tenHuyen:"",phuong:"",tenPhuong:"",ghiChu:"",tienShip:""}),[l,U]=o.useState({ten:"",sdt:"",email:"",tinh:"",huyen:"",phuong:""}),[J,V]=o.useState(!1),he=()=>V(!0),Q=()=>{V(!1),T(r=>({...r,ten:s==null?void 0:s.tenKhachHang,tinh:s==null?void 0:s.tinh,huyen:s==null?void 0:s.huyen,phuong:s==null?void 0:s.phuong,tienShip:s==null?void 0:s.tienShip,sdt:s==null?void 0:s.sdt,email:s==null?void 0:s.email,diaChi:s==null?void 0:s.diaChi,ghiChu:s==null?void 0:s.ghiChu})),U({ten:"",sdt:"",email:"",tinh:"",huyen:"",phuong:""})};o.useEffect(()=>{J&&(ne(),oe(),console.log("Load 1"))},[J]);const ne=async()=>{try{const r=await Ge(a);r.status_code===200&&(d(r.data),T(m=>({...m,ten:r.data.tenKhachHang,tinh:r.data.tinh,huyen:r.data.huyen,phuong:r.data.phuong,tienShip:r.data.tienShip,sdt:r.data.sdt,email:r.data.email,diaChi:r.data.diaChi,ghiChu:r.data.ghiChu})))}catch{w("Lỗi"),R("error"),_(!0)}};o.useEffect(()=>{oe(),console.log("Load 2")},[s.tinh]),console.log("BILL IN ADDRESS DIALOG : ",c);const oe=async()=>{const r=await Xe();if(y(r.data),s!=null&&s.tinh){const m=await Ae(s.tinh);v(m.data),H(""),N(""),p([])}if(s!=null&&s.huyen){const m=await we(s.huyen);p(m.data),N("")}if((s==null?void 0:s.tinh)!=null){f(s.tinh);const m=x.find(b=>b.ProvinceID===parseInt(s.tinh));T(b=>({...b,tinh:s.tinh,tenTinh:m?m.ProvinceName:""}))}if((s==null?void 0:s.huyen)!=null){H(s.huyen);const m=u.find(b=>b.DistrictID===parseInt(s.huyen));T(b=>({...b,huyen:s.huyen,tenHuyen:m?m.DistrictName:""}))}if((s==null?void 0:s.phuong)!=null){N(s.phuong);const m=S.find(b=>b.WardCode===s.phuong);T(b=>({...b,phuong:s.phuong,tenPhuong:m?m.WardName:""})),E(M,s.phuong)}},de=async r=>{X(r);const m=r.target.value;f(m);const b=x.find(G=>G.ProvinceID===parseInt(m));T(G=>({...G,tinh:m,tenTinh:b?b.ProvinceName:"",phuong:"",huyen:""}));const P=await Ae(m);v(P.data),H(""),N(""),p([])},$=async r=>{X(r);const m=r.target.value;H(m);const b=u.find(G=>G.DistrictID===parseInt(m));T(G=>({...G,huyen:m,tenHuyen:b?b.DistrictName:""}));const P=await we(m);p(P.data),N("")},B=r=>{X(r);const m=r.target.value;N(r.target.value);const b=S.find(P=>P.WardCode===m);T(P=>({...P,phuong:m,tenPhuong:b?b.WardName:""})),E(M,r.target.value)},E=async(r,m)=>{const b=await Ve(r,m),P=await Ye(r,m);new Date(b.data.leadtime*1e3).toISOString().slice(0,19).replace("T"," "),T(re=>({...re,tienShip:P.data.total}))};console.log("TP : ",x),console.log("Quận : ",u),console.log("Huyện : ",S),console.log("Form Data : ",s);const K=async r=>{var b,P,G,re,Ne,Te,i,C;r.preventDefault(),console.log("Form Data Guiwr  ĐI : ",s);const m={...s,ten:(b=s.ten)==null?void 0:b.trim(),sdt:(P=s.sdt)==null?void 0:P.trim(),email:(G=s.email)==null?void 0:G.trim(),diaChi:(re=s.diaChi)==null?void 0:re.trim(),tinh:(Ne=s.tinh)==null?void 0:Ne.trim(),huyen:(Te=s.huyen)==null?void 0:Te.trim(),phuong:(i=s.phuong)==null?void 0:i.trim(),ghiChu:(C=s.ghiChu)==null?void 0:C.trim(),tienShip:s.tienShip};try{(await nt(a,m)).status_code==201&&(T({ten:"",sdt:"",email:"",diaChi:"",tinh:"",tenTinh:"",huyen:"",tenHuyen:"",phuong:"",tenPhuong:"",ghiChu:"",tienShip:""}),U({tinh:"",huyen:"",phuong:"",email:"",sdt:"",ten:""}),t(),Q(),w("Cập nhập địa chỉ thành công"),R("success"),_(!0))}catch(I){if(console.log("Error Address : ",I),I.response&&I.response.data){const ae=I.response.data.message,z={ten:"",sdt:"",email:"",tinh:"",huyen:"",phuong:""},ue=ae.filter(Z=>[6002,6004,6006,6008,6009,6010,6011].includes(Z.error_code));ue.length>0?ue.forEach(Z=>{const pe=Z.field,se=Z.messages;switch(pe){case"email":z.email=se;break;case"sdt":z.sdt=se;break;case"ten":z.ten=se;break;case"tinh":z.tinh=se;break;case"huyen":z.huyen=se;break;case"phuong":z.phuong=se;break}}):ae.forEach(Z=>{Z.field;const pe=Z.messages;switch(Z.error_code){case 6003:z.email=pe;break;case 6005:z.sdt=pe;break;case 6007:z.ten=pe;break}}),U(z)}else console.error("Có lỗi xảy ra:",I),w("Có lỗi xảy ra khi cập nhật!"),R("error"),_(!0)}},Y=()=>{_(!1)},X=r=>{const{id:m,value:b}=r.target;T(P=>({...P,[m]:b}))},ie=r=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0}).format(r);return e.jsxs(e.Fragment,{children:[e.jsx(De,{title:"Chọn địa chỉ cho đơn hàng",placement:"top",children:e.jsx(A,{variant:"contained",color:"primary",onClick:he,children:"Cập nhật địa chỉ"})}),e.jsxs(ge,{open:J,onClose:Q,maxWidth:"md",fullWidth:!0,children:[e.jsx(xe,{children:"Chọn Địa Chỉ"}),e.jsx(me,{children:e.jsxs("form",{onSubmit:K,className:"address-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("input",{type:"text",id:"ten",placeholder:"Nhập tên của bạn",value:s.ten,onChange:X}),l.ten&&e.jsx("span",{className:"error-message",children:l.ten})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("input",{type:"tel",id:"sdt",placeholder:"Nhập số điện thoại",value:s.sdt,onChange:X}),l.sdt&&e.jsx("span",{className:"error-message",children:l.sdt})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("input",{id:"email",placeholder:"Nhập email",value:s.email,onChange:X}),l.email&&e.jsx("span",{className:"error-message",children:l.email})]})]}),e.jsx("div",{className:"form-group",children:e.jsx("textarea",{id:"diaChi",placeholder:"Nhập địa chỉ giao hàng",value:s.diaChi,onChange:X})}),e.jsxs("div",{className:"form-group",children:[e.jsxs("select",{id:"tinh",value:s.tinh,onChange:de,children:[e.jsx("option",{value:"",disabled:!0,children:"Chọn Tỉnh/Thành Phố"}),x.map(r=>e.jsx("option",{value:r.ProvinceID,children:r.ProvinceName},r.ProvinceID))]}),l.tinh&&e.jsx("span",{className:"error-message",children:l.tinh})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("select",{id:"huyen",value:s.huyen,onChange:$,children:[e.jsx("option",{value:"",children:"Chọn Quận/Huyện"}),u.map(r=>e.jsx("option",{value:r.DistrictID,children:r.DistrictName},r.DistrictID))]}),l.huyen&&e.jsx("span",{className:"error-message",children:l.huyen})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("select",{id:"phuong",value:s.phuong,onChange:r=>{B(r)},children:[e.jsx("option",{value:"",children:"Chọn Phường/Xã"}),S.map(r=>e.jsx("option",{value:r.WardCode,children:r.WardName},r.WardCode))]}),l.phuong&&e.jsx("span",{className:"error-message",children:l.phuong})]}),e.jsx("div",{className:"form-group",children:e.jsx("textarea",{id:"ghiChu",placeholder:"Ghi chú",value:s.ghiChu,onChange:X})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("strong",{style:{fontSize:"24px"},children:ie(s.tienShip)})," ",e.jsxs("div",{style:{display:"flex",gap:"10px",marginTop:"10px",justifyContent:"flex-end",width:"100%"},children:[e.jsx(A,{onClick:Q,color:"secondary",children:"Hủy"}),e.jsx(A,{variant:"contained",color:"primary",type:"submit",children:"Lưu"})]})]})]})})]}),e.jsx(Se,{open:F,autoHideDuration:6e3,onClose:Y,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(Le,{onClose:Y,severity:O,sx:{width:"100%"},children:k})})]})}function Xt(n){const{bill:t,onLoading:a}=n,c=!(t.trangThai==="DANG_GIAO"||t.trangThai==="HOAN_THANH"||t.trangThai==="CHO_GIAO"||t.trangThai==="HUY");return e.jsx(e.Fragment,{children:e.jsxs(g,{container:!0,spacing:2,padding:3,sx:{backgroundColor:"white",borderRadius:4,mt:2,boxShadow:3},children:[e.jsx(g,{item:!0,xs:10,children:e.jsx(j,{variant:"h5",sx:{fontWeight:"bold"},children:"Thông tin đơn hàng"})}),e.jsx(g,{item:!0,xs:2,container:!0,justifyContent:"flex-end",children:c&&e.jsx(Kt,{onLoading:()=>{a()}})}),e.jsx(g,{item:!0,xs:4,children:e.jsxs(le,{display:"flex",alignItems:"center",children:[e.jsx(j,{variant:"body1",sx:{fontWeight:"bold"},children:"Mã:"}),e.jsx(j,{variant:"body1",sx:{ml:1,color:"#007bff",fontWeight:"bold"},children:t.ma})]})}),e.jsx(g,{item:!0,xs:4,children:e.jsxs(le,{display:"flex",alignItems:"center",children:[e.jsx(j,{variant:"body1",sx:{fontWeight:"bold"},children:"Tên khách hàng:"}),t.idKhachHang==null?e.jsx(te,{label:"Khách lẻ",color:"info",sx:{ml:1}}):e.jsx(j,{variant:"body1",sx:{ml:1},children:t.tenKhachHang||t.idKhachHang})]})}),e.jsx(g,{item:!0,xs:4,children:e.jsxs(le,{display:"flex",alignItems:"center",children:[e.jsx(j,{variant:"body1",sx:{fontWeight:"bold"},children:"Trạng thái:"}),e.jsx(te,{label:it(t.trangThai),sx:{ml:1,backgroundColor:rt(t.trangThai),color:"#fff"}})]})}),e.jsx(g,{item:!0,xs:4,children:e.jsxs(le,{display:"flex",alignItems:"center",children:[e.jsx(j,{variant:"body1",sx:{fontWeight:"bold"},children:"SĐT người nhận:"}),e.jsx(j,{variant:"body1",sx:{ml:1},children:t.sdt})]})}),e.jsx(g,{item:!0,xs:4,children:e.jsxs(le,{display:"flex",alignItems:"center",children:[e.jsx(j,{variant:"body1",sx:{fontWeight:"bold"},children:"Loại hóa đơn:"}),e.jsx(te,{label:t.loaiHoaDon=="0"?"Tại quầy":"SHIP",color:t.loaiHoaDon=="0"?"primary":"success",sx:{ml:1}})]})}),e.jsx(g,{item:!0,xs:4,children:e.jsxs(le,{display:"flex",alignItems:"center",children:[e.jsx(j,{variant:"body1",sx:{fontWeight:"bold"},children:"Địa chỉ"}),e.jsx(j,{variant:"body1",sx:{ml:1},children:t.diaChi})]})})]})})}function Vt(n){const{id:t}=ye(),{bill:a}=n,[c,d]=o.useState([]),[x,y]=o.useState(!0),[u,v]=o.useState(null),S=async()=>{try{const h=await lt(t);h.status_code===200&&d(h.data)}catch{v("Không thể tải lịch sử thanh toán")}finally{y(!1)}};o.useEffect(()=>{S()},[t,a]);const p=()=>{v(null)};return e.jsxs(g,{container:!0,spacing:2,padding:3,sx:{backgroundColor:"white",borderRadius:4,mt:2,boxShadow:3},children:[e.jsx(g,{item:!0,xs:12,children:x?e.jsx(j,{children:"Đang tải..."}):e.jsx(Ue,{component:Ee,children:e.jsxs(ze,{children:[e.jsx($e,{children:e.jsxs(He,{children:[" ",e.jsx(L,{children:"STT"}),e.jsx(L,{children:"Mã giao dịch"}),e.jsx(L,{children:"Số tiền"}),e.jsx(L,{children:"Phương thanh toán"}),e.jsx(L,{children:"Loại thanh toán"}),e.jsx(L,{children:"Trạng thái"}),e.jsx(L,{children:"Người tạo"}),e.jsx(L,{children:"Ngày tạo"})]})}),e.jsx(Ke,{children:c.map((h,f)=>e.jsxs(He,{children:[e.jsx(L,{children:f+1}),e.jsx(L,{children:h.maGiaoDich}),e.jsx(L,{style:{fontWeight:"bold"},children:h.tienNhan?h.tienNhan.toLocaleString()+" đ":"Chưa có"}),e.jsx(L,{children:e.jsx(te,{label:h.phuongThanhToan===1?"Tiền mặt":"Chuyển khoản",style:{backgroundColor:h.phuongThanhToan===1?"purple":"#4CAF50",color:"white",borderRadius:"5px"}})}),e.jsx(L,{children:e.jsx(te,{label:h.loaiThanhToan===0?"Thanh toán":"Trả Sau",style:{backgroundColor:h.loaiThanhToan===0?"#4CAF50":"red",color:"white",borderRadius:"5px"}})}),e.jsx(L,{children:e.jsx(te,{label:h.trangThai==0?"Thành công":"Chờ",style:{backgroundColor:h.trangThai===0?"#4CAF50":"#FFB74D",color:"white",borderRadius:"5px"}})}),e.jsx(L,{children:h.nguoiTao?h.nguoiTao:"Chưa xác định"}),e.jsx(L,{style:{fontWeight:"bold"},children:h.ngayTao})]},f))})]})})}),u&&e.jsx(Se,{open:!!u,autoHideDuration:3e3,onClose:p,message:u})]})}function Yt(n){const{id:t}=ye(),{bill:a,onLoading:c,onReload:d}=n;o.useRef(null);const[x,y]=o.useState(!1),[u,v]=o.useState([]),[S,p]=o.useState([]),[h,f]=o.useState([]);o.useState("");const[M,H]=o.useState(""),[D,N]=o.useState(""),[k,w]=o.useState(!1),[O,R]=o.useState(""),[F,_]=o.useState("success"),[s,T]=o.useState(!1);o.useState(!1);const[l,U]=o.useState({ten:"",tenKhachHang:"",sdt:"",email:"",diaChi:"",tinh:"",tenTinh:"",huyen:"",tenHuyen:"",phuong:"",tenPhuong:"",ghiChu:"",tienShip:"",loaiHoaDon:"",thanhToanSau:""}),[J,V]=o.useState({ten:"",sdt:"",email:"",tinh:"",huyen:"",phuong:""});o.useEffect(()=>{U({...a,ten:a.tenKhachHang||"",email:a.email||"",sdt:a.sdt||"",diaChi:a.diaChi||""}),V({}),y(a.loaiHoaDon==1),he()},[t,a]);const he=async()=>{const $=await Xe();if(v($.data),a!=null&&a.tinh){const B=await Ae(a.tinh);p(B.data),H(""),N(""),f([])}if(a!=null&&a.huyen){const B=await we(a.huyen);f(B.data),N("")}if(a!=null&&a.tinh){const B=u.find(E=>E.ProvinceID===parseInt(a.tinh));if(U(E=>({...E,tinh:a.tinh,tenTinh:B?B.ProvinceName:""})),a!=null&&a.huyen){const E=S.find(K=>K.DistrictID===parseInt(a.huyen));if(U(K=>({...K,huyen:a.huyen,tenHuyen:E?E.DistrictName:""})),(a==null?void 0:a.phuong)!=null){N(a.phuong);const K=h.find(Y=>Y.WardCode===a.phuong);U(Y=>({...Y,phuong:a.phuong,tenPhuong:K?K.WardName:""})),Q(E,a.phuong)}}}},Q=async($,B)=>{console.log("to_district_id",$),console.log("to_ward_code",B);const E=await Ve($,B),K=await Ye($,B),X=new Date(E.data.leadtime*1e3).toISOString().slice(0,19).replace("T"," ");U(ie=>({...ie,tienShip:K.data.total,ngayNhanHangDuKien:X}))},ne=()=>{T(!1)},oe=$=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0}).format($),de=()=>{w(!1)};return console.log("BILL : ",a),console.log("Form data  : ",l),e.jsxs(e.Fragment,{children:[e.jsxs(g,{container:!0,spacing:2,padding:2,sx:{backgroundColor:"white",marginTop:2,borderRadius:4},children:[e.jsx(g,{item:!0,xs:8,children:e.jsx(j,{variant:"h3",children:"Thông tin đơn hàng "})}),e.jsx(g,{item:!0,xs:4}),e.jsx(g,{mt:2,item:!0,xs:12,sx:{borderTop:1}}),e.jsx(g,{item:!0,xs:8,children:x&&t?e.jsx(e.Fragment,{children:e.jsxs(g,{container:!0,spacing:2,children:[e.jsxs(g,{item:!0,xs:12,sm:4,children:[e.jsx(j,{variant:"subtitle1",style:{color:"black"},children:"Tên người nhận:"}),e.jsx(j,{variant:"body1",style:{color:"black"},children:l.ten||"Chưa có thông tin"})]}),e.jsxs(g,{item:!0,xs:12,sm:4,children:[e.jsx(j,{variant:"subtitle1",style:{color:"black"},children:"Số điện thoại:"}),e.jsx(j,{variant:"body1",style:{color:"black"},children:l.sdt||"Chưa có thông tin"})]}),e.jsxs(g,{item:!0,xs:12,sm:4,children:[e.jsx(j,{variant:"subtitle1",style:{color:"black"},children:"Email:"}),e.jsx(j,{variant:"body1",style:{color:"black"},children:l.email||"Chưa có thông tin"})]}),e.jsxs(g,{item:!0,xs:12,sm:4,children:[e.jsx(j,{variant:"subtitle1",style:{color:"black"},children:"Địa chỉ giao hàng:"}),e.jsx(j,{variant:"body1",style:{color:"black"},paragraph:!0,children:l.diaChi||"Chưa có thông tin"})]}),e.jsxs(g,{item:!0,xs:12,sm:4,children:[e.jsx(j,{variant:"subtitle1",style:{color:"black"},children:"Ghi chú:"}),e.jsx(j,{variant:"body1",style:{color:"black"},paragraph:!0,children:l.ghiChu||"Chưa có thông tin"})]}),e.jsxs(g,{item:!0,xs:12,sm:4,children:[e.jsx(j,{variant:"subtitle1",style:{color:"black"},children:"Phí ship :"}),e.jsx(j,{variant:"body1",style:{color:"black"},paragraph:!0,children:oe(l.tienShip)||"Chưa có thông tin"})]})]})}):e.jsx(e.Fragment,{})}),e.jsxs(g,{item:!0,xs:4,children:[e.jsxs(j,{mt:1,variant:"h4",children:["Tạm tính: ",t?parseFloat((l==null?void 0:l.tongTienBanDau)||0).toLocaleString()||"0":0," đ"]}),e.jsxs(j,{mt:1,variant:"h4",children:["Mã Voucher : ",t&&(l==null?void 0:l.maPGG)||""]}),e.jsxs(j,{mt:1,variant:"h4",children:["Voucher : ",t&&parseFloat((l==null?void 0:l.giaTriPhieuGiamGia)||0).toLocaleString()||"0"," đ"]}),e.jsxs(j,{mt:1,variant:"h4",fontWeight:"bold",color:"error",children:["Tiền sau giảm giá: ",t&&parseFloat((l==null?void 0:l.tongTienPhaiTra)||0).toLocaleString()||"0"," đ"]}),x&&e.jsxs(j,{mt:1,variant:"h4",children:["Tiền ship: ",t&&parseFloat((l==null?void 0:l.tienShip)||0).toLocaleString()||"0"," đ"]}),e.jsxs(j,{mt:1,variant:"h4",fontWeight:"bold",color:"error",children:["Tổng tiền hóa đơn :"," ",t&&parseFloat((l==null?void 0:l.tongTienPhaiTra)+(x?l.tienShip:0)||0).toLocaleString()||"0"," đ"]})]})]}),e.jsx(ct,{showDiaLogCoupon:k,handleCloseDiaLogCoupon:de,bill:a,onLoading:()=>{c()}}),e.jsx(Se,{open:s,autoHideDuration:2e3,onClose:ne,anchorOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(Le,{onClose:ne,severity:F,sx:{width:"100%"},children:O})})]})}function Hn(){const{id:n}=ye(),t=Je(),[a,c]=o.useState({}),[d,x]=o.useState([]),[y,u]=o.useState(""),[v,S]=o.useState("success"),[p,h]=o.useState(!1),f=()=>{h(!1)};o.useEffect(()=>{M(),H()},[n]);const M=async()=>{try{const k=await Ge(n);k.status_code===200&&c(k.data)}catch(k){u(k.response.data.message),S("error"),h(!0)}},H=async()=>{const k=await at(n);k.status_code===200&&x(k.data)},D=()=>{M(),H()},N=()=>{t("/hoa-don/danh-sach")};return console.log("BILL DETAIL => ID : ",n),console.log("BILL DETAIL => BILL : ",a),console.log("BILL DETAIL => HISTORY : ",d),e.jsxs("div",{style:{backgroundColor:"while"},children:[e.jsx(dt,{color:"primary","aria-label":"back",sx:{position:"fixed",top:170,right:15},onClick:N,children:e.jsx(Ze,{})}),e.jsx($t,{data:d,onLoading:D,bill:a}),e.jsx(Xt,{bill:a,onLoading:D}),e.jsx(Vt,{bill:a}),e.jsx(ht,{onLoading:D,bill:a,title:"Hóa đơn chi tiết"}),e.jsx(Yt,{onLoading:D,bill:a,onReload:D}),e.jsx(Se,{open:p,autoHideDuration:2e3,onClose:f,anchorOrigin:{vertical:"top",horizontal:"center"},children:e.jsx(Le,{onClose:f,variant:"filled",severity:v,sx:{width:"100%"},children:y})})]})}export{Hn as default};
