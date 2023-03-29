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
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import UserService from "src/app/services/userService";

const allRoles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Yazar" },
];

const UpdateUserForm = ({ data, setOpen, getUsers }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const [name, setName] = useState(data?.name);
  const [surname, setSurname] = useState(data?.surname);
  const [status, setStatus] = useState(data?.status);
  const [role, setRole] = useState(data?.role);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      var values = {
        useR_ID: data?.id,
        name,
        surname,
        email: data?.email,
        username: data?.username,
        role: role,
        status: status === "true",
        createdDate: data?.createdDate,
      };

      UserService.updateUser(values)
        .then((response) => {
          _showToast.showSuccess("Kullanıcı güncellendi!");
          getUsers();
          setLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          setLoading(false);
          _showToast.showError(error);
        });
    } catch (error) {
      setLoading(false);
      _showToast.showError(error.response.data.message);
    }
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
            label="Username"
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
            <FormLabel id="demo-radio-buttons-group-label">Durumu</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={status}
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
          color="secondary"
        >
          <span>Güncelle</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateUserForm;
