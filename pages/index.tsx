import { Box, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "monospace",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="h3"
          color="#1877F2"
        >
          Welcome to social media
        </Typography>

        <small
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            padding: "8px",
            fontFamily: "monospace",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Code By Kiennnn ❤️
        </small>
      </Box>
    </>
  );
}

export default Home;
