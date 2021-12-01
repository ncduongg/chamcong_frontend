import axiosClients from "./axiosClients"
import qs from "qs"
import axios from "axios"
const apiAdmin = {
    login(data) {
        const url = 'apiAdmin/loginAdmin'
        return axiosClients.post(url, data)
    }
    ,
    getall(id, dateStart, dateEnd,idLocal) {
        try {
            const dateStartNew = new Date(dateStart).toISOString().split("T")[0];
            const newDateEndOld = new Date(dateEnd).toISOString().split("T")[0];
            //let dateEndOld = new Date(newDateEndOld.setDate(newDateEndOld.getDate() + 1)).toISOString().split("T")[0];
            const url = `/api/filter?id=${id}&dateStart=${dateStartNew}T00:00:01.000Z&dateEnd=${newDateEndOld}T23:59:00.000Z&idLocal=${idLocal}`
            return axiosClients.get(url)
        } catch (error) {
            return error
        }
    },
    getIDandUser(params) {
        try {
            const url = 'apiAdmin/getIdAndName'
            const newParams  =  [params]
            return axiosClients.post(url,newParams)
        } catch (error) {
            return error
        }
    },
    uploadFile(file) {
        try {
            const url = 'apiAdmin/uploadfile'
            const formData = new FormData()
            formData.append('file', file)
            return axiosClients.post(url, formData)
        } catch (error) {
            return error
        }
    },
    getListFile() {
        const url = 'apiAdmin/getListFile'
        return axiosClients.get(url)
    },
    readFile(params) {
        const url = 'apiAdmin/readfileNOsql'
        return axiosClients.get(url, {
            params: params, paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
    },
    writeFile(params) {
        const url = 'apiAdmin/writeFiletoCSDL'
        console.log(params);
        return axiosClients.post(url, params)
    },
    getListVanPhong() {
        const url = 'apiAdmin/getListVP'
        return axiosClients.get(url)
    },
    addListVanPhong(data) {
        const url = 'apiAdmin/addListVP'
        return axiosClients.post(url, data)
    }
}
export default apiAdmin