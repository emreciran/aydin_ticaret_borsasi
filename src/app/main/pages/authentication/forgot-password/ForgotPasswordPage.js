import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import useToast from "src/app/hooks/useToast";
import { Formik } from "formik";
import { ForgotPasswordSchema } from "src/app/validations";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import ErrorMessage from "app/shared-components/ErrorMessage";
import LanguageSwitcher from "app/theme-layouts/shared-components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import JwtService from "src/app/auth/services/jwtService";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("ForgotPassword");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const initialValues = {
    email,
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    JwtService.forgotPassword(values.email)
      .then((response) => {
        _showToast.showSuccess(response.message);
        setLoading(false);
      })
      .catch((error) => {
        _showToast.showError(error);
        setLoading(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-3xl flex justify-between items-center font-extrabold tracking-tight leading-tight">
            {t("TITLE")}
            <LanguageSwitcher />
          </Typography>

          <div className="flex items-baseline mt-2 font-medium">
            <Button color="info" onClick={() => navigate(-1)}>
              {t("LOGIN_BUTTON")}
            </Button>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={ForgotPasswordSchema}
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
                className="flex flex-col justify-center w-full mt-20"
                onSubmit={handleSubmit}
              >
                <Grid container>
                  <Grid item xs={12} className="mb-24">
                    <TextField
                      label={t("email")}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      variant="outlined"
                      required
                      fullWidth
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage error={errors.email} />
                    )}
                  </Grid>
                </Grid>

                <LoadingButton
                  variant="contained"
                  color="secondary"
                  className=" w-full mt-16"
                  aria-label="Sign in"
                  disabled={!dirty || isSubmitting}
                  type="submit"
                  loading={loading}
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
      </Box>
    </div>
  );
};

export default ForgotPasswordPage;
