import{g as e,d as a,p as c}from"./request-DnaihQv_.js";const l=async(o,r,s)=>{try{console.log("PATH : ",s);const t=await e(`coupons/all?page=${o-1}&size=${r}&sort=id,DESC&filter=${s}`);return console.log(t),t}catch(t){throw console.error("Error fetching coupons filter:",t),t}},u=async o=>{try{return await a(`coupons/delete/${o}`)}catch(r){throw console.error("Error :",r),r}},p=async o=>{try{return await c(`coupons/updateStatusPause/${o}`)}catch(r){throw console.log("Error put :",r),r}},i=async o=>{try{return await c(`coupons/updateStatusStart/${o}`)}catch(r){throw console.log("Error put :",r),r}},g=async o=>{try{return await e(`coupons/to-bill/${o}`)}catch(r){throw console.log("Error get :",r),r}};export{p as a,u as d,l as f,g,i as s};