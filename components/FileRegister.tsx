import { Box, Button, Container, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createUserFromCsv } from "../redux/actions";
import { clearIsCreateUserCsv } from "../redux/reducers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function FileRegister(props: any) {
  const dispatch: AppDispatch = useDispatch();
  const { isCreateUserCsv } = useSelector((state: any) => state);

  const { typeTab } = props;
  const [file, setFile] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [regiterSuccess, setRegiterSuccessSuccess] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    if (regiterSuccess) {
      window.location.assign("/login");
    }
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

  const handleCreateUser = () => {
    dispatch(createUserFromCsv({ file: file }));
  };

  useEffect(() => {
    if (isCreateUserCsv) {
      const isSuccess = isCreateUserCsv.status === 200;
      setFile("");
      setRegiterSuccessSuccess(isSuccess);
      setModalOpen(true);
      dispatch(clearIsCreateUserCsv());
    }
  }, [isCreateUserCsv]);

  return (
    <>
      {typeTab == 1 && (
        <Container>
          <Box
            sx={{ "& > :not(style)": { m: 3, width: "100%" }, marginTop: 5 }}
          >
            <Box>
              <Input
                style={{ display: "none" }}
                id="fileInput"
                type="file"
                onChange={handleChangeFile}
              />
              <label
                htmlFor="fileInput"
                style={{
                  display: "flex",
                  marginLeft: 25,
                  alignItems: "center",
                }}
              >
                <CloudUploadIcon sx={{ cursor: "pointer" }} color="primary" />
              </label>
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
