import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Input,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilterIcon from "@mui/icons-material/Filter";
import AddReactionIcon from "@mui/icons-material/AddReaction";

import { STATUS } from "../config";
import { createPost } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { clearDataCommentPost } from "../redux/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function FormCreatePost({ dataPropsUser }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(null);
  const [status, setStatus] = React.useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [file, setFile] = useState<any>();
  const fileInputRef = useRef<any>(null);

  const dispatch: AppDispatch = useDispatch();
  const { isCreatePost } = useSelector((state: any) => state);

  useEffect(() => {
    setContent("");
    setTitle(null);
    setFile(null);
    setPreviewImage(null);
    setStatus(null);
  }, [isCreatePost]);

  const deleteImagePreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile("");
    setPreviewImage(null);
  };

  const handleCreatePost = async () => {
    dispatch(createPost({ title, content, image: file }));
  };

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
      console.error("Error uploading Image file:", error);
    }
  };

  const handleChangeStatus = (status: any) => {
    setStatus(status);
    setTitle(status.id);
    setShowStatus(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "lightgray",
          width: "30%",
          marginLeft: "35%",
          zIndex: 9999,
          borderRadius: "20px",
          padding: 1,
        }}
      >
        <Avatar
          onClick={() => {
            router.push("/me");
          }}
          src={dataPropsUser?.user.avatar}
          alt={dataPropsUser?.user.username}
          sx={{ width: 50, height: 45, cursor: "pointer" }}
        />
        <Button
          onClick={handleOpen}
          sx={{
            borderRadius: 5,
            width: 500,
            marginLeft: 1,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "white",
            },
            fontFamily: "monospace"
          }}
        >
          Bạn đang nghĩ gì ??
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            width: "30%",
            marginLeft: "35%",
            marginTop: "5%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar
              src={dataPropsUser?.user.avatar}
              alt={dataPropsUser?.user.username}
              sx={{ width: 50, height: 45 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                fontFamily: "monospace",
              }}
            >
              {dataPropsUser?.user.username}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                cursor: "pointer",
                marginLeft: 1,
              }}
            >
              {status ? (
                <Box sx={{ alignItems: "center" }}>
                  {
                    <strong style={{ marginLeft: "5px" }}>
                      <small
                        style={{
                          fontWeight: 100,
                          marginLeft: "10px",
                        }}
                      >
                        Đang cảm thấy
                      </small>
                      <samp style={{ marginLeft: "10px" }}>{status.label}</samp>
                    </strong>
                  }
                  <samp onClick={() => setStatus(null)}>{status.icon}</samp>
                </Box>
              ) : (
                <Tooltip title={"Bạn đang cảm thấy gì :v"} placement="top">
                  <AddReactionIcon
                    onClick={() => setShowStatus((prev) => !prev)}
                    color="primary"
                    fontSize="small"
                  />
                </Tooltip>
              )}
            </Box>

            {showStatus && (
              <Box
                sx={{
                  zIndex: 10,
                  backgroundColor: "white",
                  fontWeight: 100,
                  position: "fixed",
                  top: "16%",
                  left: "45%",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 15px gray",
                  paddingLeft: 3,
                  paddingRight: 3,
                  paddingTop: 1,
                  paddingBottom: 1,
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {STATUS.map((item: any) => (
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => handleChangeStatus(item)}
                      key={item.id}
                    >
                      <Typography variant="body1" color="initial">
                        <small style={{ color: "gray" }}>
                          {item.label} {item.icon}
                        </small>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>

          <TextField
            label="Bạn đang nghĩ gì ??? "
            multiline
            variant="outlined"
            fullWidth
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
            sx={{ marginBottom: 2, height: 50 }}
          />
          <Input
            type="file"
            onChange={handleChangeFile}
            id="fileInput"
            style={{ display: "none" }}
          />
          <label
            htmlFor="fileInput"
            style={{ display: "flex", alignItems: "center", width: 5 }}
          >
            <FilterIcon sx={{ cursor: "pointer" }} color="primary" />
          </label>

          {previewImage && (
            <Box sx={{ marginTop: 1 }}>
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
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreatePost}
            sx={{ marginBottom: 2, marginTop: 3 }}
          >
            Post
          </Button>
        </Paper>
      </Modal>
    </>
  );
}

export default FormCreatePost;
