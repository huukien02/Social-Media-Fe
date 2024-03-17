import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, Box, Button, Container, Input } from "@mui/material";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDataUser, getDataUsers, uploadImage } from "../../redux/actions";
import Head from "next/head";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilterIcon from "@mui/icons-material/Filter";

import NotFoundPage from "../../components/NotFoundPage";

function Me() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser, isUploadImage } = useSelector((state: any) => state);
  const [previewImage, setPreviewImage] = useState<any>();
  const fileInputRef = useRef<any>(null);
  const [file, setFile] = useState<any>();

  useEffect(() => {
    fileInputRef.current = document.getElementById("fileInput");
    dispatch(getDataUser());
    dispatch(getDataUsers());
  }, [dispatch, isUploadImage]);

  useEffect(() => {
    deleteImagePreview();
  }, [dataUser]);

  const handleChangeFile = (event: any) => {
    try {
      const fileImage = event.target.files[0];

      if (fileImage) {
        setFile(fileImage);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(fileImage);
      }
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };

  const handleUploadAvatar = () => {
    dispatch(uploadImage(file));
  };

  const deleteImagePreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile("");
    setPreviewImage(null);
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      {!dataUser ? (
        <NotFoundPage />
      ) : (
        <Box>
          {dataUser && (
            <Card
              sx={{
                textAlign: "center",
                width: "30%",
                marginLeft: "35%",
                marginTop: 10,
                background: "linear-gradient(to bottom, #005AA7  , #FFFDE4)",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Input
                      type="file"
                      onChange={handleChangeFile}
                      id="fileInput"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileInput"
                      style={{
                        display: "flex",
                        marginLeft: 25,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={dataUser?.user?.avatar}
                        style={{ width: 100, height: 100, marginBottom: 10 }}
                        sx={{ cursor: "pointer" }}
                      />
                    </label>
                  </Box>

                  <Typography variant="body1">
                    Username: <strong> {dataUser?.user?.username}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Email: <strong>{dataUser?.user?.email}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Posts: <strong>{dataUser?.user?.posts.length}</strong>
                  </Typography>
                </Box>
              </CardContent>

              <Container sx={{ paddingTop: 4 }}>
                <Box
                  sx={{
                    "& > :not(style)": {
                      m: 3,
                      width: "20%",
                      marginLeft: "40%",
                    },
                  }}
                >
                  {previewImage && (
                    <Box>
                      <img
                        onClick={deleteImagePreview}
                        src={previewImage}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "200px",
                          cursor: "pointer",
                        }}
                      />
                      <Box>
                        <Button
                          onClick={handleUploadAvatar}
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Update
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Container>
            </Card>
          )}
        </Box>
      )}
    </>
  );
}

export default Me;
