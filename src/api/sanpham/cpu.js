import axios from "axios"
import { backEndUrl } from "utils/back-end"
const path = 'cpu'

export const createNewRam = async ({
    ten,
    dongCPU,
    nhaSanXuat,
    trangThai
}) => {
    try {
        const res = await axios.post(`${backEndUrl}/${path}/add`, {
            ten,
            dongCPU,
            nhaSanXuat,
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
        const res = await axios.get(`${backEndUrl}/${path}/all?page=${page}&limit=${size}`)

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
        const res = await axios.get(`${backEndUrl}/${path}/find/filter-id?${queryStr}`);
        return res
    } catch (error) {
        console.log('Error filterRam', error);
    }
}

export const deleteRam = async ({
    id
}) => {
    try {
        const res = await axios.delete(`${backEndUrl}/${path}/delete/${id}`)

        return res
    } catch (error) {
        console.log('Error deleteRam', error);
    }
}

export const updateRam = async ({
    id,
    ten,
    dongCPU,
    nhaSanXuat,
    trangThai
}) => {
    try {
        const res = await axios.put(`${backEndUrl}/${path}/update/${id}`, {
            id,
            ten,
            dongCPU,
            nhaSanXuat,
            trangThai
        })

        return res
    } catch (error) {
        console.log('Error updateRam', error);
    }
}

export const IsValidAdd = async (name) => {
    try {
        const res = await axios.get(`${backEndUrl}/${path}/exist-name?name=${name}`)
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
        const res = await axios.get(`${backEndUrl}/${path}/exist-name-diff-id?name=${name}&id=${id}`)
        const result = res.data.data;
        if (result){
            return false;
        }
        return true;
    } catch (error) {
        console.log('Error createNewRam', error);
    }
}