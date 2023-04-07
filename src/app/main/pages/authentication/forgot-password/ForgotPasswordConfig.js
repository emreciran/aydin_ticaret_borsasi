import authRoles from "../../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import i18next from "i18next";
import ForgotPasswordPage from "./ForgotPasswordPage";

i18next.addResourceBundle("en", "ForgotPassword", en);
i18next.addResourceBundle("tr", "ForgotPassword", tr);

const ForgotPasswordConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
  ],
};

export default ForgotPasswordConfig;
