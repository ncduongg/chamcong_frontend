import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import apiNhanVien from "api/apiNhanVien"
import PrivateKeys from "constants/private-key";
export const loginAsync = createAsyncThunk(
    'userLogin/loginAsync',
    async (payload) => {
        try {
            // call api login
            const responseLogin = await apiNhanVien.login(payload)
            //save data localStore
            localStorage.setItem(PrivateKeys.TOKEN, responseLogin.data.token_access)
            localStorage.setItem(PrivateKeys.USER, JSON.stringify(responseLogin.data.data))
            return responseLogin.data.data

        } catch (error) {
            return isRejectedWithValue("hello :", error.response);
        }
    }
)
const loginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        user: JSON.parse(localStorage.getItem(PrivateKeys.USER)) || {},
        //token_access: JSON.parse(localStorage.getItem(PrivateKeys.TOKEN)) || {}
        // gia tri khoi tao
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(PrivateKeys.TOKEN)
            localStorage.removeItem(PrivateKeys.USER)
            state.user = {}
        }
    },
    extraReducers: {
        [loginAsync.fulfilled]: (st, ac) => {
            st.user = ac.payload
        }
    }
})
const { actions, reducer } = loginSlice
export const { logout } = actions
export default reducer