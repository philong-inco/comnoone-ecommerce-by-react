import{g as s,d as c,p as e}from"./request-CBzxMAFn.js";const l=async(t,r,a)=>{try{const o=await s(`coupons/all?page=${t-1}&size=${r}&sort=id,DESC&filter=${a}`);return console.log(o),o}catch(o){throw console.error("Error fetching coupons filter:",o),o}},u=async t=>{try{return await c(`coupons/delete/${t}`)}catch(r){throw console.error("Error :",r),r}},p=async t=>{try{return await e(`coupons/updateStatusPause/${t}`)}catch(r){throw console.log("Error put :",r),r}},i=async t=>{try{return await e(`coupons/updateStatusStart/${t}`)}catch(r){throw console.log("Error put :",r),r}},h=async t=>{try{return await s(`coupons/to-bill/${t}`)}catch(r){throw console.log("Error get :",r),r}};export{p as a,u as d,l as f,h as g,i as s};
