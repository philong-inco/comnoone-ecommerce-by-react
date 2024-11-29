import * as XLSX from 'xlsx';
import axios from 'axios';

export const exportToExcel = async (data, fileName) => {
    const header = ["ID", "Mã", "Tên SP", "Mô tả", "Trạng thái", "Nhu cầu", "Thương hiệu", "Tồn kho", "Người tạo", "Người sửa", "Ngày tạo", "Ngày sửa"];  
    const formattedData = data.map(item => ({  
        "ID": item.id,  
        "Mã": item.ma,  
        "Tên SP": item.ten,  
        "Mô tả": item.moTa,  
        "Trạng thái": item.trangThai === 0 ? "Không hoạt động" : "Hoạt động",  
        "Nhu cầu": item.nhuCau,  
        "Thương hiệu": item.thuongHieu,  
        "Tồn kho": item.soLuong,  
        "Người tạo": item.nguoiTao,  
        "Người sửa": item.nguoiSua,  
        "Ngày tạo": item.ngayTao,  
        "Ngày sửa": item.ngaySua
    }));  
     // Tạo worksheet từ dữ liệu đã định dạng với tiêu đề  
     const sheetSP = XLSX.utils.json_to_sheet(formattedData, { header });  

     // Tô màu và bôi đậm dòng header  
    // const headerRow = sheetSP['!ref'].split(':')[0]; // Lấy dòng đầu tiên  
    // const headerRange = sheetSP[headerRow]; // Lấy tất cả các ô trong dòng header  
    // // Áp dụng định dạng (tô màu nền và bôi đậm)  
    // for (const cell in headerRange) {  
    //     if (headerRange.hasOwnProperty(cell)) {  
    //         headerRange[cell].s = {  
    //             font: {  
    //                 bold: true,        // Bôi đậm chữ  
    //             },  
    //             fill: {  
    //                 fgColor: { rgb: "FFCCCCCC" } // Thay mã màu tại đây (nền xám nhạt)  
    //             }  
    //         };  
    //     }  
    // } 
    
 
    const idProducts = data.map(x => x.id);
    const spcts = await axios.post(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/san-pham-chi-tiet/get-by-product-ids`, idProducts);
    const bienThe = spcts?.data?.data;
    const headerBienThe = [
      "ID",
      "Mã sản phẩm",
      "Mã biến thể",
      "Tên SP",
      "Giá bán",
      "Trạng thái",
      "Bàn phím",
      "CPU",
      "Hệ điều hành",
      "Màn hình",
      "Màu sắc",
      "Ram",
      "VGA",
      "Ổ cứng",
      "Webcam",
      "Serials",
      "Ngày tạo",
      "Người tạo",
      "Ngày sửa",
      "Người sửa"
    ];  
    const formattedDataBienThe = bienThe.map(item => ({  
      "ID": item.id,
      "Mã sản phẩm": item.maSanPham,
      "Mã biến thể": item.ma,
      "Tên SP": item.sanPham,
      "Giá bán": item.giaBan,
      "Trạng thái": item.trangThai === 0 ? "Không hoạt động" : "Hoạt động",
      "Bàn phím": item.banPhim,
      "CPU": item.cpu,
      "Hệ điều hành": item.heDieuHanh,
      "Màn hình": item.manHinh,
      "Màu sắc": item.mauSac,
      "Ram": item.ram,
      "VGA": item.vga,
      "Ổ cứng": item.ocung,
      "Webcam": item.webcam,
      "Serials": item.listSerialNumber,
      "Ngày tạo": item.ngayTao,
      "Người tạo": item.nguoiTao,
      "Ngày sửa": item.ngaySua,
      "Người sửa": item.nguoiSua
    }));  

    const sheetBT = XLSX.utils.json_to_sheet(formattedDataBienThe, { headerBienThe });  


    // const range = XLSX.utils.decode_range(sheetBT['!ref']); // Lấy phạm vi của sheet  
    // for (let col = range.s.c; col <= range.e.c; col++) { // Duyệt qua từng cột trong dòng header  
    //     const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // Địa chỉ ô cho header  
    //     if (!sheetBT[cellAddress]) {  
    //         sheetBT[cellAddress] = {}; // Nếu ô không tồn tại, tạo một đối tượng ô  
    //     }  
    //     const sheetBT = XLSX.utils.json_to_sheet(formattedDataBienThe, { headerBienThe });  
    //     [cellAddress].s = { // Định dạng ô  
    //         font: {  
    //             bold: true,        // Bôi đậm chữ  
    //         },  
    //         fill: {  
    //             fgColor: { rgb: "FFCCCCCC" } // Thay mã màu tại đây (nền xám nhạt)  
    //         }  
    //     };  
    // }  
    // Tạo một workSheet từ data
    // const ws = XLSX.utils.json_to_sheet(data);
    // Tạo một workBook
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");
    // Tạo một workbook  
    const wb = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, sheetSP, "Sản phẩm");  
    XLSX.utils.book_append_sheet(wb, sheetBT, "Biến thể");  
    // Xuất file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};

