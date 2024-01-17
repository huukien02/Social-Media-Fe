import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";
import { MESSAGER_SENDMAIL_FAILED, MESSAGER_SENDMAIL_SUCCESS } from "../config";

const SendmailModal = ({ open, onClose, success }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper style={{ border: success ? "4px solid green" : "4px solid red" }}>
        <DialogTitle>
          {success ? "Send mail Successful" : "Send mail Failed"}
        </DialogTitle>
        <DialogContent>
          {success ? MESSAGER_SENDMAIL_SUCCESS : MESSAGER_SENDMAIL_FAILED}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default SendmailModal;
