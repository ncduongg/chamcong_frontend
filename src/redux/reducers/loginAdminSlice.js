import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import apiAdmin from "api/apiAdmin";
import PrivateKeys from "constants/private-key";
export const loginAdmin = createAsyncThunk(
    'adminLogin/loginAdmin',
    async (payload) => {
        try {
            // call api login
            const responseLogin = await apiAdmin.login(payload)
            //save data localStore
            localStorage.setItem(PrivateKeys.TOKEN_ADMIN, JSON.stringify(responseLogin.data.token_access_admin))
            localStorage.setItem(PrivateKeys.ADMIN, JSON.stringify(responseLogin.data.data))
            return responseLogin.data.data

        } catch (error) {
            return isRejectedWithValue("hello :", error.response);
        }
    }
)
const loginAdminSlice = createSlice({
    name: 'adminLogin',
    initialState: {
        admin: JSON.parse(localStorage.getItem(PrivateKeys.ADMIN)) || {},
        //token_access: JSON.parse(localStorage.getItem(PrivateKeys.TOKEN)) || {}
        // gia tri khoi tao
    },
    reducers: {
        logoutAdmin(state) {
            localStorage.removeItem(PrivateKeys.TOKEN_ADMIN)
            localStorage.removeItem(PrivateKeys.ADMIN)
            state.admin = {}
        }
    },
    extraReducers: {
        [loginAdmin.fulfilled]: (st, ac) => {
            st.admin = ac.payload
        }
    }
})
const { actions, reducer } = loginAdminSlice
export const { logoutAdmin } = actions
export default reducer