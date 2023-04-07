import { Button, Typography } from "@mui/material";
import JwtService from "src/app/auth/services/jwtService";
import useToast from "src/app/hooks/useToast";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const ConfirmEmailNotification = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const handleClick = () => {
    setLoading(true);
    JwtService.sendConfirmEmail(email)
      .then((response) => {
        _showToast.showSuccess(response.message);
        setLoading(false);
      })
      .catch((error) => {
        _showToast.showError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Typography marginBottom={2}>
        Giriş yapmak için emailinizi onaylamanız gerekmektedir.
      </Typography>
      <LoadingButton
        loading={loading}
        color="primary"
        variant="outlined"
        onClick={handleClick}
      >
        Email onayı göndermek için tıklayınız.
      </LoadingButton>
    </div>
  );
};

export default ConfirmEmailNotification;
