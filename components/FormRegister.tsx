import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import RegisterModal from "./RegisterModal";

function FormRegister(props: any) {
  const { typeTab } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [regiterSuccess, setRegiterSuccessSuccess] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        {
          username,
          password,
          email,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const { status } = response.data;
      if (status === 200) {
        setUsername("");
        setPassword("");
        setEmail("");
        setRegiterSuccessSuccess(true);
      } else {
        setRegiterSuccessSuccess(false);
      }
      setModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {typeTab === 0 && (
        <Container>
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
            <Box>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                onChange={(e: any) => setUsername(e.target.value)}
                value={username}
              />
            </Box>
            <Box>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
              />
            </Box>
            <Box>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </Box>
          </Box>
          <RegisterModal
            open={modalOpen}
            onClose={handleCloseModal}
            success={regiterSuccess}
          />
        </Container>
      )}
    </>
  );
}

export default FormRegister;
