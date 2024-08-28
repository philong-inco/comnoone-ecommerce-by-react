import axios from "axios"
import { backEndUrl } from "utils/back-end"
const path = 'vga'

export const createNewRam = async ({
    ten,
    dungLuong,
    tocDoBus,
    trangThai
}) => {
    try {
        const res = await axios.post(`${backEndUrl}/${path}/add`, {
            ten,
            dungLuong,
            tocDoBus,
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
    ma,
    dungLuong,
    name,
    tocDoBus,
    trangThai
}) => {
    try {
        const res = await axios.get(`${backEndUrl}/${path}/find/filter-id?ma=${ma}&dungLuong=${dungLuong}&name=${name}&tocDoBus=${tocDoBus}&trangThai=${trangThai}`)

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
    dungLuong,
    tocDoBus,
    trangThai
}) => {
    try {
        const res = await axios.put(`${backEndUrl}/${path}/update/${id}`, {
            id,
            ten,
            dungLuong,
            tocDoBus,
            trangThai
        })

        return res
    } catch (error) {
        console.log('Error updateRam', error);
    }
}