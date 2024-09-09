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

export const getSanPhamById = async (id) => {
    try {
        const res = await axios.get(`${backEndUrl}/${path}/detail/${id}`)

        return res
    } catch (error) {
        console.log('Error getSanPhamById', error);
    }
}