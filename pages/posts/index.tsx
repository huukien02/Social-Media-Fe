import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  Pagination,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getDataPosts,
  getDataUser,
  postComment,
} from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import IconButtonWithPopover from "../../components/IconButtonWithPopover";
import {
  findIconById,
  findStatusById,
  getFormattedTime,
  STATUS,
} from "../../config";
import Head from "next/head";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NotFoundPage from "../../components/NotFoundPage";
import { clearDataCommentPost } from "../../redux/reducers";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const { dataPost, isCreatePost, isComment, dataUser } = useSelector(
    (state: any) => state
  );
  const fileInputRef = useRef<any>(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = React.useState<any>();
  const [idCurrentPost, setIdCurrentPost] = useState<any>(null);
  const [idPostShowComment, setIdPostShowComment] = useState<any>(null);

  useEffect(() => {
    setComment("");
    setContent("");
    setTitle(null);
    setFile(null);
    setPreviewImage(null);
    setStatus(null);
    setIdCurrentPost(null);
    dispatch(clearDataCommentPost());
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isCreatePost, isComment]);

  useEffect(() => {
    fileInputRef.current = document.getElementById("fileInput");
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  useEffect(() => {
    dispatch(getDataPosts());
  }, [dispatch, isCreatePost, isComment]);

  const handleCreatePost = async () => {
    dispatch(createPost({ title, content, image: file }));
  };

  const handlePostComment = (id: any) => {
    dispatch(postComment({ id, comment }));
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

  const deleteImagePreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile("");
    setPreviewImage(null);
  };

  const handleChangeStatus = (status: any) => {
    setStatus(status);
    setTitle(status.id);
    setShowStatus(false);
  };

  const handleChangeComment = (postId: any, comment: any) => {
    setComment(comment);
    setIdCurrentPost(postId);
  };

  const handleShowComment = (idPost: any) => {
    setIdPostShowComment(idPost);
  };

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>

      {!dataUser ? (
        <NotFoundPage />
      ) : (
        <>
          <Box sx={{ marginTop: 5, paddingBottom: 5 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: 2,
                width: "30%",
                marginLeft: "35%",
              }}
            >
              <Box>
                <Box>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={dataUser?.user.avatar}
                        alt={dataUser?.user.username}
                        sx={{ width: 50, height: 45 }}
                      />
                    }
                    title={
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", color: "black" }}>
                          {dataUser?.user.username}
                          <small
                            style={{
                              fontWeight: "100",
                              color: "black",
                              cursor: "pointer",
                            }}
                          >
                            <TouchAppIcon
                              onClick={() => setShowStatus((prev) => !prev)}
                              color="info"
                            />

                            {status && (
                              <>
                                {
                                  <strong style={{ marginLeft: "10px" }}>
                                    <small
                                      style={{
                                        fontWeight: 100,
                                        marginLeft: "10px",
                                      }}
                                    >
                                      đang cảm thấy
                                    </small>
                                    <samp style={{ marginLeft: "10px" }}>
                                      {status.label}
                                    </samp>
                                  </strong>
                                }
                                <samp onClick={() => setStatus(null)}>
                                  {status.icon}
                                </samp>
                              </>
                            )}
                          </small>
                        </Typography>
                      </Box>
                    }
                  />

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
                              <small>
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
                  <CloudUploadIcon sx={{ cursor: "pointer" }} color="primary" />
                </label>
                {previewImage && (
                  <Box>
                    <img
                      onClick={deleteImagePreview}
                      src={previewImage}
                      alt="Preview"
                      style={{
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
              </Box>
            </Paper>
            <Container sx={{ marginTop: 4 }} maxWidth="md">
              <Grid container spacing={2}>
                {dataPost?.list_post.map((post: any) => (
                  <Grid item key={post.id} xs={12} sx={{ marginTop: 5 }}>
                    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                      {/* List Post */}
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar
                              src={post.user.avatar}
                              alt={post.user.username}
                              sx={{ width: 45, height: 45 }}
                            />
                          }
                          title={
                            <Box>
                              <Typography
                                sx={{ fontWeight: "bold", color: "black" }}
                              >
                                {post.user.username}
                                {post.title && (
                                  <small
                                    style={{ fontWeight: 300, marginLeft: 10 }}
                                  >
                                    đang cảm thấy
                                    <Tooltip
                                      title={findStatusById(post.title)}
                                      placement="top"
                                    >
                                      <span style={{ cursor: "pointer" }}>
                                        {findIconById(post.title)}
                                      </span>
                                    </Tooltip>
                                  </small>
                                )}
                              </Typography>
                              <small>{getFormattedTime(post.time)}</small>
                            </Box>
                          }
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{post.content}</strong>
                          </Typography>

                          {post?.image && (
                            <img
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                                objectFit: "cover",
                              }}
                              src={post?.image}
                              alt=""
                            />
                          )}
                        </CardContent>
                      </Card>
                      <IconButtonWithPopover
                        postId={post.id}
                        reactions={post.reactions}
                        reactionsCount={post.reactionsCount}
                      />
                      {idPostShowComment != post.id ? (
                        <Button onClick={() => handleShowComment(post.id)}>
                          <small>Bình luận</small>
                        </Button>
                      ) : (
                        <Button onClick={() => handleShowComment(null)}>
                          <small>Đóng</small>
                        </Button>
                      )}

                      {idPostShowComment == post.id ? (
                        <Box>
                          {/* List Comment */}
                          <Box>
                            <List>
                              {post.comments?.map(
                                (commnent: any, index: number) => (
                                  <React.Fragment key={commnent.id}>
                                    <ListItem>
                                      <Avatar
                                        src={commnent.user.avatar}
                                        alt={commnent.user.username}
                                        sx={{ marginRight: 1 }}
                                      />
                                      <Typography
                                        sx={{ paddingBottom: 2, paddingTop: 2 }}
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <strong>
                                          {commnent.user.username}
                                        </strong>

                                        <span
                                          style={{
                                            color: "#111111",
                                            borderRadius: "10px",
                                            padding: 12,
                                            backgroundColor: "lightgray",
                                            marginLeft: "20px",
                                          }}
                                        >
                                          {commnent.content}
                                        </span>
                                        <small
                                          style={{
                                            display: "float",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          ({getFormattedTime(commnent.time)})
                                        </small>
                                      </Typography>
                                    </ListItem>
                                    {index < post.comments.length - 1 && (
                                      <Divider />
                                    )}
                                  </React.Fragment>
                                )
                              )}
                            </List>
                          </Box>

                          {/* Input Comment */}
                          <Box sx={{ marginTop: 1, height: "auto" }}>
                            <TextField
                              label="Comment"
                              variant="outlined"
                              fullWidth
                              sx={{
                                marginBottom: 1,
                                "& .MuiOutlinedInput-root": { borderRadius: 0 },
                              }}
                              onChange={(e: any) =>
                                handleChangeComment(post.id, e.target.value)
                              }
                              value={idCurrentPost == post.id ? comment : ""}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ marginTop: 1 }}
                              onClick={() => handlePostComment(post.id)}
                            >
                              Comment
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Box
              sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}
            >
              <Pagination count={10} color="primary" />
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
export default Posts;
