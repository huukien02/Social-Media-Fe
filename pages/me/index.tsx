import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Input,
  Modal,
} from "@mui/material";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDataUser, getDataUsers, uploadImage } from "../../redux/actions";
import Head from "next/head";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilterIcon from "@mui/icons-material/Filter";

import NotFoundPage from "../../components/NotFoundPage";
import ListPost from "../../components/ListPost";
import { clearDataReactionPost } from "../../redux/reducers";

const style = {
  paddingTop: 5,
  paddingBottom: 5,
  backgroundImage: 'url("https://i.gifer.com/BXe0.gif")',
};
function Me() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser, isUploadImage, isComment, isReaction } = useSelector(
    (state: any) => state
  );
  const [previewImage, setPreviewImage] = useState<any>();
  const fileInputRef = useRef<any>(null);
  const [file, setFile] = useState<any>();
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    fileInputRef.current = document.getElementById("fileInput");
    dispatch(getDataUser());
    dispatch(getDataUsers());
    dispatch(clearDataReactionPost());
  }, [dispatch, isUploadImage, isComment, isReaction]);

  console.log(isReaction);
  useEffect(() => {
    if (dataUser) {
      setPosts(dataUser?.user.posts);
    }
  }, [dataUser]);
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
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
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
                <Typography variant="h4">{dataUser?.user?.username}</Typography>
                <Typography variant="body1">{dataUser?.user?.email}</Typography>
                <Typography variant="body2">
                  Posts: {dataUser?.user?.posts.length}
                </Typography>
                {previewImage && (
                  <Box>
                    <Modal
                      open={true}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          width: 400,
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                          zIndex: 999,
                        }}
                      >
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
                            Update Avatar
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
                <Typography variant="h5">Bài Viết</Typography>
                <ListPost dataPropsPost={posts} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Me;
