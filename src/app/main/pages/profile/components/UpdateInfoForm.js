import React, { useState } from "react";
import useToast from "src/app/hooks/useToast";
import { Box, FormLabel, Grid, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import UserService from "src/app/services/userService";
import { useNavigate } from "react-router-dom";
import JwtService from "src/app/auth/services/jwtService";

const UpdateInfoForm = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { user } = useSelector(selectUser);
  const navigate = useNavigate()
  
  const [name, setName] = useState(user.given_name);
  const [surname, setSurname] = useState(user.family_name);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const values = {
      useR_ID: user.nameid,
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
            label="Adı"
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
            label="Soyadı"
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
            label="Email"
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
            label="Username"
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
          İptal
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Loading…"
          color="secondary"
        >
          <span>Güncelle</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateInfoForm;
