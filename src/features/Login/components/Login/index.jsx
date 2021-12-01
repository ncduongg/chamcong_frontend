import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "redux/reducers/loginSlice";
import LoginForm from "../LoginForm";
import { useHistory, useRouteMatch } from "react-router-dom";
import { loginAdmin } from "redux/reducers/loginAdminSlice";
const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { clickClose } = props;
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const handleSubmitLogin = async (val) => {
    try {
      const action = loginAsync(val);
      const resAction = await dispatch(action);
      const user = unwrapResult(resAction);
      if (
        user &&
        Object.keys(user).length > 1 &&
        Object.getPrototypeOf(user) === Object.prototype
      ) {
        loginSuccess();
        clickClose();
      } else {
        loginFail();
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const action = loginAdmin(val);
    //   const resAction = await dispatch(action);
    //   const user = unwrapResult(resAction);
    //   if (
    //     user &&
    //     Object.keys(user).length > 1 &&
    //     Object.getPrototypeOf(user) === Object.prototype
    //   ) {
    //     loginSuccess();
    //     clickClose();
    //   } else {
    //     loginFail();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
      <LoginForm onSubmit={handleSubmitLogin} />
    </div>
  );
};

export default Login;
