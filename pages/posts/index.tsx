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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getDataPosts,
  getDataUser,
  postComment,
} from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import IconButtonWithPopover from "../../components/IconButtonWithPopover";
import { getFormattedTime, isFriend } from "../../config";
import Head from "next/head";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const { dataPost, isCreatePost, isComment, dataUser } = useSelector(
    (state: any) => state
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment("");
    setContent("");
    setTitle("");
  }, [isCreatePost, isComment]);

  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  useEffect(() => {
    dispatch(getDataPosts());
  }, [dispatch, isCreatePost, isComment]);

  const handleCreatePost = () => {
    dispatch(createPost({ title, content }));
  };

  const handlePostComment = (id: any) => {
    dispatch(postComment({ id, comment }));
  };

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <Box>
        <Paper
          elevation={3}
          sx={{ padding: 2, borderRadius: 2, width: "30%", marginLeft: "35%" }}
        >
          <Typography
            sx={{ textAlign: "center" }}
            variant="h4"
            color="initial"
            gutterBottom
          >
            Create Post
          </Typography>
          <Box>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreatePost}
              sx={{ marginBottom: 2 }}
            >
              Post
            </Button>
          </Box>
        </Paper>
        <Container sx={{ marginTop: 4 }} maxWidth="md">
          <Grid container spacing={2}>
            {dataPost?.list_post.map((post: any) => (
              <Grid item key={post.id} xs={12}>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={post.user.avatar}
                          alt={post.user.username}
                          sx={{ width: 75, height: 75 }}
                        />
                      }
                      title={
                        <Box>
                          <Typography
                            sx={{ fontWeight: "bold", color: "black" }}
                          >
                            {post.user.username}
                          </Typography>
                          <small>{getFormattedTime(post.time)}</small>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Box>
                        <Typography variant="h6">{post.title}</Typography>
                        <Box
                          sx={{
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {post.content}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <IconButtonWithPopover
                          postId={post.id}
                          reactions={post.reactions}
                          reactionsCount={post.reactionsCount}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  <Box sx={{ marginTop: 2 }}>
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
                              <strong>
                                {commnent.user.username}
                                {/* <small>
                                  {isFriend(
                                    commnent.user.id,
                                    dataUser?.friends
                                  ) && (
                                    <div
                                      style={{
                                        display: "inline-block",
                                        position: "relative",
                                        top: 4,
                                        left: 3,
                                      }}
                                    >
                                      <PeopleIcon
                                        fontSize="small"
                                        style={{ color: "#1877F2" }}
                                      />
                                    </div>
                                  )}
                                </small> */}
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
                          {index < post.comments.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ marginTop: 5 }}>
                    <TextField
                      label="Comment"
                      variant="outlined"
                      fullWidth
                      sx={{
                        marginBottom: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: 0 },
                      }}
                      onChange={(e: any) => setComment(e.target.value)}
                      value={comment}
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
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default Posts;
