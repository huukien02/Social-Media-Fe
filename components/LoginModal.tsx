import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";
import { MESSAGER_LOGIN_FAILED, MESSAGER_LOGIN_SUCCESS } from "../config";

const LoginModal = ({ open, onClose, success }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper style={{ border: success ? "4px solid green" : "4px solid red" }}>
        <DialogTitle>
          {success ? "Login Successful" : "Login Failed"}
        </DialogTitle>
        <DialogContent>
          {success ? MESSAGER_LOGIN_SUCCESS : MESSAGER_LOGIN_FAILED}
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

export default LoginModal;
