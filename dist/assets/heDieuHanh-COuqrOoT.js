import{c as o}from"./index-C3AKKGhn.js";import{b as n}from"./back-end-vuWvP0DO.js";const c="he-dieu-hanh",u=async({ten:r,trangThai:t})=>{var a;try{const e=await o.post(`${n}/${c}/add`,{ten:r,trangThai:t});return(a=e==null?void 0:e.data)==null?void 0:a.data}catch(e){console.log("Error createNewRam",e)}},f=async({page:r,size:t,name:a,trangThai:e})=>{try{let s="";return s+=r===void 0||r===""?"page=0":"page="+r,s+=t===void 0?"&size=5":"&size="+t,s+=a===void 0?"":"&name="+a,s+=e===void 0?"":"&trangThai="+e,console.log("queryStr: ",s),await o.get(`${n}/${c}/find/filter-id?${s}`)}catch(s){console.log("Error filterRam",s)}},m=async({id:r,ten:t,trangThai:a})=>{try{return await o.put(`${n}/${c}/update/${r}`,{id:r,ten:t,trangThai:a})}catch(e){console.log("Error updateRam",e)}},$=async r=>{try{return!(await o.get(`${n}/${c}/exist-name?name=${r}`)).data.data}catch(t){console.log("Error createNewRam",t)}},y=async(r,t)=>{try{return!(await o.get(`${n}/${c}/exist-name-diff-id?name=${r}&id=${t}`)).data.data}catch(a){console.log("Error createNewRam",a)}};export{y as I,$ as a,u as c,f,m as u};
