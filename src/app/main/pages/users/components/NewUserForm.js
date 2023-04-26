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
import UserService from "src/app/services/userService";
import moment from "moment";
import UsersConfig from "../UsersConfig";

const initialFieldValues = {
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
  role: "",
};

const NewUserForm = ({ setOpen, getUsers }) => {
  const [_showToast] = useToast();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("Users");
  const modalTranslate = t("NEWUSER", { returnObjects: true });

  const [status, setStatus] = useState();
  const [values, setValues] = useState(initialFieldValues);

  const handleRadioChange = (e) => {
    const value = e.target.value === "true";
    setStatus(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const createdDate = moment().format("L LT");

    const data = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      username: values.username,
      password: values.password,
      createdDate,
      status,
      role: values.role,
    };

    UserService.createUser(data)
      .then((response) => {
        _showToast.showSuccess("Kullanıcı oluşturuldu!");
        getUsers();
        setOpen(false);
      })
      .catch((error) => {
        _showToast.showError(
          error.response ? error.response.data.message : error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
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
              value={values.name}
              label={modalTranslate.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="surname"
              label={modalTranslate.surname}
              variant="standard"
              value={values.surname}
              name="surname"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              value={values.username}
              label={modalTranslate.username}
              variant="standard"
              name="username"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              value={values.email}
              label={modalTranslate.email}
              variant="standard"
              name="email"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              value={values.password}
              label={modalTranslate.password}
              variant="standard"
              type="password"
              id="password"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 25 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.role}
                name="role"
                label="Rol"
                variant="standard"
                onChange={handleInputChange}
              >
                {UsersConfig.allRoles?.map((role) => (
                  <MenuItem value={role.name} key={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: 10 }}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">
                {modalTranslate.status.name}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="status"
                id="status"
                onChange={handleRadioChange}
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
