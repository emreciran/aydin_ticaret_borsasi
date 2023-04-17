import React, { useState } from "react";
import useToast from "src/app/hooks/useToast";
import { Box, Grid, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UserService from "src/app/services/userService";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import JwtService from "src/app/auth/services/jwtService";
import { useTranslation } from "react-i18next";

const UpdatePswForm = ({ setOpen }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation("ProfileApp");
  const pswFormTranslation = t("UPDATE_PSW_MODAL", { returnObjects: true });

  const { user } = useSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: user.sub,
      oldPassword,
      newPassword,
      confirmPassword,
    };

    UserService.updatePassword(data)
      .then((response) => {
        _showToast.showSuccess("Şifreniz güncellendi! Tekrar giriş yapınız.");
        JwtService.logout();
      })
      .catch((error) => {
        _showToast.showError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={pswFormTranslation.curr_psw}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            id="oldPassword"
            type="password"
            required
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={pswFormTranslation.new_psw}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="newPassword"
            type="password"
            required
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={pswFormTranslation.conf_psw}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            type="password"
            required
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Button
          sx={{ marginRight: 1 }}
          variant="outlined"
          color="error"
          onClick={() => setOpen(false)}
        >
          {pswFormTranslation.cancel}
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Loading…"
          color="secondary"
        >
          <span>{pswFormTranslation.update}</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdatePswForm;
