import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { logoutAdmin } from "redux/reducers/loginAdminSlice";
const HeaderAdmin = () => {
  // const headerCheckLoginAdmin = useSelector((state) => state.login.user);
  const history = useHistory();
  const match = useRouteMatch();
  const headerCheckLoginAdmin = useSelector((state) => state.loginadmin.admin);
  const isLogin = !!headerCheckLoginAdmin.username;
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUpfile = () => {
    history.push(`${match.path}/Upload`);
  };
  const handleCheckin = () => {
    history.push(`${match.path}/Checkin`);
  };
  const handleListNhanVien = () => {
    history.push(`${match.path}/ListNhanVien`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //logout
  const handleLogoutClick = () => {
    const actions = logoutAdmin();
    history.push("/Admin");
    dispatch(actions);
    enqueueSnackbar("Đăng xuất thành công", {
      variant: "success",
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DTH Sotfware
          </Typography>
          {isLogin && (
            <div>
              <Button color="inherit" onClick={handleUpfile}>
                UP File
              </Button>
              <Button color="inherit" onClick={handleCheckin}>
                Quản Lý
              </Button>
              <Button color="inherit" onClick={handleListNhanVien}>
                Danh Sách Nhân Viên
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Đăng Xuất</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HeaderAdmin;
