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

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleForgotPassword();
    }
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
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          marginTop: 20,
          borderRadius: "20px",
          background: "linear-gradient(to bottom, #005AA7  , #FFFDE4)",
        }}
      >
        <Box sx={{ paddingBottom: 2, color: "white", textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontFamily: "monospace" }}>
            Forgot Password
          </Typography>
        </Box>
        <span>Email</span>
        <TextField
          onKeyDown={handleKeyDown}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            color: "white",
            "& label": {
              color: "white",
            },
            "& input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
        <Button
          sx={{ marginTop: 3, height: 40 }}
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
