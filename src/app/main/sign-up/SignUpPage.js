import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import jwtService from "../../auth/services/jwtService";
import LanguageSwitcher from "app/theme-layouts/shared-components/LanguageSwitcher";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { RegisterSchema } from "src/app/validations";
import useToast from "src/app/hooks/useToast";
import ErrorMessage from "app/shared-components/ErrorMessage";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation("SignUp");

  const inputsTranslate = t("INPUT_TEXTS", { returnObjects: true });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const initialValues = {
    name,
    surname,
    username,
    email,
    password,
    confirmPassword,
    status: false,
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    jwtService
      .createUser(values)
      .then(() => {
        setLoading(false);
        _showToast.showSuccess("Kullanıcı başarıyla oluşturuldu!")
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log(error);
        _showToast.showError(error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl flex justify-between items-center font-extrabold tracking-tight leading-tight">
            {t("TITLE")}
            <LanguageSwitcher />
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>{t("LOGIN_TEXT")}</Typography>
            <Link className="ml-4" to="/sign-in">
              {t("LOGIN_BUTTON")}
            </Link>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              handleSubmit,
              touched,
              handleChange,
              dirty,
              isSubmitting,
            }) => (
              <Box
                component="form"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label={inputsTranslate.name}
                      type="text"
                      id="name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <ErrorMessage error={errors.name} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={inputsTranslate.surname}
                      type="text"
                      id="surname"
                      name="surname"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    {errors.surname && touched.surname && (
                      <ErrorMessage error={errors.surname} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={inputsTranslate.username}
                      type="text"
                      id="username"
                      name="username"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    {errors.username && touched.username && (
                      <ErrorMessage error={errors.username} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={inputsTranslate.email}
                      type="email"
                      id="email"
                      name="email"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage error={errors.email} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={inputsTranslate.password}
                      type="password"
                      id="password"
                      name="password"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    {errors.password && touched.password && (
                      <ErrorMessage error={errors.password} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={inputsTranslate.confirmPassword}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <ErrorMessage error={errors.confirmPassword} />
                    )}
                  </Grid>
                </Grid>

                <LoadingButton
                  variant="contained"
                  color="secondary"
                  className="w-full mt-24"
                  aria-label="Register"
                  loading={loading}
                  disabled={!dirty || isSubmitting}
                  type="submit"
                  size="large"
                >
                  {t("BUTTON")}
                </LoadingButton>
              </Box>
            )}
          </Formik>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: "primary.main" }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                "& .MuiAvatar-root": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default SignUpPage;
