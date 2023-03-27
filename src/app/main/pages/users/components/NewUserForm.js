import React, { useState } from "react";
import {
  TextField,
  Grid,
  Box,
  FormLabel,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useToast from "src/app/hooks/useToast";

const NewUserForm = ({ setOpen, getUsers }) => {
  const [_showToast] = useToast();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const value = e.target.value === "true";
    setStatus(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        noValidate
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              required
              fullWidth
              variant="standard"
              id="name"
              label="Adı"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="surname"
              label="Soyadı"
              variant="standard"
              name="surname"
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Kullanıcı adı"
              variant="standard"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              variant="standard"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              variant="standard"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Durumu</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="status"
                id="status"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="success" />}
                  label="Aktif"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="error" />}
                  label="Pasif"
                />
              </RadioGroup>
            </FormControl>
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
          >
            <span>Kullanıcı Ekle</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NewUserForm;
