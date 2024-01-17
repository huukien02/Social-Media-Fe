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
  IconButton,
  Input,
  Paper,
} from "@mui/material";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDataUser, getDataUsers, uploadImage } from "../../redux/actions";
import Head from "next/head";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { isFriend } from "../../config";

function Me() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser, isUploadImage, dataUsers, error } = useSelector(
    (state: any) => state
  );
  const [previewImage, setPreviewImage] = useState<any>();
  const fileInputRef = useRef<any>(null);
  const [file, setFile] = useState<any>();

  const [change, setChange] = useState<any>(false);

  useEffect(() => {
    fileInputRef.current = document.getElementById("fileInput");
    dispatch(getDataUser());
    dispatch(getDataUsers());
  }, [dispatch, isUploadImage, change]);

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

  const handleAvatarClick = () => {
    alert("Upload avatar");
  };

  const handleConfirmAddFriend = async (idFriendConfirm: any) => {
    const postData = { idFriendConfirm };
    const response = await axios.post(
      "http://localhost:3000/users/confirm/add-friend",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status == 201) {
      setChange((prev: any) => !prev);
    }
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box>
        {dataUser && (
          <Card
            sx={{
              textAlign: "center",
              width: "30%",
              marginLeft: "35%",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h4" color="primary">
                  PROFILE
                </Typography>
              }
            />
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={dataUser?.user?.avatar}
                  style={{ width: 100, height: 100, marginBottom: 10 }}
                  onClick={handleAvatarClick}
                  sx={{ cursor: "pointer" }}
                />
                <Typography variant="body1" color="textPrimary">
                  Username: <strong> {dataUser?.user?.username}</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Email: <strong>{dataUser?.user?.email}</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Posts: <strong>{dataUser?.user?.posts.length}</strong>
                </Typography>
              </Box>
            </CardContent>

            <Container sx={{ paddingTop: 4 }}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h5"
                color="initial"
              >
                Upload Avatar
              </Typography>
              <Box
                sx={{
                  "& > :not(style)": { m: 3, width: "20%", marginLeft: "40%" },
                }}
              >
                <Box>
                  <Input
                    type="file"
                    onChange={handleChangeFile}
                    id="fileInput"
                  />
                </Box>
                {previewImage && (
                  <Box>
                    <img
                      onClick={deleteImagePreview}
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </Box>
                )}
                <Box>
                  <Button
                    onClick={handleUploadAvatar}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Up Load
                  </Button>
                </Box>
              </Box>
            </Container>
          </Card>
        )}
        <Box>
          <Typography sx={{ padding: 2 }} variant="h5" color="initial">
            <PeopleAltIcon fontSize="large" style={{ color: "#1877F2" }} />
          </Typography>
          {dataUser?.friends.map((item: any) => (
            <Grid item key={item.friend.id} xs={12}>
              <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item.friend.avatar}
                        alt={item.friend.username}
                      />
                    }
                    title={
                      <Box sx={{ display: "flex" }}>
                        <Box> {item.friend.username}</Box>
                        <Box
                          sx={{
                            marginTop: "-2px",
                            marginLeft: 1,
                            cursor: "pointer",
                          }}
                        >
                          <IndeterminateCheckBoxIcon style={{ color: "red" }} />
                        </Box>
                      </Box>
                    }
                  />
                </Card>
              </Paper>
            </Grid>
          ))}
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Typography sx={{ padding: 2 }} variant="h5" color="initial">
            <GroupAddIcon fontSize="large" style={{ color: "#1877F2" }} />
          </Typography>
          {dataUser?.confirm_friends.map((item: any) => (
            <Grid item key={item.friend.id} xs={12}>
              <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item.friend.avatar}
                        alt={item.friend.username}
                      />
                    }
                    title={
                      <Box sx={{ display: "flex" }}>
                        <Box> {item.friend.username}</Box>
                        <Box
                          sx={{
                            marginTop: "-2px",
                            marginLeft: 1,
                            cursor: "pointer",
                          }}
                        >
                          <CheckCircleIcon
                            onClick={() => handleConfirmAddFriend(item.id)}
                            style={{ color: "#1877F2" }}
                          />
                          <DeleteIcon style={{ color: "red" }} />
                        </Box>
                      </Box>
                    }
                  />
                </Card>
              </Paper>
            </Grid>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Me;
