import * as XLSX from 'xlsx';
import {get} from '../requestSanPham';

export const excelImportBlank = async (fileName) => {
  
 // Định nghĩa header cho Sheet1  
 const headers1 = ["ten",	"moTa",	"nhuCau",	"thuongHieu"];  
    
 // Định nghĩa header cho Sheet2  
 const headers2 = [ "tenSanPham", "giaBan", "tenBanPhim", "tenCPU", "tenHeDieuHanh", "tenManHinh",
                    "tenMauSac", "tenRam", "tenVGA", "tenWebcam", "tenOCung", "serials"
 ];  

 const headers3 = ["nhuCau", "thuongHieu", "tenBanPhim", 
                    "tenCPU", "tenHeDieuHanh", "tenManHinh", "tenMauSac",	
                    "tenRam", "tenVGA",	"tenWebcam", "tenOCung"]; 

    const nhuCauData = (await get(`/nhu-cau/all-list-active`)).data.data;
    const thuongHieuData = (await get(`/thuong-hieu/all-list-active`)).data.data;  
    const tenBanPhimData = (await get(`/ban-phim/all-list-active`)).data.data;  
    const tenCPUData = (await get(`/cpu/all-list-active`)).data.data;  
    const tenHeDieuHanhData = (await get(`/he-dieu-hanh/all-list-active`)).data.data;  
    const tenManHinhData = (await get(`/man-hinh/all-list-active`)).data.data;  
    const tenMauSacData = (await get(`/mau-sac/all-list-active`)).data.data;  
    const tenRamData = (await get(`/ram/all-list-active`)).data.data;  
    const tenVGAData = (await get(`/vga/all-list-active`)).data.data;  
    const tenWebcamData = (await get(`/webcam/all-list-active`)).data.data;  
    const tenOCungData = (await get(`/o-cung/all-list-active`)).data.data;  
    // Chuyển đổi dữ liệu thành định dạng 2 chiều để dễ dàng thêm vào Excel  
  const nhuCauRows = nhuCauData.map(x => [x.ten]); // Chuyển đổi mỗi nhu cầu thành một hàng  
  const thuongHieuRows = thuongHieuData.map(x => [x.ten]);
  const banPhimRows = tenBanPhimData.map(x => [x.ten]);
  const cpuRows = tenCPUData.map(x => [x.ten]);
  const heDieuHanhRows = tenHeDieuHanhData.map(x => [x.ten]);
  const manHinhRows = tenManHinhData.map(x => [x.ten]);
  const mauSacRows = tenMauSacData.map(x => [x.ten]);
  const ramRows = tenRamData.map(x => [x.ten]);
  const vgaRows = tenVGAData.map(x => [x.ten]);
  const webcamRows = tenWebcamData.map(x => [x.ten]);
  const oCungRows = tenOCungData.map(x => [x.ten]);

  const maxRows = Math.max(
        nhuCauRows.length, thuongHieuRows.length, banPhimRows.length,
        cpuRows.length, heDieuHanhRows.length, manHinhRows.length,
        mauSacRows.length, ramRows.length, vgaRows.length,webcamRows.length, oCungRows.length
    );  
  const sheet3Data = Array.from({ length: maxRows }, (_, i) => {  
    return [  
      nhuCauRows[i] ? nhuCauRows[i][0] : '',
      thuongHieuRows[i] ? thuongHieuRows[i][0] : '', 

      banPhimRows[i] ? banPhimRows[i][0] : '', 
      cpuRows[i] ? cpuRows[i][0] : '', 
      heDieuHanhRows[i] ? heDieuHanhRows[i][0] : '', 
      manHinhRows[i] ? manHinhRows[i][0] : '', 
      mauSacRows[i] ? mauSacRows[i][0] : '', 
      ramRows[i] ? ramRows[i][0] : '', 
      vgaRows[i] ? vgaRows[i][0] : '', 
      webcamRows[i] ? webcamRows[i][0] : '', 
      oCungRows[i] ? oCungRows[i][0] : ''
    ];  
  }); 


 // Tạo dữ liệu cho sheet đầu tiên với headers1  
 const ws1 = XLSX.utils.aoa_to_sheet([headers1]); // Chuyển đổi header thành sheet  

 // Tạo dữ liệu cho sheet thứ hai với headers2  
 const ws2 = XLSX.utils.aoa_to_sheet([headers2]); // Chuyển đổi header thành sheet  
 const ws3 = XLSX.utils.aoa_to_sheet([headers3, ...sheet3Data]);  
 // Tạo một workbook mới  
 const wb = XLSX.utils.book_new();  
 XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");  
 XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");  
 XLSX.utils.book_append_sheet(wb, ws3, "Thuộc tính");
 // Xuất file  
 XLSX.writeFile(wb, `${fileName}.xlsx`);  
};

