import{ab as f}from"./index-DvRT1fKX.js";import{b as x}from"./back-end-vuWvP0DO.js";const y="san-pham-chi-tiet",P=async({giaBan:r,trangThai:t,banPhimId:o,cpuId:e,heDieuHanhId:s,manHinhId:c,mauSacId:i,ramId:n,sanPhamId:h,vgaId:m,webcamId:p,ocungId:b,listSerialNumber:d,listUrlAnhSanPham:l})=>{try{return await f.post(`${x}/${y}/add`,{giaBan:r,trangThai:t,banPhimId:o,cpuId:e,heDieuHanhId:s,manHinhId:c,mauSacId:i,ramId:n,sanPhamId:h,vgaId:m,webcamId:p,ocungId:b,listSerialNumber:d,listUrlAnhSanPham:l})}catch(a){console.log("Error createSanPhamChiTiet",a)}};export{P as c};