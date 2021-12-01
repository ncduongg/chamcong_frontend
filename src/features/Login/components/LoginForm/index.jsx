import React, { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.scss";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://dth.com.vn/">
        DHT.Com.Vn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();
const LoginForm = (props) => {
  const schema = yup
    .object({
      username: yup.string().required("Vui lòng nhâp Tài Khoản"),
      password: yup.string().required("Vui lòng nhâp Mật Khẩu"),
    })
    .required();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // submiting
  const { isSubmitting } = useFormState({
    control,
  });
  // yup validate
  const patchAdmin = window.location.pathname;
  const handleonSubmitClick = async (data) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(data);
    }
    reset({
      username: "",
      password: "",
    });
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isSubmitting && <CircularProgress color="success" />}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Đăng Nhập DTH
            </Typography>
            <form
              onSubmit={handleSubmit(handleonSubmitClick)}
              sx={{ mt: 1 }}
              noValidate
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tài Khoản"
                name="username"
                autoComplete="username"
                autoFocus
                {...register("username")}
                error={errors.username ? true : false}
                helperText={errors.username?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật Khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Đăng Nhập
              </Button>
            </form>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LoginForm;
