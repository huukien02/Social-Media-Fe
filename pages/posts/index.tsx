import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import Head from "next/head";
import NotFoundPage from "../../components/NotFoundPage";
import FormCreatePost from "../../components/FormCreatePost";
import ListPost from "../../components/ListPost";

const style = {
  paddingTop: 5,
  paddingBottom: 5,
  backgroundImage: 'url("https://i.gifer.com/BXe0.gif")',
};

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser } = useSelector((state: any) => state);
  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>

      {!dataUser ? (
        <NotFoundPage />
      ) : (
        <Box sx={style}>
          <FormCreatePost dataPropsUser={dataUser} />
          <ListPost />
        </Box>
      )}
    </>
  );
}
export default Posts;
