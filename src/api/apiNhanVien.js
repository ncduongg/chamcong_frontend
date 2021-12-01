import axiosClients from "./axiosClients"
const apiNhanVien = {
    login(data) {
        const url = 'apiUser/userlogin'
        return axiosClients.post(url, data)
    }
}
export default apiNhanVien