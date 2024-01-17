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
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box>
        <Typography
          sx={{ textAlign: "center", paddingBottom: 2 }}
          variant="h5"
          color="initial"
        >
          REGISTER
        </Typography>
      </Box>
      <Container maxWidth="sm">
        <AppBar sx={{ backgroundColor: "white" }} position="static">
          <Tabs value={tabValue} onChange={handleChangeTab} centered>
            <Tab label="Register Form" />
            <Tab label="Register File" />
          </Tabs>
        </AppBar>
        <FormRegister typeTab={tabValue} />
        <FileRegister typeTab={tabValue} />
      </Container>
    </>
  );
}

export default Register;
