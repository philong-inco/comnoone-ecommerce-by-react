import{g as l,a as e}from"./request-DnaihQv_.js";const a=async(o,r,t)=>{console.log("Path : ",t);try{return await l(`bills/all?page=${o}&size=${r}&sort=id,DESC&filter=${t}`)}catch(s){throw console.error("Error fetching bill filter:",s),s}},n=async o=>{try{return await l(`bills/code/${o}`)}catch(r){throw console.error("Error fetching bill by code :",r),r}},i=async()=>{try{return await e("bills/create")}catch(o){throw console.error("Error creating :",o),o}},u=async(o,r)=>{try{return await e(`bills/add-customer-to-bill?customerId=${o}&codeBill=${r}`)}catch(t){throw console.error("Error creating addCustomerToBill :",t),t}},d=async(o,r)=>{try{return await e(`bills/add-coupon-by-id?couponId=${o}&codeBill=${r}`)}catch(t){throw console.error("Error creating addCouponToBill :",t),t}},y=async(o,r)=>{try{return await e(`bills/add-coupon-by-code?couponCode=${o}&codeBill=${r}`)}catch(t){throw console.error("Error creating addCouponToBillByCode :",t),t}},h=async(o,r,t)=>{try{return await e(`bills/update-status/${o}?status=${r}`,t)}catch(s){throw console.error("Error update bill by code :",s),s}},b=async(o,r)=>{console.log("Data request : ",r);try{return await e(`bills/pay-counter/${o}`,r)}catch(t){throw console.error("Error pay counter by code :",t),t}},w=async(o,r)=>{try{return await e(`bills/update-address-in-bill/${o}`,r)}catch(t){throw console.error("Error pay counter by code :",t),t}},B=async o=>{try{return await l(`bills/bill-history/${o}`)}catch(r){throw console.error("Error fetching bill history:",r),r}},p=async o=>{try{return await e(`bills/bill-history/${o}/revert-status`)}catch(r){throw console.error("Error revert Bill Status : "),r}};export{B as a,n as b,i as c,w as d,u as e,d as f,a as g,y as h,b as p,p as r,h as u};