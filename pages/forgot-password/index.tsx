import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SendmailModal from "../../components/SendmailModel";
import { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDataUser, sendMail } from "../../redux/actions";
import { clearSendMailState } from "../../redux/reducers";
import Head from "next/head";

function ForgotPassword() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser, isSendMail } = useSelector((state: any) => state);

  const [isSending, setIsSending] = useState(false);
  const [id, setId] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [sendmailSuccess, setSendmailSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const id = dataUser?.user.id;
    setId(id);
  }, [dataUser]);

  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  useEffect(() => {
    if (isSendMail) {
      setIsPending(false);
      setIsSending(false);
      setSendmailSuccess(true);
      setModalOpen(true);
      dispatch(clearSendMailState());
    }
  }, [isSendMail]);

  const handleForgotPassword = async () => {
    setIsPending(true);
    dispatch(sendMail({ id: id }));
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
          marginTop: 50,
        }}
      >
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" color="initial">
            Send Password your gmail
          </Typography>
        </Box>
        <Button
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
