import { Box, Button, Container, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import RegisterModal from "./RegisterModal";

function FileRegister(props: any) {
  const { typeTab } = props;
  const [file, setFile] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [regiterSuccess, setRegiterSuccessSuccess] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangeFile = async (event: any) => {
    try {
      const fileCsv = event.target.files[0];
      setFile(fileCsv);
      const formData = new FormData();
      formData.append("file", fileCsv);
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };
  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create/from-csv",
        {
          file: file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.status === 200) {
        setFile("");
        setRegiterSuccessSuccess(true);
      } else {
        setRegiterSuccessSuccess(false);
      }
      setModalOpen(true);
    } catch (error) {}
  };
  return (
    <>
      {typeTab == 1 && (
        <Container>
          <Box sx={{ "& > :not(style)": { m: 3, width: "100%" } }}>
            <Box>
              <Input type="file" onChange={handleChangeFile} />
            </Box>
            <Box>
              <Button
                onClick={handleCreateUser}
                variant="contained"
                color="primary"
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

export default FileRegister;
