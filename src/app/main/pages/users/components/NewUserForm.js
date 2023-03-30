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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useToast from "src/app/hooks/useToast";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import UserService from "src/app/services/userService";

const allRoles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Yazar" },
];

const NewUserForm = ({ setOpen, getUsers }) => {
  const [_showToast] = useToast();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("Users");
  const modalTranslate = t("NEWUSER", { returnObjects: true });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();
  const [role, setRole] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      surname,
      email,
      username,
      password,
      status,
      role,
    };

    UserService.createUser(data)
      .then((response) => {
        _showToast.showSuccess("Kullanıcı oluşturuldu!");

        getUsers();
        setOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        _showToast.showError(
          error.response ? error.response.data.message : error.message
        );
      });
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
              label={modalTranslate.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="surname"
              label={modalTranslate.surname}
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
              label={modalTranslate.username}
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
              label={modalTranslate.email}
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
              label={modalTranslate.password}
              variant="standard"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 25 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Rol"
                onChange={(e) => setRole(e.target.value)}
              >
                {allRoles?.map((role) => (
                  <MenuItem value={role.name} key={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {modalTranslate.status.name}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="status"
                id="status"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="success" />}
                  label={modalTranslate.status.active}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="error" />}
                  label={modalTranslate.status.passive}
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
            {modalTranslate.cancel}
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Loading…"
            color="secondary"
          >
            <span>{modalTranslate.button}</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NewUserForm;
