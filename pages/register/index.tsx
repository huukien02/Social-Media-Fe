import { AppBar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import FormRegister from "../../components/FormRegister";
import FileRegister from "../../components/FileRegister";
import Head from "next/head";

function Register() {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ marginTop: 5 }}>
      <Head>
        <title>Register</title>
      </Head>

      <Container
        maxWidth="sm"
        sx={{
          background: "linear-gradient(to bottom, #353A5F  , #9EBAF3)",
          borderRadius: "20px",
          paddingBottom: 3,
          paddingTop: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              paddingBottom: 2,
              fontFamily: "monospace",
            }}
            variant="h5"
          >
            REGISTER
          </Typography>
        </Box>
        <AppBar
          sx={{ backgroundColor: "white", borderRadius: "20px" }}
          position="static"
        >
          <Tabs value={tabValue} onChange={handleChangeTab} centered>
            <Tab label="Register Form" />
            <Tab label="Register File" />
          </Tabs>
        </AppBar>
        <FormRegister typeTab={tabValue} />
        <FileRegister typeTab={tabValue} />
      </Container>
    </Box>
  );
}

export default Register;
