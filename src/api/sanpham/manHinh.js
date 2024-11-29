import axios from "axios"
import { backEndUrl } from "utils/back-end"
const path = 'man-hinh'
import { get, post, put, del } from "utils/requestSanPham"

export const createNewRam = async ({
    ten,
    doPhanGiai,
    kichThuoc,
    trangThai
}) => {
    try {
        const res = await post(`/${path}/add`, {
            ten,
            doPhanGiai,
            kichThuoc,
            trangThai
        })

        return res?.data?.data
    } catch (error) {
        console.log('Error createNewRam', error);
    }
}

export const getRams = async ({
    page,
    size
}) => {
    try {
        const res = await get(`${path}/all?page=${page}&limit=${size}`)

        return res
    } catch (error) {
        console.log('Error createNewRam', error);
    }
}

export const filterRam = async ({
    page,
    size,
    name,
    trangThai,
}) => {
  
    try {
        let queryStr = '';
        queryStr += (page === undefined || page === '') ? 'page=0' : 'page=' + page;
        queryStr += (size === undefined) ? '&size=5' : '&size=' + size;
        queryStr += (name === undefined) ? '' : '&name=' + name;
        queryStr += (trangThai === undefined) ? '' : '&trangThai=' + trangThai;
        console.log('queryStr: ', queryStr);
        const res = await get(`${path}/find/filter-id?${queryStr}`);
        return res
    } catch (error) {
        console.log('Error filterRam', error);
    }
}

export const deleteRam = async ({
    id
}) => {
    try {
        const res = await del(`${path}/delete/${id}`)

        return res
    } catch (error) {
        console.log('Error deleteRam', error);
    }
}

export const updateRam = async ({
    id,
    ten,
    doPhanGiai,
    kichThuoc,
    trangThai
}) => {
    try {
        const res = await put(`${path}/update/${id}`, {
            id,
            ten,
            doPhanGiai,
            kichThuoc,
            trangThai
        })

        return res
    } catch (error) {
        console.log('Error updateRam', error);
    }
}

export const IsValidAdd = async (name) => {
    try {
        const res = await get(`${path}/exist-name?name=${name}`)
        const result = res.data.data;
        if (result){
            return false;
        }
        return true;
    } catch (error) {
        console.log('Error createNewRam', error);
    }
}

export const IsValidUpdate = async (name, id) => {
    try {
        const res = await get(`${path}/exist-name-diff-id?name=${name}&id=${id}`)
        const result = res.data.data;
        if (result){
            return false;
        }
        return true;
    } catch (error) {
        console.log('Error createNewRam', error);
    }
}