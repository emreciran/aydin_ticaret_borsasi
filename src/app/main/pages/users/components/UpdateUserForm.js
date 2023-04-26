import {
  Box,
  FormLabel,
  Grid,
  Button,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import UserService from "src/app/services/userService";
import moment from "moment";
import UsersConfig from "../UsersConfig";
import { useTranslation } from "react-i18next";

const UpdateUserForm = ({ data, setOpen, getUsers }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("Users");
  const modalTranslate = t("UPDATEUSER", { returnObjects: true });

  const [name, setName] = useState(data?.name);
  const [surname, setSurname] = useState(data?.surname);
  const [status, setStatus] = useState(
    data?.status === true ? "true" : "false"
  );
  const [role, setRole] = useState(data?.role);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedDate = moment().format("L LT");

    var values = {
      useR_ID: data?.id,
      name,
      surname,
      email: data?.email,
      username: data?.username,
      role: role,
      status: status === "true" ? true : false,
      createdDate: data?.createdDate,
      updatedDate: updatedDate,
    };

    UserService.updateUser(values)
      .then(() => {
        _showToast.showSuccess("Kullanıcı güncellendi!");
        getUsers();
        setOpen(false);
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
            label={modalTranslate.name}
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
            label={modalTranslate.surname}
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
            label={modalTranslate.email}
            disabled
            value={data?.email}
            id="email"
            type="email"
            required
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={modalTranslate.username}
            disabled
            value={data?.username}
            id="username"
            type="username"
            required
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
              variant="standard"
              onChange={(e) => setRole(e.target.value)}
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{modalTranslate.status.name}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={status}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="success" />}
                label={modalTranslate.status.active}
              />
              <FormControlLabel
                value="false"
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
  );
};

export default UpdateUserForm;
