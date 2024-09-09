import axios from "axios"
import { backEndUrl } from "utils/back-end"
const path = 'san-pham-chi-tiet'

export const createSanPhamChiTiet = async ({
    giaBan,
    trangThai,
    banPhimId,
    cpuId,
    heDieuHanhId,
    manHinhId,
    mauSacId,
    ramId,
    sanPhamId,
    vgaId,
    webcamId,
    ocungId
}) => {
    try {
        
        const res = await axios.post(`${backEndUrl}/${path}/add`, {
            giaBan,
            trangThai,
            banPhimId,
            cpuId,
            heDieuHanhId,
            manHinhId,
            mauSacId,
            ramId,
            sanPhamId,
            vgaId,
            webcamId,
            ocungId
        })

        return res
    } catch (error) {
        console.log('Error createSanPhamChiTiet', error);
    }
}

export const checkToAdd = async ({
    giaBan,
    trangThai,
    banPhimId,
    cpuId,
    heDieuHanhId,
    manHinhId,
    mauSacId,
    ramId,
    sanPhamId,
    vgaId,
    webcamId,
    ocungId
}) => {
    try {
        const res = await axios.post(`${backEndUrl}/${path}/valid-for-add`, {
            giaBan,
            trangThai,
            banPhimId,
            cpuId,
            heDieuHanhId,
            manHinhId,
            mauSacId,
            ramId,
            sanPhamId,
            vgaId,
            webcamId,
            ocungId
        })

        return res?.data
    } catch (error) {
        console.log('Error createSanPhamChiTiet', error);
    }
}