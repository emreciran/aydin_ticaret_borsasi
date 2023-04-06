import authRoles from "../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import i18next from "i18next";
import ResetPasswordPage from "./ResetPasswordPage";

i18next.addResourceBundle("en", "ResetPassword", en);
i18next.addResourceBundle("tr", "ResetPassword", tr);

const ResetPasswordConfig = {
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
      path: "reset-password",
      element: <ResetPasswordPage />,
    },
  ],
};

export default ResetPasswordConfig;
