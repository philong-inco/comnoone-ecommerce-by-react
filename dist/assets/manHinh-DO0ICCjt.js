import{c as n}from"./index-C3AKKGhn.js";import{b as c}from"./back-end-vuWvP0DO.js";const d="man-hinh",u=async({ten:e,doPhanGiai:t,kichThuoc:a,trangThai:o})=>{var r;try{const s=await n.post(`${c}/${d}/add`,{ten:e,doPhanGiai:t,kichThuoc:a,trangThai:o});return(r=s==null?void 0:s.data)==null?void 0:r.data}catch(s){console.log("Error createNewRam",s)}},f=async({page:e,size:t,name:a,trangThai:o})=>{try{let r="";return r+=e===void 0||e===""?"page=0":"page="+e,r+=t===void 0?"&size=5":"&size="+t,r+=a===void 0?"":"&name="+a,r+=o===void 0?"":"&trangThai="+o,console.log("queryStr: ",r),await n.get(`${c}/${d}/find/filter-id?${r}`)}catch(r){console.log("Error filterRam",r)}},m=async({id:e,ten:t,doPhanGiai:a,kichThuoc:o,trangThai:r})=>{try{return await n.put(`${c}/${d}/update/${e}`,{id:e,ten:t,doPhanGiai:a,kichThuoc:o,trangThai:r})}catch(s){console.log("Error updateRam",s)}},$=async e=>{try{return!(await n.get(`${c}/${d}/exist-name?name=${e}`)).data.data}catch(t){console.log("Error createNewRam",t)}},y=async(e,t)=>{try{return!(await n.get(`${c}/${d}/exist-name-diff-id?name=${e}&id=${t}`)).data.data}catch(a){console.log("Error createNewRam",a)}};export{y as I,$ as a,u as c,f,m as u};
