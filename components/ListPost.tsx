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
  List,
  ListItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Pagination,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { findIconById, findStatusById, getFormattedTime } from "../config";
import IconButtonWithPopover from "./IconButtonWithPopover";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getDataPosts, postComment } from "../redux/actions";
import { useSelector } from "react-redux";
import { clearDataCommentPost } from "../redux/reducers";

function ListPost() {
  const fileInputRef = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const { isCreatePost, isComment, dataPost } = useSelector(
    (state: any) => state
  );

  const [idPostShowComment, setIdPostShowComment] = useState<any>(null);
  const [idCurrentPost, setIdCurrentPost] = useState<any>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getDataPosts());
  }, [dispatch, isCreatePost, isComment]);

  useEffect(() => {
    setComment("");
    setIdCurrentPost(null);
    dispatch(clearDataCommentPost());
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isCreatePost, isComment]);
  const handleShowComment = (idPost: any) => {
    setIdPostShowComment(idPost);
  };
  const handleChangeComment = (postId: any, comment: any) => {
    setComment(comment);
    setIdCurrentPost(postId);
  };

  const handlePostComment = (id: any) => {
    dispatch(postComment({ id, comment }));
  };

  return (
    <>
      <Container sx={{ marginTop: 4 }} maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {dataPost?.list_post.map((post: any) => (
            <Grid item key={post.id} xs={8} sx={{ marginTop: 5 }}>
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
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            fontFamily: "monospace",
                          }}
                        >
                          {post.user.username}
                          {post.title && (
                            <small style={{ fontWeight: 300, marginLeft: 10 }}>
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
                    <Typography sx={{ fontFamily: "monospace" }} variant="body2" color="text.secondary">
                      <strong>{post.content}</strong>
                    </Typography>

                    {post?.image && (
                      <img
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          objectFit: "cover",
                          marginTop: "10px",
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
                    <ChatBubbleOutlineIcon />{" "}
                    <small style={{ color: "gray" }}>Bình luận</small>
                  </Button>
                ) : (
                  <Button onClick={() => handleShowComment(null)}>
                    <small style={{ color: "gray" }}>Đóng</small>
                  </Button>
                )}

                {idPostShowComment == post.id ? (
                  <Box>
                    {/* List Comment */}
                    <Box>
                      <List>
                        {post.comments?.map((commnent: any, index: number) => (
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
                                <strong>{commnent.user.username}</strong>

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
                            {index < post.comments.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
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

        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Pagination
            count={10}
            color="secondary"
            sx={{
              "& .MuiPaginationItem-page, & .MuiPaginationItem-ellipsis, & .MuiSvgIcon-root":
                {
                  color: "white",
                },
            }}
          />
        </Box>
      </Container>
    </>
  );
}

export default ListPost;
