import React, { useState } from "react";
import useToast from "src/app/hooks/useToast";
import { Box, FormLabel, Grid, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import UserService from "src/app/services/userService";
import JwtService from "src/app/auth/services/jwtService";
import { useTranslation } from "react-i18next";

const UpdateInfoForm = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { user } = useSelector(selectUser);
  const { t } = useTranslation("ProfileApp");
  const infoFormTranslation = t("UPDATE_INFO_MODAL", { returnObjects: true });

  const [name, setName] = useState(user.given_name);
  const [surname, setSurname] = useState(user.family_name);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const values = {
      Id: user.nameid,
      name,
      surname,
    };

    UserService.updateUserInfo(values)
      .then((response) => {
        _showToast.showSuccess("Kullanıcı güncellendi! Tekrar giriş yapınız.");
        setLoading(false);
        JwtService.logout();
      })
      .catch((error) => {
        setLoading(false);
        _showToast.showError(error);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={infoFormTranslation.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            required
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={infoFormTranslation.surname}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            id="surname"
            required
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={infoFormTranslation.email}
            disabled
            value={user.sub}
            id="email"
            type="email"
            required
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={infoFormTranslation.username}
            disabled
            value={user.name}
            id="username"
            type="username"
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
          {infoFormTranslation.cancel}
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Loading…"
          color="secondary"
        >
          <span>{infoFormTranslation.update}</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateInfoForm;
