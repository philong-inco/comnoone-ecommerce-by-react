import * as XLSX from 'xlsx';

export const excelImportBlank = async (fileName) => {
  
 // Định nghĩa header cho Sheet1  
 const headers1 = ["ten",	"moTa",	"nhuCau",	"thuongHieu"];  
    
 // Định nghĩa header cho Sheet2  
 const headers2 = [ "tenSanPham", "giaBan", "tenBanPhim", "tenCPU", "tenHeDieuHanh", "tenManHinh",
                    "tenMauSac", "tenRam", "tenVGA", "tenWebcam", "tenOCung", "serials"
 ];  

 // Tạo dữ liệu cho sheet đầu tiên với headers1  
 const ws1 = XLSX.utils.aoa_to_sheet([headers1]); // Chuyển đổi header thành sheet  

 // Tạo dữ liệu cho sheet thứ hai với headers2  
 const ws2 = XLSX.utils.aoa_to_sheet([headers2]); // Chuyển đổi header thành sheet  

 // Tạo một workbook mới  
 const wb = XLSX.utils.book_new();  
 XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");  
 XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");  

 // Xuất file  
 XLSX.writeFile(wb, `${fileName}.xlsx`);  
};

