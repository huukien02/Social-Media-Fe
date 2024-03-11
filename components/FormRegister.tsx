import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/actions";
import { clearIsCreateUserCsv } from "../redux/reducers";

const styleInput = {
  color: "white",
  "& label": {
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

function FormRegister(props: any) {
  const dispatch: AppDispatch = useDispatch();
  const { isCreateUserCsv } = useSelector((state: any) => state);
  const { typeTab } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [regiterSuccess, setRegiterSuccessSuccess] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    if (regiterSuccess) {
      window.location.assign("/login");
    }
  };

  useEffect(() => {
    if (isCreateUserCsv) {
      const isSuccess = isCreateUserCsv.status === 200;
      setRegiterSuccessSuccess(isSuccess);
      setModalOpen(true);
      setUsername("");
      setPassword("");
      setEmail("");
      dispatch(clearIsCreateUserCsv());
    }
  }, [isCreateUserCsv]);

  const handleRegister = () => {
    dispatch(createUser({ username, password, email }));
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
                sx={styleInput}
                label="Username"
                variant="outlined"
                fullWidth
                onChange={(e: any) => setUsername(e.target.value)}
                value={username}
              />
            </Box>
            <Box>
              <TextField
                sx={styleInput}
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
                sx={styleInput}
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
                fullWidth
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
