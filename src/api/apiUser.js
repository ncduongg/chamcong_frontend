import { useSelector } from "react-redux"
import axiosClients from "./axiosClients"


const UserApi = {

    getAll(params) {
        const url = '/api/all'
        return axiosClients.get(url)
    },
    getById(id, dateStart, dateEnd) {
        try {
            const dateStartNew = new Date(dateStart).toISOString().split("T")[0];
            const newDateEndOld = new Date(dateEnd).toISOString().split("T")[0];
            const url = `/api/filter?id=${id}&dateStart=${dateStartNew}T00:01:00.000Z&dateEnd=${newDateEndOld}T23:59:00.000Z`
            return axiosClients.get(url)
        } catch (error) {
            return error
        }


    }

}
export default UserApi