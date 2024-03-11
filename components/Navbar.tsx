import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getDataUser } from "../redux/actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { clearUserState } from "../redux/reducers";

const pages = [
  { label: "Post", path: "/posts" },
  { label: "Profile", path: "/me" },
  { label: "Forgot Password", path: "/forgot-password" },
];

function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser } = useSelector((state: any) => state);
  const [anchorElNav, setAnchorElNav] = useState<any>();
  const [anchorElUser, setAnchorElUser] = useState<any>();
  const router = useRouter();

  const settings = [
    {
      label: "Login",
      action: () => {
        router.push("/login");
      },
    },
    {
      label: "Register",
      action: () => {
        router.push("/register");
      },
    },
    {
      label: "Logout",
      action: () => {
        localStorage.removeItem("token");
        dispatch(clearUserState());
        router.push("/login");
      },
    },
  ];

  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "inherit",
        color: "#1877F2",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            passHref
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.path}
                  passHref
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            passHref
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                href={page.path}
                passHref
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#1877F2", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={dataUser?.user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!dataUser ? (
                <>
                  <MenuItem
                    key={settings[0].label}
                    onClick={settings[0].action}
                  >
                    <Typography textAlign="center">
                      {settings[0].label}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    key={settings[1].label}
                    onClick={settings[1].action}
                  >
                    <Typography textAlign="center">
                      {settings[1].label}
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem key={settings[2].label} onClick={settings[2].action}>
                  <Typography textAlign="center">
                    {settings[2].label}
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
