import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";
import { MESSAGER_REGISTER_FAILED, MESSAGER_REGISTER_SUCCESS } from "../config";

const RegisterModal = ({ open, onClose, success }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper style={{ border: success ? "4px solid green" : "4px solid red" }}>
        <DialogTitle>
          {success ? "Register Successful" : "Register Failed"}
        </DialogTitle>
        <DialogContent>
          {success ? MESSAGER_REGISTER_SUCCESS : MESSAGER_REGISTER_FAILED}
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

export default RegisterModal;
