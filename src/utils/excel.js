import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
    // Tạo một workSheet từ data
    const ws = XLSX.utils.json_to_sheet(data);
    // Tạo một workBook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Xuất file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};

