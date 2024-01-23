import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendmailModal from "../../components/SendmailModel";
import { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendMail } from "../../redux/actions";
import { clearSendMailState } from "../../redux/reducers";
import Head from "next/head";

function ForgotPassword() {
  const dispatch: AppDispatch = useDispatch();
  const { isSendMail } = useSelector((state: any) => state);

  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [sendmailSuccess, setSendmailSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isSendMail?.status === 404 || isSendMail?.status === 200) {
      setIsPending(false);
      setIsSending(false);
      setSendmailSuccess(isSendMail.status === 200);
      setModalOpen(true);
      setEmail(null);
      dispatch(clearSendMailState());
    }
  }, [isSendMail]);

  const handleForgotPassword = async () => {
    setIsPending(true);
    dispatch(sendMail({ email: email }));
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          marginTop: 10,
        }}
      >
        <Box sx={{ padding: 5 }}>
          <Typography variant="h5" color="#1877F2">
            Forgot password
          </Typography>
        </Box>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          sx={{ marginTop: 3 }}
          variant="contained"
          color="primary"
          onClick={handleForgotPassword}
          disabled={isSending}
        >
          {isPending ? <CircularProgress size={25} color="inherit" /> : "Send"}
        </Button>
      </Box>

      <SendmailModal
        open={modalOpen}
        onClose={handleCloseModal}
        success={sendmailSuccess}
      />
    </>
  );
}

export default ForgotPassword;
