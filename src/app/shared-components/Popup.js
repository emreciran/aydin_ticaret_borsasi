import React from "react";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

const Popup = ({ title, children, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle display="flex" justifyContent="space-between">
        <Box>{title}</Box>
        <span style={{ cursor: "pointer" }} onClick={handleClose}>
          X
        </span>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
