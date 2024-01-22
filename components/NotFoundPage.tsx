import React from "react";
import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h1" sx={{ fontSize: "8rem", color: "primary.main" }}>
        403
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Oops! Bạn không có quyền truy cập trang này.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Quay lại trang chủ
        </Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
