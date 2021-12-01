import { unwrapResult } from "@reduxjs/toolkit";
import LoginForm from "features/Login/components/LoginForm";
import React from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { loginAdmin } from "redux/reducers/loginAdminSlice";
import { useRouteMatch, useHistory } from "react-router-dom";
const AdminPage = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const match = useRouteMatch();
  const history = useHistory();
  const handleClickLoginAdmin = async (val) => {
    try {
      const action = loginAdmin(val);
      const resAction = await dispatch(action);
      const user = unwrapResult(resAction);
      if (
        user &&
        Object.keys(user).length > 1 &&
        Object.getPrototypeOf(user) === Object.prototype
      ) {
        loginSuccess();
      } else {
        loginFail();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginSuccess = () => {
    enqueueSnackbar("Đăng nhập thành công", {
      variant: "success",
    });
    history.push(`${match.path}/Checkin`);
  };
  const loginFail = () => {
    enqueueSnackbar("Đăng nhập thất bại", {
      variant: "error",
    });
  };
  return (
    <div>
      <LoginForm onSubmit={handleClickLoginAdmin} />
    </div>
  );
};

export default AdminPage;
