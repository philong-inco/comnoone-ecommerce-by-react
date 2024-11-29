import axios from "axios"
import { backEndUrl } from "utils/back-end"
const path = 'san-pham'

export const createSanPham = async ({
    ten,
    trangThai,
    moTa,
    nhuCauId,
    thuongHieuId
}) => {
    try {
        const res = await axios.post(`${backEndUrl}/${path}/add`, {
            ten,
            trangThai,
            moTa,
            nhuCauId,
            thuongHieuId
        })

        return res?.data?.data
    } catch (error) {
        console.log('Error createSanPham', error);
    }
}

export const getAllSanPham = async () => {
    try {
        const res = await axios.get(`${backEndUrl}/${path}/all-list`)

        return res?.data?.data
    } catch (error) {
        console.log('Error getAllSanPham', error);
    }
}

export const getAllForExcel = async (filterCurrent) => {
    try {
        const urlFindFilter = 'https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/san-pham/find/filter-id?';
       
        filterCurrent.size = '99999';
        const queryString = Object.entries(filterCurrent)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const urlQuery = urlFindFilter + queryString;
        const result = await axios.get(urlQuery);

        return result?.data?.data
    } catch (error) {
        console.log('Error getAllForExcel', error);
    }
}

export const getSanPhamById = async (id) => {
    try {
        const res = await axios.get(`${backEndUrl}/${path}/detail/${id}`)

        return res
    } catch (error) {
        console.log('Error getSanPhamById', error);
    }
}