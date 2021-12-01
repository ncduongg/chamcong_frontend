import { configureStore } from "@reduxjs/toolkit";
import loginAdmin  from "./reducers/loginAdminSlice";
import loginSlice from "./reducers/loginSlice";
const rootReducer = {
    login: loginSlice,
    loginadmin: loginAdmin
}
const store = configureStore({
    reducer: rootReducer
})
export default store