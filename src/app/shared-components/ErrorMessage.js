import React from "react";
import Typography from "@mui/material/Typography";

const ErrorMessage = ({ error }) => {
  return <Typography color="red">{error}</Typography>;
};

export default ErrorMessage;
