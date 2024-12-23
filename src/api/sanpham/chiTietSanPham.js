import axios from "axios"
import { backEndUrl } from "utils/back-end"
const path = 'san-pham-chi-tiet'
import { get, post, put, del } from "utils/requestSanPham"

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
    ocungId,
    listSerialNumber,
    listUrlAnhSanPham

}) => {
    try {
        const res = await post(`${path}/add`, {
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
            ocungId,
            listSerialNumber,
            listUrlAnhSanPham
        })

        return res
    } catch (error) {
        console.log('Error createSanPhamChiTiet', error);
        throw error
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
        const res = await post(`${path}/valid-for-add`, {
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
        throw error
    }
}