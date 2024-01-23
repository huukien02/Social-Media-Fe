import React, { useState } from "react";
import { Box, TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import LoginModal from "../../components/LoginModal";
import Head from "next/head";
import { useRouter } from "next/router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    if (loginSuccess) {
      window.location.assign("/");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/user/login",
        {
          username,
          password,
        }
      );

      const { status, isLogin, accessToken } = response.data;

      if (status === 200 && isLogin && accessToken) {
        localStorage.setItem("token", accessToken);
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);
      }
      setModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container sx={{ width: "40%", marginTop: 5 }}>
        <Box>
          <Typography sx={{ textAlign: "center" }} variant="h5" color="initial">
            LOGIN
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > :not(style)": {
              m: 3,
              width: "100%",
            },
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
        <Box>
          <LoginModal
            open={modalOpen}
            onClose={handleCloseModal}
            success={loginSuccess}
          />
        </Box>
      </Container>
    </>
  );
}

export default Login;
