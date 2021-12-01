import Logout from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Login from "features/Login/components/Login";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "redux/reducers/loginSlice";
import "./styles.scss";
export default function Header() {
  //login check and render header
  const headerCheckLogin = useSelector((state) => state.login.user);
  const history = useHistory();
  const isLogin = !!headerCheckLogin.id;
  const pathAdmin = window.location.pathname;
  //open Form Login
  const [open, setOpen] = useState(pathAdmin === "/Admin" ? isLogin : !isLogin);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // admin rec
  const rectAdmin = () => {
    history.push("/Admin");
  };
  //open Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // noticatin
  const { enqueueSnackbar } = useSnackbar();
  // logout
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    const actions = logout();
    history.push("/Home");
    dispatch(actions);
    enqueueSnackbar("Đăng xuất thành công", {
      variant: "success",
    });
  };
  //logo
  const logo = (username) => {
    return username.charAt(0).toUpperCase();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="link-logo" to="/">
              DHT SoftWare
            </Link>
          </Typography>
          {!isLogin && pathAdmin !== "/Admin" && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          {!isLogin && pathAdmin !== "/Admin" && (
            <Button color="inherit" onClick={rectAdmin}>
              Admin Login
            </Button>
          )}
          {pathAdmin === "/Admin" && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login Admin
            </Button>
          )}
          {isLogin && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClickMenu}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {logo(headerCheckLogin.username)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar /> {headerCheckLogin.username}
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
        <Dialog open={open} onClose={handleCloseMenu} className="dialog-login">
          <DialogContent>
            <Login clickClose={handleClose} />
          </DialogContent>
        </Dialog>
      </AppBar>
    </Box>
  );
}
